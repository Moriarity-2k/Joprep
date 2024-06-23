"use client";

import { useProfileForm } from "@/utils/hooks/useProfileForm";
import Image from "next/image";

/**
 *
 * renders static navbar , with profile Image
 */
export default function Navbar() {
	const { profileImage } = useProfileForm();

	return (
		<div className="px-10 py-4 flex items-center justify-between shadow-sm shadow-[#38383842]">
			<div className="font-semibold text-2xl">Acme Co</div>

			<div className="flex items-center gap-8 max-md:gap-3 font-light poppins-regular max-sm:hidden">
				<div>Home</div>
				<div>Book</div>
				<div>Guests</div>
				<div>Events</div>
				<div>Services</div>
				<div>Support</div>

				{/* renders profile Image */}
				<Image
					src={profileImage ? `${profileImage}` : "/default.png"}
					width={30}
					height={20}
					className="rounded-full bg-cover cursor-pointer"
					alt="profile"
					style={{
						width: "auto",
						height: "auto",
					}}
				/>
			</div>
		</div>
	);
}
