import User, { IUser } from "../profile.model";
import { connectToDatabase } from "./mongoose";

/**
 * @route : /api/profile
 * @param data : of type IUser
 * @returns the user created in the DB
 */
export async function createProfile(data: {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	image: string;
}) {
	try {
		connectToDatabase();

		const user = await User.create(data);

		return user;
	} catch (err) {
		console.log(err);
	}
}

/**
 *
 * fetches the profile
 * @route : /api/profile
 */
export async function getProfile() {
	try {
		connectToDatabase();

		const user = await User.findOne({ profileId: "1" });

		return user;
	} catch (err) {
		console.log(err);
	}
}
