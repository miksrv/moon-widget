---
'moon-widget': major
---

First real, working release of the library.

Previously published `0.1.0` did not actually export `MoonWidget` (the package entry point was a dev-mount script) and the build was broken (unbuildable Sass import). This release:

- Fixes the package entry point to export `MoonWidget` and `MoonWidgetProps`.
- Replaces the old 31-PNG sprite moon renderer with a single-image PIXI.js renderer (`components/MoonView`) that draws the terminator shadow procedurally, fixing a phase-update race condition in the process.
- Replaces Sass/CSS Modules with a plain `style.css`, importable as `moon-widget/style.css`.
- Drops unused dependencies (`react-scripts`, `pixi.js`-unused-leftovers, `sass`, `sass-loader`, `@types/prop-types`).
