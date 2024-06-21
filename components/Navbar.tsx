import Image from "next/image";

export default function Navbar({ file }: { file: string | null }) {
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
					src={file ? `${file}` : "/default.png"}
					width={30}
					height={20}
					className="rounded-full bg-cover"
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
