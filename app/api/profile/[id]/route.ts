import { getProfile } from "@/models/actions/profile.action";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	const user = await getProfile(id);

	return Response.json({ message: "fetch sucess", ok: 1, user });
}
