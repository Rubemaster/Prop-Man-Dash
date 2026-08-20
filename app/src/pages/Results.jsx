import Navbar from "../components/Navbar";
import SectionTabs from "../components/SectionTabs";
import Footer from "../components/Footer";

export default function Results() {
	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<Navbar variant="customer" />
				<SectionTabs />
				<br />
				<div className="row">
					<div className="col-md">
						<iframe
							src="/extplorer/index.html"
							title="Results file explorer"
							style={{ width: "100%", height: "600px", border: "none", display: "block" }}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
