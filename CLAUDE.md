# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo with two independent projects:

- `packages/moon-widget` — the published npm library (`moon-widget`): a React component that renders a moon-phase
  widget (current phase, illumination, moonrise/moonset, RA/Dec, Az/Alt, upcoming phase dates) for a given date and
  geographic location, plus a PIXI.js-rendered moon disc with a procedurally drawn terminator shadow.
- `apps/site` — a Next.js (App Router) landing/demo site for the widget, deployed as a **static export** to shared
  hosting via FTP.

Package manager is **Yarn Berry (v4.6.0)**. The two projects are deliberately **separate Yarn projects**, not a
single Yarn workspaces tree spanning both:

- The repo root is a workspaces root with `"workspaces": ["packages/*"]` — only the library is a workspace member.
- `apps/site` has its own `.yarnrc.yml` + `yarn.lock`, making it an independent project. This is intentional: if
  `apps/site` were a workspace member, Yarn would auto-link `moon-widget` to the local workspace copy even in a
  "production" install, defeating the point of the dev/prod split described below. Run `yarn install` separately
  in each project.

## Commands

Widget (from repo root):

```bash
yarn install                          # installs the workspaces root (packages/moon-widget only)
yarn build                            # yarn workspace moon-widget build (tsup -> dist: esm+cjs+dts+css)
yarn test                             # yarn workspace moon-widget test (jest)
yarn test:coverage
yarn eslint:check / yarn eslint:fix   # repo-wide flat config (packages/moon-widget + root config files only)
yarn prettier:check / yarn prettier:fix
yarn changeset                        # record a changeset for the next release
```

To run a single test file: `yarn workspace moon-widget jest src/MoonWidget.test.tsx`.

Site (from `apps/site` — it is not reachable via root delegator scripts since it's a separate Yarn project):

```bash
cd apps/site
yarn install
yarn dev      # next dev --webpack — widget resolves from packages/moon-widget/src (live source, see below)
yarn build    # next build with output: 'export' -> apps/site/out/ — widget resolves from the real installed npm package
yarn lint     # eslint . (flat config via eslint-config-next/core-web-vitals)
```

**Why `yarn dev` passes `--webpack`**: Next 16 defaults to Turbopack, but Turbopack's `resolveAlias` does not
reliably override an already-installed real npm dependency of the same name (see vercel/next.js#82040) — it kept
resolving to the real `node_modules/moon-widget` instead of the aliased source. Forcing webpack for dev makes the
`webpack.resolve.alias` override in `apps/site/next.config.mjs` actually take effect. `yarn build` intentionally uses
the default bundler (Turbopack) since no aliasing is needed there.

## Architecture

### Dev-from-source / build-from-npm switch (`apps/site/next.config.mjs`)

`apps/site/package.json` depends on `"moon-widget": "^0.1.0"` as an ordinary npm dependency — never `workspace:`.
`next.config.mjs` adds a **dev-only** (`NODE_ENV === 'development'`) `webpack.resolve.alias` that points the
`moon-widget` and `moon-widget/style.css` specifiers at `packages/moon-widget/src/index.ts` /
`packages/moon-widget/src/style.css` directly. In production (`next build`), no alias is applied, so the site
resolves the real, currently-published npm package — meaning the production build genuinely exercises what
consumers of the npm package get. `experimental.externalDir: true` and `turbopack.root` are set because the dev
alias reaches outside `apps/site`'s own directory tree.

**Known bootstrapping gap**: until a real release is published (see Release below), the currently-published
`moon-widget` on npm may be stale/broken relative to `packages/moon-widget/src`, so `apps/site`'s production build
can fail or serve outdated behavior. This is expected — publish first, then the site build reflects it.

Static export (`output: 'export'`) constraints apply throughout `apps/site`: no API routes, Server Actions,
Middleware, or ISR; `images.unoptimized: true` (no Image Optimization API); `app/sitemap.ts` / `app/robots.ts` need
`export const dynamic = 'force-static'`.

### `packages/moon-widget` entry point

`src/index.ts` is a plain barrel: `export { default as MoonWidget } from './MoonWidget'` + the `MoonWidgetProps`
and `MoonWidgetVariant` types. It is the only public API surface. `tsup.config.ts` builds it to `dist/` (esm + cjs +
`.d.ts` + `index.css`), and `package.json`'s `exports` map exposes `"."` (the component) and `"./style.css"` (the
stylesheet, imported explicitly by consumers — see `apps/site/src/app/page.tsx` for the pattern:
`import 'moon-widget/style.css'`).

### `MoonWidget` as a dispatcher (`src/MoonWidget.tsx`)

`MoonWidget.tsx` itself is a thin dispatcher, not where the astronomy or the layouts live:

1. Props are `lat`, `lon`, `date?`, `timezone?`, `language?` (`'en' | 'ru'`), `variant?` (`MoonWidgetVariant`,
   defaults to `'compact'`), `theme?` (`'dark' | 'light'`, defaults to `'dark'`).
2. It calls `useMoonData(lat, lon, date)` (`src/hooks/useMoonData.ts`) once, resolves `translations[language]`
   (`src/translations.ts`), and `switch (variant)`-dispatches to one of eight presentational components in
   `src/components/variants/` (`CompactWidget`, `PanelWidget`, `TimelineWidget`, `GridWidget`, `DetailWidget`,
   `LiveWidget`, `GaugeWidget`, `CardWidget`) — one per design in the original `widget.png` mockup. All eight share
   the same `VariantProps` shape (`src/components/variants/types.ts`).
3. `useMoonData` owns all the state: if `date` is omitted, an interval ticks an internal `currentDate` every second
   (live clock mode); if `date` is provided, it's static. It recomputes all derived astronomical data (via
   `suncalc`'s `getMoonIllumination`, `getMoonPosition`, `getMoonTimes`) whenever `lat`/`lon`/`date`/`currentDate`
   change, including a brute-force `findNextMoonPhase` that steps day-by-day (max 30) looking for
   illumination-phase values close to the target (0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter).
   It returns raw values (`Date` objects, numbers, an untranslated `phaseKey`) — no formatting, no i18n; that's the
   presentational layer's job. `events` holds one entry per major phase in canonical cycle order; `nextEvents` is
   the same four sorted ascending by date (`PanelWidget` uses `nextEvents.slice(0, 3)` for its upcoming-events list).
4. `language` selects a `Translation` record from `translations.ts` (`phaseNames` + UI strings for both `en`/`ru`) —
   add new UI strings to _both_ locales there. Calendar-date formatting goes through `src/utils/date.ts`
   (`dayjs`-based: `formatCalendarDate`, `formatShortDate`, `formatEventDate`, all locale-aware) plus `formatTime`
   (kept on `Intl.DateTimeFormat` for timezone-aware clock times — dayjs's timezone plugin just wraps `Intl`
   internally, so switching would add a dependency for no behavioral gain). `src/utils/sexagesimal.ts` holds
   `toHMS`/`toDMS` (RA/Dec, Az/Alt formatting — not calendar-related, dayjs doesn't apply), `src/utils/coords.ts`
   holds `formatCoords`, `src/utils/format.ts` holds locale-aware number/percent/distance formatting.
5. `DetailWidget` (the mockup's prev/next-day carousel card) is the one variant that doesn't just consume the
   dispatcher's `data` — it calls `useMoonData` a second time itself, with an internal `dayOffset` state and a
   `dayjs(date).add(dayOffset, 'day')`-derived date, so day navigation stays fully self-contained without growing
   `MoonWidgetProps`. `LiveWidget` similarly gets one extra dispatcher-computed prop, `isLive` (`= !date`), to decide
   whether its "Live" indicator actually pulses.

### Moon rendering (`src/components/MoonView/MoonView.tsx`)

The moon disc is a single `moon_image.png` rendered via `pixi.js`, with the day/night terminator drawn procedurally
as two `PIXI.Graphics` arc masks (`leftShade`/`rightShade`) rather than pre-rendered sprites. `drawPhase()` takes a
`phase` value in the same convention as `SunCalc.getMoonIllumination().phase` (0 = new moon, 0.5 = full moon, 1 = new
moon) directly — there is no unit conversion between `MoonWidget` and `MoonView`. This is the only piece of any
variant that's pixi-rendered; everything else added for the new layouts (`ProgressRing`, `PhaseTimeline`, icons) is
plain SVG/CSS.

`MoonView` takes an optional `size` prop (default `180`) so each variant can request the disc at the size its layout
needs (a ~40px thumbnail in `PanelWidget`'s mini-header up to a ~220px centered disc in `DetailWidget`/`LiveWidget`) —
`SIZE`/`CENTER`/`RADIUS` are derived from `size` inside the component rather than hardcoded module constants.

Texture loading uses a manual `new Image()` + `PIXI.Texture.from(imageElement)` rather than `PIXI.Assets.load(url)`,
because tsup's `.png` loader (`dataurl`, see `tsup.config.ts`) turns the import into a extensionless
`data:image/png;base64,...` string, which `PIXI.Assets.load`'s extension-based resolver can't identify as an image.

Initialization is async (`PIXI.Application.init()` + image decode) while `phase` can change via props before it
resolves. This is handled with a `phaseRef` (kept in sync every render via a `[phase]`-keyed effect) read at the
moment setup finishes, instead of the `phase` closure value captured when the effect first ran — otherwise a phase
change arriving mid-initialization gets silently dropped (this was a real bug in an earlier version of this
component).

### Styling

`src/style.css` is a plain (non-module) stylesheet with BEM-ish class names, imported via a bare side-effect
`import './style.css'` in `MoonWidget.tsx`. There is no CSS Modules / Sass — esbuild (via tsup) bundles plain CSS
natively with zero extra config, which keeps the build simple and avoids a class of asset-loader problems in a
component library meant to work across arbitrary consumer bundlers.

Root-level modifier classes (`moon-widget--compact`, `--panel`, `--timeline`, `--grid`, `--detail`, `--live`,
`--gauge`, `--card`) hold each variant's own layout; a separate `moon-widget--light` modifier (applied when
`theme="light"`) overrides the CSS custom properties (`--moon-widget-background`, `--moon-widget-surface`,
`--moon-widget-text-*`, etc.) and is orthogonal to `variant` — any of the eight layouts can run in either theme.
Cross-variant building blocks (`__badge`, `__stat`/`__stats` + layout modifiers `--row|--column|--icon-grid|
--icon-inline`, `__footer`, `__timeline*`, `__ring*`, `__events`) back the shared components in
`src/components/{Badge,StatItem,PhaseTimeline,ProgressRing,NextEventFooter}/` and `src/components/icons/Icons.tsx`
(inline SVGs, `stroke="currentColor"` so they inherit the active theme's text color) — reused across variants
instead of each variant component owning its own markup for these pieces.

### Type declarations

`src/declarations.d.ts` declares module shims for `suncalc` (untyped) and `*.png` (string import) — the only two
non-TS asset types imported anywhere in the package.

## Code style

- Enforced by `.prettierrc`: 4-space indent, no semicolons, single quotes.
- Root `eslint.config.mjs` is a flat config covering `packages/moon-widget` (and repo-root config files); it
  includes `simple-import-sort`, so keep import groups sorted — don't hand-order imports against the autofixer.
  `apps/site` is intentionally excluded from the root config (`apps/**` in `ignores`) and has its own
  `apps/site/eslint.config.mjs` built on `eslint-config-next/core-web-vitals` (imported directly as a flat-config
  array — `next lint` no longer exists as of Next 16, and `eslint-config-next`'s legacy-style `FlatCompat` wrapping
  is incompatible with its own natively-flat exports).
