# ACM VVITU – React + Sanity

React + Vite version of the single-file ACM VVITU page (`index.html` is the visual/functional reference).
Dynamic content comes from Sanity; everything visual/interactive is plain React.

## Run

```bash
npm install
cp .env.example .env        # set VITE_SANITY_PROJECT_ID (+ dataset)
npm run dev                 # http://localhost:5173
npm run build               # production build in /dist

npm run studio:install      # once
cd studio && cp .env.example .env   # project id, dataset, (token for seeding)
npm run seed                # optional: imports the original content into Sanity
npm run studio              # http://localhost:3333
```

## What lives where

| Original (index.html)                         | React                                              |
| --------------------------------------------- | -------------------------------------------------- |
| `go()` page turning, wheel/swipe, `mark()`    | `src/App.jsx`, `components/Page.jsx`, `Nav.jsx`    |
| Intro canvas/loader                           | `components/Intro.jsx` + `data/introData.js`       |
| Sketches / torn-paper art / notes (`.bgl`)    | `components/Decor.jsx`, `SvgDefs.jsx`, `data/layouts.js` |
| Events hexagon diagram (hover/click)          | `components/EventsStage.jsx`                       |
| Wavy year timeline (drag, wheel, pick)        | `components/TimelineStrip.jsx` (events + team)     |
| Year pages (`#year`, `#tyear`)                | `pages/Pages.jsx` (`data-year` / `data-cat` kept)  |
| Team tabs, per-year team                      | `components/TeamPanel.jsx`                         |
| Members tables (+ team highlight)             | `components/MemberList.jsx`                        |
| Blog grid + modal                             | `components/BlogGrid.jsx`, `Modal.jsx`             |
| Calendar (month / week / list)                | `components/Calendar.jsx`                          |
| Contact form + thank-you swap                 | `components/ContactForm.jsx`                       |

## Sanity (dynamic content only)

Sanity types: `event`, `teamMember`, `communityMember`, `blogPost`, `calendarEvent` (see `studio/schemaTypes`).

`src/data/fallback.js` holds the original hard-coded content. For each content type, if Sanity has
documents they replace the defaults; if Sanity isn't configured / is loading / has nothing yet, the
original content is shown, so the page never looks empty. Events fall back per group (public / private),
members per type (ACM / ACM-W). Static copy (headings, About text, contact details, feature cards) stays in the components.

Notes
- The CSS `frame` ring exists in the original stylesheet but the original JS strips the class on the first page turn, so it never shows. `components/Page.jsx` keeps that parity (`SHOW_FRAME = false`).
- The contact form has no backend – `handleSubmit` in `ContactForm.jsx` is where to call your API.


## Sanity setup checklist (do these once)

1. Create a project at https://sanity.io/manage (or `npx sanity init`) and note the **Project ID**.
2. `cp .env.example .env` → set `VITE_SANITY_PROJECT_ID`; `cp studio/.env.example studio/.env` → set `SANITY_STUDIO_PROJECT_ID`. Restart the dev servers after editing `.env`.
3. **CORS**: sanity.io/manage → your project → API → *CORS origins* → add `http://localhost:5173` (and your deployed site URL). Without this the browser blocks the fetch and the site silently shows the built-in content (the browser console says so).
4. `npm run studio:install`, then `cd studio && npm run seed` (needs an *Editor* token in `studio/.env` as `SANITY_AUTH_TOKEN`) – optional, imports starter content.
5. `npm run studio` → open http://localhost:3333 and **click Publish** on every document. Unpublished drafts are invisible to the site.

## Content rules

- **Events** (Events page): *Group* is Public or Private (max 5 each – the diagram has 5 slots; names must be unique). Each event has **Draft PDFs**: one PDF per academic year. On the site: Events → pick the event → pick the year → the PDF opens inside the bordered sheet. Public events show a warning until at least one PDF is uploaded.
- **Community members**: set *Membership type* (ACM / ACM-W) and *Academic year*. On the site: Community → ACM (or ACM-W) Members → timeline → pick year → that year's members.
- **Team**: set *Team* and *Academic year* (Team → Timeline → year).
