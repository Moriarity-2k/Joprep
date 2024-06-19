import Image from "next/image";

export default function Navbar({ file }: { file: File | null }) {
	console.log({ file });

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
				<Image
					src={`${
						file != null
							? URL.createObjectURL(file)
							: "/default.png"
					}`}
					width={40}
					height={40}
					className="rounded-full"
					alt="profile"
				/>
			</div>
		</div>
	);
}
