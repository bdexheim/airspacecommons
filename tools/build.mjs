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

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, '_site');
const pdfOnly = process.argv.includes('--pdf-only');
const SITE_URL = process.env.SITE_URL || '';
const COPY = ['index.html', 'assets', 'img', 'prototypes', 'report', '.nojekyll'];

async function copySite() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  for (const p of COPY) if (existsSync(resolve(ROOT, p))) await cp(resolve(ROOT, p), resolve(OUT, p), { recursive: true });
}

async function makePdf(srcDir, outFile) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(pathToFileURL(resolve(srcDir, 'index.html')).href, { waitUntil: 'load' });
  await page.evaluate(url => {
    if (url) {
      document.querySelector('meta[name="site-url"]').content = url;
      document.querySelectorAll('a.site-url').forEach(a => { const h = a.dataset.hash || ''; a.href = url + h; a.textContent = (url + h).replace(/^https?:\/\//, ''); });
    }
    document.querySelectorAll('img[loading]').forEach(i => (i.loading = 'eager'));
    window.__prepPrint && window.__prepPrint();
  }, SITE_URL);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.emulateMedia({ media: 'print' });
  const live = SITE_URL ? ' · live version: ' + SITE_URL.replace(/^https?:\/\//, '') : '';
  await page.pdf({
    path: outFile, format: 'Letter', printBackground: true, displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="width:100%;font:7.5pt Helvetica,Arial,sans-serif;color:#4E5D6C;padding:0 12mm;display:flex;justify-content:space-between"><span>Shared Airspace Commons · hypothetical class project${live}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '13mm', bottom: '16mm', left: '12mm', right: '12mm' },
  });
  await browser.close();
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
