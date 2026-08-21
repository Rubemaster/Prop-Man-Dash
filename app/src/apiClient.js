// The backend runs as a separate Cloudflare Worker on its own origin
// (dashboard-api.rooftraq.com, see /server-function's DEPLOY.md). Clerk's
// session isn't carried via a cookie on OUR domain at all -- it's mediated
// through Clerk's own Frontend API domain (clerk.user.rooftraq.com) --
// so credentials:"include" cross-origin never worked here regardless of
// CORS setup. Instead, callers pass a fresh token from Clerk's getToken()
// (useAuth()), sent as a Bearer header, which authenticateRequest on the
// worker side reads directly.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function apiFetch(path, options = {}, token) {
	const headers = { ...options.headers };
	if (token) headers.Authorization = `Bearer ${token}`;
	return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}
