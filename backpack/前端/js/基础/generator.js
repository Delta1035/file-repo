let myIterable = {
    name:'zhangsan',
    age:'18'
}

myIterable[Symbol.iterator] = function*(){
    yield 1
    yield 2
    yield 3
}

const arr = [...myIterable]		// Output: [1, 2, 3], 只能解构出包含在迭代器里面的数据
for(let ele of myIterable){
    console.log(ele);
}

const generator = function*(){
    yield 1
    yield 2
    yield 3
}

