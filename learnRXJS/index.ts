function* generator () {
    yield 1;
    yield 2;
    yield 3;
}

const iterator = generator();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());