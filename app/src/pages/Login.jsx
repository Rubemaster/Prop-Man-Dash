import { SignIn } from "@clerk/clerk-react";
import { clerkAppearance } from "../clerkAppearance";
import "../auth.css";

export default function Login() {
	return (
		<div className="auth-wrapper">
			<img className="auth-bg-image" src="/img/login-bg.jpg" alt="" />
			<SignIn afterSignInUrl="/user" signUpUrl="/register" appearance={clerkAppearance} />
		</div>
	);
}
