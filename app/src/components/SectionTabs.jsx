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
		<div>
			<div>
				{TABS.map((tab) => {
					const active = pathname === tab.path;
					return (
						<button
							key={tab.path}
							type="button"
							onClick={() => navigate(tab.path)}
							style={active ? { all: "revert", backgroundColor: "#d6ecff", borderBottom: "none", borderLeft: "none" } : { all: "revert", borderBottom: "none", borderLeft: "none" }}
						>
							{tab.label}
						</button>
					);
				})}
			</div>
			<div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", borderBottom: "2px solid #a6cbe8" }} />
		</div>
	);
}
