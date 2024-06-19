import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { CiCamera } from "react-icons/ci";

interface IInputImage {
	value: File | null;
	handleChange: (value: File) => void;
}

export default function InputImage({ value, handleChange }: IInputImage) {
	const ref = useRef<HTMLInputElement>(null);

	return (
		<div className="">
			<input
				type="file"
				accept=".jpg"
				ref={ref}
				hidden
				// value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					if (!e.target.files || !e.target.files[0]) return;
					handleChange(e.target.files[0]);
				}}
			/>
			<div className="flex gap-4">
				<button
					className="bg-blueShade px-4 py-2 poppins-medium flex items-center gap-2 rounded-lg text-[0.95rem] w-[300px] focus:outline-none"
					onClick={() => {
						if (!ref) return;
						ref.current?.click();
					}}
				>
					<CiCamera />
					{value != null
						? value.name.split(".")[0]
						: "Add a profile photo"}
				</button>
			</div>
		</div>
	);
}
