import React from 'react'

import { formatCoords } from '../../utils/coords'
import { formatCalendarDate, formatTime } from '../../utils/date'
import { formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import Badge from '../Badge/Badge'
import {
    ArrowDownIcon,
    CalendarIcon,
    ClockIcon,
    IlluminationIcon,
    PinIcon,
    SunIcon,
} from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import NextEventFooter from '../NextEventFooter/NextEventFooter'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const CardWidget: React.FC<VariantProps> = ({
    data,
    t,
    language,
    lat,
    lon,
    theme,
}) => {
    const nextFullMoon = data.events.find((event) => event.type === 'fullMoon')

    return (
        <div
            className={`moon-widget moon-widget--card${themeClassName(theme)}`}
        >
            <div className="moon-widget__header">
                <SunIcon size={18} />
                <span className="moon-widget__coords">
                    <PinIcon size={14} />
                    {formatCoords(lat, lon)}
                </span>
            </div>

            <div className="moon-widget__row">
                <MoonView phase={data.phase} size={90} />
                <div>
                    <div className="moon-widget__eyebrow">{t.moonToday}</div>
                    <div className="moon-widget__title-row">
                        <span className="moon-widget__phase">
                            {t.phaseNames[data.phaseKey]}
                        </span>
                        <Badge>{formatPercent(data.illumination)}</Badge>
                    </div>
                </div>
            </div>

            <div className="moon-widget__stats moon-widget__stats--flex">
                <StatItem
                    layout="icon-grid"
                    icon={<ClockIcon size={18} />}
                    label={t.moonAge}
                    value={`${data.age.toFixed(1)} ${t.daysUnit}`}
                />
                <StatItem
                    layout="icon-grid"
                    icon={<IlluminationIcon size={18} />}
                    label={t.illumination}
                    value={formatPercent(data.illumination)}
                />
                <StatItem
                    layout="icon-grid"
                    icon={<SunIcon size={18} />}
                    label={t.rise}
                    value={formatTime(data.moonrise)}
                />
                <StatItem
                    layout="icon-grid"
                    icon={<ArrowDownIcon size={18} />}
                    label={t.set}
                    value={formatTime(data.moonset)}
                />
            </div>

            {nextFullMoon && (
                <NextEventFooter
                    icon={<CalendarIcon size={18} />}
                    label={t.nextFullMoon}
                    value={formatCalendarDate(nextFullMoon.date, language)}
                    chevron
                />
            )}
        </div>
    )
}

export default CardWidget
