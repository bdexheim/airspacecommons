// Builds the site into _site/ and renders the printable PDF into _site/report/.
// Usage: npm run build            (copy site + make PDF)
//        npm run pdf              (PDF only, written to report/ for local review)
// Set SITE_URL to the published address so the PDF links back to the live site, e.g.
//   SITE_URL=https://yourname.github.io/airspace-commons/ npm run build
import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const PAGINATE = readFileSync(new URL('./paginate.js', import.meta.url), 'utf8').trim().replace(/^\/\/.*\n/gm, '').replace(/\)\s*$/, ')').replace(/^\(/, '(').trim();

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, '_site');
const pdfOnly = process.argv.includes('--pdf-only');
const SITE_URL = process.env.SITE_URL || '';
const COPY = ['index.html', 'archetypes.html', 'materials.html', 'assets', 'img', 'prototypes', 'report', '.nojekyll'];
// Pages in the PDF, in order. The in-depth page and the audience materials follow the story as appendices.
const PAGES = [['index.html', 'Shared Airspace Commons'], ['archetypes.html', 'The archetypes in depth'], ['materials.html', 'Audience materials']];

async function copySite() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  for (const p of COPY) if (existsSync(resolve(ROOT, p))) await cp(resolve(ROOT, p), resolve(OUT, p), { recursive: true });
  // Stamp each stylesheet and script link with a hash of its contents, so browsers and the Pages CDN never serve a stale copy.
  for (const page of ['index.html', 'archetypes.html', 'materials.html']) {
    const f = resolve(OUT, page); if (!existsSync(f)) continue;
    let html = await readFile(f, 'utf8');
    const refs = [...new Set([...html.matchAll(/(?:href|src)="(assets\/(?:css|js)\/[^"?]+)"/g)].map(m => m[1]))];
    for (const r of refs) {
      const v = createHash('sha1').update(await readFile(resolve(ROOT, r))).digest('hex').slice(0, 8);
      html = html.replaceAll('"' + r + '"', '"' + r + '?v=' + v + '"');
    }
    await writeFile(f, html);
  }
}

async function renderPage(browser, srcDir, file, title) {
  const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(file + ': ' + String(e)));
  await page.goto(pathToFileURL(resolve(srcDir, file)).href, { waitUntil: 'load' });
  await page.evaluate(url => {
    if (url) {
      document.querySelector('meta[name="site-url"]').content = url;
      document.querySelectorAll('a.site-url').forEach(a => { const h = a.dataset.hash || ''; a.href = url + h; a.textContent = (url + h).replace(/^https?:\/\//, ''); });
      // Links between pages point at the live site in the PDF.
      document.querySelectorAll('a[href]').forEach(a => { const h = a.getAttribute('href'); if (!/^(https?:|#|mailto:)/.test(h)) a.href = url + h; });
    }
    document.querySelectorAll('img[loading]').forEach(i => (i.loading = 'eager'));
    window.__prepPrint && window.__prepPrint();
  }, SITE_URL);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.emulateMedia({ media: 'print' });
  // Preview pagination at the printed page size and adjust breaks so sections start cleanly and pages stay full.
  await page.setViewportSize({ width: 725, height: 946 });
  await page.waitForTimeout(300);
  const layout = await page.evaluate(`(${PAGINATE})({ PW: 725.3, PH: 946.4 })`);
  if (layout.length) console.log(file + ': ' + layout.join('; '));
  const live = SITE_URL ? ' · live version: ' + SITE_URL.replace(/^https?:\/\//, '') : '';
  const bytes = await page.pdf({
    format: 'Letter', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="width:100%;font:7.5pt Helvetica,Arial,sans-serif;color:#4E5D6C;padding:0 12mm;display:flex;justify-content:space-between"><span>${title} · hypothetical class project${live}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '13mm', bottom: '16mm', left: '12mm', right: '12mm' },
  });
  await page.close();
  return { bytes, errors };
}

async function makePdf(srcDir, outFile) {
  const browser = await chromium.launch();
  const merged = await PDFDocument.create();
  const errors = [];
  for (const [file, title] of PAGES) {
    if (!existsSync(resolve(srcDir, file))) continue;
    const r = await renderPage(browser, srcDir, file, title);
    errors.push(...r.errors);
    const doc = await PDFDocument.load(r.bytes);
    (await merged.copyPages(doc, doc.getPageIndices())).forEach(p => merged.addPage(p));
  }
  await browser.close();
  merged.setTitle('Shared Airspace Commons');
  await writeFile(outFile, await merged.save());
  if (errors.length) { console.error('Page errors:\n' + errors.join('\n')); process.exitCode = 1; }
  console.log('PDF written to', outFile);
}

if (pdfOnly) {
  await mkdir(resolve(ROOT, 'report'), { recursive: true });
  await makePdf(ROOT, resolve(ROOT, 'report/Shared_Airspace_Commons.pdf'));
} else {
  await copySite();
  await mkdir(resolve(OUT, 'report'), { recursive: true });
  await makePdf(OUT, resolve(OUT, 'report/Shared_Airspace_Commons.pdf'));
  console.log('Site built in _site/');
}
