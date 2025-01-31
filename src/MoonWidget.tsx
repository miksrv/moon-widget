import React, { useState } from "react";
import SunCalc from "suncalc";
import PropTypes from "prop-types";
import MoonPhaseImage from "./MoonPhaseView";

// Интерфейс для props
interface MoonWidgetProps {
    LAT: number; // Широта
    LON: number; // Долгота
    date?: string; // Дата в формате YYYY-MM-DD
    config?: {
        showPhase: boolean; // Показывать ли фазу Луны
        showCoordinates: boolean; // Показывать ли координаты
    };
}

const MoonWidget: React.FC<MoonWidgetProps> = ({ LAT, LON, date, config }) => {
    const selectedDate = new Date(date || new Date().toISOString().split("T")[0]);

    // Получаем информацию о Луне на заданную дату
    const moonIllumination = SunCalc.getMoonIllumination(selectedDate);
    const illumination = moonIllumination.fraction; // Освещенность Луны (0..1)

    // Локальное состояние для фазы Луны
    const [moonPhase, setMoonPhase] = useState(illumination);

    // Функция для определения названия фазы Луны
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

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
            <h3>Moon Widget</h3>

            {/* Изображение Луны с возможностью изменения фазы */}
            <MoonPhaseImage phase={moonPhase} shadowIntensity={1.4} shadowSpread={0.1} />

            {moonPhase}
            <div>
                <p>Phase: {getPhaseName(moonPhase)}</p>
                <p>Illumination: {Math.round(moonPhase * 100)}%</p>
            </div>

            {/* Ползунок для изменения фазы Луны */}
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={moonPhase}
                onChange={(e) => setMoonPhase(parseFloat(e.target.value))}
                style={{ width: "100%" }}
            />

            {/* Отображение координат, если включено в конфиге */}
            {config?.showCoordinates && (
                <div>
                    <p>Latitude: {LAT}</p>
                    <p>Longitude: {LON}</p>
                </div>
            )}
        </div>
    );
};

// Валидация типов
MoonWidget.propTypes = {
    LAT: PropTypes.number.isRequired,
    LON: PropTypes.number.isRequired,
    date: PropTypes.string,
    config: PropTypes.shape({
        showPhase: PropTypes.bool,
        showCoordinates: PropTypes.bool,
    }),
};

export default MoonWidget;
