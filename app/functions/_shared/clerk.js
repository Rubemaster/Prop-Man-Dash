const CLERK_API = "https://api.clerk.com/v1";

export async function getClerkUser(userId, secretKey) {
	const res = await fetch(`${CLERK_API}/users/${userId}`, {
		headers: { Authorization: `Bearer ${secretKey}` },
	});
	if (!res.ok) throw new Error(`Clerk getUser failed (${res.status}): ${await res.text()}`);
	return res.json();
}

async function addSubmissionId(userId, submissionId, secretKey, metadataKey) {
	const user = await getClerkUser(userId, secretKey);
	const existing = user.private_metadata?.[metadataKey] || [];
	if (existing.includes(submissionId)) return existing;

	const updated = [...existing, submissionId];
	const res = await fetch(`${CLERK_API}/users/${userId}/metadata`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${secretKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			private_metadata: { ...user.private_metadata, [metadataKey]: updated },
		}),
	});
	if (!res.ok) throw new Error(`Clerk updateMetadata failed (${res.status}): ${await res.text()}`);
	return updated;
}

async function getSubmissionIds(userId, secretKey, metadataKey) {
	const user = await getClerkUser(userId, secretKey);
	return user.private_metadata?.[metadataKey] || [];
}

export function addPropertySubmissionId(userId, submissionId, secretKey) {
	return addSubmissionId(userId, submissionId, secretKey, "propertySubmissionIds");
}

export function getPropertySubmissionIds(userId, secretKey) {
	return getSubmissionIds(userId, secretKey, "propertySubmissionIds");
}

export function addInspectionSubmissionId(userId, submissionId, secretKey) {
	return addSubmissionId(userId, submissionId, secretKey, "inspectionSubmissionIds");
}

export function getInspectionSubmissionIds(userId, secretKey) {
	return getSubmissionIds(userId, secretKey, "inspectionSubmissionIds");
}
