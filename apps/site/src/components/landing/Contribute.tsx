'use client'

import { motion } from 'framer-motion'

import {
    ArrowRightIcon,
    BugIcon,
    GithubIcon,
    LightbulbIcon,
    PullRequestIcon,
} from './Icons'

const GITHUB_URL = 'https://github.com/miksrv/moon-widget'

const WAYS_TO_HELP = [
    {
        icon: BugIcon,
        label: 'Report a bug',
        detail: 'found something broken?',
    },
    {
        icon: LightbulbIcon,
        label: 'Suggest a feature',
        detail: 'ideas are always welcome',
    },
    {
        icon: PullRequestIcon,
        label: 'Open a pull request',
        detail: 'fixes, features, docs — all count',
    },
]

export default function Contribute() {
    return (
        <section id="contribute" className="lw-section">
            <div className="lw-container">
                <motion.div
                    className="lw-contribute"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div>
                        <h2 className="lw-contribute__title">
                            Open source, built in the open
                        </h2>
                        <p className="lw-contribute__text">
                            Moon Widget is MIT-licensed and free to use. It
                            grows through the people who use it — star the repo
                            to follow along, or jump in with an issue or a pull
                            request.
                        </p>
                        <div className="lw-contribute__actions">
                            <a
                                className="lw-btn lw-btn--primary"
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <GithubIcon size={16} />
                                Star on GitHub
                            </a>
                            <a
                                className="lw-btn lw-btn--secondary"
                                href={`${GITHUB_URL}/issues`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View open issues
                                <ArrowRightIcon size={15} />
                            </a>
                        </div>
                    </div>

                    <ul className="lw-ways">
                        {WAYS_TO_HELP.map((way) => (
                            <li key={way.label}>
                                <span className="lw-ways__icon">
                                    <way.icon size={16} />
                                </span>
                                <span>
                                    {way.label} <span>— {way.detail}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    )
}
