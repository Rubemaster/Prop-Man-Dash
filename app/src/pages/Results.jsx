import Navbar from "../components/Navbar";
import SectionTabs from "../components/SectionTabs";

export default function Results() {
	return (
		<>
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
		</>
	);
}
