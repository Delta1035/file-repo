class Person {
    // 新建构造函数
    constructor(name) {
      // 私有属性
      this.name = name;
    }
  
    // 定义一个方法并且赋值给构造函数的原型
    sayName() {
      return this.name
    }
  }
  
  const uzi = new Person('Uzi');
  console.log(uzi.sayName(),Object.keys(Person));
  // Uzi