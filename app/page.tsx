"use client";

import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
	const [image, setImage] = useState<File | null>(null);
	const handleImage = (file: File) => setImage(file);

	return (
		<div className="bg-lightBlue text-black h-screen">
			<Navbar file={image} />
			{/* src={} */}

			<Form image={image} handleImage={handleImage} />
		</div>
	);
}
