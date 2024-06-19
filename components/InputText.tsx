interface IInputText {
	name: string;
	type: string;
	value: string;
	handleChange: (value: string) => void;
}

export function InputText({ name, type, value, handleChange }: IInputText) {
	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={name}>{name}</label>
			<input
				type={type}
				value={value}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[300px] 
                md:w-[200px] max-sm:w-full w-full
                bg-inherit px-5 py-3 rounded-lg"
				onChange={(e) => {
					handleChange(e.target.value);
				}}
			/>
		</div>
	);
}

export function InputEmail({ name, type, value, handleChange }: IInputText) {
	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={name}>{name}</label>
			<input
				type={type}
				value={value}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[650px] 
                md:w-[450px] max-sm:w-full w-full
                bg-inherit px-5 py-3 rounded-lg"
				onChange={(e) => {
					handleChange(e.target.value);
				}}
			/>
		</div>
	);
}

export function InputTextArea({ name, type, value, handleChange }: IInputText) {
	return (
		<div className="flex flex-col gap-2 poppins-regular">
			<label htmlFor={name}>{name}</label>
			<textarea
				// type={type}
				value={value}
				className="border-2 border-blueShade outline-none focus:outline-none ring-0 focus:ring-0 lg:w-[650px] 
                md:w-[450px] max-sm:w-full w-full
                bg-inherit px-5 py-3 rounded-lg max-md:text-sm"
				onChange={(e) => {
					handleChange(e.target.value);
				}}
				rows={4}
			/>
		</div>
	);
}
