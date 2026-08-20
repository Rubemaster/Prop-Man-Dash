import { createClerkClient } from "@clerk/backend";
import { getPropertySubmissionIds } from "../_shared/clerk.js";

const FILLOUT_FORM_ID = "3PFLPZSWoFus";
const NO_STORE_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };

export async function onRequestGet({ request, env }) {
	const clerkClient = createClerkClient({
		secretKey: env.CLERK_SECRET_KEY,
		publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	});
	const { isAuthenticated, toAuth } = await clerkClient.authenticateRequest(request, {
		authorizedParties: [new URL(request.url).origin],
	});

	if (!isAuthenticated) {
		return new Response(JSON.stringify({ error: "unauthenticated" }), {
			status: 401,
			headers: NO_STORE_HEADERS,
		});
	}

	const { userId } = toAuth();
	const ownedIds = await getPropertySubmissionIds(userId, env.CLERK_SECRET_KEY);

	if (ownedIds.length === 0) {
		return new Response(JSON.stringify({ responses: [] }), { headers: NO_STORE_HEADERS });
	}

	const upstream = await fetch(
		`https://api.fillout.com/v1/api/forms/${FILLOUT_FORM_ID}/submissions`,
		{ headers: { Authorization: `Bearer ${env.FILLOUT_API}` }, cache: "no-store" }
	);
	const data = await upstream.json();
	const responses = (data.responses || []).filter((sub) => ownedIds.includes(sub.submissionId));

	return new Response(JSON.stringify({ responses }), { headers: NO_STORE_HEADERS });
}
