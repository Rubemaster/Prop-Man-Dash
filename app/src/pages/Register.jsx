import { useEffect } from "react";
import { SignUp } from "@clerk/clerk-react";
import { clerkAppearance } from "../clerkAppearance";
import "../auth.css";

export default function Register() {
	useEffect(() => {
		if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) return;
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		document.body.appendChild(script);
	}, []);

	return (
		<div className="auth-wrapper">
			<img className="auth-bg-image" src="/img/login-bg.jpg" alt="" />
			<div className="auth-topbar" />
			<div className="auth-content">
				<div className="auth-register-row">
					<SignUp afterSignUpUrl="/user" signInUrl="/" appearance={clerkAppearance} />
					<div className="calendly-card">
						<div
							className="calendly-inline-widget"
							data-url="https://calendly.com/rubengrick2/demo-call?hide_gdpr_banner=1"
							style={{ width: "100%", height: 500 }}
						/>
					</div>
				</div>
			</div>
			<div className="auth-bottombar" />
		</div>
	);
}
