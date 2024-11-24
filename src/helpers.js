export const min = (values) => Math.min(...values);
export const max = (values) => Math.max(...values);
export const average = (values) => Math.round(values.reduce((tmp, i) => tmp + i, 0) / values.length);
export const total = (values) => Math.round(values.reduce((tmp, i) => tmp + i, 0));

const normalThreshold = 30;
const warningThreshold = 60;
const criticalThreshold = Infinity;

export const getColor = (value) => {
    if (between(value, 0, normalThreshold))
        return 'green';
    else if (between(value, normalThreshold, warningThreshold))
        return 'orange';
    else // criticalThreshold
        return 'red';
}

export const between = (value, a, b) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return value >= min && value < max;
};