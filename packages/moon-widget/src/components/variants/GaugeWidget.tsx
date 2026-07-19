import React from 'react'

import { formatTime } from '../../utils/date'
import { formatDistance, formatPercent } from '../../utils/format'
import { themeClassName } from '../../utils/theme'
import ProgressRing from '../ProgressRing/ProgressRing'
import StatItem from '../StatItem/StatItem'

import type { VariantProps } from './types'

const GaugeWidget: React.FC<VariantProps> = ({ data, t, language, theme }) => (
    <div className={`moon-widget moon-widget--gauge${themeClassName(theme)}`}>
        <ProgressRing value={data.illumination} size={140}>
            {formatPercent(data.illumination)}
        </ProgressRing>

        <div className="moon-widget__gauge-caption">
            <div className="moon-widget__phase">
                {t.phaseNames[data.phaseKey]}
            </div>
            <div className="moon-widget__date">
                {data.age.toFixed(1)} {t.daysOld}
            </div>
        </div>

        <div className="moon-widget__stats">
            <StatItem label={t.rise} value={formatTime(data.moonrise)} />
            <StatItem label={t.set} value={formatTime(data.moonset)} />
            <StatItem
                label={t.distanceToMoon}
                value={formatDistance(data.distance, language, t.kmUnit)}
            />
        </div>
    </div>
)

export default GaugeWidget
