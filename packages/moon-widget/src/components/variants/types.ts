import type { MoonData } from '../../hooks/useMoonData'
import type { Translation } from '../../translations'
import type { Language } from '../../utils/date'

export interface VariantProps {
    data: MoonData
    t: Translation
    language: Language
    date: Date
    lat: number
    lon: number
    timezone?: string
    theme: 'dark' | 'light'
}
