import { createClerkClient } from "@clerk/backend";

// Zite Database that the "Property Entry Form" Fillout form auto-syncs into.
// Filtering directly on the table's own `clerkuserid` field -- the database
// already carries per-row ownership, so there's no need to separately track
// an ownership index anywhere else.
const DATABASE_ID = "2dd78faa4f50c865";
const TABLE_ID = "ta1SM8LKtyo";
const FIELD = {
	address: "faNdZcQSjbr",
	roofCondition: "fgjDWZKFUh2",
	roofType: "f6BGwyhUTSz",
	houseAge: "fqh5YDh55ZG",
	notes: "f2pqWb6Qc6v",
	clerkuserid: "fiWGpD8dCa4",
	propertyid: "feq3sfQMyHY",
};
const NO_STORE_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };

// The address field is synced from Fillout as a single multi-line string:
// "311 East Daniel St\nChampaign, Illinois 51860\nUnited States"
function parseAddress(raw) {
	const [street = "", cityStateZip = ""] = (raw || "").split("\n");
	const match = cityStateZip.match(/^(.*?),\s*(\S+)\s+(\S+)$/);
	return {
		address: street,
		city: match?.[1] || "",
		state: match?.[2] || "",
		zip: match?.[3] || "",
	};
}

export async function handlePropertyEntries(request, env) {
	const clerkClient = createClerkClient({
		secretKey: env.CLERK_SECRET_KEY,
		publishableKey: env.CLERK_PUBLISHABLE_KEY,
	});
	const { isAuthenticated, toAuth } = await clerkClient.authenticateRequest(request, {
		authorizedParties: [env.ALLOWED_ORIGIN],
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

	const properties = (data.records || [])
		.filter((record) => !record.data[FIELD.propertyid])
		.map((record) => ({
			submissionId: record.id,
			...parseAddress(record.data[FIELD.address]),
			roofCondition: record.data[FIELD.roofCondition] || "",
			roofType: record.data[FIELD.roofType] || "",
			houseAge: record.data[FIELD.houseAge] || "",
			notes: record.data[FIELD.notes] || "",
		}));

	return new Response(JSON.stringify({ properties }), { headers: NO_STORE_HEADERS });
}
