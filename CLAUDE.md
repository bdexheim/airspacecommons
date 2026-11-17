# Shared Airspace Commons · notes for Claude Code

A student proposal website for Complex Systems Innovation at Illinois Tech (team: Brian, Ming, Pratyusha). It argues that Chicago should treat its low airspace as a shared commons: operators pay their way in data instead of fees, many agencies read from one picture, and residents can see, question and refuse. CDPH moves in first.

The audience is professors and classmates. It is **hypothetical class work** and is not affiliated with the City of Chicago or CDPH.

## Working rules

- **Git:** the owner runs every git command. Suggest commands (with a short commit message) but never run `git` yourself.
- **Disclaimer:** keep the red "Hypothetical class project" notice at the top of every page, and keep the "not a City of Chicago or CDPH document" line on boards and in the PDF footer.
- **No impersonation:** no City or CDPH logos, seals or official templates; the look is "civic, Chicago-inspired", not a copy. Don't put photos of real public figures on the site.
- **People:** first names only (Brian, Ming, Pratyusha). No week numbers or "Week 11" references in public-facing text.
- **Facts:** anything about the world as it is now (budgets, rules, programs) carries a linked source. Mock numbers are labeled as estimates in the "How we sized these numbers" note, not one by one.

## Voice

- **Two registers.** Course vocabulary (SCMM, AOI, action situation, affordance, archetype, capital reading) is used freely in the report. Mock audience materials (Council, agencies, operators, residents) use plain CDPH-style language. The glossary in `assets/js/glossary.js` is the source of truth for both.
- Write like the team, not like marketing: short, concrete sentences; say what it does and what it costs; name trade-offs. Avoid hype words and "not X, but Y" constructions.
- The archetypes keep their names: 1 Flights pay their way · 2 One sky, many readers · 3 The sky answers to the street.

## Visual language

Defined as CSS variables at the top of `assets/css/site.css`.

| Token | Value | Use |
|---|---|---|
| navy | `#0B2341` | ink, masthead, markers |
| sky | `#3BA3DC` | stripe, eyebrows |
| red | `#C8102E` on `#FBE9EC` | disclaimers, "never" items, warnings |
| line / band | `#D3DAE2` / `#F3F6F9` | rules, quiet panels |
| operators | `#007A65` | archetype 1 |
| agencies | `#5B6B7A` | archetype 2 |
| residents | `#2B5FAE` | archetype 3 |
| CDPH | `#D86018` | CDPH's own use |

Type is Public Sans, self-hosted in `assets/fonts/`. White backgrounds; no beige or tan.

## Structure

```
index.html              the story: why, method, commons, situations, anatomy, impacts, prototypes (in use), budget, grow, doors, open (conditions), glossary
archetypes.html         "The archetypes in depth": capital reading, trades, checks, phases, next contexts, one block's ledger
assets/css/site.css     all styles, including @media print for the PDF
assets/js/main.js       lightbox, archetype tabs, action-situation chapters, AOI explorer (window.aoiShow)
assets/js/budget.js     mock budget data and chart (edit numbers here)
assets/js/glossary.js   glossary data, search, print prep (window.__prepPrint), site-url links
assets/js/indepth-data.js  content for archetypes.html (A archetypes, P phases, C contexts, L ledger)
assets/js/indepth.js    renders archetypes.html; deep links #a1 #a2 #a3 #grow #contexts #ledger
img/                    boards, diagrams, scene images (AS* = action situations, R*/O1/PT-TERMS = prototype boards)
prototypes/             clickable prototypes hosted with the site
tools/build.mjs         copies the site to _site/ and renders one PDF: the story, then the in-depth page as an appendix
source/                 original material kept for reference; not published
.github/workflows/      builds and publishes to GitHub Pages on push to main
```

## Progressive disclosure

The homepage is the argument for outsiders; `archetypes.html` holds course-level detail for readers who know the frameworks. Rules:
- Nothing on the homepage depends on the in-depth page. Every link into it says what the reader will find.
- Links into it sit where the question arises: the method callout, each archetype tab ("Archetype N in depth"), "How it grows", and the ledger link under the resident boards. The nav has one "In depth" item.
- The in-depth page opens by saying who it's for and always offers the way back to the story.

## Commands

- `npm install` then `npx playwright install chromium` (first time only)
- `npm run preview` → http://localhost:8080
- `npm run pdf` → writes `report/Shared_Airspace_Commons.pdf` for a local check
- `npm run build` → full site in `_site/` (what GitHub Pages publishes)

## Backlog

1. PDF formatting: a real cover, page breaks before each Part, tighter appendix pages, a shorter presentation edition.
2. Link real prototypes from the prototype boards (Figma or pages in `prototypes/`).
3. Narrative edits from the team.
4. Consider moving other deep material (the full anatomy explorer, the impacts table) behind the same disclosure pattern if the homepage feels long.
