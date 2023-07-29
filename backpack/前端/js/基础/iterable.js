// 1. sample
let iterable = [1, 2, 3]
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

const myIterableObject = {
    name:'自定义可迭代对象',
    age:'18',
    address:'地球',
    [Symbol.iterator]:function*(){
        for(let key in myIterableObject){
            yield myIterableObject[key];
        }
    }
}
for(let key of myIterableObject){// 可以迭代访问迭代器接口
    console.log(key);    
}
