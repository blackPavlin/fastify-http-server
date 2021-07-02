import { model, Schema, Document, Types } from 'mongoose';

export interface Report extends Document {
	periodID: string;
	week: 1 | 2 | 3 | 4;
	text: string;
	profit: number;
}

const reportSchema = new Schema(
	{
		periodID: {
			type: Types.ObjectId,
			required: true,
		},
		week: {
			type: Number,
			enum: [1, 2, 3, 4],
			required: true,
		},
		text: {
			type: String,
		},
		profit: {
			type: Number,
			required: true,
		},
	},
	{
		versionKey: false,
	},
);

reportSchema.index({ periodID: 1 });

export default model<Report>('reports', reportSchema);
