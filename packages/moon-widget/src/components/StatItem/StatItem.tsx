import React from 'react'

export type StatItemLayout = 'row' | 'column' | 'icon-grid' | 'icon-inline'

export interface StatItemProps {
    icon?: React.ReactNode
    label: string
    value: string
    layout?: StatItemLayout
}

const StatItem: React.FC<StatItemProps> = ({
    icon,
    label,
    value,
    layout = 'row',
}) => (
    <div className={`moon-widget__stat moon-widget__stat--${layout}`}>
        {icon && <span className="moon-widget__stat-icon">{icon}</span>}
        <span className="moon-widget__stat-label">{label}</span>
        <span className="moon-widget__stat-value">{value}</span>
    </div>
)

export default StatItem
