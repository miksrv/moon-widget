# moon-widget (monorepo)

This repository contains two independent projects:

- [`packages/moon-widget`](packages/moon-widget) — the `moon-widget` npm package. See its
  [README](packages/moon-widget/README.md) for install/usage.
- [`apps/site`](apps/site) — a Next.js landing/demo site for the widget, deployed as a static export.

See [`CLAUDE.md`](CLAUDE.md) for detailed commands and architecture notes.

## Quick start

```bash
# widget
yarn install
yarn build
yarn test

# site (separate Yarn project, run from apps/site)
cd apps/site
yarn install
yarn dev
```

## License

MIT
