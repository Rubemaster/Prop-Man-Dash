import Navbar from "../components/Navbar";

export default function Results() {
	return (
		<>
			<Navbar variant="customer" />
			<br />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<iframe
							src="/extplorer/index.html"
							title="Results file explorer"
							style={{ width: "100%", height: "600px", border: "none" }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
