'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import CopyButton from './CopyButton'
import { BookIcon } from './Icons'

const PACKAGE_MANAGERS = [
    { id: 'npm', label: 'npm', command: 'npm install moon-widget' },
    { id: 'yarn', label: 'yarn', command: 'yarn add moon-widget' },
    { id: 'pnpm', label: 'pnpm', command: 'pnpm add moon-widget' },
] as const

export default function Install() {
    const [active, setActive] =
        useState<(typeof PACKAGE_MANAGERS)[number]['id']>('yarn')

    const activeCommand = PACKAGE_MANAGERS.find((pm) => pm.id === active)!

    return (
        <section id="install" className="lw-section">
            <div className="lw-container">
                <div className="lw-section__head">
                    <span className="lw-section__eyebrow">Getting started</span>
                    <h2 className="lw-section__title">Install in seconds</h2>
                    <p className="lw-section__subtitle">
                        One command to get started.
                    </p>
                </div>

                <motion.div
                    className="lw-install__grid"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <div className="lw-panel">
                        <div className="lw-panel__header">
                            {PACKAGE_MANAGERS.map((pm) => (
                                <button
                                    key={pm.id}
                                    type="button"
                                    className={`lw-tab${active === pm.id ? ' lw-tab--active' : ''}`}
                                    onClick={() => setActive(pm.id)}
                                >
                                    {pm.label}
                                </button>
                            ))}
                        </div>
                        <div className="lw-panel__body">
                            <div className="lw-code-row">
                                <code>
                                    <span className="lw-tok-cmd">$</span>{' '}
                                    {activeCommand.command}
                                </code>
                                <CopyButton text={activeCommand.command} />
                            </div>

                            <div className="lw-help-card">
                                <BookIcon size={18} />
                                <span>
                                    Need help? Check the{' '}
                                    <a
                                        href="https://github.com/miksrv/moon-widget/blob/main/packages/moon-widget/README.md"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        documentation
                                    </a>{' '}
                                    for all props and advanced options.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lw-panel">
                        <div className="lw-panel__header">
                            <span
                                className="lw-tab lw-tab--active"
                                style={{ cursor: 'default' }}
                            >
                                Basic usage
                            </span>
                        </div>
                        <pre className="lw-codeblock">
                            <code>
                                <span className="lw-tok-kw">import</span>
                                {' { '}
                                <span className="lw-tok-fn">MoonWidget</span>
                                {' } '}
                                <span className="lw-tok-kw">from</span>{' '}
                                <span className="lw-tok-str">
                                    &apos;moon-widget&apos;
                                </span>
                                {'\n'}
                                <span className="lw-tok-kw">import</span>{' '}
                                <span className="lw-tok-str">
                                    &apos;moon-widget/style.css&apos;
                                </span>
                                {'\n\n'}
                                <span className="lw-tok-kw">
                                    export default
                                </span>{' '}
                                <span className="lw-tok-kw">function</span>{' '}
                                <span className="lw-tok-fn">App</span>
                                {'() {\n    '}
                                <span className="lw-tok-kw">return</span>
                                {' (\n        <'}
                                <span className="lw-tok-fn">MoonWidget</span>
                                {'\n            '}
                                <span className="lw-tok-prop">lat</span>
                                {'={'}
                                <span className="lw-tok-num">51.5074</span>
                                {'}\n            '}
                                <span className="lw-tok-prop">lon</span>
                                {'={'}
                                <span className="lw-tok-num">-0.1278</span>
                                {'}\n            '}
                                <span className="lw-tok-prop">timezone</span>
                                {'='}
                                <span className="lw-tok-str">
                                    &quot;Europe/London&quot;
                                </span>
                                {'\n            '}
                                <span className="lw-tok-prop">language</span>
                                {'='}
                                <span className="lw-tok-str">
                                    &quot;en&quot;
                                </span>
                                {'\n            '}
                                <span className="lw-tok-prop">variant</span>
                                {'='}
                                <span className="lw-tok-str">
                                    &quot;horizontal&quot;
                                </span>
                                {'\n        />\n    )\n}'}
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
