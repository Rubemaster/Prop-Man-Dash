import { addInspectionSubmissionId } from "../_shared/clerk.js";

// Fillout POSTs here on every "Inspection Requests" form submission. Mirrors
// functions/api/fillout.js but for the inspection-request form/metadata key.
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
	const clerkUserId = urlParameters
		.find((p) => p.name === "clerkuserid" || p.id === "clerkuserid")
		?.value?.trim();
	const submissionId = submission.submissionId;

	if (!clerkUserId || !submissionId) {
		return new Response(
			JSON.stringify({ error: "missing clerkUserId or submissionId", payload }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	await addInspectionSubmissionId(clerkUserId, submissionId, env.CLERK_SECRET_KEY);

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
}
