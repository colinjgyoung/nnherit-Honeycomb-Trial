# HANDOFF — The Honeycomb (nnherit Dynamics)

Context for anyone (human or AI) picking up this folder. Read this first.

## What this is

**The Honeycomb** is an interactive prototype for a gamified, facilitator-led **succession session** for family businesses. A family fills a honeycomb board with succession scenario cards, watches four shared "family dials" respond, weathers random "chance" events, and ends with a written transition roadmap. It is a working draft / trial, built on nnherit's **Succession Dynamics** deck (part of the nnherit Dynamics toolbox). "The Honeycomb" is a **working title**.

## Live site & repo

- Live: https://colinjgyoung.github.io/nnherit-Honeycomb-Trial/
- Hosting: GitHub Pages, deploy from `main` / root. `index.html` is served as the homepage (opens straight into the prototype).

## Current state

Published and working. Pure static site — **no build step, no framework, no dependencies**. To run locally, just open `index.html` in a browser.

## Files

| File | Purpose |
|---|---|
| `index.html` | The playable prototype (the homepage). Links `style.css` + `cards.js` + `script.js`. Top nav links the other pages. |
| `style.css` | All styling for the prototype. |
| `cards.js` | Deck data: `DIMS`, `CHALLENGES`, the full 60-card `CARDS`, and the `CHANCE` deck. Generated from the Excel in `data/`. |
| `script.js` | All game logic (board, tray, meters, modal, roadmap). |
| `data/nnherit_situation_cards_content_all (2).xlsx` | Source spreadsheet for the 60-card deck. |
| `dial-preview.html` | The radial-gauge design reference. **Adopted** — the live prototype uses this gauge for its two master meters. |
| `Honeycomb_Trainers_Guide.html` | Facilitator guide: full mechanics, components, half-day run sheet, safety principles. Self-contained. |
| `Honeycomb_Marketing_OnePager.html` | Marketing one-pager (pain + how it works), audience = facilitators. Self-contained. |
| `README.md` | Leads with the live URL for easy copy-paste. |
| `.claude/launch.json` | Dev-only: local static server config (`npx http-server` on port 8642) for previewing in Claude Code. |

## How the prototype works (mechanics)

- Board = 13 hexes in rows `[2,3,3,3,2]`; the centre hex (index 6) is the locked **Legacy Core**. 12 placeable slots.
- Click a scenario card in the tray, then click an empty hex to place it. Click a placed hex to return it. The tray holds the **full 60-card deck**, filterable by challenge via chips; the **i** button on each card opens the card back (description, 1–4 difficulty slider, impact scores).
- **Hex/card colour encodes the challenge** (one colour per the five challenges, defined in `CHALLENGES`); difficulty is shown as a 1–4 dot rating.
- **Two master meters** (radial gauges, range **−24..+24**): the business meter sums Profitability + Continuity + External + Governance; the family meter sums Harmony + Family + Communication + Readiness. Per-dimension mini-bars (±12) sit under each gauge. All **8 scored dimensions** are tracked.
- The **target line is adjustable** (default 0) — per the trainer's guide, the family sets the line they want to clear. Meter bands: green ≥ target, amber within 6 below, red beyond.
- With real scores, most cards (difficulty 1–3) are net-negative challenges; only difficulty-4 cards can be net-positive. Boards usually land negative — by design, the roadmap turns the lowest dimensions into "priority areas", echoing the guide's "the point of the meters is the conversation, not the score."
- "Draw chance card" applies a random event that swings one or more dimensions.
- "Generate roadmap" (enabled when all 12 slots are filled) lists the scenarios in board order, reports both meters, and names the priority areas.
- Full facilitation logic (timings, debrief, safety) is in `Honeycomb_Trainers_Guide.html`.

## Data model (`cards.js` = data, `script.js` = logic)

- `DIMS`: the 8 scored dimensions, keys `prof, cont, ext, gov, harm, fam, comm, read`.
- `CHALLENGES`: the 5 challenges keyed `VS/FR/SP/CT/RR` with display name, full sheet name, colour, hex tint.
- `CARDS`: 60 × `{ id, cat, n (name), d (difficulty 1–4), desc, im: {dim: score} }`.
- `CHANCE`: `{ n, t (label), im: {dim: score} }`.
- Constants in `script.js`: `ROWS`, `CORE` (=6), `METERS`, `VMIN/VMAX` (±24), `DMIN/DMAX` (±12); `target` is user-adjustable state.
- Data note: the source sheet scores SP07 "Internal Resistance" with `-2 Employees` — a dimension that exists on no other card. Folded into Governance in `cards.js`; flag for the master sheet.

## Known simplifications / caveats

- The 13-hex board (12 slots + Legacy Core) is the settled trial geometry: it honours the "9–15 hexes" brief and fits the half-day run sheet. A true hex-of-hexes (7 or 19) was considered and rejected — 7 is too few for the session arc, 19 too many. Revisit only if the physical product dictates otherwise.
- Card art, QR links, and challenge icons from the sheet are not yet used on screen.
- Chance deck is still invented sample content (10 events), now spanning all 8 dimensions.

## Open decisions / next steps

1. **Copy to verify before external use** — the "currently in pilot" line on the one-pager (only nnherit can confirm). The "57% — PwC Global NextGen Survey 2022" figure has been verified and the citation year added.
2. **Naming** — "The Honeycomb" is a working title, not final.
3. **Card art** — bring the real card icons/art into the tray and card-back modal.
4. **Challenge modes** — e.g. a session preset that deals a subset of cards per challenge instead of the full open tray.

### Resolved (July 2026)

- Real 60-card deck imported (`cards.js`), colour = challenge, difficulty = 1–4 rating. ✔
- Radial gauge adopted for two master meters; value range unified at −24..+24. ✔
- All 8 dimensions tracked (4 per meter). ✔
- Board geometry settled at 13 hexes for the trial. ✔
- Legacy `Honeycomb_Prototype.html` deleted. ✔
- Repo stays public with full deck content — approved by Colin, July 2026. ✔

## Design constraints (do not break)

Grounded in family-business research and the nnherit brand:

- **Cooperative only.** The family plays against the scenario, never each other. No winners/losers, no leaderboard that ranks people, no forced decision about who succeeds.
- **Facilitator-led**, and every session must produce a **visible output** (the roadmap).
- **Protect the founder** — keep sensitive topics at scenario distance.
- **Brand:** the name is always lowercase `nnherit`; colours are yellow `#F3D600`, black, white; font is Source Sans Pro; voice is grounded, direct, practical (playful in method, not in tone). The product is sold to **facilitators** (coaches, consultants, academics), not direct to families.

## Related material

The Honeycomb is the lead "big idea" from a wider nnherit playkit brainstorm (11 concept ideas + 5 gamified systems), chosen against a draft evaluation matrix. Those working documents and the Succession Dynamics source data live in nnherit's own project files, outside this repo.

## Correction — difficulty is a 1–4 rating, colour = challenge (DONE in code)

The deck does **not** colour-code difficulty. On the final cards, **difficulty is a 1–4 rating** (a slider on the card back) and **colour identifies the challenge** (one colour per the five challenges). **The prototype now implements this**: hex/card colour encodes the challenge (VS/FR/SP/CT/RR via `CHALLENGES`), difficulty is a 1–4 dot rating, and the meters move only on impact scores. Note: the master Excel (including the copy in `data/`) still carries the legacy colour-difficulty columns ("Complexity (1-4) red 1, orange 2…", "Colour of card") — the import ignores them.

## Developing with Claude Code

- **Point Claude Code at this repo** (`nnherit Honeycomb Trial`) as its working folder — this is the code it edits and runs. Static site, no build, no dependencies; open `index.html` to run.
- **Deck data is now in-repo**: `data/nnherit_situation_cards_content_all (2).xlsx` is the source; `cards.js` is the imported, cleaned result. No external nnherit-workspace input is required.
- **Optional context.** The nnherit workspace also holds the brand voice guide, the full integration recommendation (`Deck_Integration_Recommendation.md`), and the trainer's guide. Useful to keep work on-brand, but reference only — not required to build.
- **Public-repo status.** Colin approved keeping the repo public with the full deck content (July 2026).
- **Done (July 2026)**: real 60 cards imported; two-master-meter radial gauges; card front/back detail view; challenge-colour scheme. **Next up**: challenge modes and real card art.
