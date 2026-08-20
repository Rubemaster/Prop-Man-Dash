import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import { PROPERTY_COLUMNS } from "../propertyColumns";

const FILLOUT_SCRIPT_SRC = "https://server.fillout.com/embed/v1/";
const INSPECTION_FORM_ID = "tSESngGoRKus";

function mapSubmission(sub) {
	const byId = Object.fromEntries((sub.questions || []).map((q) => [q.id, q.value]));
	const addr = byId["x8sa"] || {};
	return {
		submissionId: sub.submissionId,
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

// Fillout's embed script only scans the DOM for popup triggers once,
// synchronously, when it loads -- there's no re-scan and no MutationObserver
// (confirmed by reading the script directly). That works for the single,
// always-present "Add Property" button, but per-row inspection buttons are
// created dynamically by Handsontable long after the script has already run.
// So instead we build a fresh hidden trigger with the right data-* params,
// force the script to re-execute (which wires up *this* trigger's onclick),
// then click it programmatically -- reusing Fillout's real popup logic
// rather than reimplementing it.
function openInspectionPopup(propertyId, clerkUserId) {
	document.getElementById("inspection-fillout-trigger")?.remove();

	const trigger = document.createElement("button");
	trigger.id = "inspection-fillout-trigger";
	trigger.type = "button";
	trigger.style.display = "none";
	trigger.setAttribute("data-fillout-id", INSPECTION_FORM_ID);
	trigger.setAttribute("data-fillout-embed-type", "popup");
	trigger.setAttribute("data-fillout-dynamic-resize", "");
	trigger.setAttribute("data-fillout-inherit-parameters", "");
	trigger.setAttribute("data-fillout-popup-size", "medium");
	trigger.setAttribute("data-propertyid", propertyId ?? "");
	trigger.setAttribute("data-clerkuserid", clerkUserId ?? "");
	document.body.appendChild(trigger);

	document.querySelectorAll(`script[src="${FILLOUT_SCRIPT_SRC}"]`).forEach((s) => s.remove());
	const script = document.createElement("script");
	script.src = FILLOUT_SCRIPT_SRC;
	script.onload = () => trigger.click();
	document.body.appendChild(script);
}

export default function Properties() {
	const { user } = useUser();
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
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
			const res = await fetch(`/api/property-entries?t=${Date.now()}`, { cache: "no-store" });
			const data = await res.json();
			const mapped = (data.responses || []).map(mapSubmission);
			console.warn(
				`[properties-debug] ${new Date().toISOString()} fetched ${mapped.length} rows:`,
				mapped.map((r) => `${r.submissionId} (${r.address})`)
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

	const requestInspection = (rowIndex, rowData) => {
		openInspectionPopup(rowData.submissionId, user?.id);
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
							actionLabel="New Inspection"
							onAction={requestInspection}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
