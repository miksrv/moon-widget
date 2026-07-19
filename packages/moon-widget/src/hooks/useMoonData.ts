import { useEffect, useState } from 'react'

import SunCalc from 'suncalc'

export type PhaseKey =
    | 'newMoon'
    | 'waxingCrescent'
    | 'firstQuarter'
    | 'waxingGibbous'
    | 'fullMoon'
    | 'waningGibbous'
    | 'lastQuarter'
    | 'waningCrescent'

export type MajorPhaseKey =
    | 'newMoon'
    | 'firstQuarter'
    | 'fullMoon'
    | 'lastQuarter'

export interface MoonPhaseEvent {
    type: MajorPhaseKey
    date: Date
}

export interface MoonData {
    date: Date
    /** 0 = new moon, 0.5 = full moon, 1 = new moon (SunCalc.getMoonIllumination().phase convention) */
    phase: number
    phaseKey: PhaseKey
    age: number
    illumination: number
    distance: number
    moonrise: Date | null
    moonset: Date | null
    altitude: number
    azimuth: number
    parallacticAngle: number
    ra: number | null
    dec: number | null
    az: number
    alt: number
    /** New moon, first quarter, full moon, last quarter — canonical cycle order */
    events: MoonPhaseEvent[]
    /** Same 4 events, sorted ascending by date */
    nextEvents: MoonPhaseEvent[]
}

const LUNAR_CYCLE_DAYS = 29.53

const PHASE_TARGETS: Record<MajorPhaseKey, number> = {
    newMoon: 0,
    firstQuarter: 0.25,
    fullMoon: 0.5,
    lastQuarter: 0.75,
}

function getPhaseKey(fraction: number): PhaseKey {
    if (fraction < 0.03) {
        return 'newMoon'
    }
    if (fraction < 0.22) {
        return 'waxingCrescent'
    }
    if (fraction < 0.28) {
        return 'firstQuarter'
    }
    if (fraction < 0.47) {
        return 'waxingGibbous'
    }
    if (fraction < 0.53) {
        return 'fullMoon'
    }
    if (fraction < 0.72) {
        return 'waningGibbous'
    }
    if (fraction < 0.78) {
        return 'lastQuarter'
    }
    if (fraction < 0.97) {
        return 'waningCrescent'
    }
    return 'newMoon'
}

function findNextMoonPhase(from: Date, targetPhase: number): Date | null {
    const testDate = new Date(from)
    for (let days = 0; days < 30; days++) {
        testDate.setDate(testDate.getDate() + 1)
        if (
            Math.abs(
                SunCalc.getMoonIllumination(testDate).phase - targetPhase,
            ) <= 0.035
        ) {
            return new Date(testDate)
        }
    }
    return null
}

function computeMoonData(
    selectedDate: Date,
    lat: number,
    lon: number,
): MoonData {
    const moonIllumination = SunCalc.getMoonIllumination(selectedDate)
    const moonPosition = SunCalc.getMoonPosition(selectedDate, lat, lon)
    const moonTimes = SunCalc.getMoonTimes(selectedDate, lat, lon)

    const age = moonIllumination.phase * LUNAR_CYCLE_DAYS
    const distance = 384400 * (1 - moonIllumination.fraction * 0.05)

    const events = (Object.keys(PHASE_TARGETS) as MajorPhaseKey[])
        .map((type) => ({
            type,
            date: findNextMoonPhase(selectedDate, PHASE_TARGETS[type]),
        }))
        .filter((event): event is MoonPhaseEvent => event.date != null)

    const nextEvents = [...events].sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
    )

    return {
        date: selectedDate,
        phase: moonIllumination.phase,
        phaseKey: getPhaseKey(moonIllumination.phase),
        age,
        illumination: moonIllumination.fraction,
        distance,
        moonrise: moonTimes.rise ?? null,
        moonset: moonTimes.set ?? null,
        altitude: moonPosition.altitude,
        azimuth: moonPosition.azimuth,
        parallacticAngle: moonPosition.parallacticAngle,
        ra: moonPosition.azimuth ? (moonPosition.azimuth * 180) / 15 : null,
        dec: moonPosition.altitude
            ? moonPosition.altitude * (180 / Math.PI)
            : null,
        az: (moonPosition.azimuth * 180) / Math.PI,
        alt: (moonPosition.altitude * 180) / Math.PI,
        events,
        nextEvents,
    }
}

export function useMoonData(lat: number, lon: number, date?: string): MoonData {
    const [currentDate, setCurrentDate] = useState(() =>
        date ? new Date(date) : new Date(),
    )

    useEffect(() => {
        if (!date) {
            const interval = setInterval(() => setCurrentDate(new Date()), 1000)
            return () => clearInterval(interval)
        }
    }, [date])

    const [moonData, setMoonData] = useState(() =>
        computeMoonData(date ? new Date(date) : currentDate, lat, lon),
    )

    useEffect(() => {
        const selectedDate = date ? new Date(date) : currentDate
        setMoonData(computeMoonData(selectedDate, lat, lon))
    }, [lat, lon, date, currentDate])

    return moonData
}
