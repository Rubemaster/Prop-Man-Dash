import { SignIn } from "@clerk/clerk-react";
import { clerkAppearance } from "../clerkAppearance";
import "../auth.css";

export default function Login() {
	return (
		<div className="auth-wrapper">
			<SignIn afterSignInUrl="/user" signUpUrl="/register" appearance={clerkAppearance} />
		</div>
	);
}
