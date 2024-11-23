import bg, { calendar as calendar_bg } from './bg';
import en, { calendar as calendar_en } from './en';

export const getLocalizedCalendar = (locale) => {
    switch (locale) {
        case 'bg': return calendar_bg;
        case 'en': return calendar_en;
        default: return undefined
    }
}

export default {
    'bg': bg,
    'en': en
};