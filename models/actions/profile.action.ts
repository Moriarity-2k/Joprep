import User, { IUser } from "../profile.model";
import { connectToDatabase } from "./mongoose";

export async function createProfile(data: {
	firstname: string;
	lastname: string;
	email: string;
	address: string;
	picture: string;
}) {
	try {
		connectToDatabase();

		const user = await User.create(data);

		return user;
	} catch (err) {
		console.log(err);
	}
}

export async function getProfile(id: string) {
	try {
		connectToDatabase();

		const user = await User.findOne({ _id: id });

		return user;
	} catch (err) {
		console.log(err);
	}
}
