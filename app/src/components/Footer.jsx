import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="site-footer-col">
				<div>info@rooftraq.com</div>
				<div>(447) 410-0965</div>
			</div>
			<div className="site-footer-col">
				<h3 className="site-footer-heading">Company</h3>
				<Link className="site-footer-link" to="/user">Home</Link>
				<Link className="site-footer-link" to="/properties">Properties</Link>
				<Link className="site-footer-link" to="/inspections-pending">Inspections Pending</Link>
				<Link className="site-footer-link" to="/results">Results</Link>
				<a className="site-footer-link" href="https://rooftraq.com" target="_blank" rel="noopener noreferrer">
					Learn More About Rooftraq
				</a>
			</div>
			<div className="site-footer-col">
				<h3 className="site-footer-heading">Resources</h3>
				<a
					className="site-footer-link"
					href="https://docs.google.com/document/d/1SX6-_OXrqwPl7_szUQNZq8S8KA0IZ1dNibqahbz5yCc/edit?usp=sharing"
					target="_blank"
					rel="noopener noreferrer"
				>
					Privacy Policy
				</a>
			</div>
			<div className="site-footer-copyright">Copyright 2026</div>
		</footer>
	);
}
