import toast from "react-hot-toast";
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
		return;
	}

	// console.log(data);

	return data;
}
