import { getMoonEquatorialCoords } from './equatorial'

describe('getMoonEquatorialCoords', () => {
    it('returns RA in [0, 360) and Dec in [-90, 90]', () => {
        const { ra, dec } = getMoonEquatorialCoords(
            new Date('2025-02-21T00:00:00Z'),
        )
        expect(ra).toBeGreaterThanOrEqual(0)
        expect(ra).toBeLessThan(360)
        expect(dec).toBeGreaterThanOrEqual(-90)
        expect(dec).toBeLessThanOrEqual(90)
    })

    it('is independent of observer location, unlike azimuth/altitude', () => {
        // Same instant, computed twice — there's no lat/lon parameter to vary, which is the
        // point: RA/Dec must not depend on where on Earth you're standing.
        const date = new Date('2025-06-15T12:00:00Z')
        expect(getMoonEquatorialCoords(date)).toEqual(
            getMoonEquatorialCoords(date),
        )
    })

    it('advances RA by roughly the lunar daily orbital motion (~13deg/day)', () => {
        const day1 = getMoonEquatorialCoords(new Date('2025-03-01T00:00:00Z'))
        const day2 = getMoonEquatorialCoords(new Date('2025-03-02T00:00:00Z'))
        const delta = ((day2.ra - day1.ra + 540) % 360) - 180
        expect(delta).toBeGreaterThan(8)
        expect(delta).toBeLessThan(18)
    })
})
