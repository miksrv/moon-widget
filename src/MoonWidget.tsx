import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";
import MoonPhaseView from "./MoonPhaseView";

interface MoonWidgetProps {
    lat: number;
    lon: number;
    date?: string;
    timezone?: string;
}

const MoonWidget: React.FC<MoonWidgetProps> = ({ lat, lon, date, timezone }) => {
    const [currentDate, setCurrentDate] = useState(new Date(date || ''));
    const [moonPhase, setMoonPhase] = useState(0);
    const [moonData, setMoonData] = useState({
        age: 0,
        distance: 0,
        illumination: 0,
        moonrise: "Unknown",
        moonset: "Unknown",
        nextNewMoon: "Unknown",
        nextFullMoon: "Unknown",
        nextFirstQuarter: "Unknown",
        nextLastQuarter: "Unknown",
        altitude: 0,
        azimuth: 0,
        ra: 'Unknown',
        dec: 'Unknown',
        az: 'Unknown',
        alt: 'Unknown',
        parallacticAngle: 0,
        nextMoonHigh: "Unknown",
    });

    useEffect(() => {
        if (!date) {
            const interval = setInterval(() => {
                setCurrentDate(new Date());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [date]);

    useEffect(() => {
        const selectedDate = date ? new Date(date) : currentDate;
        const moonIllumination = SunCalc.getMoonIllumination(selectedDate);
        const moonPosition = SunCalc.getMoonPosition(selectedDate, lat, lon);
        const moonTimes = SunCalc.getMoonTimes(selectedDate, lat, lon);

        setMoonPhase(moonIllumination.phase);

        const lunarCycle = 29.53;
        const moonAge = moonIllumination.phase * lunarCycle;
        const distanceToMoon = 384400 * (1 - moonIllumination.fraction * 0.05);

        function findNextMoonPhase(targetPhase: number): string {
            let days = 0;
            let testDate = new Date(selectedDate);

            while (days < 30) {
                testDate.setDate(testDate.getDate() + 1);
                const testPhase = SunCalc.getMoonIllumination(testDate).phase;
                if (Math.abs(Number(testPhase.toFixed(3)) - targetPhase) <= 0.035) {
                    return testDate.toISOString().split("T")[0];
                }
                days++;
            }
            return "Unknown";
        }

        setMoonData({
            age: moonAge,
            distance: distanceToMoon,
            illumination: moonIllumination.fraction,
            moonrise: moonTimes.rise ? formatTime(moonTimes.rise, timezone) : "No rise",
            moonset: moonTimes.set ? formatTime(moonTimes.set, timezone) : "No set",
            nextNewMoon: findNextMoonPhase(0),
            nextFullMoon: findNextMoonPhase(0.5),
            nextFirstQuarter: findNextMoonPhase(0.25),
            nextLastQuarter: findNextMoonPhase(0.75),
            altitude: moonPosition.altitude,
            azimuth: moonPosition.azimuth,
            ra: moonData.azimuth ? toHMS((moonData.azimuth * 180) / 15) : "Unknown",
            dec: moonData.altitude ? toDMS(moonData.altitude * (180 / Math.PI)) : "Unknown",
            az: toDMS((moonData.azimuth * 180) / Math.PI),
            alt: toDMS((moonData.altitude * 180) / Math.PI),
            parallacticAngle: moonPosition.parallacticAngle,
            nextMoonHigh: formatTime(new Date(selectedDate.getTime() + 12 * 60 * 60 * 1000), timezone),
        });
    }, [lat, lon, date, currentDate]);

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
            <h3>Moon Widget</h3>

            <MoonPhaseView phase={moonPhase} shadowIntensity={1.5} shadowSpread={0.2} />

            <p>DATE: {currentDate?.toISOString()}</p>
            <p>Current Moon Phase: {getPhaseName(moonPhase)}</p>
            <p>Current Moon Phase: {moonPhase.toFixed(5)}</p>
            <p>Moon Age: {moonData.age.toFixed(1)} days</p>
            <p>Distance to Moon: {moonData.distance.toFixed(0)} km</p>
            <p>Illumination: {Math.round(moonData.illumination * 100)}%</p>
            <p>Moon Rise: {moonData.moonrise}</p>
            <p>Moon Set: {moonData.moonset}</p>
            <p>RA/Dec: {moonData.ra} {moonData.dec}</p>
            <p>Az/Alt: {moonData.az} {moonData.alt}</p>
            <p>Next New Moon: {moonData.nextNewMoon}</p>
            <p>Next Full Moon: {moonData.nextFullMoon}</p>
            <p>First Quarter: {moonData.nextFirstQuarter}</p>
            <p>Last Quarter: {moonData.nextLastQuarter}</p>
            <p>Moon Altitude: {moonData.altitude.toFixed(2)}</p>
            <p>Moon Azimuth: {moonData.azimuth.toFixed(2)}</p>
            <p>Parallactic Angle: {moonData.parallacticAngle.toFixed(2)}</p>
            <p>Next Moon High: {moonData.nextMoonHigh}</p>
        </div>
    );
};

function formatTime(date: Date | null, timezone?: string): string {
    return date
        ? new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: timezone || "UTC",
        }).format(date)
        : "No event";
}

function toHMS(degrees: number): string {
    if (isNaN(degrees)) return "Unknown";
    const hours = Math.floor(degrees / 15);
    const minutes = Math.floor((degrees % 15) * 4);
    const seconds = ((degrees % 15) * 240) % 60;
    return `${hours}h ${minutes}m ${seconds.toFixed(1)}s`;
}

function toDMS(degrees: number): string {
    if (isNaN(degrees)) return "Unknown";
    const d = Math.floor(degrees);
    const m = Math.floor((degrees - d) * 60);
    const s = ((degrees - d) * 3600) % 60;
    return `${d}°${m}'${s.toFixed(1)}"`;
}

function getPhaseName(fraction: number): string {
    if (fraction < 0.03) return "New Moon";
    if (fraction < 0.22) return "Waxing Crescent";
    if (fraction < 0.28) return "First Quarter";
    if (fraction < 0.47) return "Waxing Gibbous";
    if (fraction < 0.53) return "Full Moon";
    if (fraction < 0.72) return "Waning Gibbous";
    if (fraction < 0.78) return "Last Quarter";
    if (fraction < 0.97) return "Waning Crescent";
    return "New Moon";
}

export default MoonWidget;
