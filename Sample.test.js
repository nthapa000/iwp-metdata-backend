function add(a, b) {
    return a + b;
}

describe('add function', () => {
    it('should return the sum of two numbers', () => {
        const result = add(2, 3);
        expect(result).toBe(5);
    });
});
