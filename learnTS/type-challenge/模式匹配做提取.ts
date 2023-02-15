type trimRight<T extends string> = T extends `${infer rest}${' ' | '\n' | '\t'}` ? trimRight<rest> : T;

type str = trimRight<'123 '>;
type str2 = trimRight<'123 ,2   '>;

type trimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer rest}` ? trimLeft<rest> : T;

type str3 = trimLeft<' 123'>; // '123'
type str4 = trimLeft<'  123'>;// '123

type trim<T extends string> = trimLeft<trimRight<T>>;

type str5 = trim<'  123  '>; // 123

// 函数类型匹配
// 1. 提取函数参数类型
// 分析：
// ...args 代表 函数参数的类型类数组 赋值给 Args 类型变量
// 返回值 unknown 可以接收任何类型, 所以必然 返回Args, 所以顺利拿到了函数参数的类型
type getParameters<func extends Function> = func extends (...args: infer Args) => unknown ? Args : never;

type param1 = getParameters<(name: string, age: number) => string>; // [name:string,age:number]
const arr2: param1 = ['1', 2];// 更像是一个元组类型, 前面的变量名不对类型系统起作用

// 2. 提取函数返回值类型
type getReturn<func extends Function> = func extends () => infer result ? result : never;
type return1 = getReturn<() => number>; // number