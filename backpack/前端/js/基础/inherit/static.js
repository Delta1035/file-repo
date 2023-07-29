/**
 * 靜態方法
 * 0. 構造函數也是一個對象, 所以靜態方法掛在構造函數這個對象上
 * 1. 靜態方法裏面this 指向的是這個類
 * 2. 靜態方法可以和其他方法重名
 * 3. 子類可以通過super對象去調用父類的靜態方法
 * 4. 子類可以直接Son.method() 調用父類的靜態方法
 * 5. 執行super() 相當於調用了父類構造函數
 */

class Foo {
  static method() {
    return "hello";
  }
}
class Son extends Foo {
  constructor() {
    super()
    this.age = 18;
  }

  static callParentStaticMethod() {
    return super.method() + '來自Son的靜態調用';
  }
}
Foo.method();
const foo = new Foo();
console.log(Object.getPrototypeOf(foo).constructor.method());
console.log(Foo);

const son = new Son();
console.log(Son.callParentStaticMethod());
console.log(Son.method());

