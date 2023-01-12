# [Angular 2 Pipe](https://segmentfault.com/a/1190000008646187)

[![img](https://avatar-static.segmentfault.com/202/841/2028414822-5ee1d794a820a_huge128)**阿宝哥**](https://segmentfault.com/u/angular4)发布于 2017-03-10

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008646187&referer=https%3A%2F%2Fcn.bing.com%2F&cb=0042061225)

> 更新时间 - 2017-03-20 16：15；
> 更新内容 - 日期格式化示例输出结果，感谢 **天之骄子** 刊误

Angular 2 中 Pipe(管道) 与 Angular 1.x 中的 filter(过滤器) 的作用的是一样的。它们都是用来对输入的数据进行处理，如大小写转换、数值和日期格式化等。

![图片描述](https://segmentfault.com/img/bVKrqh?w=641&h=337)

### Angular 2 内建管道及分类

- String -> String
  - UpperCasePipe
  - LowerCasePipe
  - TitleCasePipe
- Number -> String
  - DecimalPipe
  - PercentPipe
  - CurrencyPipe
- Object -> String
  - JsonPipe
  - DatePipe
- Tools
  - SlicePipe
  - AsyncPipe
  - I18nPluralPipe
  - I18nSelectPipe

### Angular 2 内建管道使用示例

1.大写转换

```handlebars
<div>
  <p ngNonBindable>{{ 'Angular' | uppercase }}</p>
  <p>{{ 'Angular' | uppercase }}</p> <!-- Output: ANGULAR -->
</div>
```

2.小写转换

```handlebars
<div>
  <p ngNonBindable>{{ 'Angular' | lowercase }}</p>
  <p>{{ 'Angular' | lowercase }}</p> <!-- Output: angular -->
</div>
```

3.数值格式化

```handlebars
<div>
  <p ngNonBindable>{{ 3.14159265 | number: '1.4-4' }}</p>
  <p>{{ 3.14159265 | number: '1.4-4' }}</p> <!-- Output: 3.1416 -->
</div>
```

4.日期格式化

```handlebars
<div>
  <p ngNonBindable>{{ today | date: 'shortTime' }}</p>
  <p>{{ today | date: 'shortTime' }}</p> <!-- Output: 以当前时间为准，输出格式：10:40 AM -->
</div>
```

5.JavaScript 对象序列化

```handlebars
<div>
  <p ngNonBindable>{{ { name: 'semlinker' } | json }}</p>
  <p>{{ { name: 'semlinker' } | json }}</p> <!-- Output: { "name": "semlinker" } -->
</div>
```

### 管道参数

管道可以接收任意数量的参数，使用方式是在管道名称后面添加 : 和参数值。如 number: '1.4-4' ，若需要传递多个参数则参数之间用冒号隔开，具体示例如下：

```handlebars
<div>
  <p ngNonBindable>{{ 'semlinker' | slice:0:3 }}</p>
  <p>{{ 'semlinker' | slice:0:3 }}</p> <!-- Output: sem -->
</div>
```

### 管道链

我们可以将多个管道连接在一起，组成管道链对数据进行处理。

```handlebars
<div>
  <p ngNonBindable>{{ 'semlinker' | slice:0:3 | uppercase }}</p>
  <p>{{ 'semlinker' | slice:0:3 | uppercase }}</p> <!-- Output: SEM -->
</div>
```

完整示例

```handlebars
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <p ngNonBindable>{{ 'Angular' | uppercase }}</p>
      <p>{{ 'Angular' | uppercase }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ 'Angular' | lowercase }}</p>
      <p>{{ 'Angular' | lowercase }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ 3.14159265 | number: '1.4-4' }}</p>
      <p>{{ 3.14159265 | number: '1.4-4' }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ today | date: 'shortTime' }}</p>
      <p>{{ today | date: 'shortTime' }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ { name: 'semlinker' } | json }}</p>
      <p>{{ { name: 'semlinker' } | json }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ 'semlinker' | slice:0:3 }}</p>
      <p>{{ 'semlinker' | slice:0:3 }}</p>
    </div>
    <div>
      <p ngNonBindable>{{ 'semlinker' | slice:0:3 | uppercase }}</p>
      <p>{{ 'semlinker' | slice:0:3 | uppercase }}</p>
    </div>
  `,
})
export class AppComponent {
  today = new Date();
}
```

### 自定义管道

自定义管道的步骤：

- 使用 @Pipe 装饰器定义 Pipe 的 metadata 信息，如 Pipe 的名称 - 即 name 属性
- 实现 PipeTransform 接口中定义的 transform 方法

1.1 WelcomePipe 定义

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'welcome' })
export class WelcomePipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "Welcome to " + value;
  }
} 
```

1.2 WelcomePipe 使用

```handlebars
<div>
   <p ngNonBindable>{{ 'semlinker' | welcome }}</p>
   <p>{{ 'semlinker' | welcome }}</p> <!-- Output: Welcome to semlinker -->
</div>
```

当 WelcomePipe 的输入参数，即 value 值为非字符串时，如使用 123，则控制台将会抛出以下异常：

```pgsql
EXCEPTION: Error in ./AppComponent class AppComponent - inline template:23:9 caused by: Invalid pipe argument for WelcomePipe
```

2.1 RepeatPipe 定义

```typescript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'repeat'})
export class RepeatPipe implements PipeTransform {
    transform(value: any, times: number) {
        return value.repeat(times);
    }
}
```

2.2 RepeatPipe 使用

```handlebars
<div>
   <p ngNonBindable>{{ 'lo' | repeat:3 }}</p>
   <p>{{ 'lo' | repeat:3 }}</p> <!-- Output: lololo -->
</div>
```

### 管道分类

- pure 管道：仅当管道输入值变化的时候，才执行转换操作，默认的类型是 pure 类型。(备注：输入值变化是指原始数据类型如：string、number、boolean 等的数值或对象的引用值发生变化)
- impure 管道：在每次变化检测期间都会执行，如鼠标点击或移动都会执行 impure 管道

### 管道探秘

1.Pipe 相关接口与 PipeDecorator

Pipe 接口定义

```angelscript
export interface Pipe {
  name: string;
  pure?: boolean;
}
```

PipeDecorator

```javascript
export const Pipe: PipeDecorator = <PipeDecorator>makeDecorator('Pipe', {
  name: undefined,
  pure: true, // 默认是pure
});
```

PipeTransform 接口定义

```nim
export interface PipeTransform {
  transform(value: any, ...args: any[]): any;
}
```

2.RepeatPipe 详解

2.1 RepeatPipe 定义

```typescript
@Pipe({name: 'repeat'})
export class RepeatPipe implements PipeTransform {
    transform(value: any, times: number) {
        return value.repeat(times);
    }
}
```

2.2 RepeatPipe 转换为 ES 5 代码片段

```javascript
__decorate = (this && this.__decorate) || function (decorators, target, key, desc) {...};
                                                                                                  
var core_1 = require('@angular/core');
var RepeatPipe = (function () {
    function RepeatPipe() { }
    RepeatPipe.prototype.transform = function (value, times) {
        if (!value) return;
        return value.repeat(times);
    };
    RepeatPipe = __decorate([
        core_1.Pipe({ name: 'repeat' }), // 调用PipeDecorator返回TypeDecorator函数
        __metadata('design:paramtypes', [])
    ], RepeatPipe);
    return RepeatPipe;
}());
```

2.3 通过 Reflect API 保存后的对象信息

![图片描述](https://segmentfault.com/img/bVKrqx?w=674&h=376)

2.4 管道解析 - PipeResolver 源码片段

```typescript
// @angular/compiler/src/pipe_resolver.ts
@CompilerInjectable()
export class PipeResolver {
  constructor(private _reflector: ɵReflectorReader = ɵreflector) {}

  // 通过内部的ɵReflectorReader对象提供的API读取metadata信息
  resolve(type: Type<any>, throwIfNotFound = true): Pipe {
    const metas = this._reflector.annotations(resolveForwardRef(type));
    if (metas) {
      // 读取保存的Pipe metadata 信息
      const annotation = ListWrapper.findLast(metas, _isPipeMetadata);
      if (annotation) { return annotation; }
    }
    if (throwIfNotFound) {
      throw new Error(`No Pipe decorator found on ${stringify(type)}`);
    }
    return null;
  }
}
```

2.5 RepeatPipe 管道的创建与执行

2.5.1 管道的创建

```php
// JS has NaN !== NaN
function looseIdentical(a, b): boolean {
  return a === b || typeof a === 'number' && typeof b === 'number' 
    && isNaN(a) && isNaN(b);
}

// 用于检测管道的输入值或参数值是否变化，若发生变化则自动调用管道transform转换函数
function jit_pureProxy214(fn) {
        var result;
        var v0 = UNINITIALIZED; // { toString: function() { return 'CD_INIT_VALUE'} };
        var v1 = UNINITIALIZED; 
        return function (p0, p1) { 
            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
                v0 = p0; // p0: "lo"
                v1 = p1; // p1: 3
            // fn: transform(value: any, times: number) { return value.repeat(times); }
                result = fn(p0, p1); // 调用管道的transform转换函数
            }
            return result;
        };
}

self._pipe_repeat_6 = new jit_RepeatPipe18(); // 创建RepeatPipe对象
self._pipe_repeat_6_0  = jit_pureProxy214( // 代理RepeatPipe中transform函数
  self._pipe_repeat_6.transform.bind(self._pipe_repeat_6));
```

2.5.2 管道的执行

在 Angular 执行变化检测时，会自动调用管道中的 transform 方法

```stylus
var currVal_100 = jit_inlineInterpolate21(1,'',valUnwrapper.unwrap(
  jit_castByValue22 (self._pipe_repeat_6_0,
   self._pipe_repeat_6.transform)('lo',3)),'');
```

### 总结

本文介绍了 Angular 2 中的常用内建管道的用法和管道的分类，同时也介绍了 pure 和 impure 管道的区别。 此外我们通过两个示例展示了如何自定义管道，最后详细分析了 RepeatPipe 管道的工作原理。建议读者更改 RepeatePipe 的 pure 属性为 false，体验一下 impure 管道。