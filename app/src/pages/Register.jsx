import { SignUp } from "@clerk/clerk-react";
import { clerkAppearance } from "../clerkAppearance";
import "../auth.css";

export default function Register() {
	return (
		<div className="auth-wrapper">
			<SignUp afterSignUpUrl="/user" signInUrl="/" appearance={clerkAppearance} />
		</div>
	);
}
