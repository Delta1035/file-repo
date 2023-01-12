# [Angular 2 Decorators - 1](https://segmentfault.com/a/1190000008626417)

[![img](https://avatar-static.segmentfault.com/202/841/2028414822-5ee1d794a820a_huge128)**阿宝哥**](https://segmentfault.com/u/angular4)发布于 2017-03-09

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008626417&referer=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008754631&cb=b5d9b7022e)

在我们深入了解 Angular 2 中 @NgModule、@Component、@Injectable 等常见的装饰器之前，我们要先了解 TypeScript 中的装饰器。装饰器是一个非常酷的特性，最早出现在 Google 的 AtScript 中，它出现的目的是为了让开发者，开发出更容易维护、更容易理解的 Angular 代码。令人兴奋的是，在2015年 Angular 团队跟 MicroSoft 的 TypeScript 团队经过数月的的交流，最终决定采用 TypeScript 来重写 Angular 2 项目 。

### 装饰器是什么

- 它是一个表达式
- 该表达式被执行后，返回一个函数
- 函数的入参分别为 targe、name 和 descriptor
- 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象　

### 装饰器的分类

- 类装饰器 (Class decorators)
- 属性装饰器 (Property decorators)
- 方法装饰器 (Method decorators)
- 参数装饰器 (Parameter decorators)

### TypeScript 类装饰器

**类装饰器声明：**

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void
```

类装饰器顾名思义，就是用来装饰类的。它接收一个参数：

- target: TFunction - 被装饰的类

看完第一眼后，是不是感觉都不好了。没事，我们马上来个例子：

```javascript
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log('Hello!');
  }
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello!';
```

上面的例子中，我们定义了 Greeter 类装饰器，同时我们使用了 @Greeter 新的语法，来使用装饰器。

(备注：读者可以直接复制上面的代码，在 TypeScript Playground 中运行查看结果)。

有的读者可能想问，例子中总是输出 Hello! ，能自定义输出的问候语么 ？这个问题很好，答案是可以的。具体实现如下：

```javascript
function Greeter(greeting: string) {
  return function(target: Function) {
    target.prototype.greet = function(): void {
      console.log(greeting);
    }
  }
}

@Greeter('您好')
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: '您好!';
```

### TypeScript 属性装饰器

**属性装饰器声明：**

```typescript
declare type PropertyDecorator = (target:Object, propertyKey: string | symbol ) => void;
```

属性装饰器顾名思义，用来装饰类的属性。它接收两个参数：

- target: Object - 被装饰的类
- propertyKey:string | symbol - 被装饰类的属性名

趁热打铁，马上来个例子热热身：

```typescript
function LogChanges(target: Object, key: string) {
  var propertyValue: string = this[key];
  if(delete this[key]) {
    Object.defineProperty(target, key, {
      get: function () {
        return propertyValue;
      },
      set: function(newValue) {
        propertyValue = newValue;
        console.log(`${key} is now ${propertyValue}`);
      }
    });
  }
}

class Fruit {
  @LogChanges
  name: string;
}

let fruit = new Fruit();
fruit.name = 'apple'; // console output: 'name is now apple'
fruit.name = 'banana'; // console output: 'name is now banana'
```

那么问题来了，如果用户想在属性变化的时候，自动刷新页面，而不是简单地在控制台输出消息，那要怎么办？我们能不能参照类装饰器自定义问候语的方式，来实现监测属性变化的功能。具体实现如下：

```typescript
function LogChanges(callbackObject: any) {
  return function(target: Object, key: string): void {
    var propertyValue: string = this[key];
      if(delete this[key]) {
        Object.defineProperty(target, key, {
          get: function () {
              return propertyValue;
          },
          set: function(newValue) {
              propertyValue = newValue;
              callbackObject.onchange.call(this, propertyValue);
          }
     });
    }
  }
}

class Fruit {
  @LogChanges({
    onchange: function(newValue: string): void {
      console.log(`The fruit is ${newValue} now`);
    }
  })
  name: string;
}

let fruit = new Fruit();
fruit.name = 'apple'; // console output: 'The fruit is apple now'
fruit.name = 'banana'; // console output: 'The fruit is banana now'
```

### TypeScript 方法装饰器

**方法装饰器声明：**

```typescript
declare type MethodDecorator = <T>(target:Object, propertyKey: string | symbol, descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;
```

方法装饰器顾名思义，用来装饰类的属性。它接收三个参数：

- target: Object - 被装饰的类
- propertyKey: string | symbol - 方法名
- descriptor: TypePropertyDescript - 属性描述符

废话不多说，直接上例子：

```typescript
function LogOutput(tarage: Function, key: string, descriptor: any) {
  var originalMethod = descriptor.value;
  var newMethod = function(...args: any[]): any {
    var result: any = originalMethod.apply(this, args);
    if(!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameters: args,
      output: result,
      timestamp: new Date()
    });
    return result;
  };
  descriptor.value = newMethod;
}

class Calculator {
  @LogOutput
  double (num: number): number {
    return num * 2;
  }
}

let calc = new Calculator();
calc.double(11);
// console ouput: [{method: "double", output: 22, ...}]
console.log(calc.loggedOutput); 
```

最后我们来看一下参数装饰器：

### TypeScript 参数装饰器

**参数装饰器声明：**

```reasonml
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number ) => void
```

参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：

- target: Object - 被装饰的类
- propertyKey: string | symbol - 方法名
- parameterIndex: number - 方法中参数的索引值

```typescript
function Log(target: Function, key: string, parameterIndex: number) {
  var functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
    been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
    this.greeting = phrase; 
  }
}
// console output: The parameter in position 0 at Greeter has
// been decorated
```

### 我有话说

1.Object.defineProperty() 方法有什么用 ？

Object.defineProperty 用于在一个对象上定义一个新的属性或者修改一个已存在的属性，并返回这个对象。 方法的签名：Object.defineProperty(obj, prop, descriptor) ，参数说明如下：

- obj 需要定义的属性对象
- prop 需被定义或修改的属性名
- descriptor 需被定义或修改的属性的描述符

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一，不能同时是两者。

数据描述符和存取描述符均具有以下可选键值：

- configurable
  当且仅当该属性的 configurable 为 true 时，该属性才能够被改变，也能够被删除。默认为 false。
- enumerable
  当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。

数据描述符同时具有以下可选键值：

- value
  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
- writable
  当且仅当仅当该属性的writable为 true 时，该属性才能被赋值运算符改变。默认为 false。

存取描述符同时具有以下可选键值：

- get
  一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为undefined。
- set
  一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。

使用示例：

```dart
var o = {}; // 创建一个新对象
Object.defineProperty(o, "a", {value : 37, writable : true, enumerable : true,     
  configurable : true});  
```

### 总结

本文主要介绍了 TypeScript 中的四种装饰器，了解装饰器的基本分类和实现原理，为我们下一篇深入 Angular 2 的 @NgModule、@Component、@Injectable 等常用装饰器做好铺垫。