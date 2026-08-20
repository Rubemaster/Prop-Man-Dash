import { addPropertySubmissionId } from "../_shared/clerk.js";

// Fillout POSTs here on every form submission (configure in Fillout dashboard:
// Form -> Integrate -> Webhook, once this function is deployed to a public URL).
// The trigger button in Properties.jsx passes the signed-in Clerk user's id in
// as a `data-clerkuserid` attribute, which Fillout's embed script turns into a
// URL parameter and echoes back in `urlParameters` on submission.
export async function onRequestPost({ request, env }) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	const submission = payload.submission || payload;

	const urlParameters = submission.urlParameters || [];
	const clerkUserId = urlParameters.find(
		(p) => p.name === "clerkuserid" || p.id === "clerkuserid"
	)?.value;
	const submissionId = submission.submissionId;

	if (!clerkUserId || !submissionId) {
		return new Response(
			JSON.stringify({ error: "missing clerkUserId or submissionId", payload }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	await addPropertySubmissionId(clerkUserId, submissionId, env.CLERK_SECRET_KEY);

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
}
