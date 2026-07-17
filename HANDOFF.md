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
| `index.html` | The playable prototype (the homepage). Links `style.css` + `script.js`. Top nav links the other pages. |
| `style.css` | All styling for the prototype. |
| `script.js` | All game logic and the card/chance data. |
| `dial-preview.html` | **Concept only** — a radial-gauge version of the four dials. Self-contained; not wired into the live prototype. |
| `Honeycomb_Trainers_Guide.html` | Facilitator guide: full mechanics, components, half-day run sheet, safety principles. Self-contained. |
| `Honeycomb_Marketing_OnePager.html` | Marketing one-pager (pain + how it works), audience = facilitators. Self-contained. |
| `Honeycomb_Prototype.html` | **Legacy / redundant** — superseded by `index.html`. Safe to delete. |
| `README.md` | Leads with the live URL for easy copy-paste. |

## How the prototype works (mechanics)

- Board = 13 hexes in rows `[2,3,3,3,2]`; the centre hex (index 6) is the locked **Legacy Core**. 12 placeable slots.
- Click a scenario card in the tray, then click an empty hex to place it. Click a placed hex to return it.
- Four dials (Profitability, Harmony, Continuity, Readiness) sum the impact scores of placed cards. Target line = **+2**.
- "Draw chance card" applies a random event that swings the dials.
- "Generate roadmap" (enabled when all 12 slots are filled) lists the scenarios in board order and reports where the dials landed.
- Full facilitation logic (timings, debrief, safety) is in `Honeycomb_Trainers_Guide.html`.

## Data model (`script.js`)

- `CARDS`: `{ id, n (name), c (challenge category), d (difficulty 1–4), p, h, co, r (impacts on Profitability/Harmony/Continuity/Readiness), x (extra-dimension text, display only) }`
- `CHANCE`: `{ n, t (label), p, h, co, r }`
- Constants: `ROWS`, `CORE` (=6), `DIALS`, `THRESH` (=2).
- Dial scaling in `script.js` (bars) maps value over **−12..+12**; the gauge concept in `dial-preview.html` uses **−6..+6**. **These must be unified if the gauge is adopted.**

## Known simplifications / caveats

- Only ~15 sample cards are seeded. The real Succession Dynamics deck is **60 hexagonal cards across 5 categories**; full content lives in an nnherit Google Drive spreadsheet, not in this repo.
- Dials track **4 of the deck's 8 scored dimensions**. The others (Family, External, Communication, Governance) appear on card text but are not tracked on a dial.
- The 13-hex board honours a loose "9–15 hexes" brief; it is **not a mathematically exact hexagon** (a true hex-of-hexes is 7 or 19). Geometry is a placeholder.
- Two dial visual styles exist: flat **bars** (live, in `script.js`) and radial **gauges** (`dial-preview.html`, concept only).

## Open decisions / next steps

1. **Dial style** — adopt the radial gauge (`dial-preview.html`) in the live prototype, or keep bars? If adopting: port the gauge renderer into `script.js`'s `render()` (replace the `.dials` bar block) and unify the value range (−6..+6 vs −12..+12).
2. **Board geometry** — settle final hex count/shape.
3. **Dimensions** — decide which of the 8 impact dimensions the dials should track.
4. **Real data** — replace the sample cards with the full 60-card deck and real impact scores from the source spreadsheet.
5. **Copy to verify before external use** — the "currently in pilot" line on the one-pager, and the "57% — PwC NextGen Survey" figure. Confirm both are accurate.
6. **Repo hygiene** — delete redundant `Honeycomb_Prototype.html`.
7. **Naming** — "The Honeycomb" is a working title, not final.

## Design constraints (do not break)

Grounded in family-business research and the nnherit brand:

- **Cooperative only.** The family plays against the scenario, never each other. No winners/losers, no leaderboard that ranks people, no forced decision about who succeeds.
- **Facilitator-led**, and every session must produce a **visible output** (the roadmap).
- **Protect the founder** — keep sensitive topics at scenario distance.
- **Brand:** the name is always lowercase `nnherit`; colours are yellow `#F3D600`, black, white; font is Source Sans Pro; voice is grounded, direct, practical (playful in method, not in tone). The product is sold to **facilitators** (coaches, consultants, academics), not direct to families.

## Related material

The Honeycomb is the lead "big idea" from a wider nnherit playkit brainstorm (11 concept ideas + 5 gamified systems), chosen against a draft evaluation matrix. Those working documents and the Succession Dynamics source data live in nnherit's own project files, outside this repo.

## Correction — difficulty is a 1–4 rating, colour = challenge (fix in code)

The deck does **not** colour-code difficulty. On the final cards, **difficulty is a 1–4 rating** (a slider on the card back) and **colour identifies the challenge** (one colour per the five challenges). The current prototype (`script.js` / `style.css`) colours each hex red/orange/yellow/green **by difficulty** — that is the old, retired scheme. When the code is next worked on, change it so **hex colour encodes the challenge (VS/FR/SP/CT/RR)** and difficulty is shown as a 1–4 value. Note also: difficulty ≠ good/bad — the dials must move on each card's actual impact scores, never on its colour. (The trainer's guide and the checklist CSV have already been corrected; the master Excel in Drive still carries the legacy colour-difficulty columns.)

## Developing with Claude Code

- **Point Claude Code at this repo** (`nnherit Honeycomb Trial`) as its working folder — this is the code it edits and runs. Static site, no build, no dependencies; open `index.html` to run.
- **It does not need the whole nnherit folder.** The one external input it needs is the **deck data**: `Succession_Dynamics_Card_Checklist.csv` (the corrected 60-card source). That currently lives in the nnherit workspace under `04_PRODUCTS_AND_PLAYFUL_OBJECTS/01_Succession_Dynamics_scenario_cards/`. Either copy it into a `/data` folder here (recommended, makes the repo self-contained) or give Claude Code read access to just that one folder.
- **Optional context.** The nnherit workspace also holds the brand voice guide, the full integration recommendation (`Deck_Integration_Recommendation.md`), and the trainer's guide. Useful to keep work on-brand, but reference only — not required to build.
- **Public-repo caveat.** This repo is public, so anything committed here — including the full deck data or card art — is visible to anyone. Before adding the real 60-card content, decide whether that's acceptable for a trial, or whether the repo should go private (GitHub Pages on a private repo needs a paid plan).
- **First coding task** (see the recommendation for detail): swap the 15 invented sample cards for the real 60 from the CSV; then the two-master-meter dials and front/back flip; then challenge modes and real card art.
