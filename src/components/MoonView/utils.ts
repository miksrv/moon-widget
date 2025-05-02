/*
 * Force a value into a number.
 */
const forceNumber = (n: unknown): number => {
    let num = Number(n)
    if (isNaN(num) || typeof n === 'undefined') {
        num = 0
    }
    return num
}

/*
 * Convert degrees to radians.
 */
const degToRad = (degrees: number): number => {
    return (degrees * Math.PI) / 180
}

const radToDeg = (radians: number): number => {
    return (radians * 180) / Math.PI
}

const getPercentIlluminated = (moonPhase: number): number => {
    const percent = (1 - Math.cos(moonPhase)) / 2
    return percent * 100
}

const roundToOnePlace = (n: number): number => {
    return Math.round(n * 10) / 10
}

/*
 * Given the exact moon phase, return the broad bucket that this
 * phase is called in this interactive. This is used to keep the
 * phase dropdown up to date with the current scenario.
 */
const getPhaseSlot = (moonPhase: number): number | null => {
    const phase = radToDeg(moonPhase)

    // New Moon
    if (Math.abs(phase - 180) < 5 || Math.abs(phase + 180) < 5) {
        return 180
    }

    // First Quarter
    if (Math.abs(phase + 90) < 5) {
        return -90
    }

    // Full Moon
    if (Math.abs(phase) < 5) {
        return 0
    }

    // Third Quarter
    if (Math.abs(phase - 90) < 5) {
        return 90
    }

    // Waxing Crescent
    if (Math.abs(phase + 135) < 45) {
        return -135
    }

    // Waxing Gibbous
    if (Math.abs(phase + 45) < 45) {
        return -45
    }

    // Waning Gibbous
    if (Math.abs(phase - 45) < 45) {
        return 45
    }

    // Waning Crescent
    if (Math.abs(phase - 135) < 45) {
        return 135
    }

    // error
    return null
}

/*
 * Given the moon phase (some point along the moon's 360-degree
 * orbit), return the time, in hours, since it's been a New Moon (180
 * degrees).
 */
const getTimeSinceNewMoon = (phase: number): number => {
    return (phase + Math.PI) / ((Math.PI * 2) / 708.734136)
}

/*
 * Given a time interval in hours, shorten it by displaying days and
 * hours.
 */
const formatInterval = (i: number): string => {
    const quotient = Math.floor(i / 24)
    const remainder = i % 24

    const quotientPlural = quotient === 1 ? '' : 's'
    const remainderPlural = remainder === 1 ? '' : 's'

    if (quotient) {
        return `${quotient} day${quotientPlural}, ${remainder} hour${remainderPlural}`
    }
    return `${remainder} hour${remainderPlural}`
}

export {
    degToRad,
    forceNumber,
    formatInterval,
    getPercentIlluminated,
    getPhaseSlot,
    getTimeSinceNewMoon,
    radToDeg,
    roundToOnePlace,
}
