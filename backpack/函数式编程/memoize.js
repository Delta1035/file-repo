const _ = require('lodash');

function add(a, b) {
    console.log('add');
    return a + b;
}

// const result = _.memoize(add);
// console.log(result(1, 2));
// console.log(result(1, 2));
// console.log(result(1, 2));
// console.log(result(1, 2));

function MyMemoize(fn) {
    let cache = {};
    return function () {
        const key = JSON.stringify(fn);
        cache[key] = cache[key] || fn.apply(fn, arguments);
        return cache[key];
    }
}

const result = MyMemoize(add);
console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));
console.log(result(1,2));