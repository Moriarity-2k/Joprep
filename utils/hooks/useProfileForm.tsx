"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormTrigger,
	useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { ImageUploader } from "../supabase/SupabaseImageUpload";
import axios from "axios";

/**
 * Function to submit the profile data to the server.
 * @param data - of type JsonBody as defined in the Mongo model user
 */
async function submitProfile(data: IJsonBody) {
	try {
		const res = await axios.post(`/api/profile`, data, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		toast.success(
			<div className="font-bold font-mono">submission sucessfull</div>
		);
	} catch (err) {
		toast.error(
			<div className="font-bold font-mono">Please Try again !!!</div>
		);
	}
}

/**
 *
 * Fetches the profile and sets the profileImage state with fetched url
 *
 * @route : api/profile
 * @returns Default profile values
 */
async function fetchProfile(setProfileImage: any) {
	let defaultVal: IJsonBody = {
		firstName: "",
		lastName: "",
		address: "",
		email: "",
	};
	try {
		const profileDetails = await axios.get("/api/profile");

		if (profileDetails.data.user.image) {
			setProfileImage(profileDetails.data.user.image);
		}

		if (profileDetails) {
			defaultVal = { ...profileDetails.data.user };
		}
		return defaultVal;
	} catch (err) {
		console.log(err);
		return defaultVal;
	}
}

/**
 * Interface for form context
 */
export interface IFormContext {
	register: UseFormRegister<IFormInputs>;
	handleSubmit: UseFormHandleSubmit<IFormInputs, undefined>;
	onSubmit: (data: IFormInputs) => void;
	onReset: () => void;
	errors: FieldErrors<IFormInputs>;
	loading: boolean;
	profileImage: string | null;
	defautValues: IJsonBody | null;
}

/**
 * Interface for form inputs
 */
export interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	image?: FileList;
}

/**
 * interface for req body
 */
export interface IJsonBody {
	firstName?: string;
	lastName?: string;
	email?: string;
	address?: string;
	image?: string;
}

const FormContext = createContext<IFormContext | null>(null);

/**
 * ProfileFormProvider Component
 *
 * This component provides context for the profile form, handling form state,
 * validation, submission, and reset actions.
 */
export default function ProfileFormProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInputs>({
		mode: "onChange",
	});

	const [defautValues, setDefaultValues] = useState<IJsonBody | null>(null);

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		setLoading(true);

		const jsonBody: IJsonBody = { ...data, image: "" };
		if (data.image && data.image[0]) {
			const imageUrl = await ImageUploader(data.image[0]);
			if (imageUrl) {
				jsonBody.image = imageUrl;
				setProfileImage(imageUrl);
			}
		}

		await submitProfile(jsonBody);
		setLoading(false);
	};

	/**
	 * fetches the previously sumbitted profile values
	 */
	useEffect(() => {
		async function fetchDetails() {
			const profileDetails = await fetchProfile(setProfileImage);
			setDefaultValues(profileDetails);
		}
		fetchDetails();
	}, []);

	/**
	 * resets the form values and sets the profile image to null
	 */
	const onReset = () => {
		reset();
		setProfileImage(null);
		setDefaultValues(null);
		toast.success(
			<div className="font-bold font-mono">Reset sucessfull</div>
		);
	};

	return (
		<FormContext.Provider
			value={{
				errors,
				onReset,
				register,
				handleSubmit,
				onSubmit,
				loading,
				profileImage,
				defautValues,
			}}
		>
			{children}
		</FormContext.Provider>
	);
}

/**
 *  consumes the context
 * @returns context values
 */
export const useProfileForm = () => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error(
			"useProfileForm must be used within a ProfileFormProvider"
		);
	}

	return context;
};
