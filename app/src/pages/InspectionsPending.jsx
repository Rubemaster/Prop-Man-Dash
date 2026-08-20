import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import { INSPECTION_COLUMNS } from "../inspectionColumns";

const EMPTY_ADDRESS = { address: "", city: "", zip: "", state: "" };

function extractAddress(sub) {
	const addr = (sub.questions || []).find((q) => q.id === "x8sa")?.value;
	if (!addr || typeof addr !== "object") return EMPTY_ADDRESS;

	return {
		address: addr.address1 || addr.address || "",
		city: addr.city || "",
		zip: addr.zip || addr.zipCode || "",
		state: addr.state || "",
	};
}

function mapSubmission(sub, addressByPropertyId) {
	const propertyId =
		(sub.urlParameters || []).find((p) => p.name === "propertyid" || p.id === "propertyid")
			?.value?.trim() || "";
	const { address, city, zip, state } = addressByPropertyId[propertyId] || EMPTY_ADDRESS;

	return {
		submissionId: sub.submissionId,
		propertyAddress: address || propertyId,
		city,
		zip,
		state,
		status: "Pending",
		notes: "",
	};
}

export default function InspectionsPending() {
	const { user } = useUser();
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);

	const refresh = async () => {
		setLoading(true);
		try {
			const [inspectionsRes, propertiesRes] = await Promise.all([
				fetch("/api/inspection-entries", { cache: "no-store" }),
				fetch("/api/property-entries", { cache: "no-store" }),
			]);
			const inspections = await inspectionsRes.json();
			const properties = await propertiesRes.json();

			const addressByPropertyId = Object.fromEntries(
				(properties.responses || []).map((p) => [p.submissionId, extractAddress(p)])
			);

			setRows((inspections.responses || []).map((sub) => mapSubmission(sub, addressByPropertyId)));
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
			<Navbar variant="customer" />
			<br />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<button
							type="button"
							className="btn btn-secondary mb-3"
							style={{ width: "fit-content" }}
							onClick={refresh}
							disabled={loading}
						>
							{loading ? "Refreshing..." : "Refresh"}
						</button>
						<DataTable columns={INSPECTION_COLUMNS} rows={rows} />
					</div>
				</div>
			</div>
		</>
	);
}
