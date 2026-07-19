import React, { useState } from 'react'

import dayjs from 'dayjs'

import { useMoonData } from '../../hooks/useMoonData'
import { formatCalendarDate } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import NextEventFooter from '../NextEventFooter/NextEventFooter'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const DetailWidget: React.FC<VariantProps> = ({
    date,
    lat,
    lon,
    t,
    language,
    theme,
}) => {
    const [dayOffset, setDayOffset] = useState(0)
    const offsetDate = dayjs(date).add(dayOffset, 'day').toISOString()
    const data = useMoonData(lat, lon, offsetDate)
    const nextEvent = data.nextEvents[0]

    return (
        <div
            className={`moon-widget moon-widget--detail${themeClassName(theme)}`}
        >
            <div className="moon-widget__detail-header">
                <div className="moon-widget__phase">
                    {t.phaseNames[data.phaseKey]}
                </div>
                <div className="moon-widget__percent">
                    {formatPercent(data.illumination)}
                </div>
            </div>

            <div className="moon-widget__nav">
                <button
                    type="button"
                    aria-label={t.previousDay}
                    className="moon-widget__nav-button"
                    onClick={() => setDayOffset((offset) => offset - 1)}
                >
                    <ChevronLeftIcon size={16} />
                </button>

                <MoonView phase={data.phase} size={200} />

                <button
                    type="button"
                    aria-label={t.nextDay}
                    className="moon-widget__nav-button"
                    onClick={() => setDayOffset((offset) => offset + 1)}
                >
                    <ChevronRightIcon size={16} />
                </button>
            </div>

            <div className="moon-widget__stats moon-widget__stats--grid-2">
                <StatItem
                    layout="column"
                    label={t.moonAge}
                    value={`${data.age.toFixed(1)} ${t.daysUnit}`}
                />
                <StatItem
                    layout="column"
                    label={t.distanceToMoon}
                    value={formatDistance(data.distance, language, t.kmUnit)}
                />
            </div>

            {nextEvent && (
                <NextEventFooter
                    superTitle={t.nextEvent}
                    label={t.phaseNames[nextEvent.type]}
                    value={formatCalendarDate(nextEvent.date, language)}
                    chevron
                />
            )}
        </div>
    )
}

export default DetailWidget
