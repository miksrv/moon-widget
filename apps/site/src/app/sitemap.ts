import type { MetadataRoute } from 'next'

// required for static `output: 'export'` builds
export const dynamic = 'force-static'

// TODO: replace with the real production domain once it's known
const SITE_URL = 'https://moon-widget.example.com'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
