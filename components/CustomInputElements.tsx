import { useProfileForm } from "@/utils/hooks/useProfileForm";

import { IFormInputs } from "@/utils/hooks/useProfileForm";
import { CiCamera } from "react-icons/ci";

/**
 * id : a key of form inputs
 * label : custom input label
 * pattern : for validation
 */
interface IInput {
	id: keyof IFormInputs;
	label: string;
	pattern?: RegExp;
}
export function Input({ id, label, pattern }: IInput) {
	const { register, errors, defautValues } = useProfileForm();

	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={id}>{label}</label>
			<input
				{...register(id, {
					pattern,
				})}
				type="text"
				id={id}
				defaultValue={defautValues ? defautValues[id] : ""}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[300px] 
                        md:w-[200px] max-sm:w-full w-full
                        bg-inherit px-5 py-3 rounded-lg"
			/>
			{errors[id] && (
				<div className="text-[0.8rem] text-red-800">
					{label} should only contain letters.
				</div>
			)}
		</div>
	);
}

/**
 * id : a key of form inputs
 * label : custom input label
 * pattern : for validation
 */
export function Email({ id, label, pattern }: IInput) {
	const { register, errors, defautValues } = useProfileForm();

	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={id}>{label}</label>
			<input
				{...register(id, {
					pattern,
				})}
				type="text"
				id={id}
				defaultValue={defautValues ? defautValues[id] : ""}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[650px] 
                        md:w-[450px] max-sm:w-full w-full
                        bg-inherit px-5 py-3 rounded-lg"
			/>
			{errors[id] && (
				<div className="text-[0.8rem] text-red-800">
					Please provide a valid email
				</div>
			)}
		</div>
	);
}

/**
 *
 * @returns custom button which takes Image as input
 */
export function InputImage() {
	const { register } = useProfileForm();

	return (
		<div className="relative">
			<input
				type="file"
				accept="image/*"
				// hidden
				className="absolute z-10 opacity-0 cursor-pointer"
				{...register("image")}
			/>
			<div className="flex gap-4">
				<button
					className="bg-blueShade px-4 py-2 poppins-medium flex items-center gap-2 rounded-lg text-[0.95rem] w-[300px] focus:outline-none"
					type="button"
				>
					<CiCamera />
					Image
				</button>
			</div>
		</div>
	);
}

/**
 * id : a key of form inputs
 * label : custom input label
 */
export function TextArea({ id, label }: IInput) {
	const { register, defautValues } = useProfileForm();

	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={id}>{label}</label>
			<textarea
				{...register(id)}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[650px] 
                md:w-[450px] max-sm:w-full w-full
                bg-inherit px-5 py-3 rounded-lg max-md:text-sm"
				rows={4}
				defaultValue={defautValues ? defautValues[id] : ""}
			/>
			{/* {errors[id] && (
				<div className="font-sm text-red-600"></div>
			)} */}
		</div>
	);
}
