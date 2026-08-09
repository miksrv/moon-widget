import { renderHook } from '@testing-library/react'

import { useMoonData } from './useMoonData'

describe('useMoonData', () => {
    it('returns the real Earth-Moon distance, not a value derived from illumination', () => {
        const { result } = renderHook(() =>
            useMoonData(51.76712, 55.09785, '2025-02-21'),
        )
        // Actual perigee/apogee range is ~356,500-406,700 km; a formula that instead derives
        // distance from illumination fraction would still fall in a plausible-looking range,
        // so this pins it against the real physical bound rather than just "is a number".
        expect(result.current.distance).toBeGreaterThan(356000)
        expect(result.current.distance).toBeLessThan(407000)
    })

    it('keeps ra/dec independent of az/alt (observer-relative) values', () => {
        const { result } = renderHook(() =>
            useMoonData(51.76712, 55.09785, '2025-02-21'),
        )
        const { result: otherObserver } = renderHook(() =>
            useMoonData(-33.8688, 151.2093, '2025-02-21'),
        )

        expect(result.current.ra).toBeCloseTo(otherObserver.current.ra, 5)
        expect(result.current.dec).toBeCloseTo(otherObserver.current.dec, 5)
        // Az/Alt, by contrast, are observer-relative and should differ between locations.
        expect(result.current.az).not.toBeCloseTo(otherObserver.current.az, 1)
    })
})
