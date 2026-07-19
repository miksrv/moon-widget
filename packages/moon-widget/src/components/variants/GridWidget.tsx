import React from 'react'

import { formatCoords } from '../../utils/coords'
import { formatCalendarDate, formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import Badge from '../Badge/Badge'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CalendarIcon,
    ClockIcon,
    DistanceIcon,
    IlluminationIcon,
    PinIcon,
} from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const GridWidget: React.FC<VariantProps> = ({
    data,
    t,
    language,
    lat,
    lon,
    timezone,
    theme,
}) => {
    const nextFullMoon = data.events.find((event) => event.type === 'fullMoon')

    return (
        <div
            className={`moon-widget moon-widget--grid${themeClassName(theme)}`}
        >
            <div className="moon-widget__moon">
                <MoonView phase={data.phase} size={130} />
            </div>

            <div className="moon-widget__body">
                <div className="moon-widget__title-row">
                    <span className="moon-widget__phase">
                        {t.phaseNames[data.phaseKey]}
                    </span>
                    <Badge>{formatPercent(data.illumination)}</Badge>
                </div>

                <div className="moon-widget__stats moon-widget__stats--grid-3">
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
                        icon={<ArrowUpIcon size={18} />}
                        label={t.rise}
                        value={formatTime(data.moonrise)}
                    />
                    <StatItem
                        layout="icon-grid"
                        icon={<ArrowDownIcon size={18} />}
                        label={t.set}
                        value={formatTime(data.moonset)}
                    />
                    <StatItem
                        layout="icon-grid"
                        icon={<DistanceIcon size={18} />}
                        label={t.distanceToMoon}
                        value={formatDistance(
                            data.distance,
                            language,
                            t.kmUnit,
                        )}
                    />
                    {nextFullMoon && (
                        <StatItem
                            layout="icon-grid"
                            icon={<CalendarIcon size={18} />}
                            label={t.nextFullMoon}
                            value={formatCalendarDate(
                                nextFullMoon.date,
                                language,
                            )}
                        />
                    )}
                </div>

                <div className="moon-widget__footer">
                    <span className="moon-widget__coords">
                        <PinIcon size={14} />
                        {formatCoords(lat, lon)}
                    </span>
                    {timezone && (
                        <span className="moon-widget__footer-value">
                            {t.timezoneLabel}: {timezone}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GridWidget
