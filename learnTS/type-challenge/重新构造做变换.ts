// ts类型系统支持3种可以声明任意类型的变量: type infer 类型参数
// 1. type 类型别名, 声明一个变量来存储类型
// 2. infer 类型提取, 将类型提取到变量里, 相当于局部变量
// 3. 类型参数 <T> 用于接收具体的类型, 在类型运算中相当于局部变量
// 以上三种类型不能被重新赋值


//数组类型的重新构造
// 1. push
type tuple = [1, 2, 3];
type push<arr extends unknown[], ele> = [...arr, ele];
type arr1 = push<[1, '2', true], Promise<unknown>>;

// 2. unshift
type unshift<ele, arr extends unknown[]> = [ele, ...arr];
type arr2 = unshift<0, [1, 2, 3]>;// [0,1,2,3]

// 3. zip
type zip<arr1 extends unknown[], arr2 extends unknown[]> =
    arr1 extends [infer arr1first, ...infer arr1rest] ?
    arr2 extends [infer arr2first, ... infer arr2rest] ?
    [[arr1first, arr2first], ...zip<arr1rest, arr2rest>] : [] : []

type arrzip = zip<[1,2,3],['a','b','c']>; // [[1,'a'],[2,'b'],[3.'c']]

// 字符串类型重构
// 1. capitalizeStr 将首字母改为大写 Uppercase 内置高级类型 将字母变为大写
type capitalizeStr<T extends string> = T extends `${infer first}${infer rest}` ? `${Uppercase<first>}${rest}` : never;

type firstUppercase = capitalizeStr<'hello world'>;//'Hello world'

// 2. calmecase 
// dong_dong_dong  =>  DongDongDong
type calmecase<T extends string> = T extends `${infer left}_${infer rest}` ? `${Uppercase<left>}${calmecase<rest>}` : never;
type strCalmecase = calmecase<'dong_dong_dong'>;// 'DongDongDong'