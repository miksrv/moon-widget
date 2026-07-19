import React from 'react'

import { formatShortDate, formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import Badge from '../Badge/Badge'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ClockIcon,
    DistanceIcon,
    IlluminationIcon,
} from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import PhaseTimeline from '../PhaseTimeline/PhaseTimeline'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const TimelineWidget: React.FC<VariantProps> = ({
    data,
    t,
    language,
    theme,
}) => {
    const soonest = data.nextEvents[0]
    const nodes = data.events.map((event) => ({
        key: event.type,
        label: t.phaseNames[event.type],
        date: formatShortDate(event.date, language),
        active: soonest
            ? event.date.getTime() === soonest.date.getTime()
            : false,
    }))

    return (
        <div
            className={`moon-widget moon-widget--timeline${themeClassName(theme)}`}
        >
            <div className="moon-widget__title-row">
                <div>
                    <div className="moon-widget__eyebrow">
                        {t.moonPhaseLabel}
                    </div>
                    <div className="moon-widget__phase">{t.today}</div>
                </div>
                <Badge>
                    {t.phaseNames[data.phaseKey]}{' '}
                    {formatPercent(data.illumination)}
                </Badge>
            </div>

            <div className="moon-widget__row">
                <MoonView phase={data.phase} size={130} />
                <PhaseTimeline nodes={nodes} />
            </div>

            <div className="moon-widget__stats moon-widget__stats--flex">
                <StatItem
                    layout="icon-inline"
                    icon={<ClockIcon size={16} />}
                    label={t.moonAge}
                    value={`${data.age.toFixed(1)} ${t.daysUnit}`}
                />
                <StatItem
                    layout="icon-inline"
                    icon={<IlluminationIcon size={16} />}
                    label={t.illumination}
                    value={formatPercent(data.illumination)}
                />
                <StatItem
                    layout="icon-inline"
                    icon={<ArrowUpIcon size={16} />}
                    label={t.rise}
                    value={formatTime(data.moonrise)}
                />
                <StatItem
                    layout="icon-inline"
                    icon={<ArrowDownIcon size={16} />}
                    label={t.set}
                    value={formatTime(data.moonset)}
                />
                <StatItem
                    layout="icon-inline"
                    icon={<DistanceIcon size={16} />}
                    label={t.distanceToMoon}
                    value={formatDistance(data.distance, language, t.kmUnit)}
                />
            </div>
        </div>
    )
}

export default TimelineWidget
