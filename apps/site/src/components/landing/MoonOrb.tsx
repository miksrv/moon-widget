'use client'

import { motion } from 'framer-motion'

const CRATERS = [
    { top: '18%', left: '28%', size: 46 },
    { top: '42%', left: '58%', size: 70 },
    { top: '64%', left: '22%', size: 34 },
    { top: '30%', left: '68%', size: 26 },
    { top: '72%', left: '52%', size: 22 },
    { top: '52%', left: '38%', size: 18 },
]

export default function MoonOrb() {
    return (
        <div className="lw-orb-wrap">
            <motion.div
                className="lw-orb-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
                <div className="lw-orb-dot" />
            </motion.div>

            <motion.div
                className="lw-orb"
                initial={{ y: 0 }}
                animate={{ y: [0, -14, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {CRATERS.map((crater, index) => (
                    <span
                        key={index}
                        className="lw-orb__crater"
                        style={{
                            top: crater.top,
                            left: crater.left,
                            width: crater.size,
                            height: crater.size,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    )
}
