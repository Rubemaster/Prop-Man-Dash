import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Properties = lazy(() => import("./pages/Properties"));
const InspectionsPending = lazy(() => import("./pages/InspectionsPending"));
const Results = lazy(() => import("./pages/Results"));
const Projects = lazy(() => import("./pages/Projects"));

export default function App() {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/user" element={<Protected><UserDashboard /></Protected>} />
				<Route path="/properties" element={<Protected><Properties /></Protected>} />
				<Route path="/inspections-pending" element={<Protected><InspectionsPending /></Protected>} />
				<Route path="/results" element={<Protected><Results /></Protected>} />
				<Route path="/projects" element={<Protected><Projects /></Protected>} />

				<Route path="*" element={<Navigate to="/user" replace />} />
			</Routes>
		</Suspense>
	);
}
