// The backend now runs as a separate Cloudflare Worker on its own origin
// (dashboard-api.rooftraq.com, see /server-function's DEPLOY.md), not
// same-origin Pages Functions -- every call needs an absolute URL and
// credentials:"include" so Clerk's session cookie actually crosses the
// origin boundary (the browser won't send it otherwise).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function apiFetch(path, options = {}) {
	return fetch(`${API_BASE_URL}${path}`, { ...options, credentials: "include" });
}
