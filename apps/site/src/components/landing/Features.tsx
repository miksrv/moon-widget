'use client'

import type { ReactElement } from 'react'

import { motion } from 'framer-motion'

import {
    CalendarIcon,
    ClockIcon,
    CompassIcon,
    GlobeIcon,
    type IconProps,
    MoonLogoIcon,
    PaletteIcon,
    RulerIcon,
    SunIcon,
} from './Icons'

const FEATURES: {
    icon: (props: IconProps) => ReactElement
    title: string
    desc: string
}[] = [
    {
        icon: MoonLogoIcon,
        title: 'Phase & age',
        desc: 'Current phase name and age in days, computed for any date.',
    },
    {
        icon: SunIcon,
        title: 'Illumination %',
        desc: 'Accurate illuminated fraction of the visible disc.',
    },
    {
        icon: ClockIcon,
        title: 'Rise & set times',
        desc: 'Moonrise and moonset for your latitude, longitude and timezone.',
    },
    {
        icon: RulerIcon,
        title: 'Distance',
        desc: 'Current distance to the Moon in kilometers.',
    },
    {
        icon: CompassIcon,
        title: 'Coordinates',
        desc: 'Equatorial (RA/Dec) and horizontal (Az/Alt) coordinates.',
    },
    {
        icon: CalendarIcon,
        title: 'Upcoming phases',
        desc: 'Dates for the next new, full and quarter moons.',
    },
    {
        icon: GlobeIcon,
        title: 'Localization',
        desc: 'Built-in English and Russian locales, easy to extend.',
    },
    {
        icon: PaletteIcon,
        title: 'Easy theming',
        desc: 'Fully customizable look via a handful of CSS variables.',
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: 'easeOut' as const },
    }),
}

export default function Features() {
    return (
        <section id="features" className="lw-section">
            <div className="lw-container">
                <div className="lw-section__head">
                    <span className="lw-section__eyebrow">Capabilities</span>
                    <h2 className="lw-section__title">Everything you need</h2>
                    <p className="lw-section__subtitle">
                        Powerful lunar data in a lightweight, beautiful package.
                    </p>
                </div>

                <div className="lw-features__grid">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="lw-feature-card"
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            custom={(index % 4) * 0.08}
                        >
                            <span className="lw-feature-card__icon">
                                <feature.icon size={20} />
                            </span>
                            <h3 className="lw-feature-card__title">
                                {feature.title}
                            </h3>
                            <p className="lw-feature-card__desc">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
