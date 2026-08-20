import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";
import Footer from "../components/Footer";

export default function UserDashboard() {
	const { user } = useUser();
	const [propertyCount, setPropertyCount] = useState(0);
	const [inspectionCount, setInspectionCount] = useState(0);

	useEffect(() => {
		if (!user?.id) return;
		const bust = Date.now();
		fetch(`/api/property-entries?t=${bust}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((data) => setPropertyCount((data.properties || []).length));
		fetch(`/api/inspection-entries?t=${bust}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((data) => setInspectionCount((data.inspections || []).length));
	}, [user?.id]);

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<Navbar variant="customer" />
				<br />
				<StatusCards total={propertyCount} delivered={inspectionCount} trailingCards={1} propertiesHeadingBlack={false} />
				<br />
				<StatusCards total={propertyCount} delivered={inspectionCount} hidePropertiesContent propertiesRepeat={4} showOtherCards={false} cardHeight={30} propertiesAsPlaceholder showLearnMoreCard />
				<br />
			</div>
			<Footer />
		</>
	);
}
