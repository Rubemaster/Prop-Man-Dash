import Navbar from "../components/Navbar";

export default function Results() {
	return (
		<>
			<Navbar variant="customer" />
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
