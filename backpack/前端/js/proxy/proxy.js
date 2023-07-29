// // new Proxy(target,{
// //  可以拦截 get,set,
// //})
// var obj = new Proxy({}, {
//     get: function (target, propKey, receiver) {
//         console.log(`getting ${propKey}!receiver ${receiver}`);
//         return Reflect.get(target, propKey, receiver);
//     },
//     set: function (target, propKey, value, receiver) {
//         console.log(`setting ${propKey}! value ${value}  receiver ${receiver}`);
//         return Reflect.set(target, propKey, value, receiver);
//     }
// });
// console.log(obj.count);
// // obj.count = 1;
// // obj.count = 1;
// // obj.count = 1;
// a = {};
// Object.defineProperties(a, {
//     'name':{
//         value:'zhangsan',
//         enumerable:false,
//         configurable:false,
//         writable:false
//     },
//     'age':{
//         value:18,
//         configurable:true,
//         enumerable:true,
//         writable:true
//     }
// });


// function getType(obj){
//     return Object.prototype.toString.call(obj).replace(/(\[|\])/g,'').split(' ')[1];
// }

// console.log('[]',getType([]));
// console.log('null',getType(null));
// console.log('BigInt',getType(BigInt(Number.MAX_SAFE_INTEGER)));
// console.log('BigInt',getType(12232323232323n));
// console.log('Symbol',getType(Symbol()));
// console.log('Object',getType({}));

