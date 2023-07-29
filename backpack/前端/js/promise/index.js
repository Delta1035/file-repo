const MyPromise = require('./promise');
console.log(1);
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了');
        // reject('失败了');
    }, 1000)
});

promise.then(value => {
    console.log('value1', value);
    return 'form value1'
})


console.log(2);