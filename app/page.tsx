"use client";

import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import { ImageUploader } from "@/utils/ImageProcess";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
	const [image, setImage] = useState<string | null>(null);
	const handleImage = async (file: File | null | string) => {
		if (!file) {
			return setImage(null);
		}

		if (typeof file === "string") {
			setImage(file);
			return;
		}

		console.log(file);
		const x = await ImageUploader(file);

		setImage(
			`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Files/${x.path}`
		);

		// ${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Files/${x.path}
	};

	return (
		<div className="bg-lightBlue text-black h-screen">
			<Navbar file={image} />
			<Form image={image} handleImage={handleImage} />
		</div>
	);
}
