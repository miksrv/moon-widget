import React from 'react'

import { formatCalendarDate, formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { toDMS, toHMS } from '../../utils/sexagesimal'
import { themeClassName } from '../../utils/theme'
import { CalendarIcon, CompassIcon, GlobeIcon } from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

export interface LiveWidgetProps extends VariantProps {
    isLive: boolean
}

const LiveWidget: React.FC<LiveWidgetProps> = ({
    data,
    t,
    language,
    theme,
    isLive,
}) => {
    const nextFullMoon = data.events.find((event) => event.type === 'fullMoon')

    return (
        <div
            className={`moon-widget moon-widget--live${themeClassName(theme)}`}
        >
            <div className="moon-widget__header">
                <span>{t.moon}</span>
                <span
                    className={`moon-widget__live${isLive ? ' moon-widget__live--active' : ''}`}
                >
                    <span className="moon-widget__live-dot" />
                    {t.live}
                </span>
            </div>

            <div className="moon-widget__row">
                <div className="moon-widget__body">
                    <div>
                        <div className="moon-widget__phase">
                            {t.phaseNames[data.phaseKey]}
                        </div>
                        <div className="moon-widget__date">
                            {formatPercent(data.illumination)} {t.illuminated}
                        </div>
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
                            value={formatDistance(
                                data.distance,
                                language,
                                t.kmUnit,
                            )}
                        />
                        <StatItem
                            layout="column"
                            label={t.rise}
                            value={formatTime(data.moonrise)}
                        />
                        <StatItem
                            layout="column"
                            label={t.set}
                            value={formatTime(data.moonset)}
                        />
                    </div>
                </div>

                <MoonView phase={data.phase} size={200} />
            </div>

            <div className="moon-widget__stats moon-widget__stats--grid-3">
                <StatItem
                    layout="icon-inline"
                    icon={<GlobeIcon size={16} />}
                    label={t.raDec}
                    value={
                        data.ra != null && data.dec != null
                            ? `${toHMS(data.ra)} ${toDMS(data.dec)}`
                            : 'Unknown'
                    }
                />
                <StatItem
                    layout="icon-inline"
                    icon={<CompassIcon size={16} />}
                    label={t.azAlt}
                    value={`${toDMS(data.az)} ${toDMS(data.alt)}`}
                />
                {nextFullMoon && (
                    <StatItem
                        layout="icon-inline"
                        icon={<CalendarIcon size={16} />}
                        label={t.nextFullMoon}
                        value={formatCalendarDate(nextFullMoon.date, language)}
                    />
                )}
            </div>
        </div>
    )
}

export default LiveWidget
