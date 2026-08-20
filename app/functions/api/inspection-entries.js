import { createClerkClient } from "@clerk/backend";

// Same Zite Database + table as functions/api/property-entries.js -- both
// properties and inspections land as rows in this one table. A row is an
// inspection (rather than a property) when its `propertyid` field is set,
// since an inspection references the property it's for.
//
// Ownership is attributed via that referenced property's `clerkuserid`, not
// the inspection row's own `clerkuserid` field -- Fillout's sync-to-database
// field mapping reliably carries clerkuserid for property submissions but
// drops it for inspection submissions (confirmed directly against a real
// submission: the original Fillout answer has the right value, the synced
// database row doesn't). Properties are unaffected, so this sidesteps it.
const DATABASE_ID = "2dd78faa4f50c865";
const TABLE_ID = "ta1SM8LKtyo";
const FIELD = {
	notes: "f2pqWb6Qc6v",
	clerkuserid: "fiWGpD8dCa4",
	propertyid: "feq3sfQMyHY",
};
const NO_STORE_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };

async function listRecords(env, filter) {
	const res = await fetch(
		`https://tables.zite.com/api/v1/bases/${DATABASE_ID}/tables/${TABLE_ID}/records/list`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.FILLOUT_API}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ limit: 500, ...(filter && { filter }) }),
			cache: "no-store",
		}
	);
	const data = await res.json();
	return data.records || [];
}

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

	const ownProperties = await listRecords(env, { field: FIELD.clerkuserid, equals: userId });
	const ownPropertyIds = new Set(
		ownProperties.filter((r) => !r.data[FIELD.propertyid]).map((r) => r.id)
	);

	const allRecords = await listRecords(env);
	const inspections = allRecords
		.filter((record) => ownPropertyIds.has(record.data[FIELD.propertyid]))
		.map((record) => ({
			submissionId: record.id,
			propertyId: record.data[FIELD.propertyid],
			notes: record.data[FIELD.notes] || "",
		}));

	return new Response(JSON.stringify({ inspections }), { headers: NO_STORE_HEADERS });
}
