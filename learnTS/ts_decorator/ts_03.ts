

namespace a {
  //当装饰器作为修饰类的时候，会把构造器传递进去
  function addNameEat(constructor: Function) {
    constructor.prototype.name = "hello";
    constructor.prototype.eat = function () {
      console.log("eat");
    };
  }
  @addNameEat
  class Person {
    name!: string;
    eat!: Function;
    constructor() { }
  }
  let p: Person = new Person();
  console.log(p.name);
  p.eat();
}

namespace b {
  //还可以使用装饰器工厂 这样可以传递额外参数
  function addNameEatFactory(name: string) {
    return function (constructor: Function) {
      constructor.prototype.name = name;
      constructor.prototype.eat = function () {
        console.log("eat");
      };
    };
  }
  @addNameEatFactory("hello")
  class Person {
    name!: string;
    eat!: Function;
    constructor() { }
  }
  let p: Person = new Person();
  console.log(p.name);
  p.eat();
}

namespace c {
  //还可以替换类,不过替换的类要与原类结构相同
  function enhancer(constructor: Function) {
    return class {
      name: string = "jiagou";
      eat() {
        console.log("吃饭饭");
      }
    };
  }
  @enhancer
  class Person {
    name!: string;
    eat!: Function;
    constructor() { }
  }
  let p: Person = new Person();
  console.log(p.name);
  p.eat();
}

namespace e {
  function dec(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log('target=>', target, 'key=>', key, 'descriptor=>', descriptor);
   }
  class Demo {
    // target -> Demo.prototype
    // key -> 'demo1'
    // descriptor -> undefined
    // @dec
    // demo1: string;

    // target -> Demo
    // key -> 'demo2'
    // descriptor -> PropertyDescriptor类型
    // @dec
    static demo2: string = 'demo2';

    // target -> Demo.prototype
    // key -> 'demo3'
    // descriptor -> PropertyDescriptor类型
    @dec
    get demo3() {
      return 'demo3';
    }

    // target -> Demo.prototype
    // key -> 'method'
    // descriptor -> PropertyDescriptor类型
    method() { }
  }
}
