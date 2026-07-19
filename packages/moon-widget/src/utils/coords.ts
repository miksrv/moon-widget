export function formatCoords(lat: number, lon: number): string {
    const latLabel = lat >= 0 ? 'N' : 'S'
    const lonLabel = lon >= 0 ? 'E' : 'W'
    return `${Math.abs(lat).toFixed(4)}° ${latLabel}, ${Math.abs(lon).toFixed(4)}° ${lonLabel}`
}
