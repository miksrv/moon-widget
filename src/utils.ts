/**
 * Force a value into a number.
 */
export const forceNumber = (n: unknown): number => {
    const parsed = Number(n)
    return isNaN(parsed) || typeof n === 'undefined' ? 0 : parsed
}

/**
 * Convert degrees to radians.
 */
export const degToRad = (degrees: number): number => {
    return degrees * Math.PI / 180
}

/**
 * Convert radians to degrees.
 */
export const radToDeg = (radians: number): number => {
    return radians * 180 / Math.PI
}

/**
 * Get the percentage of the moon illuminated based on its phase.
 */
export const getPercentIlluminated = (moonPhase: number): number => {
    const percent = (1 - Math.cos(moonPhase)) / 2
    return percent * 100
}

/**
 * Round a number to one decimal place.
 */
export const roundToOnePlace = (n: number): number => {
    return Math.round(n * 10) / 10
}

/**
 * Given the exact moon phase, return the broad bucket that this phase falls into.
 */
export const getPhaseSlot = (moonPhase: number): number | null => {
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
    // Error case
    return null
}

/**
 * Given the moon phase (some point along the moon's 360-degree orbit),
 * return the time in hours since it has been a New Moon (180 degrees).
 */
export const getTimeSinceNewMoon = (phase: number): number => {
    return (phase + Math.PI) / ((Math.PI * 2) / 708.734136)
}

/**
 * Format a time interval in hours into days and hours.
 */
export const formatInterval = (i: number): string => {
    const quotient = Math.floor(i / 24)
    const remainder = i % 24
    const quotientPlural = quotient === 1 ? '' : 's'
    const remainderPlural = remainder === 1 ? '' : 's'

    if (quotient) {
        return `${quotient} day${quotientPlural}, ${remainder} hour${remainderPlural}`
    } 
        return `${remainder} hour${remainderPlural}`
    
}
