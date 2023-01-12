# [Angular 2 Decorators - 2](https://segmentfault.com/a/1190000008626579)

[![img](https://avatar-static.segmentfault.com/202/841/2028414822-5ee1d794a820a_huge128)**阿宝哥**](https://segmentfault.com/u/angular4)发布于 2017-03-09

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008626579&referer=https%3A%2F%2Fcn.bing.com%2F&cb=4a0e76f0f2)

在 [Angular 2 Decorators - part 1](https://link.segmentfault.com/?enc=hPGnqAEN%2B%2Fc68Qc5xTXEjw%3D%3D.RqC%2BLESpHe1SxH9bJ%2BipUF5Nj8%2BI7cdUQ6f%2FYsDiimAaCnaxxXtNiT00TXZB6JkI1Qy8s24oiTZoHJ8fSK8VQA%3D%3D) 文章中，我们介绍了 TypeScript 中的四种装饰器。本文的主要目的是介绍 Angular 2 中常见的内置装饰器。Angular 2 内置装饰器分类：

- 类装饰器
  - @Component、@NgModule、@Pipe、@Injectable
- 属性装饰器
  - @Input、@Output、@ContentChild、@ContentChildren、@ViewChild、@ViewChildren
- 方法装饰器
  - @HostListener
- 参数装饰器
  - @Inject、@Optional、@Self、@SkipSelf、@Host

### Angular 2 类装饰器示例：

```typescript
import { NgModule, Component } from '@angular/core';

@Component({
  selector: 'example-component',
  template: '<div>Woo a component!</div>'
})
export class ExampleComponent {
  constructor() {
    console.log('Hey I am a component!');
  }
}
```

### Angular 2 属性装饰器示例：

```tsx
import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-component',
  template: '<div>Woo a component!</div>'
})
export class ExampleComponent {
  @Input()
  exampleProperty: string;
}
```

### Angular 2 方法装饰器示例：

```typescript
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'example-component',
  template: '<div>Woo a component!</div>'
})
export class ExampleComponent {
  @HostListener('click', ['$event'])
  onHostClick(event: Event) {
    // clicked, `event` available
  }
}
```

### Angular 2 参数装饰器示例：

```typescript
import { Component, Inject } from '@angular/core';
import { MyService } from './my-service';

@Component({
  selector: 'example-component',
  template: '<div>Woo a component!</div>'
})
export class ExampleComponent {
  constructor(@Inject(MyService) myService) { // 与myService: MyService等价
    console.log(myService);
  }
}
```

下面我们就着重分析一下最常用的类装饰器 @Component ，其它的装饰器读者有兴趣的话，可以参考 Component 的分析思路自行分析。

```coffeescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app', 
  template: `<h1>Hello {{name}}</h1>`, 
})
export class AppComponent  {
  name = 'Angular'; 
}
```

首先从最简单的例子入手，我们都知道采用 TypeScript 开发，为了保证兼容性最终都会转换成标准的 ES 5代码。上面的例子转成如下的代码：

```javascript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  ...
};

define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
  
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppComponent = (function () {
        function AppComponent() {
            this.name = 'Angular';
        }
        return AppComponent;
    }());
    AppComponent = __decorate([
        core_1.Component({ // (1)
            selector: 'my-app',
            template: "<h1>Hello {{name}}</h1>",
        })
    ], AppComponent);
    exports.AppComponent = AppComponent;
});
```

通过 Angular 2 Decorators - part 1 文章，我们知道 TypeScript 类装饰器的声明：

```typescript
declare type ClassDecorator = <TFunction extends Function>(target: TFunction)
  => TFunction | void;
```

而转换后 ES5 代码中 __decorate 函数的方法签名是 function (decorators, target, key, desc) 。因此我们可以推断，core_1.Component 是一个函数，该函数调用后返回一个 ClassDecorator 。类似于 Angular 2 Decorators - part 1 文章中的 Greeter 装饰器：

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

那我们来看一下 @angular/core 模块中导出的 Component 函数：

```tsx
/**
 * Component decorator and metadata.
 */
export const Component: ComponentDecorator = <ComponentDecorator>makeDecorator(
    'Component', {
      selector: undefined, // 用于定义组件在HTML代码中匹配的标签
      inputs: undefined, // 组件的输入属性
      outputs: undefined, // 组件的输出属性
      host: undefined, // 绑定宿主的属性、事件等
      exportAs: undefined, // 导出指令，使得可以在模板中调用
      moduleId: undefined, // 包含该组件模块的id，它被用于解析模板和样式的相对路径 
      providers: undefined, // 设置组件及其子组件可以用的服务
      viewProviders: undefined, // 设置组件及其子组件(不含ContentChildren)可以用的服务
      changeDetection: ChangeDetectionStrategy.Default, // 指定组件使用的变化检测策略
      queries: undefined, // 设置组件的查询条件
      templateUrl: undefined, // 为组件指定一个外部模板的URL地址
      template: undefined, // 为组件指定一个内联的模板
      styleUrls: undefined, // 为组件指定一系列用于该组件的样式表文件
      styles: undefined, // 为组件指定内联样式
      animations: undefined, // 设置组件相关动画
      encapsulation: undefined, // 设置组件视图包装选项
      interpolation: undefined, // 设置默认的插值运算符，默认是"{{"和"}}"
      entryComponents: undefined // 设置需要被提前编译的组件
    },
    Directive);
```

让我们继续来看一下 makeDecorator 这个函数：

```tsx
// @angular/core/src/util/decorators.ts

/**
 * const Component: ComponentDecorator = <ComponentDecorator>makeDecorator(
 *   'Component', {...}, Directive);
 */
function makeDecorator(name, props, parentClass, chainFn) { 
          // name: 'Component', props: {...}, parentClass: Directive
        if (chainFn === void 0) { chainFn = null; }
  
          // 创建Metadata构造函数
        var metaCtor = makeMetadataCtor([props]); 
          // objOrType: { selector: 'my-app', template: "<h1>Hello {{name}}</h1>" }
        function DecoratorFactory(objOrType) { 
          
              // 确保已经引入了Reflect库
            if (!(Reflect && Reflect.getMetadata)) {
                throw 'reflect-metadata shim is required when using class decorators';
            }
          
              // 判断this对象是否为DecoratorFactory的实例，若是则合并metadata信息
            if (this instanceof DecoratorFactory) { 
                metaCtor.call(this, objOrType);
                return this;
            }

            var annotationInstance = new DecoratorFactory(objOrType); 
            var chainAnnotation = typeof this === 'function' && 
                Array.isArray(this.annotations) ? this.annotations : [];
            chainAnnotation.push(annotationInstance);
          
              // 定义类装饰器，参数即要装饰的类
            var TypeDecorator = function TypeDecorator(cls) {
                // 首先先获取装饰类关联的annotations信息，若不存在则创建
                // 保存上面创建的annotationInstance实例，并调用保存更新后的annotations信息
                var annotations = Reflect.getOwnMetadata('annotations', cls) || [];
                annotations.push(annotationInstance); 
                Reflect.defineMetadata('annotations', annotations, cls);
                return cls;
            };
          
            TypeDecorator.annotations = chainAnnotation;
            TypeDecorator.Class = Class;
            if (chainFn) chainFn(TypeDecorator);
          
            return TypeDecorator;
        }
        if (parentClass) {
            DecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        DecoratorFactory.prototype.toString = function () { return ("@" + name); };
        DecoratorFactory.annotationCls = DecoratorFactory;
        return DecoratorFactory;
}

// 生成Metadata构造函数
function makeMetadataCtor(props: ([string, any] | {[key: string]: any})[]): any {
   // args: [{ selector: 'my-app', template: "<h1>Hello {{name}}</h1>" }]
  return function ctor(...args: any[]) {
    props.forEach((prop, i) => {
       // argVal: { selector: 'my-app', template: "<h1>Hello {{name}}</h1>" }
      const argVal = args[i];
      if (Array.isArray(prop)) {
        this[prop[0]] = argVal === undefined ? prop[1] : argVal;
      } else {
        // propName: 'selector' | 'template'
        for (const propName in prop) { 
          this[propName] =
              argVal && argVal.hasOwnProperty(propName) ? 
                argVal[propName] : prop[propName];
        }
      }
    });
  };
}
```

通过阅读以上的源码，我们发现当调用 makeDecorator('Component', {..}, Directive) 方法时，返回的是

DecoratorFactory 函数，该函数只接收一个参数，当调用该工厂函数时，则返回 TypeDecorator 函数即类装饰器。回到最早的例子，当我们调用 core_1.Component({ selector: 'my-app', template: "..." }) 创建的 annotationInstance 实例，内部结构如下：

```yaml
{
      selector: 'my-app', 
      inputs: undefined, 
      outputs: undefined, 
      host: undefined, 
      exportAs: undefined, 
      moduleId: undefined,  
      providers: undefined, 
      viewProviders: undefined, 
      changeDetection: ChangeDetectionStrategy.Default, 
      queries: undefined, 
      templateUrl: undefined, 
      template: "<h1>Hello {{name}}</h1>",
      styleUrls: undefined, 
      styles: undefined, 
      animations: undefined, 
      encapsulation: undefined, 
      interpolation: undefined, 
      entryComponents: undefined
}
```

现在我们来梳理一下整个流程，系统初始化的时候，会调用 makeDecorator('Component', {..}, Directive) 方法，创建 ComponentDecorator 工厂 。我们编写的 @Component 组件转换成 ES 5 代码后，会使用用户自定义的 metadata 信息作为参数，自动调用 ComponentDecorator 工厂函数，该函数内部实现的主要功能就是创建 annotationInstance 对象，最后返回 TypeDecorator 类装饰器。该类装饰器会被 __decorate([...], AppComponent) 函数调用，参数 traget 就是我们要装饰的类 。

### 我有话说

1. 因为一个类可以应用多个装饰器，所以 var annotations = Reflect.getOwnMetadata('annotations', cls) || [] 语句中，annotations 的值是数组。在 Angular 2 中，应用多个装饰器的情形是使用 @Optional 、@Inject()、@Host 等参数装饰器，描述构造函数中需要注入的依赖对象。
2. 通过 Reflect.defineMetadata API 定义的 metadata 信息，是保存在 window['__core-js_shared__'] 对象的 metadata 属性中。感兴趣的话，大家可以直接在 Console 控制台，输入 window['__core-js_shared__'] 查看该对象内部保存的信息。
3. @Component 中 @ 符号的作用是为了告诉 TypeScript 编译器，@ 后面的是装饰器函数或装饰器工厂，需要特殊处理。假设在 @Component({...}) 中去掉 @ 符号，那么变成了普通的函数调用，这样马上就会报错，因为我们并没有定义 Component 函数。通过观察转换后的代码，我们发现 @Component({...}) 被转换成 core_1.Component ，它就是从 @angular/core 导入的装饰器函数。

### 总结

本文介绍了 Angular 2 中最常用的 ComponentDecorator 装饰器，并通过简单的例子，一步步分析该装饰器的内部工作流程。不过我们只介绍了 Angular 2 框架内部如何解析、创建及保存 metadata 信息，还未涉及到组件初始化的过程中，如何读取、应用组件对应的 metadata 信息。另外在后续的 Angular 2 DI 文章中，我们还会继续分析其它装饰器的工作原理。