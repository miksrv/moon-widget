import type { Metadata } from 'next'

import { SITE_URL } from '../config'

import './globals.css'

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
