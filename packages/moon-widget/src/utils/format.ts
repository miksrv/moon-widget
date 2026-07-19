import type { Language } from './date'

const LOCALES: Record<Language, string> = {
    en: 'en-US',
    ru: 'ru-RU',
}

export function formatNumber(value: number, language: Language): string {
    return value.toLocaleString(LOCALES[language])
}

export function formatDistance(
    km: number,
    language: Language,
    unit: string,
): string {
    return `${formatNumber(Math.round(km), language)} ${unit}`
}

export function formatPercent(fraction: number): string {
    return `${Math.round(fraction * 100)}%`
}
