import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import { between } from './helpers';

const styles = {
    a: new Style({
        image: new Circle({
            fill: new Fill('#FF0000'),
            radius: 5,
        })
    }),
    b: new Style({
        image: new Circle({
            fill: new Fill('#00FF00'),
            radius: 5,
        })
    }),
    c: new Style({
        image: new Circle({
            fill: new Fill('#0000FF'),
            radius: 5,
        })
    }),
    d: new Style({
        image: new Circle({
            fill: new Fill('#444444'),
            radius: 5,
        })
    })
};

export const getMapPointStyle = (modelValue) => {
    if (between(modelValue, 1, 1))
        return styles.a;
    else if (between(modelValue, 1, 1))
        return styles.b;
    else if (between(modelValue, 1, 1))
        return styles.c;
    else if (between(modelValue, 1, 1))
        return styles.d;
    else
        return null;
} 