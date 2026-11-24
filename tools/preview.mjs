// Tiny local server: npm run preview, then open http://localhost:8080
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, join } from 'node:path';
const ROOT = resolve(import.meta.dirname, '..');
const TYPES = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.png':'image/png', '.pdf':'application/pdf', '.woff2':'font/woff2', '.json':'application/json' };
createServer(async (req, res) => {
  let p = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(await readFile(p)); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(8080, () => console.log('Preview at http://localhost:8080'));
