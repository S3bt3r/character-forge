# WoW Forever Character Forge

**→ [Open the app](https://s3bt3r.github.io/character-forge/)** (English and German, runs in the browser, no sign-up)

Not sure which class to play in *World of Warcraft: Forever*? Answer questions about how you like to play, and the Character Forge shows which class and specialization fit you, and with which race, professions and Legacy perks.

## What you get

- **A ranking that updates as you answer.** Every class and specialization gets a match from 0 to 100%. You can skip any question, and you can mark things you do not want at all (deal-breakers).
- **A character sheet per class** with its specializations, the races that fit best, a pair of primary professions with alternatives, secondary professions and Legacy perks.
- **Reasons, not just numbers.** For every value you can see why it is what it is and where that comes from.
- **Save and share.** Keep several sets of answers in your browser, or share them with friends as a code or link.

## How reliable is it?

Forever is still in beta, and much is not final. The data follows what has been published so far, and every value shows where it comes from:

- **confirmed:** mentioned in Blizzard articles, the Development Notes or developer podcasts
- **from Classic:** as in WoW Classic, not confirmed for Forever
- **tentative:** mentioned, but not final yet or contradictory
- **community:** from community guides (Wowhead), not official
- **estimate:** our own judgment, without a direct source

The beta line at the top of the app shows the state of the data. Treat the result as a starting point, not a verdict.

## Your data

Everything stays in your browser. There is no account, no server that stores your answers and no tracking. Saved answers live in your browser's local storage; a share link carries your answers in the part after `#`, which browsers do not send to the server.

## Feedback

Found a wrong value or have an idea? Open an [issue](https://github.com/S3bt3r/character-forge/issues). A source for the claim (Blizzard article, Development Notes, podcast timestamp) helps a lot.

Fan project, not affiliated with Blizzard Entertainment.

---

## For developers

A purely static app without a backend (Preact, Vite, TypeScript): `npm install`, then `npm run dev`. Commands, structure and rules are in [CONTRIBUTING.md](CONTRIBUTING.md), the rules for the data in [docs/DATA.md](docs/DATA.md).

Code, tests and data notes were written with an AI assistant; review them on their merits.

## Design & third-party content

The "Character Forge" design uses no graphics, logos or lettering from Blizzard; ornaments and logo are custom CSS and SVG shapes.

- Fonts **Marcellus SC** (© 2012 Brian J. Bonislawsky, Astigmatic), **Alegreya** (© 2011 The Alegreya Project Authors) and **Alegreya Sans** (© 2013 The Alegreya Sans Project Authors), all licensed under the [SIL Open Font License 1.1](https://openfontlicense.org). They are self-hosted via the npm packages `@fontsource/marcellus-sc`, `@fontsource/alegreya` and `@fontsource/alegreya-sans`; no requests go to third parties. The license texts are in `public/licenses/` and ship with the build.
- The UI library **Preact** (© 2015-present Jason Miller, [MIT License](public/licenses/MIT-preact.txt)) is bundled into the build; its license text ships with it.
- The GitHub mark in the footer is the Octicon `mark-github` from `@primer/octicons` 19.41.0 (© 2026 GitHub Inc., [MIT License](public/licenses/MIT-octicons.txt)), used unchanged as a link to the source code, as GitHub's logo guidelines allow.

## License

Copyright © 2026 S3bt3r. Code, data and texts are licensed under the [GNU General Public License v3.0 or later](LICENSE). Anyone who publishes a copy or a changed version, also as a website, must publish its source under the same license and keep the copyright notice. World of Warcraft and its names belong to Blizzard Entertainment and are not covered by this license.
