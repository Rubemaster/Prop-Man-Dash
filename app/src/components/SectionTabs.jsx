import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
	{ label: "Properties", path: "/properties" },
	{ label: "Inspections Pending", path: "/inspections-pending" },
	{ label: "Results", path: "/results" },
];

export default function SectionTabs() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div style={{ display: "flex", gap: "4px", padding: "8px 16px 0" }}>
			{TABS.map((tab) => {
				const active = pathname === tab.path;
				return (
					<button
						key={tab.path}
						type="button"
						disabled={active}
						onClick={() => navigate(tab.path)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
