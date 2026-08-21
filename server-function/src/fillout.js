import { addPropertySubmissionId, addInspectionSubmissionId } from "./clerk-shared.js";

// Fillout POSTs here on every form submission (configure in Fillout dashboard:
// Form -> Integrate -> Webhook). The trigger button in the frontend passes
// the signed-in Clerk user's id in as a `data-clerkuserid` attribute, which
// Fillout's embed script turns into a URL parameter and echoes back in
// `urlParameters` on submission.
async function parseSubmission(request) {
	let payload;
	try {
		payload = await request.json();
	} catch {
		return { error: new Response(JSON.stringify({ error: "invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		}) };
	}
	const submission = payload.submission || payload;
	const urlParameters = submission.urlParameters || [];
	const clerkUserId = urlParameters
		.find((p) => p.name === "clerkuserid" || p.id === "clerkuserid")
		?.value?.trim();
	const submissionId = submission.submissionId;

	if (!clerkUserId || !submissionId) {
		return { error: new Response(
			JSON.stringify({ error: "missing clerkUserId or submissionId", payload }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		) };
	}

	return { clerkUserId, submissionId };
}

export async function handleFillout(request, env) {
	const parsed = await parseSubmission(request);
	if (parsed.error) return parsed.error;

	await addPropertySubmissionId(parsed.clerkUserId, parsed.submissionId, env.CLERK_SECRET_KEY);

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
}

export async function handleInspection(request, env) {
	const parsed = await parseSubmission(request);
	if (parsed.error) return parsed.error;

	await addInspectionSubmissionId(parsed.clerkUserId, parsed.submissionId, env.CLERK_SECRET_KEY);

	return new Response(JSON.stringify({ ok: true }), {
		headers: { "Content-Type": "application/json" },
	});
}
