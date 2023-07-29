/**
 * 類的實例
 * 1. 類只能使用new 調用
 * 2. 類的屬性和方法除非顯示定義在本身上, 也就是this上, 否則就會定義在原型對象prototype上
 */

class Point {
    name = 'zhangsan'
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    age = 18;
    toString(){
        return '('+this.x+','+this.y+')'
    }

}

const point = new Point(10,20);
console.log(point.toString())
// 查看實例上是否有x, y屬性
point.hasOwnProperty('x');// true
point.hasOwnProperty('y');// true 
console.log('toString',point.hasOwnProperty('toString'))//false
console.log('name',point.hasOwnProperty('name'))//true
console.log('age',point.hasOwnProperty('age'))//true
console.log(point.__proto__.hasOwnProperty('toString'));
console.log(Object.getPrototypeOf(point).hasOwnProperty('toString'));
console.log(Reflect.getPrototypeOf(point).hasOwnProperty('toString'))