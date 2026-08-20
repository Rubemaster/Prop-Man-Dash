import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import SupportChat from "./SupportChat";

export default function Navbar({ variant }) {
	return (
		<nav className="navbar navbar-dark dark">
			<img className="mr-4" src="/img/navbar-logo.png" height="37" alt="Logo" />
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/user">Home</Link>
				</li>
			</ul>
			<div className="ml-auto">
				<UserButton afterSignOutUrl="/" />
			</div>
			<SupportChat />
		</nav>
	);
}
