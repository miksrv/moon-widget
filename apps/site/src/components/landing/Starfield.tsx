import type { CSSProperties } from 'react'

/**
 * Star positions are generated with a fixed-seed PRNG (not Math.random) so
 * server-rendered and client-hydrated markup match exactly.
 */
function seededRandom(seed: number) {
    let state = seed
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296
        return state / 4294967296
    }
}

type Star = {
    top: string
    left: string
    size: number
    duration: number
    delay: number
    minOpacity: number
    maxOpacity: number
}

function generateStars(count: number): Star[] {
    const random = seededRandom(1337)
    return Array.from({ length: count }, () => ({
        top: `${(random() * 100).toFixed(2)}%`,
        left: `${(random() * 100).toFixed(2)}%`,
        size: 1 + random() * 1.6,
        duration: 3 + random() * 4,
        delay: random() * 5,
        minOpacity: 0.1 + random() * 0.2,
        maxOpacity: 0.6 + random() * 0.4,
    }))
}

const STARS = generateStars(90)

export default function Starfield() {
    return (
        <div className="lw-starfield" aria-hidden="true">
            {STARS.map((star, index) => (
                <span
                    key={index}
                    className="lw-star"
                    style={
                        {
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            animationDuration: `${star.duration}s`,
                            animationDelay: `${star.delay}s`,
                            '--lw-star-min-opacity': star.minOpacity,
                            '--lw-star-max-opacity': star.maxOpacity,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    )
}
