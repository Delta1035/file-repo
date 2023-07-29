const all = 100023232+35+68+89
const result1 = (100023232/all)
const result2 = (35/all)
const result3 = (68/all)
const result4 = (89/all)
function foo(num){
    return (num*10000000).toString().slice(0,10)
}
console.log(foo(result1)/100000);
console.log(foo(result2)/100000);
console.log(foo(result3)/100000);
console.log(foo(result4)/100000);