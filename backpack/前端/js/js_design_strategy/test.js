const promise = new Promise(resolve=>{
    console.log('start'); // 同步执行
    setTimeout(function(){
        resolve('promise')
    },3000)
})
const arr = [1,2,3];
arr.forEach(async item=>{
    // 下面 四段同时执行了
    console.log(1); 
    const result = await promise;
    console.log(result);
    console.log(2);
})
// const promise = new Promise(resolve=>{
//     console.log('start'); // 同步执行
//     setTimeout(function(){
//         resolve('promise')
//     },3000)
// })
// (async function(){
//     for(let i = 1; i<4;i++){
//         console.log(1);
//         const result = await promise;
//         console.log(result);
//         console.log(2);
//     }
// })()
