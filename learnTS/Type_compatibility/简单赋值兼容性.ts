/**
 * 类型兼容性:
 * 1. 基于结构子类型
 * 2. 基于名义类型
 * 
 * - 如果x要兼容y, 那么 y至少要具有x相同的属性
 * - 检查y能否赋值给x, 编译器检查x中的每一个属性, 看能否在y中也找到对应的属性
 * - 函数参数赋值同理
 */

interface Named {
    name:string;
}

let x: Named;
let y = {
    name:'alice',
    age:18
}

x = y; // 可以复制成功, 编译器遍历x中的每一个属性, 只要能在y中找到对应的属性就可以.

function greet(n:Named){
    console.log('hi'+n.name);
}
greet(y); // 此时可以把n 看做上面的x 同理 可以兼容
