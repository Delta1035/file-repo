/**
 * 1. Promise.prototype.then()
 * 2. Promise.prototype.catch()
 * 3. Promise.prototype.finally()
 * 4. Promise.all()
 * 5. Promise.race() race 比赛
 * 6. Promise.allSetteld()
 * 7. Promise.any() 兼容性很差
 * 8. Promise.resolve()
 * 9. Promise.reject()
 * 10. Promise.try();
 */


const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('p1');
        resolve('p1')
    },1000)
})

const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('p2');
        resolve('p2')
    },2000)
})

const p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('p3');
        // resolve('p3')
        reject('p3')
    },3000)
})

// 全部执行完 才会执行all , 但是只要有一个失败了就会报错
/**
 * 1. 如果有promise 处于reject状态 但是没有处理函数 就会报错
 */
Promise.all([p1,p2,p3]).then(([resaon1,resaon2,resaon3])=>{
    console.log(resaon1,resaon2,resaon3);
})

// 那个先执行完用哪个
// Promise.race([p1,p2,p3]).then((reason)=>{
//     console.log('race',reason);
// })

// Promise.any([p1,p2,p3]).then((reason)=>{
//     console.log('any',reason);
// })


// 当所有的promise都改变状态 才会执行 结果是一组数组, 包含每一个promise的状态和值
// Promise.allSettled([p1,p2,p3]).then((reason)=>{
//     console.log('allSettled',reason);
// })