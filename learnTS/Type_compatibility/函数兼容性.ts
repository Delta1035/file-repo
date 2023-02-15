/**
 * 判断x和y函数参数是否兼容:
 * 1. 看参数列表, 如果x的每个参数类型都能在y中有对应的参数类型, 参数名称不影响, name就能赋值
 * 2. 参数少可以赋值给参数多, 因为js允许只传部分参数.
 */

let Funx = (name:string,age:number)=>0;
let Funy = (add:string)=>0;

Funx = Funy;
// 记住 js 函数可以只传部分参数
Funy = Funx;//不能将类型“(name: string, age: number) => number”分配给类型“(add: string) => number”


/**
 * 返回值类型的兼容性:
 * 参考简单类型和对象赋值兼容性 属性多的可以赋值给属性少的
 * 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型
 */

let retX = ()=>({name:'alice'});
let retY = ()=>({name:'alice',location:'seattle'});

retX = retY;

