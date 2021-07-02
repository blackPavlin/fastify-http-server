import { model, Schema, Document } from 'mongoose';

export interface Customer extends Document {
	date: Date;
}

const customerSchema = new Schema(
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

export default model<Customer>('customers', customerSchema);
