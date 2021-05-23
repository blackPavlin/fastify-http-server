export const GetReportSchema = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: { type: 'string' },
		},
	},
	response: {
		200: {
			type: 'object',
			required: ['reports'],
			properties: {
				reports: {
					type: 'array',
					items: {
						type: 'object',
						required: [],
						properties: {},
					},
				},
			},
		},
	},
} as const;
