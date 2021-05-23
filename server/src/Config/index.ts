import { FromSchema } from 'json-schema-to-ts';

const ConfigSchema = {
	type: 'object',
	required: ['MONGO_URL', 'SECRET_KEY', 'PORT'],
	properties: {
		MONGO_URL: { type: 'string' },
		SECRET_KEY: { type: 'string' },
		PORT: { type: 'number' },
	},
} as const;

declare module 'fastify' {
	export interface FastifyInstance {
		config: FromSchema<typeof ConfigSchema>;
	}
}

export default ConfigSchema;
