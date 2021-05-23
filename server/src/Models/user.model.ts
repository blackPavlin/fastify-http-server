import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
	login: string;
	password: string;
}

const userSchema = new Schema(
	{
		login: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
	},
);

userSchema.index('login');

export default model<User>('users', userSchema);
