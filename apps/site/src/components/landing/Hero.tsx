'use client'

import { motion } from 'framer-motion'

import { ArrowRightIcon, GithubIcon, StarIcon } from './Icons'
import MoonOrb from './MoonOrb'

const GITHUB_URL = 'https://github.com/miksrv/moon-widget'

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: 'easeOut' as const },
    }),
}

export default function Hero() {
    return (
        <section id="top" className="lw-hero">
            <div className="lw-container lw-hero__grid">
                <div>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0}
                    >
                        <span className="lw-pill">
                            <StarIcon size={13} />
                            Real-time. Accurate. Beautiful.
                        </span>
                    </motion.div>

                    <motion.h1
                        className="lw-hero__title"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.08}
                    >
                        A moon phase widget
                        <br />
                        for your{' '}
                        <span className="lw-hero__title-gradient">website</span>
                    </motion.h1>

                    <motion.p
                        className="lw-hero__subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.16}
                    >
                        Moon Widget is a drop-in React component that renders
                        the current moon phase, illumination, moonrise and
                        moonset, coordinates and upcoming phases — with a
                        procedurally shaded moon disc for any date and location.
                    </motion.p>

                    <motion.div
                        className="lw-hero__cta"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.24}
                    >
                        <a className="lw-btn lw-btn--primary" href="#install">
                            Get Started
                            <ArrowRightIcon size={15} />
                        </a>
                        <a
                            className="lw-btn lw-btn--secondary"
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubIcon size={16} />
                            Star on GitHub
                        </a>
                    </motion.div>

                    <motion.div
                        className="lw-hero__badges"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.32}
                    >
                        <span className="lw-badge">React component</span>
                        <span className="lw-badge">TypeScript</span>
                        <span className="lw-badge">Lightweight</span>
                        <span className="lw-badge">MIT License</span>
                    </motion.div>
                </div>

                <motion.div
                    className="lw-hero__visual"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <MoonOrb />
                </motion.div>
            </div>
        </section>
    )
}
