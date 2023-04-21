const g = function * generator(){
    yield 'resolve';
    yield 'reject';
    return 'pendding';
}

const r = g();
console.log(r.next());
console.log(r.next());
console.log(r.next());
console.log(r.next());
console.log(r.next());
console.log(r);
