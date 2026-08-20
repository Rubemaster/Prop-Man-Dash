import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Properties from "./pages/Properties";
import InspectionsPending from "./pages/InspectionsPending";
import Results from "./pages/Results";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route path="/user" element={<Protected><UserDashboard /></Protected>} />
			<Route path="/properties" element={<Protected><Properties /></Protected>} />
			<Route path="/inspections-pending" element={<Protected><InspectionsPending /></Protected>} />
			<Route path="/results" element={<Protected><Results /></Protected>} />

			<Route path="*" element={<Navigate to="/user" replace />} />
		</Routes>
	);
}
