import axios from "axios";
import React, { useEffect, useState } from "react";

import { InputEmail, InputText, InputTextArea } from "./InputText";
import InputImage from "./InputImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { base_url } from "@/utils/defaults";

export default function Form({
	image,
	handleImage,
}: {
	image: string | null;
	handleImage: (file: File | null) => void;
}) {
	const router = useRouter();

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	const handleFirstName = (value: string) => setFirstName(value);
	const handleLastName = (value: string) => setLastName(value);
	const handleEmail = (value: string) => setEmail(value);
	const handleAddress = (value: string) => setAddress(value);

	const [loading, setLoading] = useState<boolean>(false);

	const [err, setErr] = useState<boolean>(false);

	useEffect(() => {
		async function getUser() {
			try {
				let localDetails;

				if (localStorage.getItem("JOPREP") != null)
					localDetails = JSON.parse(
						localStorage.getItem("JOPREP") || ""
					);
				if (!localDetails || localDetails === "") return;

				const id = localDetails._id;

				// const user = await axios.get(`${base_url}api/profile/${id}`, {
				const user = await axios.get(`/api/profile/${id}`, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				toast.success(
					<div className="font-mono font-bold">
						Details fetched successfully
					</div>
				);

				if (user.data.user.firstname) {
					handleFirstName(user.data.user.firstname);
				}
				if (user.data.user.lastname)
					handleLastName(user.data.user.lastname);
				if (user.data.user.address)
					handleAddress(user.data.user.address);
				if (user.data.user.picture) handleImage(user.data.user.picture);
				if (user.data.user.email) handleEmail(user.data.user.email);
			} catch (err) {
				console.log(err);
				toast.error(
					<div className="font-mono font-bold">
						Please try again later
					</div>
				);
			}
		}
		getUser();
	}, []);

	const handleSubmit = async () => {
		if (
			firstName === "" ||
			lastName === "" ||
			address === "" ||
			email === ""
		) {
			setErr(true);
			setTimeout(() => {
				setErr(false);
			}, 3000);

			return;
		}

		const data = new FormData();
		data.append("firstname", firstName);
		data.append("lastname", lastName);
		data.append("email", email);
		data.append("address", address);
		if (image) data.append("image", image);

		setLoading(true);
		try {
			// const res = await axios.post(`${base_url}api/profile`, data, {
			const res = await axios.post(`/api/profile`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success(
				<div className="font-bold font-mono">submission sucessfull</div>
			);

			localStorage.setItem("JOPREP", JSON.stringify(res.data.user));
		} catch (err) {
			console.log(err);
			toast.error(
				<div className="font-bold font-mono">Please Try again !!1</div>
			);
		} finally {
			setLoading(false);
		}
	};

	function handleReset() {
		const userConfirmed = window.confirm(
			"Are you sure you want to proceed?"
		);
		if (userConfirmed) {
			localStorage.removeItem("JOPREP");
			handleAddress("");
			handleFirstName("");
			handleLastName("");
			handleImage(null);
			handleEmail("");

			toast.success(
				<div className="font-bold font-mono">Reset successfull !!!</div>
			);
		}
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
					err={err}
				/>
				<InputText
					name="Last Name"
					type="text"
					value={lastName}
					handleChange={handleLastName}
					err={err}
				/>
			</div>

			<InputEmail
				name="Email"
				type="email"
				value={email}
				handleChange={handleEmail}
				err={err}
			/>

			<InputTextArea
				name="Address"
				type="textarea"
				value={address}
				handleChange={handleAddress}
				err={err}
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
