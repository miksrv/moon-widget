import { toDMS, toHMS } from './sexagesimal'

describe('toHMS', () => {
    it('formats a positive degree value', () => {
        expect(toHMS(180)).toBe('12h 0m 0.0s')
    })

    it('formats a negative degree value with a leading sign, not a corrupted magnitude', () => {
        expect(toHMS(-15)).toBe('-1h 0m 0.0s')
    })

    it('returns "Unknown" for NaN', () => {
        expect(toHMS(NaN)).toBe('Unknown')
    })
})

describe('toDMS', () => {
    it('formats a positive degree value', () => {
        expect(toDMS(23.5)).toBe('23°30\'0.0"')
    })

    it('formats a negative degree value with a leading sign, not a corrupted magnitude', () => {
        // Math.floor(-23.5) === -24, which would silently produce the wrong d/m/s split
        // if the sign weren't stripped before decomposing into degrees/minutes/seconds.
        expect(toDMS(-23.5)).toBe('-23°30\'0.0"')
    })

    it('returns "Unknown" for NaN', () => {
        expect(toDMS(NaN)).toBe('Unknown')
    })
})
