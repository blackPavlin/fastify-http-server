import { model, Schema, Document } from 'mongoose';

export interface Period extends Document {
	title: string;
	dateStart: Date;
	dateEnd: Date;
}

const periodSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		dateStart: {
			type: Date,
			required: true,
		},
	},
	{
		versionKey: false,
	},
);

export default model<Period>('periods', periodSchema);
