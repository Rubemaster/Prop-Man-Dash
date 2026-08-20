import { Link, useLocation } from "react-router-dom";

const TABS = [
	{ label: "Properties", path: "/properties" },
	{ label: "Inspections Pending", path: "/inspections-pending" },
	{ label: "Results", path: "/results" },
];

export default function SectionTabs() {
	const { pathname } = useLocation();

	return (
		<div style={{ display: "flex", gap: "4px", padding: "8px 16px 0" }}>
			{TABS.map((tab) => {
				const active = pathname === tab.path;
				return (
					<Link
						key={tab.path}
						to={tab.path}
						style={{
							padding: "8px 16px",
							textDecoration: "none",
							color: active ? "#ffffff" : "#000000",
							backgroundColor: active ? "#6b7280" : "#ffffff",
							border: "1px solid #000000",
							fontWeight: active ? "bold" : "normal",
						}}
					>
						{tab.label}
					</Link>
				);
			})}
		</div>
	);
}
