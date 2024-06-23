import toast from "react-hot-toast";
import { supabase } from "./Supabase";

/**
 * uploads image to supabase and returens the url
 */
export async function ImageUploader(file: File) {
	try {
		const { data, error } = await supabase.storage
			.from("Files")
			.upload(file.name.split("/").join("") + Date.now(), file, {
				cacheControl: "3600",
			});

		if (data)
			return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Files/${data.path}`;
		else return null;
	} catch (err) {
		console.log(err);
	}
}
