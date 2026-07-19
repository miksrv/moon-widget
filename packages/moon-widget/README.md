# moon-widget

A React component that displays the current moon phase, illumination, rise/set times, position and upcoming phase
dates for any date and geographic location. The moon disc itself is rendered with [pixi.js](https://pixijs.com/),
drawing the day/night terminator procedurally rather than swapping pre-rendered images.

## Install

```bash
yarn add moon-widget
# or
npm install moon-widget
```

`react` and `react-dom` (>=17) are peer dependencies.

## Usage

```tsx
import { MoonWidget } from 'moon-widget'
import 'moon-widget/style.css'

function App() {
    return (
        <MoonWidget
            lat={51.76712}
            lon={55.09785}
            timezone="Asia/Yekaterinburg"
        />
    )
}
```

The stylesheet is a separate import (`moon-widget/style.css`) rather than bundled automatically, so consumers control
when/how it's loaded.

## Props

| Prop       | Type                         | Default      | Description                                                                          |
| ---------- | ---------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `lat`      | `number`                     | —            | Latitude of the observer.                                                            |
| `lon`      | `number`                     | —            | Longitude of the observer.                                                           |
| `date`     | `string`                     | current time | ISO date/time to render. When omitted, the widget ticks live (updates every second). |
| `timezone` | `string`                     | `'UTC'`      | IANA timezone name used to format rise/set times, e.g. `'Asia/Yekaterinburg'`.       |
| `language` | `'en' \| 'ru'`               | `'en'`       | UI label language.                                                                   |
| `variant`  | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the moon disc vs. the information panel.                         |

## License

MIT
