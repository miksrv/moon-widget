import type { Metadata } from 'next'

import './globals.css'

// TODO: replace with the real production domain once it's known
const SITE_URL = 'https://moon-widget.example.com'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Moon Widget — React moon phase component',
        template: '%s — Moon Widget',
    },
    description:
        'Moon Widget is a React component that shows the current moon phase, illumination, rise/set times and more for any date and location.',
    openGraph: {
        title: 'Moon Widget — React moon phase component',
        description:
            'A drop-in React component that shows the current moon phase, illumination, rise/set times and more for any date and location.',
        url: SITE_URL,
        siteName: 'Moon Widget',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
