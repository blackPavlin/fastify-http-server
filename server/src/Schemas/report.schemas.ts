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
						required: ['_id', 'periodID', 'week', 'profit'],
						properties: {
							_id: { type: 'string' },
							periodID: { type: 'string' },
							week: {
								type: 'number',
								enum: [1, 2, 3, 4],
							},
							text: { type: 'string' },
							profit: { type: 'number' },
						},
					},
				},
			},
		},
	},
} as const;

export const CreateReportSchema = {
	body: {
		type: 'object',
		required: ['periodID', 'week', 'profit'],
		properties: {
			periodID: { type: 'string' },
			week: {
				type: 'number',
				enum: [1, 2, 3, 4],
			},
			text: { type: 'string' },
			profit: { type: 'number' },
		},
	},
	response: {
		201: {
			type: 'object',
			required: ['new_report'],
			new_report: {
				type: 'object',
				required: ['_id', 'periodID', 'week', 'profit'],
				properties: {
					_id: { type: 'string' },
					periodID: { type: 'string' },
					week: {
						type: 'number',
						enum: [1, 2, 3, 4],
					},
					text: { type: 'string' },
					profit: { type: 'number' },
				},
			},
		},
	},
} as const;

export const DeleteReportSchema = {
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
