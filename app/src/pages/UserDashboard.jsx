import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";
import Footer from "../components/Footer";
import MobileNotice from "../components/MobileNotice";
import { apiFetch } from "../apiClient";

export default function UserDashboard() {
	const { user } = useUser();
	const { getToken } = useAuth();
	const [propertyCount, setPropertyCount] = useState(0);
	const [inspectionCount, setInspectionCount] = useState(0);

	useEffect(() => {
		if (!user?.id) return;
		const bust = Date.now();
		getToken().then((token) => {
			apiFetch(`/api/property-entries?t=${bust}`, { cache: "no-store" }, token)
				.then((res) => res.json())
				.then((data) => setPropertyCount((data.properties || []).length));
			apiFetch(`/api/inspection-entries?t=${bust}`, { cache: "no-store" }, token)
				.then((res) => res.json())
				.then((data) => setInspectionCount((data.inspections || []).length));
		});
	}, [user?.id]);

	return (
		<>
			<div style={{ minHeight: "100vh" }}>
				<Navbar variant="customer" />
				<MobileNotice />
				<br />
				<StatusCards total={propertyCount} delivered={inspectionCount} showProjectsCard propertiesHeadingBlack={false} />
				<br />
				<StatusCards total={propertyCount} delivered={inspectionCount} hidePropertiesContent propertiesRepeat={4} showOtherCards={false} cardHeight={30} propertiesAsPlaceholder firstPlaceholderHeight={500} firstPlaceholderImage="/img/learn-more-bg.png" />
				<br />
			</div>
			<Footer />
		</>
	);
}
