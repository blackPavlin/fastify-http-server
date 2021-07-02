import { FastifyInstance, RegisterOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import { GetPeriodSchema, CreatePeriodSchema, DeletePeriodSchema } from '../Schemas/period.schema';
import Period from '../Models/period.model';

export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
	// Получить список периодов
	server.get('/', { schema: GetPeriodSchema }, async (request, reply) => {
		const periods = await Period.find().sort({ date: -1 }).lean();
		reply.code(200).send({ periods });
	});

	// Создать период
	server.post<{ Body: FromSchema<typeof CreatePeriodSchema.body> }>(
		'/create',
		{ schema: CreatePeriodSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const period = request.body;
			const newPeriod = await Period.create(period);

			reply.code(201).send({ new_period: newPeriod });
		},
	);

	// Удалить период
	server.delete<{ Params: FromSchema<typeof DeletePeriodSchema.params> }>(
		'/:id',
		{ schema: DeletePeriodSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const id = request.params.id;
			await Period.deleteOne({ _id: id });

			reply.code(200).send({ message: 'Запись успешно удалена' });
		},
	);

	next();
};
