const clerk = new Clerk(CLERK_PUBLISHABLE_KEY);
let clerkReady;

function initClerk() {
	if (!clerkReady) clerkReady = clerk.load();
	return clerkReady;
}

// Call on protected pages. Redirects to login if not signed in.
async function requireAuth() {
	await initClerk();
	if (!clerk.user) {
		window.location.href = "index.html";
		return null;
	}
	return clerk.user;
}

// Call on login/register pages. Redirects away if already signed in.
async function redirectIfSignedIn(target) {
	await initClerk();
	if (clerk.user) window.location.href = target;
}

function mountUserButton(el) {
	clerk.mountUserButton(el, { afterSignOutUrl: "index.html" });
}
