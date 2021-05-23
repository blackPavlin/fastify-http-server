import { FastifyInstance, RegisterOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import { GetReportSchema } from '../Schemas/report.schemas';
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
			const reports = await Report.find({ periodID: '' }).sort({ week: 1 }).lean();

			reply.code(200).send({ reports });
		},
	);

	next();
};
