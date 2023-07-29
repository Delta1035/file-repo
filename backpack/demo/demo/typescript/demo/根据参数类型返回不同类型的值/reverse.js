function test(x) {
    if (typeof x === 'number') {
        return Number(x + x);
    }
    else if (typeof x === 'string') {
        return x + x;
    }
}
console.log(test(1));
console.log(test('2'));
