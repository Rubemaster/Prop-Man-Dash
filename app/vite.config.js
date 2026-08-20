import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function loadRootEnv() {
  const envPath = path.resolve(__dirname, '../.env')
  const env = {}
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (match) env[match[1]] = match[2].trim()
    }
  }
  return env
}

// Adapts a Node req/res pair to the Fetch Request/Response signature that
// Cloudflare Pages Functions use, so the exact same function files under
// functions/api run locally under Vite and in production on Cloudflare.
function toNodeMiddleware(handler, env) {
  return async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = chunks.length ? Buffer.concat(chunks) : undefined

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body,
    })

    try {
      const response = await handler({ request, env })
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(Buffer.from(await response.arrayBuffer()))
    } catch (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: String(err) }))
    }
  }
}

// Dev-only: runs the real Cloudflare Pages Functions (functions/api/*) so the
// Fillout/Clerk secret keys never reach the browser, and so this exact code
// is what gets pushed to Cloudflare Functions in production.
function pagesFunctionsDevPlugin() {
  const env = loadRootEnv()
  return {
    name: 'pages-functions-dev',
    async configureServer(server) {
      const { onRequestGet } = await server.ssrLoadModule('/functions/api/property-entries.js')
      const { onRequestPost } = await server.ssrLoadModule('/functions/api/fillout.js')

      server.middlewares.use('/api/property-entries', toNodeMiddleware(onRequestGet, env))
      server.middlewares.use('/api/fillout', toNodeMiddleware(onRequestPost, env))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pagesFunctionsDevPlugin()],
  optimizeDeps: {
    include: ['@handsontable/react-wrapper', 'handsontable'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    // Requests arrive here via the dev.rooftraq.com Cloudflare Tunnel with that
    // Host header; Vite blocks unrecognized hosts by default (DNS-rebinding guard).
    allowedHosts: ['dev.rooftraq.com'],
  },
})
