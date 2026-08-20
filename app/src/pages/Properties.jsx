import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import { PROPERTY_COLUMNS, PROPERTY_SAMPLE_ROW } from "../propertyColumns";

const FILLOUT_SCRIPT_SRC = "https://server.fillout.com/embed/v1/";

function mapSubmission(sub) {
	const byId = Object.fromEntries((sub.questions || []).map((q) => [q.id, q.value]));
	const addr = byId["x8sa"] || {};
	return {
		address: typeof addr === "object" ? addr.address1 || addr.address || "" : addr || "",
		city: typeof addr === "object" ? addr.city || "" : "",
		zip: typeof addr === "object" ? addr.zip || addr.zipCode || "" : "",
		state: typeof addr === "object" ? addr.state || "" : "",
		roofCondition: byId["oLS5"] || "",
		roofType: byId["5tsX"] || "",
		houseAge: byId["bH4K"] || "",
		notes: byId["4dJT"] || "",
	};
}

export default function Properties() {
	const { user } = useUser();
	const [rows, setRows] = useState([PROPERTY_SAMPLE_ROW]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Fillout's embed script bakes the popup iframe's src (including all
		// data-* params) once, synchronously, the moment it loads -- there's no
		// re-scan and no MutationObserver. So we can't load it until the button
		// below actually has the real data-clerkuserid value in the DOM, and we
		// must re-inject a fresh <script> (not skip if one exists) on every
		// mount so revisits to this page get scanned again too.
		if (!user?.id) return;
		document.querySelectorAll(`script[src="${FILLOUT_SCRIPT_SRC}"]`).forEach((s) => s.remove());
		const script = document.createElement("script");
		script.src = FILLOUT_SCRIPT_SRC;
		document.body.appendChild(script);
		return () => script.remove();
	}, [user?.id]);

	const refresh = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/property-entries");
			const data = await res.json();
			const mapped = (data.responses || []).map(mapSubmission);
			setRows(mapped.length ? mapped : [PROPERTY_SAMPLE_ROW]);
		} finally {
			setLoading(false);
		}
	};

	const requestInspection = (rowIndex) => {
		setRows((prev) =>
			prev.map((row, i) => (i === rowIndex ? { ...row, __actionDone: true } : row))
		);
	};

	return (
		<>
			<Navbar variant="customer" />
			<br />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<div className="mb-3" style={{ display: "flex", gap: "8px" }}>
							<button
								type="button"
								className="btn btn-secondary"
								onClick={refresh}
								disabled={loading}
							>
								{loading ? "Refreshing..." : "Refresh"}
							</button>
							{user?.id && (
								<button
									type="button"
									data-fillout-id="3PFLPZSWoFus"
									data-fillout-embed-type="popup"
									data-fillout-dynamic-resize
									data-fillout-inherit-parameters
									data-fillout-popup-size="medium"
									data-clerkuserid={user.id}
									className="btn btn-primary"
								>
									Add Property
								</button>
							)}
						</div>
						<DataTable
							columns={PROPERTY_COLUMNS}
							rows={rows}
							actionLabel="Request Inspection"
							actionDoneLabel="New Inspection"
							onAction={requestInspection}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
