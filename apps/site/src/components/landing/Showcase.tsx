'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { MoonWidget, type MoonWidgetVariant } from 'moon-widget'
import 'moon-widget/style.css'

import { CheckIcon } from './Icons'

const HIGHLIGHTS = [
    {
        title: 'Phase & age',
        desc: 'The current phase name and how many days into the lunar cycle it is.',
    },
    {
        title: 'Illumination',
        desc: 'The fraction of the visible disc currently lit by the sun.',
    },
    {
        title: 'Rise & set times',
        desc: 'Moonrise and moonset for the given coordinates and timezone.',
    },
    {
        title: 'Distance & upcoming phases',
        desc: 'Distance to the Moon plus the next new, full and quarter dates.',
    },
]

const VARIANTS: { key: MoonWidgetVariant; label: string; wide?: boolean }[] = [
    { key: 'compact', label: 'Compact' },
    { key: 'panel', label: 'Panel' },
    { key: 'timeline', label: 'Timeline', wide: true },
    { key: 'grid', label: 'Grid' },
    { key: 'detail', label: 'Detail' },
    { key: 'live', label: 'Live', wide: true },
    { key: 'gauge', label: 'Gauge' },
    { key: 'card', label: 'Card' },
]

export default function Showcase() {
    const [variant, setVariant] = useState<MoonWidgetVariant>('compact')
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    const isWide = VARIANTS.find((item) => item.key === variant)?.wide

    return (
        <section id="showcase" className="lw-section">
            <div className="lw-container">
                <div className="lw-showcase__picker">
                    <div className="lw-showcase__variants">
                        {VARIANTS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                className={`lw-tab ${variant === item.key ? 'lw-tab--active' : ''}`}
                                onClick={() => setVariant(item.key)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="lw-showcase__theme">
                        <button
                            type="button"
                            className={`lw-tab ${theme === 'dark' ? 'lw-tab--active' : ''}`}
                            onClick={() => setTheme('dark')}
                        >
                            Dark
                        </button>
                        <button
                            type="button"
                            className={`lw-tab ${theme === 'light' ? 'lw-tab--active' : ''}`}
                            onClick={() => setTheme('light')}
                        >
                            Light
                        </button>
                    </div>
                </div>

                <div
                    className={`lw-showcase__grid ${isWide ? 'lw-showcase__grid--stacked' : ''}`}
                >
                    <motion.div
                        className="lw-showcase__frame"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={`${variant}-${theme}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                <MoonWidget
                                    lat={51.76712}
                                    lon={55.09785}
                                    timezone="Asia/Yekaterinburg"
                                    variant={variant}
                                    theme={theme}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <span className="lw-section__eyebrow">
                            Live preview
                        </span>
                        <h2 className="lw-section__title">See it in action</h2>
                        <p className="lw-section__subtitle">
                            This is the actual <code>&lt;MoonWidget /&gt;</code>{' '}
                            component, rendering live, real astronomical data
                            for a real location — not a mockup. Pick any of the{' '}
                            {VARIANTS.length} built-in layouts above and toggle
                            between dark and light themes.
                        </p>

                        <ul className="lw-showcase__list">
                            {HIGHLIGHTS.map((item) => (
                                <li key={item.title}>
                                    <span className="lw-showcase__check">
                                        <CheckIcon size={16} />
                                    </span>
                                    <span>
                                        <strong>{item.title}</strong> —{' '}
                                        {item.desc}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 24 }}>
                            <span className="lw-live-dot">
                                <span className="lw-live-dot__pulse" />
                                Updating in real time, every second
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
