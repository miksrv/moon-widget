export function toHMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const sign = degrees < 0 ? '-' : ''
    const abs = Math.abs(degrees)
    const hours = Math.floor(abs / 15)
    const minutes = Math.floor((abs % 15) * 4)
    const seconds = ((abs % 15) * 240) % 60
    return `${sign}${hours}h ${minutes}m ${seconds.toFixed(1)}s`
}

export function toDMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const sign = degrees < 0 ? '-' : ''
    const abs = Math.abs(degrees)
    const d = Math.floor(abs)
    const m = Math.floor((abs - d) * 60)
    const s = ((abs - d) * 3600) % 60
    return `${sign}${d}°${m}'${s.toFixed(1)}"`
}
