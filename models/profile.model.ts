import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
	firstname: string;
	lastname: string;
	email: string;
	picture?: string;
	address?: string;
	profileId: string;
}

/**
 * Schema for the user profile
 */
const UserSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	address: String,
	image: { type: String },
	profileId: { type: String, default: "1" },
});

const User = models.User || model("User", UserSchema);

export default User;
