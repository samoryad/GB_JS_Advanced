const script = require('../calc_script');
const sum = script.sum;
const sub = script.sub;
const mult = script.mult;
const div = script.div;

describe('Проверка калькулятора', () => {

    it('сложение 4+2=6', () => {
        expect(sum(4, 2)).toBe(6);
    });

    it('разность 4-2=2', () => {
        expect(sub(4, 2)).toBe(2);
    });

    it('умножение 4*2=8', () => {
        expect(mult(4, 2)).toBe(8);
    });

    it('деление 4:2=2', () => {
        expect(div(4, 2)).toBe(2);
    });

    it('разность с undefined=NaN', () => {
        expect(sub(undefined, 2)).toBeNaN();
    });

    it('разность строки и числа=NaN', () => {
        expect(sub('4', 2)).toBeNaN();
    });
});