import dayjs from 'dayjs'

import 'dayjs/locale/ru'

export type Language = 'en' | 'ru'

const CALENDAR_FORMATS: Record<Language, string> = {
    en: 'MMM D, YYYY HH:mm',
    ru: 'D MMMM YYYY HH:mm',
}

const SHORT_FORMATS: Record<Language, string> = {
    en: 'MMM D',
    ru: 'D MMM',
}

const EVENT_DATE_FORMATS: Record<Language, string> = {
    en: 'MMM D, YYYY',
    ru: 'D MMMM YYYY',
}

export function formatCalendarDate(date: Date, language: Language): string {
    return dayjs(date).locale(language).format(CALENDAR_FORMATS[language])
}

export function formatShortDate(date: Date, language: Language): string {
    return dayjs(date).locale(language).format(SHORT_FORMATS[language])
}

export function formatEventDate(date: Date, language: Language): string {
    return dayjs(date).locale(language).format(EVENT_DATE_FORMATS[language])
}

export function formatTime(date: Date | null, timezone?: string): string {
    return date
        ? new Intl.DateTimeFormat('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: timezone || 'UTC',
          }).format(date)
        : 'No event'
}
