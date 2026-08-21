import { handlePropertyEntries } from "./propertyEntries.js";
import { handleInspectionEntries } from "./inspectionEntries.js";
import { handleFillout, handleInspection } from "./fillout.js";
import { handleStreamToken } from "./streamToken.js";

// This worker now lives on its own origin (dashboard-api.rooftraq.com),
// separate from the frontend's origin -- every response needs explicit CORS
// headers, and Access-Control-Allow-Credentials is required (not just
// Allow-Origin: *) because Clerk's session is carried via a cookie that must
// cross the origin boundary on each request.
function withCors(response, env) {
	const headers = new Headers(response.headers);
	headers.set("Access-Control-Allow-Origin", env.ALLOWED_ORIGIN);
	headers.set("Access-Control-Allow-Credentials", "true");
	headers.set("Vary", "Origin");
	return new Response(response.body, { status: response.status, headers });
}

function corsPreflight(env) {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "86400",
			Vary: "Origin",
		},
	});
}

const ROUTES = {
	"GET /api/property-entries": handlePropertyEntries,
	"POST /api/fillout": handleFillout,
	"GET /api/inspection-entries": handleInspectionEntries,
	"POST /api/inspection": handleInspection,
	"GET /api/stream-token": handleStreamToken,
};

export default {
	async fetch(request, env) {
		if (request.method === "OPTIONS") return corsPreflight(env);

		const { pathname } = new URL(request.url);
		const handler = ROUTES[`${request.method} ${pathname}`];
		if (!handler) return new Response("Not found", { status: 404 });

		const response = await handler(request, env);
		return withCors(response, env);
	},
};
