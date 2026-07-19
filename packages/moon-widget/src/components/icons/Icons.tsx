import React from 'react'

export interface IconProps {
    className?: string
    size?: number
}

const base = (size = 16) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
})

export const MenuIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
)

export const PinIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.3" />
    </svg>
)

export const CalendarIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
)

export const ClockIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
    </svg>
)

export const IlluminationIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="8.5" />
        <path
            d="M12 3.5a8.5 8.5 0 0 0 0 17Z"
            fill="currentColor"
            stroke="none"
        />
    </svg>
)

export const ArrowUpIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M12 19V6M6 11l6-6 6 6" />
    </svg>
)

export const ArrowDownIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M12 5v13M6 13l6 6 6-6" />
    </svg>
)

export const DistanceIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2.5" />
    </svg>
)

export const GlobeIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </svg>
)

export const CompassIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m14.5 9.5-1.8 4.7a1 1 0 0 1-.5.5l-4.7 1.8 1.8-4.7a1 1 0 0 1 .5-.5Z" />
    </svg>
)

export const SunIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
    </svg>
)

export const ChevronLeftIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M15 5l-7 7 7 7" />
    </svg>
)

export const ChevronRightIcon: React.FC<IconProps> = ({ className, size }) => (
    <svg className={className} {...base(size)}>
        <path d="M9 5l7 7-7 7" />
    </svg>
)

export const LivePulseIcon: React.FC<IconProps> = ({ className, size = 8 }) => (
    <span
        className={className}
        style={{
            width: size,
            height: size,
        }}
    />
)
