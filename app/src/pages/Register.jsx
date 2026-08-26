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
			<div className="auth-topbar" />
			<div className="auth-content">
				<div className="auth-register-row">
					<SignUp afterSignUpUrl="/user" signInUrl="/" appearance={clerkAppearance} />
					<div
						className="calendly-inline-widget"
						data-url="https://calendly.com/rubengrick2/demo-call?hide_event_type_details=1&hide_gdpr_banner=1"
						style={{ minWidth: 320, height: 700 }}
					/>
				</div>
			</div>
		</div>
	);
}
