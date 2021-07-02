import { FastifyInstance, RegisterOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import { GetReportSchema, CreateReportSchema, DeleteReportSchema } from '../Schemas/report.schemas';
import Report from '../Models/report.model';

export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
	// Получить список отчётов по периоду
	server.get<{ Params: FromSchema<typeof GetReportSchema.params> }>(
		'/:id',
		{ schema: GetReportSchema },
		async (request, reply) => {
			const periodID = request.params.id;
			const reports = await Report.find({ periodID }).sort({ week: 1 }).lean();

			reply.code(200).send({ reports });
		},
	);

	// Создать новый отчёт
	server.post<{ Body: FromSchema<typeof CreateReportSchema.body> }>(
		'/create',
		{ schema: CreateReportSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const report = request.body;
			const newReport = await Report.create(report);

			reply.code(201).send({ new_report: newReport });
		},
	);

	// Удалить отчёт
	server.delete<{ Params: FromSchema<typeof DeleteReportSchema.params> }>(
		'/:id',
		{ schema: DeleteReportSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const id = request.params.id;
			await Report.deleteOne({ _id: id });

			reply.code(200).send({ message: 'Запись успешно удалена' });
		},
	);

	next();
};
