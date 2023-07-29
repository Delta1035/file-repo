/**
 * new 做了什麼
 * 1. 創建一個空對象 {}
 * 2. 將this指向這個空對象(將構造函數的作用於賦值給新對象)
 * 3. 執行構造函數,給空對象添加屬性
 * 4. 返回這個對象
 */

/**
 * new.target属性
 * 1. 用在构造函数中,返回new命令用于的那个构造函数
 * 2. 如果构造函数不是new调用的那么就会返回undefined
 * 3. 需要注意的是，子类继承父类时，new.target会返回子类。
 * 4. 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
 */

class Point {
    constructor(){
        console.log(new.target);
    }
}

new Point; // [class Point]

function Foo(){
    console.log(new.target);
}

Foo(); // undefined
new Foo; // [Function: Foo]