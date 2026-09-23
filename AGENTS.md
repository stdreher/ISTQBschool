## Project overview

This is a template repository for building interactive, agent-driven schools on any topic. Students enroll on a website, then learn inside an AI agent of their choice (OpenCode, Claude Code, Gemini CLI, Codex, or others). Built with Astro 6, deployed to Cloudflare Workers, with student progress tracked via Cloudflare KV.

See [README.md](README.md) for setup instructions and [skill/SKILL.md](skill/SKILL.md) for the scaffolding workflow that guides a school creator through customizing the template.

Two non-default framework settings matter: Astro runs in SSR mode (`output: "server"`), and `security.checkOrigin` is `false` in `astro.config.mjs` so agents can call the API cross-origin.

## Commands

`package.json` only defines `dev`, `build`, `preview`, and `astro`. There is **no** `lint`, `test`, or `typecheck` npm script — `npm run lint` and `npm test` fail. Use `script/` or `npx`.

| Task | Run | Actual command |
| --- | --- | --- |
| Dev server | `script/dev` | `npx astro dev` (port 4321) |
| Build | `script/build` | `npm run build` |
| All tests | `script/test` | `npx vitest run` |
| One test file | — | `npx vitest run src/lib/progress.test.ts` |
| Lint + format check | `script/lint` | `npx biome check .` |
| Autofix | — | `npx biome check --write .` |
| Deploy | `script/deploy` | build, then `npx wrangler deploy` |

CI runs `script/lint` then `script/test` (`.github/workflows/ci.yml`) on Node 22.

There is no typecheck step anywhere. `tsconfig.json` only extends `astro/tsconfigs/strict`; `script/build` is the closest thing to a type gate.

On Windows: every `script/*` file is a bash script and will not run directly in PowerShell. Use the `npx` command from the table, or `bash script/<name>`.

## Local development

`npx astro dev` runs the app in workerd, not plain Node: `@astrojs/cloudflare` pulls in `@cloudflare/vite-plugin`, which reads bindings straight from `wrangler.jsonc`. A separate `wrangler dev` is not needed. Cold start takes roughly 40 seconds before the port opens.

KV in dev writes to a local store under `.wrangler/state` (gitignored), so no Cloudflare login is required. Adding `"remote": true` to the `PROGRESS` binding switches dev to the real remote namespace, which then needs `wrangler login` and writes real student records — avoid it for local work.

`wrangler.jsonc` ships with `"id": "TODO"`. Run `npx wrangler kv namespace create PROGRESS` and paste the real id before dev or deploy will work.

## Runtime and KV access

API routes read KV via `import { env } from "cloudflare:workers"`, **not** `Astro.locals.runtime.env`. Types come from the `CloudflareEnv` interface in `src/env.d.ts`.

Storage is one KV entry per student at key `student:{studentId}` holding the entire `StudentProgress` object as JSON. There is no per-lesson key.

`getProgress` normalizes legacy records where `completedLessons` was a `string[]` and `completedExercises` was absent (`src/lib/progress.ts`). Preserve that normalization when changing the shape.

## Config-driven architecture

Everything school-specific lives in `school.config.ts` at the repo root. The infrastructure code reads from this config:

- `src/lib/student-id.ts` reads adjective/noun word lists for ID generation
- `src/pages/llms.txt.ts` reads school name, description, and profile adaptation guidelines
- `src/pages/api/openapi.json.ts` reads school name for the API spec title
- `src/pages/api/profile/[studentId].ts` validates all profile fields against options defined in config
- `src/pages/api/lessons/[slug].ts` injects interview questions from config via the `{interviewQuestions}` placeholder

The `SchoolConfig` type is defined in `src/lib/school.ts`.

The config does not cover site chrome: `"My School"` is hardcoded in four places in `src/layouts/Base.astro` (page title template, `og:site_name`, sidebar title, mobile header). Rename those by hand.

## Content system

Lessons are MDX files in `src/content/lessons/`. Exercises are in `src/content/exercises/`. The frontmatter schema is defined in `src/content.config.ts` using Zod.

Lesson frontmatter includes:
- `title`, `slug`, `description`, `order`: standard metadata
- `quiz`: whether to append the shared quiz boilerplate to agentInstructions
- `agentOnly`: whether only an agent can mark it complete (used for the interview)
- `agentInstructions`: describes what "done" looks like and how to verify it

Exercises use a different schema with no `quiz` or `agentOnly` fields.

The URL slug is the frontmatter `slug` field, never the filename — `getValidSlugs` reads `data.slug` (`src/lib/valid-slugs.ts`). The `01-`, `02-` filename prefixes are cosmetic ordering only; the real sort key is the separate `order` field.

For quiz-enabled lessons, `agentInstructions` should list exactly four topics. The quiz mechanics are injected automatically by the API from `src/lib/quiz-instructions.ts`.

Always use YAML literal block scalars (`|`) for `agentInstructions`, never quoted strings. Use `{/* */}` for comments in MDX files, not HTML comments (`<!-- -->`).

## Testing

Vitest only collects `src/**/*.test.ts` (`vitest.config.ts`). Coverage is limited to the pure helpers in `src/lib` — there are no endpoint, component, or KV integration tests.

There is no Astro runtime under Vitest, so any `astro:*` import must be stubbed. See `vi.mock("astro:content", ...)` in `src/lib/valid-slugs.test.ts`; importing it unmocked fails.

## Linting quirks

`biome.json` narrows `files.includes` to `src/**/*.ts`, `school.config.ts`, `astro.config.mjs`, and `vitest.config.ts`. Everything else — `.astro`, `.mdx`, `.css`, `wrangler.jsonc` — is never linted or formatted. Running biome against an excluded path reports "No files were processed", which looks like a broken command but is expected.

The formatter uses tabs.

On a Windows checkout with `core.autocrlf=true` and no `.gitattributes`, every linted file fails with a format-only error because biome expects LF. This is an artifact, not a defect. `npx biome check --write .` rewrites them to LF and produces no `git diff`, since autocrlf normalizes back on staging.

## API endpoints

All endpoints return JSON with CORS headers. No authentication. See `src/pages/api/openapi.json.ts` for the full OpenAPI 3.1 spec.

Key endpoints: enroll (`POST /api/enroll`), progress (`GET/PUT/DELETE /api/progress/{studentId}`), profile (`GET/PUT /api/profile/{studentId}`), lessons (`GET /api/lessons`, `GET /api/lessons/{slug}`), exercises (`GET /api/exercises`, `GET /api/exercises/{slug}`).

## Agent discovery

Two files make the school discoverable to AI agents:
- `/llms.txt`: plain-text overview with API usage instructions and profile adaptation guidelines
- `/api/openapi.json`: full OpenAPI 3.1 spec

Both are dynamic routes that use the request origin, not a hardcoded domain.

## Tool agnosticism

All user-facing text and agent-facing instructions use generic language ("your AI agent") rather than referencing any specific tool. The school works with any AI tool that can fetch URLs and converse.

## Styles

Use Tailwind's `stone` palette for dark mode colors. Light mode uses `gray`. Theme colors are CSS custom properties set dynamically based on the student's enrollment color choice.

## CI/CD

- `ci.yml`: runs `script/lint` then `script/test` on every PR and non-main push.
- `deploy.yml`: gated behind `if: false`, so pushing to main deploys nothing. Deploys are manual via `script/deploy`. Note the workflow runs `deploy --env production` while `wrangler.jsonc` defines no `env.production` block — reconcile that before enabling it.
