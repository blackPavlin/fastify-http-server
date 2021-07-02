export const GetPeriodSchema = {
	response: {
		200: {
			type: 'object',
			required: ['periods'],
			properties: {
				periods: {
					type: 'array',
					items: {
						type: 'object',
						required: ['_id', 'date'],
						properties: {
							_id: { type: 'string' },
							date: { type: 'string' },
						},
					},
				},
			},
		},
	},
} as const;

export const CreatePeriodSchema = {
	body: {
		type: 'object',
		required: ['date'],
		properties: {
			date: { type: 'string' },
		},
	},
	response: {
		201: {
			type: 'object',
			required: ['new_period'],
			properties: {
				new_period: {
					type: 'object',
					required: ['_id', 'date'],
					properties: {
						_id: { type: 'string' },
						date: { type: 'string' },
					},
				},
			},
		},
	},
} as const;

export const DeletePeriodSchema = {
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
			required: ['message'],
			properties: {
				message: { type: 'string' },
			},
		},
	},
} as const;
