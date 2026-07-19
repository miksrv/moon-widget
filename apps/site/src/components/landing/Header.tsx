'use client'

import { useEffect, useState } from 'react'

import { GithubIcon, MoonLogoIcon } from './Icons'

const GITHUB_URL = 'https://github.com/miksrv/moon-widget'

const NAV_LINKS = [
    { href: '#showcase', label: 'Showcase' },
    { href: '#features', label: 'Features' },
    { href: '#install', label: 'Install' },
    { href: '#contribute', label: 'Contribute' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={`lw-header${scrolled ? ' lw-header--scrolled' : ''}`}
        >
            <div className="lw-container lw-header__inner">
                <a className="lw-logo" href="#top">
                    <span className="lw-logo__icon">
                        <MoonLogoIcon size={17} />
                    </span>
                    Moon Widget
                </a>

                <nav className="lw-nav">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            className="lw-nav__link"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="lw-header__actions">
                    <a
                        className="lw-btn lw-btn--ghost"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GithubIcon size={16} />
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    )
}
