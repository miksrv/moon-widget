import React from 'react'

import { formatCalendarDate, formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import Badge from '../Badge/Badge'
import { CalendarIcon } from '../icons/Icons'
import MoonView from '../MoonView/MoonView'
import NextEventFooter from '../NextEventFooter/NextEventFooter'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const CompactWidget: React.FC<VariantProps> = ({
    data,
    t,
    language,
    theme,
}) => {
    const nextFullMoon = data.events.find((event) => event.type === 'fullMoon')

    return (
        <div
            className={`moon-widget moon-widget--compact${themeClassName(theme)}`}
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

                <div className="moon-widget__stats">
                    <StatItem
                        label={t.moonAge}
                        value={`${data.age.toFixed(1)} ${t.daysUnit}`}
                    />
                    <StatItem
                        label={t.illumination}
                        value={formatPercent(data.illumination)}
                    />
                    <StatItem
                        label={t.rise}
                        value={formatTime(data.moonrise)}
                    />
                    <StatItem label={t.set} value={formatTime(data.moonset)} />
                    <StatItem
                        label={t.distanceToMoon}
                        value={formatDistance(
                            data.distance,
                            language,
                            t.kmUnit,
                        )}
                    />
                </div>

                {nextFullMoon && (
                    <NextEventFooter
                        icon={<CalendarIcon size={18} />}
                        label={t.nextFullMoon}
                        value={formatCalendarDate(nextFullMoon.date, language)}
                    />
                )}
            </div>
        </div>
    )
}

export default CompactWidget
