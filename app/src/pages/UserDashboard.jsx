import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";
import BlankCards from "../components/BlankCards";
import Footer from "../components/Footer";

export default function UserDashboard() {
	const { user } = useUser();
	const [propertyCount, setPropertyCount] = useState(0);
	const [inspectionCount, setInspectionCount] = useState(0);

	useEffect(() => {
		if (!user?.id) return;
		const bust = Date.now();
		fetch(`/api/property-entries?t=${bust}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((data) => setPropertyCount((data.properties || []).length));
		fetch(`/api/inspection-entries?t=${bust}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((data) => setInspectionCount((data.inspections || []).length));
	}, [user?.id]);

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<Navbar variant="customer" />
				<br />
				<BlankCards />
				<br />
				<StatusCards total={propertyCount} delivered={inspectionCount} />
				<br />
				<div className="row">
					<div className="col">
						<div className="col-md">
							<a href="https://rooftraq.com" target="_blank" rel="noopener noreferrer" className="learn-more-card">
								<span className="learn-more-card-heading">Learn More About Rooftraq</span>
							</a>
						</div>
					</div>
					<div className="col">
						<div className="col-md">
							<div className="card" style={{ visibility: "hidden" }}>
								<div className="card-header"><h5 className="card-title">placeholder</h5></div>
								<div className="card-body"><h3 className="card-title">0</h3></div>
							</div>
						</div>
					</div>
					<div className="col">
						<div className="col-md">
							<div className="card" style={{ visibility: "hidden" }}>
								<div className="card-header"><h5 className="card-title">placeholder</h5></div>
								<div className="card-body"><h3 className="card-title">0</h3></div>
							</div>
						</div>
					</div>
				</div>
				<br />
			</div>
			<Footer />
		</>
	);
}
