console.log('第二天');
let num: number = 10;
// num = 'test';
let binaryLiteral: number = 0b1011;//二进制,以0b开头
let octalLiteral: number = 0o7212;//八进制,以0o开头
let hexadecimaLiteral: number = 0xa12f;//十六进制,以0x开头
//数组类型
let arr: string[] = ['1', '2', '3', '4'];
arr = ['1.2', '12', '1.4']
let arr_: Array<string> = ['1', 'q', 'w', 'e'];

//元组数据类型
let tup1: [string, number] = ['1', 2];

//枚举类型
enum Color { RED, GREEN, BLUE };
let enum1: Color = Color.GREEN;
console.log('枚举', enum1);
enum1 = 3;
console.log('枚举', enum1);

//
function maxE(x: number = 4, y: number): number {
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
function max(y:number,x?:number):number | undefined{
    if(y&&x){
        return x>y?x:y;
    }
}