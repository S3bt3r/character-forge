# Contributing

- Run `npm test` before every commit.
- A change in behavior comes with a test; the tests define the expected behavior.
- Data and texts follow the rules in [docs/DATA.md](docs/DATA.md).

## Commands

Requirement: Node.js ≥ 24.11 (LTS).

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies (see [Dependencies](#dependencies)) |
| `npm run dev` | Development server with hot reload |
| `npm test` | Type check, then all tests |
| `npm run test:watch` | Tests in watch mode while developing |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint: unawaited promises, hook rules, layer directions (the rules TypeScript does not cover); stylelint: breakpoint notation, no opacity on dimmed questions; Knip: unused files, exports and dependencies |
| `npm run format` / `format:check` | Format the code with Prettier / check that it is formatted |
| `npm run build` | Type check + production build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm run test:mutation` | Mutation tests of the logic with Stryker (see [Mutation tests](#mutation-tests)) |
| `npm run test:mutation:ui` | Mutation tests of the components and hooks, optional and much slower |

## Structure

- `src/domain/`: the rating logic, pure and without UI or data dependencies (see [Domain design](#domain-design)).
- `src/data/`: classes, specs, races, professions, Legacy perks, the questionnaire and the sources, with their English texts.
- `src/app/`: the application workflow: runs the domain on the real catalog and holds the actions on the answers as pure functions.
- `src/persistence/`: saved profiles, the saved language and the share code; external input is validated here.
- `src/i18n/`: language choice and the German translation, structured like the English original and typed against it. The English texts stay with their owner (`src/data`, `src/ui/texts.ts`).
- `src/ui/`: Preact components and hooks; at runtime they read the data only through `src/ui/catalog.ts`.
- `tests/`: laid out like `src/`, one test file per module, named exactly like it. Tests that span many modules are named after what they check (`tests/data/data-integrity.test.ts`). Shared helpers live in `tests/support/`.

## Domain design

The domain follows functional domain-driven design: pure functions over types that only allow valid states. Keep to it when changing the domain:

- **Invalid states cannot be built.** An answer is either "Don't care" or at least one picked option with its importance (`Answer`); a question is either a gate or a rated question (`Question`). New cases become a new variant of the union, not an optional field or a reserved ID.
- **Outside data is parsed at the boundary.** Storage and share code go through `sanitizeAnswers`, which builds answers only with `pickedAnswer`; the domain never sees raw input.
- **The workflow has named steps.** `evaluate` turns the answers into an `Evaluation` once; scoring and every ranking take that evaluation instead of deriving it again.
- **IDs carry their kind.** Question, option, class, spec, race, profession and perk IDs are branded: the data builders turn their literal keys into IDs, checking references with `knownId`, and the sanitizer takes them from the catalog. Nothing else builds an ID.
- **Layers point one way.** `domain` imports nothing, `ui` and the entry points `main.tsx` and `language-init.ts` sit on top; `boundaries/dependencies` in `eslint.config.js` defines the allowed imports, and `npm run lint` checks each one.
- **The rating knows no texts.** The domain types are narrow (`SpecProfile`, `RaceProfile`, `Question` …), without names, notes or provenance. The display types in `src/data/display.ts` extend them, so each entry exists once: the rating sees it as its profile, the UI as its display entry.
- **Types live with their rules.** A type sits in the module of its concept together with the functions that decide about it, not in a shared types file.

## UI tests

- **Find elements by role and accessible name** with Testing Library (`screen.getByRole('button', { name: EN.save })`), the way a screen reader presents the page. Select by class, `data-*` attribute or stable ID only where the test checks structure or state on purpose.
- **Texts by their key** (`EN.save`), never as literals, so a change of wording breaks no test.
- **Waiting:** `waitUntil` for a result of asynchronous work; the fixed `settle` window only where a test checks that nothing happens.

## Comments

- **Contracts, not narration.** A public function whose rules its name and types do not show gets a doc comment with its contract: what its parameters mean, edge cases and how it fails. A name and type that already say it all get none.
- **Inline comments explain why:** a constraint or a decision the code cannot show, never what the next line does.
- **Module header for the why, function for the contract.** The top of a file explains why the module is built as it is; what a caller must know stands at the function, where the editor shows it.

## Mutation tests

Stryker puts small bugs (mutants) into the code; a surviving mutant marks a spot no test checks.

- **When:** before commits that change logic or tests. The run is not part of `npm test` because it takes minutes. The logic run (`stryker.config.json`) can fail on its threshold; the run for components and hooks (`stryker.ui.config.json`) is optional. In GitHub, the workflow "Mutation tests" runs either one on request.
- **Surviving mutants:** close a real gap with a test. If a mutant provably does not change the behavior, mark it with `// Stryker disable next-line <Mutator>: <reason>` directly above, as narrow as possible.
- **Threshold:** keep `thresholds.break` just below the reached score, so new gaps get noticed.

## Publishing

On the default branch, the CI publishes `dist/` to GitHub Pages once lint, tests and build pass (both with the type check). Setup, once: in the repository settings under Pages, set the source to "GitHub Actions". To require the checks before merging, add the jobs "Lint", "Tests" and "Build" as required status checks in a branch rule.

## Dependencies

- Versions are pinned exactly (`.npmrc`: `save-exact`, `package-lock.json`). Run `npm audit` before a release.
- A new dependency or version is adopted only once its release is at least 14 days old; check its exact name in the registry first and install it with `--ignore-scripts`.
- Dependabot (`.github/dependabot.yml`) offers weekly updates with the same waiting time; security updates are exempt.
