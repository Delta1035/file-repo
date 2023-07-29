/**
 * 指数运算符 **
 * 1. 从右开始运算 2**3 == 8 然后 2**8 == 256
 */
console.log(2 ** 2);
console.log(2 ** (2 ** 3));
/**
 * 可选链操作符 ?.
 * iterator.return?.()
 * 链判断运算符?.
 * 有三种写法。
 * obj?.prop // 对象属性是否存在
 * obj?.[expr] // 同上
 * func?.(...args) // 函数或对象方法是否存在
 */
iterator.return?.(); //左侧对象是否为null或undefined, 如果是直接返回undefined 不往下执行了 , 否则执行对应的方法
