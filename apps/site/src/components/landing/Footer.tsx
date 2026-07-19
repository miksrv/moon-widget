import { GithubIcon, MoonLogoIcon } from './Icons'

const GITHUB_URL = 'https://github.com/miksrv/moon-widget'

const COLUMNS = [
    {
        title: 'Product',
        links: [
            { label: 'Showcase', href: '#showcase' },
            { label: 'Features', href: '#features' },
            { label: 'Install', href: '#install' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'GitHub', href: GITHUB_URL },
            { label: 'Issues', href: `${GITHUB_URL}/issues` },
            { label: 'Discussions', href: `${GITHUB_URL}/discussions` },
            { label: 'Contributing', href: '#contribute' },
        ],
    },
    {
        title: 'Resources',
        links: [
            {
                label: 'Documentation',
                href: `${GITHUB_URL}/blob/main/packages/moon-widget/README.md`,
            },
            {
                label: 'npm package',
                href: 'https://www.npmjs.com/package/moon-widget',
            },
            {
                label: 'License',
                href: `${GITHUB_URL}/blob/main/packages/moon-widget/LICENSE`,
            },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="lw-footer">
            <div className="lw-container">
                <div className="lw-footer__top">
                    <div>
                        <a className="lw-logo" href="#top">
                            <span className="lw-logo__icon">
                                <MoonLogoIcon size={17} />
                            </span>
                            Moon Widget
                        </a>
                        <p className="lw-footer__brand-desc">
                            A beautiful, accurate and lightweight React
                            component for Moon data.
                        </p>
                    </div>

                    {COLUMNS.map((column) => (
                        <div key={column.title}>
                            <p className="lw-footer__col-title">
                                {column.title}
                            </p>
                            <ul className="lw-footer__col">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target={
                                                link.href.startsWith('#')
                                                    ? undefined
                                                    : '_blank'
                                            }
                                            rel={
                                                link.href.startsWith('#')
                                                    ? undefined
                                                    : 'noreferrer'
                                            }
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="lw-footer__bottom">
                    <span>
                        © {new Date().getFullYear()} Moon Widget. All rights
                        reserved.
                    </span>
                    <a
                        className="lw-btn lw-btn--ghost"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GithubIcon size={15} />
                        Star on GitHub
                    </a>
                    <span>MIT License</span>
                </div>
            </div>
        </footer>
    )
}
