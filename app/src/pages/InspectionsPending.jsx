import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import SectionTabs from "../components/SectionTabs";
import DataTable from "../components/DataTable";
import Footer from "../components/Footer";
import { INSPECTION_COLUMNS } from "../inspectionColumns";

export default function InspectionsPending() {
	const { user } = useUser();
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);

	const refresh = async () => {
		setLoading(true);
		try {
			const bust = Date.now();
			const [inspectionsRes, propertiesRes] = await Promise.all([
				fetch(`/api/inspection-entries?t=${bust}`, { cache: "no-store" }),
				fetch(`/api/property-entries?t=${bust}`, { cache: "no-store" }),
			]);
			const { inspections = [] } = await inspectionsRes.json();
			const { properties = [] } = await propertiesRes.json();

			const propertyById = Object.fromEntries(properties.map((p) => [p.submissionId, p]));

			const mapped = inspections.map((insp) => {
				const property = propertyById[insp.propertyId];
				return {
					submissionId: insp.submissionId,
					propertyAddress: property?.address || insp.propertyId,
					city: property?.city || "",
					zip: property?.zip || "",
					state: property?.state || "",
					status: "Pending",
					notes: insp.notes,
				};
			});

			console.warn(
				`[inspections-debug] ${new Date().toISOString()} fetched ${mapped.length} rows:`,
				mapped.map((r) => `${r.submissionId} (${r.propertyAddress})`)
			);
			setRows(mapped);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!user?.id) return;
		refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<Navbar variant="customer" />
				<SectionTabs />
				<br />
				<div className="row">
					<div className="col-md">
						<div className="extplorer-panel">
							<DataTable columns={INSPECTION_COLUMNS} rows={rows} />
							<div className="extplorer-panel-footer">
								<button
									type="button"
									style={{ all: "revert" }}
									onClick={refresh}
									disabled={loading}
								>
									{loading ? "Refreshing..." : "Refresh"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
