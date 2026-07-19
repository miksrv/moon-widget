import React from 'react'

export interface ProgressRingProps {
    /** 0..1 */
    value: number
    size?: number
    strokeWidth?: number
    children?: React.ReactNode
}

const ProgressRing: React.FC<ProgressRingProps> = ({
    value,
    size = 140,
    strokeWidth = 10,
    children,
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - value)

    return (
        <div
            className="moon-widget__ring"
            style={{
                width: size,
                height: size,
            }}
        >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="moon-widget__ring-track"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    className="moon-widget__ring-progress"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <div className="moon-widget__ring-content">{children}</div>
        </div>
    )
}

export default ProgressRing
