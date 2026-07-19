export type IconProps = {
    size?: number
    className?: string
}

const base = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
}

export function MoonLogoIcon({ size = 16, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
        >
            <path d="M20.5 14.5A9 9 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
        </svg>
    )
}

export function GithubIcon({ size = 18, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
        >
            <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
        </svg>
    )
}

export function SunIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" />
        </svg>
    )
}

export function ClockIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5.3l3.6 2.1" />
        </svg>
    )
}

export function RulerIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="m4 15 5-9M9 15l5-9M14 15l5-9" />
            <path d="M3.2 15.4h17.6l-2 5.1H5.2z" />
        </svg>
    )
}

export function CompassIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <circle cx="12" cy="12" r="9" />
            <path d="m14.8 9.2-1.9 5.6-5.6 1.9 1.9-5.6z" />
        </svg>
    )
}

export function CalendarIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
            <path d="M3.5 9.7h17M8 3v3.4M16 3v3.4" />
        </svg>
    )
}

export function GlobeIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.4 2.5 3.7 5.7 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.7-3.7-9s1.3-6.5 3.7-9Z" />
        </svg>
    )
}

export function PaletteIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.9-.9 1.9-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4.1-4-7.4-9-7.4Z" />
            <circle
                cx="7.2"
                cy="12"
                r="1.1"
                fill="currentColor"
                stroke="none"
            />
            <circle cx="9" cy="8" r="1.1" fill="currentColor" stroke="none" />
            <circle
                cx="14.5"
                cy="7.5"
                r="1.1"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    )
}

export function CopyIcon({ size = 16, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
            <path d="M15.5 8.5V6.9a2 2 0 0 0-2-2H6.4a2 2 0 0 0-2 2v7.1a2 2 0 0 0 2 2h1.6" />
        </svg>
    )
}

export function CheckIcon({ size = 16, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="m4.5 12.5 5 5 10-11" />
        </svg>
    )
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="M4 12h16M13 5l7 7-7 7" />
        </svg>
    )
}

export function BugIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <rect x="7" y="8" width="10" height="10.5" rx="4.5" />
            <path d="M9.5 8V6a2.5 2.5 0 0 1 5 0v2M4 12h3M17 12h3M5.5 17l2-1.3M18.5 17l-2-1.3M5.5 8.5l2 1.5M18.5 8.5l-2 1.5" />
        </svg>
    )
}

export function LightbulbIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="M9 18h6M10 21h4M7.5 9.5a4.5 4.5 0 1 1 9 0c0 2-1.2 3-2 3.8-.6.6-1 1.2-1 2.2h-3c0-1-.4-1.6-1-2.2-.8-.8-2-1.8-2-3.8Z" />
        </svg>
    )
}

export function PullRequestIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <circle cx="6.5" cy="6" r="2" />
            <circle cx="6.5" cy="18" r="2" />
            <circle cx="17.5" cy="18" r="2" />
            <path d="M6.5 8v8M17.5 16v-3a5 5 0 0 0-5-5h-1.5M13 8l-2-2 2-2" />
        </svg>
    )
}

export function BookIcon({ size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            {...base}
        >
            <path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H12v18H6.2A2.2 2.2 0 0 1 4 18.8Z" />
            <path d="M20 5.2A2.2 2.2 0 0 0 17.8 3H12v18h5.8a2.2 2.2 0 0 0 2.2-2.2Z" />
        </svg>
    )
}

export function StarIcon({ size = 16, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
        >
            <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.8-4.6 6.6-.9Z" />
        </svg>
    )
}
