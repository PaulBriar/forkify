const {sum} = require('./sum');

describe('Sum.js tests', () => {
    it('It should add two arguments together', () => {
        expect(sum(1,2)).toBe(3);
    });
});