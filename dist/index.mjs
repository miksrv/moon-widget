// src/index.tsx
import React3 from "react";
import ReactDOM from "react-dom/client";

// src/MoonWidget.tsx
import { useState, useEffect as useEffect2 } from "react";
import SunCalc from "suncalc";

// src/MoonPhaseView.tsx
import { useEffect, useRef } from "react";

// src/moon.png
var moon_default = "./moon-BUMWFIG7.png";

// src/MoonPhaseView.tsx
import { jsx } from "react/jsx-runtime";
var MoonPhaseImage = ({ phase, shadowIntensity = 0.8, shadowSpread = 0.3 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = moon_default;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const adjustedPhase = Math.abs(phase - 0.5);
      if (adjustedPhase === 0) return;
      ctx.globalCompositeOperation = "source-atop";
      if (adjustedPhase === 0.5) {
        ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity})`;
        ctx.fillRect(0, 0, img.width, img.height);
        ctx.globalCompositeOperation = "source-over";
        return;
      }
      const gradient = ctx.createLinearGradient(0, 0, img.width, 0);
      const darkShadow = `rgba(0, 0, 0, ${shadowIntensity})`;
      const midShadow = `rgba(0, 0, 0, ${shadowIntensity * 0.6})`;
      const lightShadow = `rgba(0, 0, 0, 0)`;
      let transitionStart, transitionEnd;
      if (phase < 0.5) {
        const visibleFraction = phase * 2;
        transitionStart = Math.max(0, 1 - visibleFraction - shadowSpread);
        transitionEnd = Math.min(1, 1 - visibleFraction + shadowSpread);
        gradient.addColorStop(0, darkShadow);
        gradient.addColorStop(transitionStart, midShadow);
        gradient.addColorStop(transitionEnd, lightShadow);
        gradient.addColorStop(1, lightShadow);
      } else {
        const shadowFraction = (1 - phase) * 2;
        transitionStart = Math.max(0, shadowFraction - shadowSpread);
        transitionEnd = Math.min(1, shadowFraction + shadowSpread);
        gradient.addColorStop(0, lightShadow);
        gradient.addColorStop(transitionStart, lightShadow);
        gradient.addColorStop(transitionEnd, midShadow);
        gradient.addColorStop(1, darkShadow);
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.globalCompositeOperation = "source-over";
    };
  }, [phase, shadowIntensity, shadowSpread]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef });
};
var MoonPhaseView_default = MoonPhaseImage;

// src/MoonWidget.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var MoonWidget = ({ lat, lon, date, timezone }) => {
  const [currentDate, setCurrentDate] = useState(new Date(date || ""));
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
    ra: "Unknown",
    dec: "Unknown",
    az: "Unknown",
    alt: "Unknown",
    parallacticAngle: 0,
    nextMoonHigh: "Unknown"
  });
  useEffect2(() => {
    if (!date) {
      const interval = setInterval(() => {
        setCurrentDate(/* @__PURE__ */ new Date());
      }, 1e3);
      return () => clearInterval(interval);
    }
  }, [date]);
  useEffect2(() => {
    const selectedDate = date ? new Date(date) : currentDate;
    const moonIllumination = SunCalc.getMoonIllumination(selectedDate);
    const moonPosition = SunCalc.getMoonPosition(selectedDate, lat, lon);
    const moonTimes = SunCalc.getMoonTimes(selectedDate, lat, lon);
    setMoonPhase(moonIllumination.phase);
    const lunarCycle = 29.53;
    const moonAge = moonIllumination.phase * lunarCycle;
    const distanceToMoon = 384400 * (1 - moonIllumination.fraction * 0.05);
    function findNextMoonPhase(targetPhase) {
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
      ra: moonData.azimuth ? toHMS(moonData.azimuth * 180 / 15) : "Unknown",
      dec: moonData.altitude ? toDMS(moonData.altitude * (180 / Math.PI)) : "Unknown",
      az: toDMS(moonData.azimuth * 180 / Math.PI),
      alt: toDMS(moonData.altitude * 180 / Math.PI),
      parallacticAngle: moonPosition.parallacticAngle,
      nextMoonHigh: formatTime(new Date(selectedDate.getTime() + 12 * 60 * 60 * 1e3), timezone)
    });
  }, [lat, lon, date, currentDate]);
  return /* @__PURE__ */ jsxs("div", { className: styles.container, style: { border: "1px solid #ccc", padding: "10px", width: "300px" }, children: [
    /* @__PURE__ */ jsx2("h3", { children: "Moon Widget" }),
    /* @__PURE__ */ jsx2(MoonPhaseView_default, { phase: moonPhase, shadowIntensity: 1.5, shadowSpread: 0.2 }),
    /* @__PURE__ */ jsxs("p", { children: [
      "DATE: ",
      currentDate?.toISOString()
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Current Moon Phase: ",
      getPhaseName(moonPhase)
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Current Moon Phase: ",
      moonPhase.toFixed(5)
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Moon Age: ",
      moonData.age.toFixed(1),
      " days"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Distance to Moon: ",
      moonData.distance.toFixed(0),
      " km"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Illumination: ",
      Math.round(moonData.illumination * 100),
      "%"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Moon Rise: ",
      moonData.moonrise
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Moon Set: ",
      moonData.moonset
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "RA/Dec: ",
      moonData.ra,
      " ",
      moonData.dec
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Az/Alt: ",
      moonData.az,
      " ",
      moonData.alt
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Next New Moon: ",
      moonData.nextNewMoon
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Next Full Moon: ",
      moonData.nextFullMoon
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "First Quarter: ",
      moonData.nextFirstQuarter
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Last Quarter: ",
      moonData.nextLastQuarter
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Moon Altitude: ",
      moonData.altitude.toFixed(2)
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Moon Azimuth: ",
      moonData.azimuth.toFixed(2)
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Parallactic Angle: ",
      moonData.parallacticAngle.toFixed(2)
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Next Moon High: ",
      moonData.nextMoonHigh
    ] })
  ] });
};
function formatTime(date, timezone) {
  return date ? new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone || "UTC"
  }).format(date) : "No event";
}
function toHMS(degrees) {
  if (isNaN(degrees)) return "Unknown";
  const hours = Math.floor(degrees / 15);
  const minutes = Math.floor(degrees % 15 * 4);
  const seconds = degrees % 15 * 240 % 60;
  return `${hours}h ${minutes}m ${seconds.toFixed(1)}s`;
}
function toDMS(degrees) {
  if (isNaN(degrees)) return "Unknown";
  const d = Math.floor(degrees);
  const m = Math.floor((degrees - d) * 60);
  const s = (degrees - d) * 3600 % 60;
  return `${d}\xB0${m}'${s.toFixed(1)}"`;
}
function getPhaseName(fraction) {
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
var MoonWidget_default = MoonWidget;

// src/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  /* @__PURE__ */ jsx3(React3.StrictMode, { children: /* @__PURE__ */ jsx3(MoonWidget_default, { date: "2025/02/21", lat: 51.76712, lon: 55.09785, timezone: "Asia/Yekaterinburg" }) })
);
