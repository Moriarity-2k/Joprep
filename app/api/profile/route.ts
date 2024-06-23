import { NextRequest, NextResponse } from "next/server";
import { createProfile, getProfile } from "@/models/actions/profile.action";
import { cors, runMiddleware } from "@/Middleware/cors";

/**
 * @route : /api/profile
 */

// Middleware to handle CORS
async function handleCors(req: NextRequest, res: NextResponse) {
	await runMiddleware(req, res, cors);
}

export async function GET(request: Request) {
	const user = await getProfile();

	return Response.json({ message: "fetch successful", ok: 1, user });
}

export async function POST(request: Request) {
	const { firstName, lastName, address, email, image } = await request.json();

	const user = await createProfile({
		firstName,
		lastName,
		email,
		address,
		image,
	});

	// console.log({ user });

	return Response.json({ message: "upload successfull" });
}
