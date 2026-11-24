# Shared Airspace Commons

A student proposal for Chicago's low airspace, built for Complex Systems Innovation at Illinois Tech by Brian Dexheimer, Ruoming Xin and Pratyusha Vellala.

**Hypothetical class work.** Not affiliated with, endorsed by or produced by the City of Chicago or the Chicago Department of Public Health.

## Run it locally

```bash
npm install
npx playwright install chromium   # first time only, for the PDF
npm run preview                   # open http://localhost:8080
npm run pdf                       # writes report/Shared_Airspace_Commons.pdf
```

The site is plain HTML, CSS and JavaScript. There is no framework or build step for the pages themselves; the build only copies files and renders the PDF.

## Publishing (GitHub Pages)

Every push to `main` rebuilds the site and the PDF and publishes them. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions** once.

The site appears at `https://<your-username>.github.io/airspace-commons/`.

## Where things are

See `CLAUDE.md` for the structure, visual language, voice rules and backlog.
