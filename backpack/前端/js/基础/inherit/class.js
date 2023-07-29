/**
 * 1. class Point 類的類型就是function
 * 2. class Point 可以看作構造函數的另一種寫法
 * 3. ES6的類依然存在prototype屬性, 並且類的所有方法都定義在類的Point.prototype上
 *      包括: constructor();  toString(); ...
 *      區別在於 ES5 在原型對象上定義的方法是可以枚舉的, 但是ES6裏面定義的方法雖然也在原型對象上, 但是確實不可枚舉的
 * 4. 實例與類的關係
 *     class.prototype === instance.__proto__
 *     class.prototype.constructor === instance.constructor
 *     class.prototype.constructor === Point  // 類可以看做是構造函數額度另一種寫法
 * 5. Object.asign(Point.prototype,{
 *      toString(),
 *      toValue()
 * }); 通過給類的原型對象添加方法,相當於給類添加新的方法,可以很方便一次添加多個
 * 6. 類的內部定義的方法都是不可枚舉的
 *     Object.keys(ColorPoint.prototype) // []
 *     Object.getOwnPropertyNames(ColorPoint.prototype) //  [ 'constructor', 'toString' ]
 */

class Point {

}
console.log(typeof Point); // function
console.log(Point === Point.prototype.constructor); // class Point 可以看做構造函數的另一種寫法

class ColorPoint extends Point {
    constructor(x,y,color){
        super(x,y);
        this.color = color;// 在實例上

    }

    toString(){// prototype.toString() // 在圓形臉上
        return this.color + '' +super.toString();// 調用父類的toString();
    }
}

const cp1 = new ColorPoint(10,10,'red');
console.log(cp1);
// 查看類裏面定義的方法是否可枚舉
// 1. 類裏面的方法都定義在類的原型對象上
console.log(Object.keys(ColorPoint.prototype));
console.log(Object.getOwnPropertyNames(ColorPoint.prototype));