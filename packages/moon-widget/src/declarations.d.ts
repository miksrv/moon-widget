declare module 'suncalc' {
    export interface MoonIllumination {
        fraction: number
        phase: number
        angle: number
    }

    export interface MoonPosition {
        azimuth: number
        altitude: number
        distance: number
        parallacticAngle: number
    }

    export interface MoonTimes {
        rise?: Date
        set?: Date
        alwaysUp?: boolean
        alwaysDown?: boolean
    }

    const SunCalc: {
        getMoonIllumination(date: Date): MoonIllumination
        getMoonPosition(date: Date, lat: number, lon: number): MoonPosition
        getMoonTimes(
            date: Date,
            lat: number,
            lon: number,
            inUTC?: boolean,
        ): MoonTimes
    }

    export default SunCalc
}

declare module '*.png' {
    const content: string
    export default content
}
