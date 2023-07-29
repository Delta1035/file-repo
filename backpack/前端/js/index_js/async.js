// 1. async函数一定会返回一个promise对象。如果一个async函数的返回值看起来不是promise，
// 那么它将会被隐式地包装在一个promise中。
const asyncFun = (async function() {
    return 1; // Promise.resolv(1)
})();
// asyncFun 等价于 foo
function foo() {
    return Promise.resolve(1)
}
console.log('asyncFun', asyncFun.then(console.log)); // 1

// 2.async函数的函数体可以被看作是由0个或者多个await表达式分割开来的。(await 后面的代码 => 下一个 await之前的 代码 会被包裹在 promise.then(()=>
// {
//中间的代码
// }))
//从第一行代码直到（并包括）第一个await表达式（如果有的话）都是同步运行的。
//这样的话，一个不含await表达式的async函数是会同步运行的。然而，如果函数体内有一个await表达式，async函数就一定会异步执行。

const asyncFun2 = (async function() {
    await 2;
})();

const foo2 = function() {
    // return Promise.resolve(2).then(() => undefined);
    return Promise.resolve(2).then(console.log);
}
console.log('asyncFun2', asyncFun2.then(console.log)); // undefined

// 3.在await表达式之后的代码可以被认为是存在在链式调用的then回调中，
//多个await表达式都将加入链式调用的then回调中，
//返回值将作为最后一个then回调的返回值。

async function foo3() {
    const result1 = await new Promise((resolve) => setTimeout(() => resolve('1')))
    const result2 = await new Promise((resolve) => setTimeout(() => resolve('2')))
    console.log('foo3', result1, result2);
}
console.log(foo3());

async function foo4() {
    const p1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000))
    const p2 = new Promise((_, reject) => setTimeout(() => reject('2'), 500))
    const results = [await p1, await p2] // 不推荐使用这种方式，请使用 Promise.all或者Promise.allSettled 
}
foo4().catch(() => {}) // 捕捉所有的错误...