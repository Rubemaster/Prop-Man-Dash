import { createClerkClient } from "@clerk/backend";
import { getInspectionSubmissionIds } from "../_shared/clerk.js";

const FILLOUT_FORM_ID = "tSESngGoRKus";

// Mirrors functions/api/property-entries.js but for inspection requests.
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
			headers: { "Content-Type": "application/json" },
		});
	}

	const { userId } = toAuth();
	const ownedIds = await getInspectionSubmissionIds(userId, env.CLERK_SECRET_KEY);

	if (ownedIds.length === 0) {
		return new Response(JSON.stringify({ responses: [] }), {
			headers: { "Content-Type": "application/json" },
		});
	}

	const upstream = await fetch(
		`https://api.fillout.com/v1/api/forms/${FILLOUT_FORM_ID}/submissions`,
		{ headers: { Authorization: `Bearer ${env.FILLOUT_API}` } }
	);
	const data = await upstream.json();
	const responses = (data.responses || []).filter((sub) => ownedIds.includes(sub.submissionId));

	return new Response(JSON.stringify({ responses }), {
		headers: { "Content-Type": "application/json" },
	});
}
