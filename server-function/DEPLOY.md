# Deploying dashboard-api

Standalone Cloudflare Worker -- previously this logic ran as Cloudflare Pages
Functions co-located with the frontend (same origin, no CORS needed). Split
out so it can be deployed independently at its own domain
(`dashboard-api.rooftraq.com`).

## First-time setup

### 1. Install and set secrets

```bash
npm install
npx wrangler login                        # once, opens a browser OAuth flow
npx wrangler secret put CLERK_SECRET_KEY
npx wrangler secret put CLERK_PUBLISHABLE_KEY
npx wrangler secret put FILLOUT_API
npx wrangler secret put STREAM_API_KEY
npx wrangler secret put STREAM_API_SECRET
```

### 2. Update `wrangler.toml`

`ALLOWED_ORIGIN` must exactly match the frontend's real origin (scheme +
host, no trailing slash) -- CORS and Clerk's `authorizedParties` check both
depend on this being exact.

### 3. Deploy

```bash
npm run deploy
```

Note the deployed URL it prints (`https://dashboard-api.<your-subdomain>.workers.dev`
unless a custom domain is attached yet).

### 4. Attach the custom domain

Cloudflare dashboard -> Workers & Pages -> dashboard-api -> Settings ->
Domains & Routes -> add `dashboard-api.rooftraq.com`. Requires `rooftraq.com`
already on Cloudflare's nameservers.

### 5. Point the frontend at it

The frontend's `fetch("/api/...")` calls need to become absolute URLs
pointing at this worker's domain, with `credentials: "include"` added so
Clerk's session cookie actually crosses the origin boundary. See the main
app repo's `VITE_API_BASE_URL` env var.

## Redeploying after a change

```bash
npm run deploy
```

No build step -- `wrangler deploy` bundles `src/index.js` directly.
