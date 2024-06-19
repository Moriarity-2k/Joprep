import { connectToDatabase } from "@/models/actions/mongoose";
import { createProfile } from "@/models/actions/profile.action";
import multer from "multer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	return Response.json({ message: "Api is working", ok: 1 });
}

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
//
// async function MulterHandle(req, res) {
// 	return new Promise((resolve, reject) => {
// 		upload.single("image")(req, res, (err) => {
// 			if (err) {
// 				return reject(err);
// 			}
// 			resolve(req.file);
// 		});
// 	});
// }


export async function POST(request: Request) {
	const x = await request.formData();
	const firstname = x.get("firstname") as string;
	const lastname = x.get("lastname") as string;
	const email = x.get("email") as string;
	const address = x.get("address") as string;

	const image = x.get("image") as File;

	let imageBuffer = null;
	if (image && typeof image.arrayBuffer === "function") {
		imageBuffer = Buffer.from(await image.arrayBuffer());
	}

	if (!imageBuffer) {
		return;
	}

	const user = await createProfile({
		firstname,
		lastname,
		email,
		address,
		picture: {
			data: imageBuffer,
			contentType: image.type,
		},
	});

	return Response.json({ message: "upload successfull", user });
}
