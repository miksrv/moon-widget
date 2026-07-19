import React from 'react'

import { formatCoords } from '../../utils/coords'
import { formatEventDate, formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { toDMS, toHMS } from '../../utils/sexagesimal'
import { themeClassName } from '../../utils/theme'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ClockIcon,
    CompassIcon,
    DistanceIcon,
    GlobeIcon,
    MenuIcon,
    PinIcon,
} from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const PanelWidget: React.FC<VariantProps> = ({
    data,
    t,
    language,
    lat,
    lon,
    theme,
}) => (
    <div className={`moon-widget moon-widget--panel${themeClassName(theme)}`}>
        <div className="moon-widget__header">
            <MenuIcon size={18} />
            <span className="moon-widget__coords">
                <PinIcon size={14} />
                {formatCoords(lat, lon)}
            </span>
        </div>

        <div className="moon-widget__mini-header">
            <MoonView phase={data.phase} size={40} />
            <div className="moon-widget__mini-header-text">
                <span className="moon-widget__phase">
                    {t.phaseNames[data.phaseKey]}
                </span>
                <span className="moon-widget__mini-header-subtext">
                    {t.illumination} {formatPercent(data.illumination)}
                </span>
            </div>
        </div>

        <div className="moon-widget__moon">
            <MoonView phase={data.phase} size={220} />
        </div>

        <div className="moon-widget__stats moon-widget__stats--grid-2">
            <StatItem
                layout="icon-grid"
                icon={<ArrowUpIcon size={16} />}
                label={t.rise}
                value={formatTime(data.moonrise)}
            />
            <StatItem
                layout="icon-grid"
                icon={<ArrowDownIcon size={16} />}
                label={t.set}
                value={formatTime(data.moonset)}
            />
            <StatItem
                layout="icon-grid"
                icon={<ClockIcon size={16} />}
                label={t.moonAge}
                value={`${data.age.toFixed(1)} ${t.daysUnit}`}
            />
            <StatItem
                layout="icon-grid"
                icon={<DistanceIcon size={16} />}
                label={t.distanceToMoon}
                value={formatDistance(data.distance, language, t.kmUnit)}
            />
        </div>

        <div>
            <div className="moon-widget__section-title">{t.nextEvents}</div>
            <div className="moon-widget__events">
                {data.nextEvents.slice(0, 3).map((event) => (
                    <div key={event.type} className="moon-widget__event">
                        <span className="moon-widget__event-dot" />
                        <span className="moon-widget__event-label">
                            {t.phaseNames[event.type]}
                        </span>
                        <span className="moon-widget__event-value">
                            {formatEventDate(event.date, language)}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="moon-widget__stats moon-widget__stats--grid-2">
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
        </div>
    </div>
)

export default PanelWidget
