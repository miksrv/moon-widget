import React, { useEffect, useState } from 'react'
import SunCalc from 'suncalc'

import MoonImage from './components/MoonImage/MoonImage'
import styles from './styles.module.sass'

export interface MoonWidgetProps {
    lat: number
    lon: number
    date?: string
    timezone?: string
    language?: 'en' | 'ru'
    variant?: 'vertical' | 'horizontal'
}

const translations = {
    en: {
        moonAge: 'Age',
        distanceToMoon: 'Distance',
        illumination: 'Illumination',
        moonRise: 'Moon Rise',
        moonSet: 'Moon Set',
        raDec: 'RA/Dec',
        azAlt: 'Az/Alt',
        nextNewMoon: 'Next New Moon',
        nextFullMoon: 'Next Full Moon',
        firstQuarter: 'First Quarter',
        lastQuarter: 'Last Quarter',
        moonAltitude: 'Moon Altitude',
        moonAzimuth: 'Moon Azimuth',
        parallacticAngle: 'Parallactic Angle',
        nextMoonHigh: 'Next Moon High'
    },
    ru: {
        moonAge: 'Возраст',
        distanceToMoon: 'Расстояние',
        illumination: 'Освещенность',
        moonRise: 'Восход',
        moonSet: 'Закат',
        raDec: 'RA/Dec',
        azAlt: 'Аз/Альт',
        nextNewMoon: 'Следующее новолуние',
        nextFullMoon: 'Следующее полнолуние',
        firstQuarter: 'Первая четверть',
        lastQuarter: 'Последняя четверть',
        moonAltitude: 'Высота',
        moonAzimuth: 'Азимут',
        parallacticAngle: 'Параллактический угол',
        nextMoonHigh: 'Следующий максимум'
    }
}

const MoonWidget: React.FC<MoonWidgetProps> = ({ lat, lon, date, timezone, language = 'en', variant = 'vertical' }) => {
    const [currentDate, setCurrentDate] = useState(() => (date ? new Date(date) : new Date()))
    const [moonPhase, setMoonPhase] = useState(0)
    const [moonData, setMoonData] = useState({
        age: 0,
        distance: 0,
        illumination: 0,
        moonrise: 'Unknown',
        moonset: 'Unknown',
        nextNewMoon: 'Unknown',
        nextFullMoon: 'Unknown',
        nextFirstQuarter: 'Unknown',
        nextLastQuarter: 'Unknown',
        altitude: 0,
        azimuth: 0,
        ra: 'Unknown',
        dec: 'Unknown',
        az: 'Unknown',
        alt: 'Unknown',
        parallacticAngle: 0,
        nextMoonHigh: 'Unknown'
    })

    const t = translations[language]

    useEffect(() => {
        if (!date) {
            const interval = setInterval(() => setCurrentDate(new Date()), 1000)
            return () => clearInterval(interval)
        }
    }, [date])

    useEffect(() => {
        const selectedDate = date ? new Date(date) : currentDate
        const moonIllumination = SunCalc.getMoonIllumination(selectedDate)
        const moonPosition = SunCalc.getMoonPosition(selectedDate, lat, lon)
        const moonTimes = SunCalc.getMoonTimes(selectedDate, lat, lon)

        const lunarCycle = 29.53
        const moonAge = moonIllumination.phase * lunarCycle
        const distanceToMoon = 384400 * (1 - moonIllumination.fraction * 0.05)

        const findNextMoonPhase = (targetPhase: number): string => {
            const testDate = new Date(selectedDate)
            for (let days = 0; days < 30; days++) {
                testDate.setDate(testDate.getDate() + 1)
                if (Math.abs(SunCalc.getMoonIllumination(testDate).phase - targetPhase) <= 0.035) {
                    return testDate.toISOString().split('T')[0]
                }
            }
            return 'Unknown'
        }

        setMoonPhase(moonIllumination.phase)
        setMoonData({
            age: moonAge,
            distance: distanceToMoon,
            illumination: moonIllumination.fraction,
            moonrise: moonTimes.rise ? formatTime(moonTimes.rise, timezone) : 'No rise',
            moonset: moonTimes.set ? formatTime(moonTimes.set, timezone) : 'No set',
            nextNewMoon: findNextMoonPhase(0),
            nextFullMoon: findNextMoonPhase(0.5),
            nextFirstQuarter: findNextMoonPhase(0.25),
            nextLastQuarter: findNextMoonPhase(0.75),
            altitude: moonPosition.altitude,
            azimuth: moonPosition.azimuth,
            ra: moonPosition.azimuth ? toHMS((moonPosition.azimuth * 180) / 15) : 'Unknown',
            dec: moonPosition.altitude ? toDMS(moonPosition.altitude * (180 / Math.PI)) : 'Unknown',
            az: toDMS((moonPosition.azimuth * 180) / Math.PI),
            alt: toDMS((moonPosition.altitude * 180) / Math.PI),
            parallacticAngle: moonPosition.parallacticAngle,
            nextMoonHigh: formatTime(new Date(selectedDate.getTime() + 12 * 60 * 60 * 1000), timezone)
        })
    }, [lat, lon, date, currentDate])

    return (
        <div className={cn(styles.moonWidget, styles[variant])}>
            <div className={styles.moon}>
                <div className={styles.moonPhase}>{getPhaseName(moonPhase)}</div>
                <MoonImage illuminationPhase={moonData.illumination}
zenithAngle={moonData.altitude}
parallacticAngle={moonData.parallacticAngle} />
                <div className={styles.date}>{formatDate(currentDate)}</div>
            </div>

            <div className={styles.information}>
                <div className={styles.property}>
                    <div className={styles.key}>{t.moonAge}</div>
                    <span>{moonData.age.toFixed(1)} days</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.distanceToMoon}</div>
                    <span>{moonData.distance.toFixed(0)} km</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.illumination}</div>
                    <span>{Math.round(moonData.illumination * 100)}%</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.moonRise}</div>
                    <span>{moonData.moonrise}</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.moonSet}</div>
                    <span>{moonData.moonset}</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.raDec}</div>
                    <span>
                        {moonData.ra} {moonData.dec}
                    </span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.azAlt}</div>
                    <span>
                        {moonData.az} {moonData.alt}
                    </span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.nextNewMoon}</div>
                    <span>{formatDate(moonData.nextNewMoon, 'DD/MM/YYYY')}</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.nextFullMoon}</div>
                    <span>{formatDate(moonData.nextFullMoon, 'DD/MM/YYYY')}</span>
                </div>
                <div className={styles.property}>
                    <div className={styles.key}>{t.firstQuarter}</div>
                    <span>{formatDate(moonData.nextFirstQuarter, 'DD/MM/YYYY')}</span>
                </div>
                {/*<div className={styles.property}>*/}
                {/*    <div className={styles.key}>{t.lastQuarter}</div>*/}
                {/*    <span>{formatDate(moonData.nextLastQuarter, 'DD/MM/YYYY')}</span>*/}
                {/*</div>*/}
                {/*<div className={styles.property}>*/}
                {/*    <div className={styles.key}>{t.moonAltitude}</div>*/}
                {/*    <span>{moonData.altitude.toFixed(2)}{'°'}</span>*/}
                {/*</div>*/}
                {/*<div className={styles.property}>*/}
                {/*    <div className={styles.key}>{t.moonAzimuth}</div>*/}
                {/*    <span>{moonData.azimuth.toFixed(2)}{'°'}</span>*/}
                {/*</div>*/}
                {/*<div className={styles.property}>*/}
                {/*    <div className={styles.key}>{t.parallacticAngle}</div>*/}
                {/*    <span>{moonData.parallacticAngle.toFixed(2)}{'°'}</span>*/}
                {/*</div>*/}
                {/*<div className={styles.property}>*/}
                {/*    <div className={styles.key}>{t.nextMoonHigh}</div>*/}
                {/*    <span>{moonData.nextMoonHigh}</span>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

const cn = (...args: (string | boolean | undefined)[]): string => args.filter((item: any) => !!item).join(' ')

function formatTime(date: Date | null, timezone?: string): string {
    return date
        ? new Intl.DateTimeFormat('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: timezone || 'UTC'
          }).format(date)
        : 'No event'
}

function toHMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const hours = Math.floor(degrees / 15)
    const minutes = Math.floor((degrees % 15) * 4)
    const seconds = ((degrees % 15) * 240) % 60
    return `${hours}h ${minutes}m ${seconds.toFixed(1)}s`
}

function toDMS(degrees: number): string {
    if (isNaN(degrees)) {
        return 'Unknown'
    }
    const d = Math.floor(degrees)
    const m = Math.floor((degrees - d) * 60)
    const s = ((degrees - d) * 3600) % 60
    return `${d}°${m}'${s.toFixed(1)}"`
}

function formatDate(date: Date | string, format = 'DD/MM/YYYY, HH:mm'): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date
    const day = String(parsedDate.getDate()).padStart(2, '0')
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
    const year = parsedDate.getFullYear()
    const hours = String(parsedDate.getHours()).padStart(2, '0')
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0')

    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', String(year))
        .replace('HH', hours)
        .replace('mm', minutes)
}

function getPhaseName(fraction: number): string {
    if (fraction < 0.03) {
        return 'New Moon'
    }
    if (fraction < 0.22) {
        return 'Waxing Crescent'
    }
    if (fraction < 0.28) {
        return 'First Quarter'
    }
    if (fraction < 0.47) {
        return 'Waxing Gibbous'
    }
    if (fraction < 0.53) {
        return 'Full Moon'
    }
    if (fraction < 0.72) {
        return 'Waning Gibbous'
    }
    if (fraction < 0.78) {
        return 'Last Quarter'
    }
    if (fraction < 0.97) {
        return 'Waning Crescent'
    }
    return 'New Moon'
}

export default MoonWidget
