import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar({ variant }) {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark dark">
			<img className="mr-4" src="/img/logoCRM.png" width="41" height="37" alt="CRM logo" />
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="ml-auto">
				<UserButton afterSignOutUrl="/" />
			</div>
		</nav>
	);
}
