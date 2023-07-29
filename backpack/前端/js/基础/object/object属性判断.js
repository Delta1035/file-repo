/**
 * 判断是否存在一个属性
 * 1. in 和  object.key === undefined 都可以判断属性是否存在
 * 2. 但是当key被赋值为undefined时 in 操作符可以正确判断
 */

/**
 * 对象属性必须为symbol 或者字符串
 * 对象属性的排列顺序
 * 1. 数字属性 '13' 字符串可以直接转换成数字13 那就是数字属性
 * (如果把13作为键,在对象里面会被自动转换为字符串13)
 * 数字属性按照升序 1,2,3,34 排列
 * 2. 字符属性 按照属性加入的顺序排列
 */
// Number(...) 显式转换为数字
// Math.trunc 是内建的去除小数部分的方法。
console.log( String(Math.trunc(Number("49"))) ); // "49"，相同，整数属性
console.log( String(Math.trunc(Number("+49"))) ); // "49"，不同于 "+49" ⇒ 不是整数属性
console.log( String(Math.trunc(Number("1.2"))) ); // "1"，不同于 "1.2" ⇒ 不是整数属性
const eg1 = {};
eg1[3] = 3
eg1[2] = 2
eg1[1] = 1
console.log(eg1);// { '1': 1, '2': 2, '3': 3 } 升序排列
eg1['c'] = 'c';
eg1['b'] = 'b';
eg1['a'] = 'a';
eg1[Symbol('这是一个key')] = Symbol('这是一个value')
console.log(eg1);// 非数字属性部分按照加入的顺序排列
