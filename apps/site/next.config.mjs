import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    experimental: {
        // dev-only alias below points at TS source living outside apps/site
        externalDir: true,
    },
    // Turbopack is the default bundler as of Next 16, but its resolveAlias currently
    // doesn't reliably override an already-installed real npm dependency of the same
    // name (see vercel/next.js#82040) — `yarn dev` runs with `--webpack` instead so this
    // dev-only alias is honored (production `next build` uses the default bundler as
    // usual since no alias is needed there — see turbopack.root below).
    turbopack: {
        root: __dirname,
    },
    webpack: (config) => {
        if (isDev) {
            config.resolve.alias['moon-widget/style.css'] = path.resolve(
                __dirname,
                '../../packages/moon-widget/src/style.css',
            )
            config.resolve.alias['moon-widget'] = path.resolve(
                __dirname,
                '../../packages/moon-widget/src/index.ts',
            )
        }
        return config
    },
}

export default nextConfig
