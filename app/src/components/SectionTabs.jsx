import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
	{ label: "Properties", path: "/properties" },
	{ label: "Inspections Pending", path: "/inspections-pending" },
	{ label: "Results", path: "/results" },
	{ label: "Projects", path: "/projects" },
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
							style={{
								all: "revert",
								WebkitAppearance: "none",
								appearance: "none",
								borderTop: "1px solid #000",
								borderRight: "1px solid #000",
								borderBottom: "none",
								borderLeft: "none",
								marginBottom: "-2px",
								paddingRight: "2px",
								backgroundColor: active ? "#d6ecff" : undefined,
							}}
						>
							{tab.label}
						</button>
					);
				})}
			</div>
			<div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", borderBottom: "1px solid #000" }} />
		</div>
	);
}
