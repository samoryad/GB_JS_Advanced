const sum = (x, y) => {
    if (x === null || y === null) return null;
    if (x === undefined || y === undefined) return NaN;
    if (typeof x === 'string' || typeof y === 'string') return NaN;

    let result = 0;
    result = x + y
    return result;
};

const sub = (x, y) => {
    if (x === null || y === null) return null;
    if (x === undefined || y === undefined) return NaN;
    if (typeof x === 'string' || typeof y === 'string') return NaN;

    let result = 0;
    result = x - y
    return result;
};

const mult = (x, y) => {
    if (x === null || y === null) return null;
    if (x === undefined || y === undefined) return NaN;
    if (typeof x === 'string' || typeof y === 'string') return NaN;

    let result = 0;
    result = x * y
    return result;
};

const div = (x, y) => {
    if (x === null || y === null) return null;
    if (x === undefined || y === undefined) return NaN;
    if (typeof x === 'string' || typeof y === 'string') return NaN;
    let result = 0;
    result = x / y
    return result;
};

module.exports = {
    sum: sum,
    sub: sub,
    mult: mult,
    div: div,
}