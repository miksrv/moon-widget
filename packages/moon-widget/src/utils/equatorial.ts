const RAD = Math.PI / 180
const OBLIQUITY = RAD * 23.4397 // obliquity of the ecliptic (J2000)
const DAY_MS = 1000 * 60 * 60 * 24
const J1970 = 2440588
const J2000 = 2451545

function toDays(date: Date): number {
    return date.valueOf() / DAY_MS - 0.5 + J1970 - J2000
}

function rightAscension(l: number, b: number): number {
    return Math.atan2(
        Math.sin(l) * Math.cos(OBLIQUITY) - Math.tan(b) * Math.sin(OBLIQUITY),
        Math.cos(l),
    )
}

function declination(l: number, b: number): number {
    return Math.asin(
        Math.sin(b) * Math.cos(OBLIQUITY) +
            Math.cos(b) * Math.sin(OBLIQUITY) * Math.sin(l),
    )
}

export interface EquatorialCoords {
    /** Right ascension, in degrees [0, 360) — divide by 15 for hours. */
    ra: number
    /** Declination, in degrees [-90, 90]. */
    dec: number
}

/**
 * Geocentric equatorial coordinates (RA/Dec) of the Moon.
 *
 * Unlike SunCalc's public `getMoonPosition()` (which only returns azimuth/altitude — horizon
 * coordinates that depend on the observer's lat/lon and the time of day), RA/Dec are
 * observer-independent. SunCalc computes an equivalent geocentric RA/Dec internally as an
 * intermediate step (see its unexported `moonCoords()`) before projecting to azimuth/altitude —
 * this reimplements that same low-precision lunar position formula
 * (aa.quae.nl / Meeus, "Astronomical Algorithms" 2nd ed., ch. 47) to expose it directly.
 */
export function getMoonEquatorialCoords(date: Date): EquatorialCoords {
    const d = toDays(date)

    const L = RAD * (218.316 + 13.176396 * d) // ecliptic longitude
    const M = RAD * (134.963 + 13.064993 * d) // mean anomaly
    const F = RAD * (93.272 + 13.22935 * d) // mean distance

    const l = L + RAD * 6.289 * Math.sin(M) // corrected longitude
    const b = RAD * 5.128 * Math.sin(F) // corrected latitude

    const raDeg = (rightAscension(l, b) * 180) / Math.PI
    const decDeg = (declination(l, b) * 180) / Math.PI

    return {
        ra: ((raDeg % 360) + 360) % 360,
        dec: decDeg,
    }
}
