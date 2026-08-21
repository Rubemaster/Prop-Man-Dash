import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";

// A lazy chunk's hashed filename stops existing the moment a new deploy
// replaces it -- if a user has this page open across a deploy (or their
// browser cached a stale index.html momentarily), the fetch for that old
// chunk 404s, Cloudflare's SPA fallback serves index.html for it instead of
// a real 404, and the browser rejects it with a MIME-type error since
// text/html isn't a valid module script. Reloading once picks up the
// current index.html and current chunk hashes instead of erroring forever.
function lazyWithReload(factory) {
	return lazy(() =>
		factory().catch(() => {
			window.location.reload();
			return new Promise(() => {});
		})
	);
}

const Login = lazyWithReload(() => import("./pages/Login"));
const Register = lazyWithReload(() => import("./pages/Register"));
const UserDashboard = lazyWithReload(() => import("./pages/UserDashboard"));
const Properties = lazyWithReload(() => import("./pages/Properties"));
const InspectionsPending = lazyWithReload(() => import("./pages/InspectionsPending"));
const Results = lazyWithReload(() => import("./pages/Results"));
const Projects = lazyWithReload(() => import("./pages/Projects"));

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
