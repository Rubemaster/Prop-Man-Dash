import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import { INSPECTION_COLUMNS } from "../inspectionColumns";

const TIME_QUESTION_IDS = ["8wjq", "5pCM", "gujV", "aS23", "dWvi"];

function mapSubmission(sub) {
	const byId = Object.fromEntries((sub.questions || []).map((q) => [q.id, q.value]));
	const propertyId =
		(sub.urlParameters || []).find((p) => p.name === "propertyid" || p.id === "propertyid")
			?.value || "";
	const preferredTime = TIME_QUESTION_IDS.map((id) => byId[id]).find(Boolean) || "";

	return {
		submissionId: sub.submissionId,
		propertyId,
		preferredTime,
		deliverables: byId["gXsW"] || "",
		accessNotes: byId["titU"] || "",
		otherNotes: byId["utd8"] || "",
	};
}

export default function InspectionsPending() {
	const { user } = useUser();
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);

	const refresh = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/inspection-entries");
			const data = await res.json();
			setRows((data.responses || []).map(mapSubmission));
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
