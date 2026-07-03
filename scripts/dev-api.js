/**
 * Local stand-in for Vercel's serverless runtime so /api/chat works with
 * `npm start`. Run `npm run dev:api` in a second terminal; CRA's "proxy"
 * setting forwards /api requests here.
 *
 * Needs GEMINI_API_KEY in .env.development.local (gitignored).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Minimal .env loader (no deps): later files don't override earlier ones
for (const file of ['.env.development.local', '.env.local', '.env']) {
  const p = path.join(__dirname, '..', file);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const chatHandler = require('../api/chat.js');

const PORT = 3999;

http.createServer((req, res) => {
  // Shim the Vercel response helpers the handler expects
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
    return res;
  };

  if (req.url !== '/api/chat') {
    return res.status(404).json({ error: 'Not found' });
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    req.body = body;
    Promise.resolve(chatHandler(req, res)).catch(err => {
      console.error(err);
      if (!res.writableEnded) res.status(500).json({ error: err.message });
    });
  });
}).listen(PORT, () => {
  console.log(`Dev API listening on http://localhost:${PORT}/api/chat`);
  console.log(`GEMINI_API_KEY ${process.env.GEMINI_API_KEY ? 'loaded' : 'MISSING - add it to .env.development.local'}`);
});
