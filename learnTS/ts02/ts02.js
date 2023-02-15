"use strict";
console.log('第二天');
var num = 10;
// num = 'test';
var binaryLiteral = 11; //二进制,以0b开头
var octalLiteral = 3722; //八进制,以0o开头
var hexadecimaLiteral = 0xa12f; //十六进制,以0x开头
//数组类型
var arr = ['1', '2', '3', '4'];
arr = ['1.2', '12', '1.4'];
var arr_ = ['1', 'q', 'w', 'e'];
//元组数据类型
var tup1 = ['1', 2];
//枚举类型
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
})(Color || (Color = {}));
;
var enum1 = Color.GREEN;
console.log('枚举', enum1);
enum1 = 3;
console.log('枚举', enum1);
//
function maxE(x, y) {
    if (x === void 0) { x = 4; }
    return x > y ? x : y;
}
console.log('maxE', maxE(undefined, 3));
//
// ‌function sum(x: number, ...rest: number[]): number {
//     ‌    let result = x;
//     ‌    for (let i = 0; i < rest.length; i++) {
//     ‌        result += rest[i];
//     }
//     ‌    return result;
// }
// console.log(sum(1, 2, 3, 4, 5));
function max(y, x) {
    if (y && x) {
        return x > y ? x : y;
    }
}
