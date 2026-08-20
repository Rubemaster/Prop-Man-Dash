import { createClerkClient } from "@clerk/backend";

// Same Zite Database + table as functions/api/property-entries.js -- both
// properties and inspections land as rows in this one table. A row is an
// inspection (rather than a property) when its `propertyid` field is set,
// since an inspection references the property it's for.
const DATABASE_ID = "2dd78faa4f50c865";
const TABLE_ID = "ta1SM8LKtyo";
const FIELD = {
	notes: "f2pqWb6Qc6v",
	clerkuserid: "fiWGpD8dCa4",
	propertyid: "feq3sfQMyHY",
};
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

	const upstream = await fetch(
		`https://tables.zite.com/api/v1/bases/${DATABASE_ID}/tables/${TABLE_ID}/records/list`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.FILLOUT_API}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				limit: 500,
				filter: { field: FIELD.clerkuserid, equals: userId },
			}),
			cache: "no-store",
		}
	);
	const data = await upstream.json();

	const inspections = (data.records || [])
		.filter((record) => record.data[FIELD.propertyid])
		.map((record) => ({
			submissionId: record.id,
			propertyId: record.data[FIELD.propertyid],
			notes: record.data[FIELD.notes] || "",
		}));

	return new Response(JSON.stringify({ inspections }), { headers: NO_STORE_HEADERS });
}
