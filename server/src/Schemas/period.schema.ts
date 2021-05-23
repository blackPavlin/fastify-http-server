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
						required: ['_id', 'title', 'dateStart', 'dateEnd'],
						properties: {
							_id: { type: 'string' },
							title: { type: 'string' },
							dateStart: { type: 'string' },
							dateEnd: { type: 'string' },
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
		required: ['title', 'dateStart', 'dateEnd'],
		properties: {
			title: { type: 'string' },
			dateStart: { type: 'string' },
			dateEnd: { type: 'string' },
		},
	},
	response: {
		201: {
			type: 'object',
			required: ['message'],
			properties: {
				message: { type: 'string' },
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
		201: {
			type: 'object',
			required: ['message'],
			properties: {
				message: { type: 'string' },
			},
		},
	},
} as const;
