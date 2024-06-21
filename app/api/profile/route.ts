import { connectToDatabase } from "@/models/actions/mongoose";
import { createProfile } from "@/models/actions/profile.action";
import multer from "multer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	return Response.json({ message: "Api is working", ok: 1 });
}

export async function POST(request: Request) {
	const x = await request.formData();
	const firstname = x.get("firstname") as string;
	const lastname = x.get("lastname") as string;
	const email = x.get("email") as string;
	const address = x.get("address") as string;

	const image = x.get("image") as string;

	const user = await createProfile({
		firstname,
		lastname,
		email,
		address,
		picture: image,
	});

	return Response.json({ message: "upload successfull", user });
}
