const array = [1,2,3,4];
// console.log(array.copyWithin(0,1,1));
// console.log(array.copyWithin(0,1,3));
console.log(array.copyWithin(0,1,3));

const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();
const iterator2 = array1.keys();
const iterator3 = array1.values();
console.log(iterator1.next());
console.log(iterator2.next());
console.log(iterator3.next());
