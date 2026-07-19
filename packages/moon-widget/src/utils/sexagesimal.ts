export function toHMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const hours = Math.floor(degrees / 15)
    const minutes = Math.floor((degrees % 15) * 4)
    const seconds = ((degrees % 15) * 240) % 60
    return `${hours}h ${minutes}m ${seconds.toFixed(1)}s`
}

export function toDMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const d = Math.floor(degrees)
    const m = Math.floor((degrees - d) * 60)
    const s = ((degrees - d) * 3600) % 60
    return `${d}°${m}'${s.toFixed(1)}"`
}
