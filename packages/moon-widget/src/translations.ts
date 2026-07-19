import type { PhaseKey } from './hooks/useMoonData'

export interface Translation {
    phaseNames: Record<PhaseKey, string>
    moonAge: string
    distanceToMoon: string
    illumination: string
    rise: string
    set: string
    raDec: string
    azAlt: string
    nextFullMoon: string
    nextEvent: string
    nextEvents: string
    illuminated: string
    daysOld: string
    daysUnit: string
    kmUnit: string
    moonToday: string
    moon: string
    live: string
    today: string
    moonPhaseLabel: string
    timezoneLabel: string
    previousDay: string
    nextDay: string
}

export const translations: Record<'en' | 'ru', Translation> = {
    en: {
        phaseNames: {
            newMoon: 'New Moon',
            waxingCrescent: 'Waxing Crescent',
            firstQuarter: 'First Quarter',
            waxingGibbous: 'Waxing Gibbous',
            fullMoon: 'Full Moon',
            waningGibbous: 'Waning Gibbous',
            lastQuarter: 'Last Quarter',
            waningCrescent: 'Waning Crescent',
        },
        moonAge: 'Age',
        distanceToMoon: 'Distance',
        illumination: 'Illumination',
        rise: 'Rise',
        set: 'Set',
        raDec: 'RA/Dec',
        azAlt: 'Az/Alt',
        nextFullMoon: 'Next Full Moon',
        nextEvent: 'Next Event',
        nextEvents: 'Next events',
        illuminated: 'illuminated',
        daysOld: 'days old',
        daysUnit: 'days',
        kmUnit: 'km',
        moonToday: 'Moon Today',
        moon: 'Moon',
        live: 'Live',
        today: 'Today',
        moonPhaseLabel: 'Moon Phase',
        timezoneLabel: 'Timezone',
        previousDay: 'Previous day',
        nextDay: 'Next day',
    },
    ru: {
        phaseNames: {
            newMoon: 'Новолуние',
            waxingCrescent: 'Растущий серп',
            firstQuarter: 'Первая четверть',
            waxingGibbous: 'Растущая Луна',
            fullMoon: 'Полнолуние',
            waningGibbous: 'Убывающая Луна',
            lastQuarter: 'Последняя четверть',
            waningCrescent: 'Убывающий серп',
        },
        moonAge: 'Возраст',
        distanceToMoon: 'Расстояние',
        illumination: 'Освещённость',
        rise: 'Восход',
        set: 'Заход',
        raDec: 'RA/Dec',
        azAlt: 'Аз/Альт',
        nextFullMoon: 'Следующее полнолуние',
        nextEvent: 'Следующее событие',
        nextEvents: 'Ближайшие события',
        illuminated: 'освещено',
        daysOld: 'дней',
        daysUnit: 'дней',
        kmUnit: 'км',
        moonToday: 'Луна сегодня',
        moon: 'Луна',
        live: 'Онлайн',
        today: 'Сегодня',
        moonPhaseLabel: 'Фаза Луны',
        timezoneLabel: 'Часовой пояс',
        previousDay: 'Предыдущий день',
        nextDay: 'Следующий день',
    },
}
