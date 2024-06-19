import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
	firstname: string;
	lastname: string;
	email: string;
	picture?: {
		data: Buffer;
		contentType: string;
	};
	address?: string;
}

const UserSchema = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	email: { type: String },
	address: String,
	picture: {
		data: Buffer,
		contentType: String,
	},
});

const User = models.User || model("User", UserSchema);

export default User;
