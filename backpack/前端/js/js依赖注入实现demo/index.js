class Injector {
    constructor() {
      this.dependencies = {}; // 管理依赖, 我理解为 类的实例
      this.register = (key, value) => { // 注册 理解为angular中的 Providers:[{provide:'对应key',useValue:'对应value'}]
        this.dependencies[key] = value;
      };
    }
    resolve(...args) {
      let func = null;
      let deps = null;
      let scope = null;
      const self = this;
      // 应对代码压缩的兼容方案
      if (typeof args[0] === 'string') {
        func = args[1];
        deps = args[0].replace(/ /g, '').split(',');
        scope = args[2] || {};
      } else {
        // 反射的一种方式
        func = args[0];
        deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
        scope = args[1] || {};
      }
      return (...args) => { 
        func.apply(scope || {}, deps.map(dep => self.dependencies[dep] && dep != '' ? self.dependencies[dep] : args.shift()));
      }
    }
  }
  
  let injector = new Injector(); // 生成一个注入器
  
  injector.register('c1', () => { console.log('i am c1') });
  injector.register('c2', () => { console.log('i am c2') });
  injector.register('c3', () => { console.log('i am c3') });
 
  //                           function 看做 constructor
  var func1 = injector.resolve(function (c1, c2, c3, temp) {
    c1();
    c2();
    c3();
    console.log(temp);
  });
  func1("i am in func1");
  
  console.log('------------')
  
  var func2 = injector.resolve('c1,c2,c3', function (c1, c2, c3, temp) {
    c1();
    c2();
    c3();
    console.log(temp);
  });
  func2("i am in func2");