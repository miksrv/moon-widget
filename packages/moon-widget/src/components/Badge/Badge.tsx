import React from 'react'

export interface BadgeProps {
    children: React.ReactNode
    className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
    <span className={`moon-widget__badge ${className ?? ''}`.trim()}>
        {children}
    </span>
)

export default Badge
