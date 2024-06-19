import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputEmail, InputText, InputTextArea } from "./InputText";
import InputImage from "./InputImage";
import Image from "next/image";

export default function Form({
	image,
	handleImage,
}: {
	image: File | null;
	handleImage: (file: File) => void;
}) {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	const handleFirstName = (value: string) => setFirstName(value);
	const handleLastName = (value: string) => setLastName(value);
	const handleEmail = (value: string) => setEmail(value);
	const handleAddress = (value: string) => setAddress(value);

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getUser() {
			try {
				let details = localStorage.getItem("JOPREP");
				if (details) details = JSON.parse(details);

				if (!details) return;

				// @ts-ignore
				if (details.picture.contentType) {
					// @ts-ignore
					details.picture.contentType = "image/jpg";
					// @ts-ignore
				}

				// @ts-ignore
				const id = details._id as string;

				const user = await axios.get(
					`http://localhost:3000/api/profile/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const userDetails = user.data.user;

				// 				if (userDetails.picture) {
				// 					// @ts-ignore
				// 					if (details.picture.contentType) {
				// 						// @ts-ignore
				// 						details.picture.contentType = "image/jpg";
				// 						// @ts-ignore
				// 						console.log({ first: details.picture.contentType });
				// 						const updatedImage = new File(
				// 							[userDetails.picture],
				// 							"updated-image.jpg",
				// 							{
				// 								type: "image/jpg",
				// 							}
				// 						);
				// 						handleImage(updatedImage);
				// 					}
				//
				// 					if (userDetails.picture) {
				// 						userDetails.picture.contentType = "image/jpg";
				// 					}
				// 					console.log(userDetails.picture);
				//
				// 					const updatedImage = new File(
				// 						[userDetails.picture],
				// 						"updated-image.jpg",
				// 						{
				// 							type: "image/jpg",
				// 						}
				// 					);
				// 					console.log({ updatedImage });
				// 					handleImage(updatedImage);
				//
				// 					// handleImage(updatedImage);
				// 				}

				if (userDetails.firstname) setFirstName(userDetails.firstname);
				if (userDetails.lastname) setLastName(userDetails.lastname);
				if (userDetails.email) setEmail(userDetails.email);
				if (userDetails.address) setAddress(userDetails.address);

				const img = localStorage.getItem("image");

				if (img) {
					const img2 = JSON.parse(img);
					handleImage(img2);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getUser();
	}, []);

	const handleSubmit = async () => {
		const data = new FormData();
		data.append("firstname", firstName);
		data.append("lastname", lastName);
		data.append("email", email);
		data.append("address", address);

		if (image) {
			data.append("image", image as Blob);
			localStorage.setItem("image", JSON.stringify(image));
		}

		setLoading(true);
		try {
			const res = await axios.post(
				"http://localhost:3000/api/profile",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (res.data.user) {
				res.data.user.picture.contentType = "image/jpg";
			}

			localStorage.setItem("JOPREP", JSON.stringify(res.data.user));
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	function handleReset() {
		const x = alert("hello");
	}

	return (
		<form
			className="md:w-[80%] w-[90%] mt-20 mx-auto space-y-10 max-md:space-y-6"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div className="poppins-semibold text-4xl">My Profile</div>

			<InputImage value={image} handleChange={handleImage} />

			<div className="md:flex md:gap-10 max-md:space-y-8">
				<InputText
					name="First Name"
					type="text"
					value={firstName}
					handleChange={handleFirstName}
				/>
				<InputText
					name="Last Name"
					type="text"
					value={lastName}
					handleChange={handleLastName}
				/>
			</div>

			<InputEmail
				name="Email"
				type="email"
				value={email}
				handleChange={handleEmail}
			/>

			<InputTextArea
				name="Address"
				type="textarea"
				value={address}
				handleChange={handleAddress}
			/>

			<div className="md:float-right flex gap-8 max-sm:gap-4">
				<button
					className="bg-blueShade poppins-semibold px-8 rounded-lg py-3 max-sm:px-4 max-sm:py-1.5 outline-none focus:outline-none"
					onClick={handleReset}
				>
					Reset
				</button>

				<button
					onClick={handleSubmit}
					disabled={loading}
					className="bg-blue text-white poppins-semibold px-8 rounded-lg py-3 max-sm:px-4 max-sm:py-1.5 outline-none focus:outline-none"
				>
					Submit
				</button>
			</div>
		</form>
	);
}
