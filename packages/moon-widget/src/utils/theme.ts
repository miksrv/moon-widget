export function themeClassName(theme: 'dark' | 'light'): string {
    return theme === 'light' ? ' moon-widget--light' : ''
}
