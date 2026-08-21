import { createClerkClient } from "@clerk/backend";

const NO_STORE_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };
const TOKEN_TTL_SECONDS = 60 * 60;

function base64url(input) {
	const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Stream user tokens are just HS256 JWTs signed with the app's API secret --
// no need for a Stream SDK call, this can be done directly.
async function signStreamToken(userId, secret) {
	const now = Math.floor(Date.now() / 1000);
	const encodedHeader = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
	const encodedPayload = base64url(
		JSON.stringify({ user_id: userId, iat: now, exp: now + TOKEN_TTL_SECONDS })
	);
	const signingInput = `${encodedHeader}.${encodedPayload}`;

	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"]
	);
	const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));

	return `${signingInput}.${base64url(signature)}`;
}

export async function handleStreamToken(request, env) {
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
	const token = await signStreamToken(userId, env.STREAM_API_SECRET);

	return new Response(
		JSON.stringify({ token, userId, apiKey: env.STREAM_API_KEY }),
		{ headers: NO_STORE_HEADERS }
	);
}
