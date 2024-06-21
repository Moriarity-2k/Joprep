import { supabase } from "./Supabase";

export async function ImageUploader(file: File | string | null) {
	if (!file) return;

	if (typeof file === "string") return;

	console.log(file);

	console.log({ file });
	const { data, error } = await supabase.storage
		.from("Files")
		.upload(file.name.split("/").join("") + Date.now(), file, {
			cacheControl: "3600",
		});

	if (error) {
		// toast("Server Error !!! Try again later");

		console.log(error);
		return;
	}

	// console.log(data);

	return data;
}
