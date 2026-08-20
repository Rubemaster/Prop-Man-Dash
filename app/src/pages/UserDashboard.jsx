import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";
import DataTable from "../components/DataTable";
import { TABLE_COLUMNS, SAMPLE_ROW } from "../tableColumns";

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
			<Navbar variant="customer" />
			<br />
			<StatusCards total={propertyCount} delivered={inspectionCount} />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<DataTable columns={TABLE_COLUMNS} rows={[SAMPLE_ROW]} />
					</div>
				</div>
			</div>
			<br />
			<div className="row">
				<div className="col-md">
					<a href="https://rooftraq.com" target="_blank" rel="noopener noreferrer" className="learn-more-card">
						<span className="learn-more-card-heading">Learn More About Rooftraq</span>
					</a>
				</div>
			</div>
			<br />
		</>
	);
}
