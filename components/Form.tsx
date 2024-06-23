"use client";

import {
	Email,
	Input,
	InputImage,
	TextArea,
} from "@/components/CustomInputElements";
import { useProfileForm } from "@/utils/hooks/useProfileForm";

/**
 * Form Component - with real time validation
 *
 * This component renders a user profile form. It uses the `useProfileForm` hook
 * to handle form state, validation, submission, and reset actions.
 */
export default function Form() {
	const { handleSubmit, onSubmit, onReset, loading } = useProfileForm();

	return (
		<form
			className="md:w-[80%] w-[90%] mt-20 mx-auto space-y-10 max-md:space-y-6"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* Form Title */}
			<div className="poppins-semibold text-4xl">My Profile</div>

			{/* takes Profile Image input  */}
			<InputImage />

			{/* Takes Name inputs - allowing only letters  */}
			<div className="md:flex md:gap-10 max-md:space-y-8">
				<Input
					id="firstName"
					label="First Name"
					pattern={/^[a-zA-Z]+$/}
				/>
				<Input
					id="lastName"
					label="Last Name"
					pattern={/^[a-zA-Z]+$/}
				/>
			</div>

			{/* Custom Email Input - with validation */}
			<Email
				id="email"
				label="Email"
				pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
			/>

			{/* Takes address as input */}
			<TextArea id="address" label="Address" />

			<div className="md:float-right flex gap-8 max-sm:gap-4">
                
				{/* Resets the values and the profile image */}
				<button
					className="bg-blueShade poppins-semibold px-8 rounded-lg py-3 max-sm:px-4 max-sm:py-1.5 outline-none focus:outline-none"
					onClick={onReset}
					type="button"
				>
					Reset
				</button>

				{/* Sumbits the profile info to /api/profile */}
				<button
					type="submit"
					disabled={loading}
					className="bg-blue text-white poppins-semibold px-8 rounded-lg py-3 max-sm:px-4 max-sm:py-1.5 outline-none focus:outline-none"
				>
					{loading ? "submitting ..." : "sumbit"}
				</button>
			</div>
		</form>
	);
}
