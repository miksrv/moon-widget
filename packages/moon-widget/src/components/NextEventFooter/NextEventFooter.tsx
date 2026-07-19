import React from 'react'

import { ChevronRightIcon } from '../icons/Icons'

export interface NextEventFooterProps {
    icon?: React.ReactNode
    superTitle?: string
    label: string
    value: string
    chevron?: boolean
}

const NextEventFooter: React.FC<NextEventFooterProps> = ({
    icon,
    superTitle,
    label,
    value,
    chevron,
}) => (
    <div className="moon-widget__footer">
        {icon && <span className="moon-widget__footer-icon">{icon}</span>}
        <div className="moon-widget__footer-main">
            {superTitle && (
                <span className="moon-widget__footer-super">{superTitle}</span>
            )}
            <span className="moon-widget__footer-label">{label}</span>
        </div>
        <span className="moon-widget__footer-value">{value}</span>
        {chevron && (
            <span className="moon-widget__footer-chevron">
                <ChevronRightIcon size={16} />
            </span>
        )}
    </div>
)

export default NextEventFooter
