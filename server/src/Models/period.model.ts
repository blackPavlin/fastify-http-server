import { model, Schema, Document } from 'mongoose';

export interface Period extends Document {
	date: Date;
}

const periodSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
	},
	{
		versionKey: false,
	},
);

export default model<Period>('periods', periodSchema);
