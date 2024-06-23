import Form from "@/components/Form";
import Navbar from "@/components/Navbar";
import ProfileFormProvider from "@/utils/hooks/useProfileForm";

export default function Home() {
	return (
        // Form Context Profider
		<ProfileFormProvider>
			<div className="bg-lightBlue text-black min-h-screen max-sm:pb-8">
				<Navbar />
				<Form />
			</div>
		</ProfileFormProvider>
	);
}
