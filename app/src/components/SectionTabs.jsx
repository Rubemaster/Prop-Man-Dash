import { useNavigate } from "react-router-dom";

const TABS = [
	{ label: "Properties", path: "/properties" },
	{ label: "Inspections Pending", path: "/inspections-pending" },
	{ label: "Results", path: "/results" },
];

export default function SectionTabs() {
	const navigate = useNavigate();

	return (
		<div>
			{TABS.map((tab) => (
				<button key={tab.path} type="button" onClick={() => navigate(tab.path)}>
					{tab.label}
				</button>
			))}
		</div>
	);
}
