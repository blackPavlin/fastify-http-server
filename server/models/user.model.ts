import { model, Schema, Document } from "mongoose"

export interface IUser extends Document {
    login: string,
    password: string,
}

const userSchema: Schema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

export default model<IUser>("user", userSchema);
