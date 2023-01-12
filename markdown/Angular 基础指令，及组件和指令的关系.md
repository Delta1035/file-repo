# Angular 基础指令，及组件和指令的关系

[![img](https://p9-passport.byteacctimg.com/img/user-avatar/feff3e68cc85efe80d19e870dc1d037e~300x300.image)](https://juejin.cn/user/782508010536478)

[拾清风 ![lv-1](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/636691cd590f92898cfcda37357472b8.svg)](https://juejin.cn/user/782508010536478)

2021年09月29日 23:53 · 阅读 423

关注

![Angular 基础指令，及组件和指令的关系](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/102f91f512674f9eb7eec142a84d6417~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?)

- 属性型指令
- 结构型指令

## 一、内置指令

属性型指令：

- ngModel
- ngClass
- ngStyle

结构型指令：

- ngIf
- ngSwitch/ngSwitchCase
- ngFor

不常见指令：

- ngNonBindable
- ngTemplateOutlet
- ngComponentOutlet

## 二、编写指令

### 1. 创建指令

通过 `@angular/cli` 新建指令：

```bash
ng generate directive highlight
复制代码
```

或手动新建 `highlight.directive.ts`：

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

}
复制代码
```

需要注意：

- 指令需要注册到模块 `@NgModule` 注解的 metadata 参数的 `imports` 属性

- 指令的装饰器的 metadata 中，`selector` 属性的值必须被 `[]` 包裹，否则应用不生效

- 也可以限定此指令的宿主的标签类型

  ```typescript
  @Directive({
    selector: 'div[appHighlight]'
  })
  复制代码
  ```

总结：创建组件和指令的方式相差无几，都需要在 module 中注册，设置 selector 的规则相似，区别在于组件带有模板和样式，指令不带，不会自动生成 html 标签。

### 2. 使用指令

然后可以在其他组件的标签上使用：

```html
<p appHighlight>Highlight me!</p>
复制代码
```

从使用上可以看出：

- 指令在使用形式上是一个自定义的标签属性

事实上，组件也可以自定义标签属性的形式使用。

### 3. 指令的依赖注入

接下来让我们来丰富一下指令内容：

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
|   constructor(el: ElementRef) {
      // 由 DI 注入的 context 相关的类均指向宿主元素
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
复制代码
```

注意：由 DI 注入的 context 相关的类（如：ElementRef， ViewContainerRef 等）均指向**宿主元素**，意味着可以直接操作这些对象来改变宿主元素的属性或结构。这也是指令操作 DOM 的基础。

在其他方面，指令的依赖注入和组件并无区别。

### 4. 指令的参数传递

指令可以通过和组件传参类似的方式来传参。如下我们先来拓展一下指令，给指令添加一个参数

```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() appHighlight: string = 'red';

  constructor(
    private el: ElementRef
  ) {
    // 由 DI 注入的 context 相关的类均指向宿主元素
  }

  ngOnInit() {
    // 颜色值改成引用变量，并将语句从构造器中提取至出来，因为给参数赋值的过程在构造函数之后，OnInit 生命周期前。
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
}
复制代码
```

参数名同指令名字，在外部调用时，即可传递动态参数，页面内以如下方式使用：

```html
<div appHighlight="yellow">hello world</div>
<div [appHighlight]="'yellow'">hello world</div>
复制代码
```

当然指令其实并不是只能传递一个动态参数，它和组件一样，可以按需传参：

```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() appHighlight: string = 'red';

| @Input() appDefaultColor: string = '#f2f2f2';

| @Input() appDelay: number = 0;

  constructor(
    private el: ElementRef
  ) {
    // 由 DI 注入的 context 相关的类均指向宿主元素
  }

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
|   console.log(this.appDefaultColor, this.appDelay);
  }
}
复制代码
```

然后在模板上使用：

```html
<div appHighlight="yellow" appDefaultColor="red" [appDelay]="2000">hello world</div>
<div [appHighlight]="'yellow'" appDefaultColor="grey" [appDelay]="3000">hello world</div>
复制代码
```

总结一下：指令的参数传递和组件无差异

### 5. 指令的生命周期

指令也有生命周期，且和组件无差异：

[Angular - Lifecycle hooks](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fguide%2Flifecycle-hooks%23lifecycle-event-sequence)

### 6. 指令的事件绑定

与组件的事件绑定不同，由于指令并不存在相关联的模板，所以当需要使用指令来实现监听宿主元素的事件时，通常会使用：`@HostListener` 装饰器，该装饰器会将传入的事件绑定到宿主元素之上，该装饰器接收两个参数，使用方式如下：

```typescript
@HostListener(event: string[, args: string[]])

// examples:
@HostListener('click') onClick() {}
@HostListener('click', ['$event']) onClick(event: PointerEvent) {}
@HostListener('click', ['$event', '$event.target']) onClick(event: PointerEvent, target: HTMLElement) {}
@HostListener('window:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {}
复制代码
```

顺便一提，组件中使用此装饰器同样生效。

此外，指令同组件一样，也可以传出事件

```typescript
  @Output() appVisibleChange = new EventEmitter<boolean>();
复制代码
```

外部事件绑定同组件：

```html
<div 
     [appHighlight]="'yellow'"
     appDefaultColor="grey"
     [appDelay]="3000"
|    (appVisibleChange)="log($event)"
>hello world</div>
复制代码
```

总结：指令的事件绑定和组件中无差异，不过在使用上通常只会使用 `@HostListener` 装饰器，因为指令没有模板。

### 7. 与组件的对比及总结

通常，我们可以把组件看作是指令的衍生与拓展，因为没有模板，所以指令通常能实现**比组件更灵活的事情**。

指令通常更偏向于封装**行为**，组件则是封装**模板和样式**

若是广义层次上来看指令，我们可以把指令分为三种类型：

- 属性型指令
- 结构型指令
- 组件

所以，如果我们参阅组件库的文档，我们可以发现，其中不少 API 的形式是指令，除非有需要在页面上渲染一些标签的需要，例如分界线，布局等

查阅：

- Antd 组件库 [Components | NG-ZORRO (ant.design)](https://link.juejin.cn/?target=https%3A%2F%2Fng.ant.design%2Fcomponents%2Foverview%2Fen)
- Material 组件库 [Components | Angular Material](https://link.juejin.cn/?target=https%3A%2F%2Fv7.material.angular.io%2Fcomponents%2Fcategories)

## 属性型指令

属性型指令通常用于具备实体的模板标签上，用于修改标签的属性，我们平时使用的多数都是属性型指令。

无甚可说。

## 结构型指令

结构型指令更多用于类似 `<ng-template>` 等标签上，通常会修改 DOM 结构。

从实现上来说，属性型指令和结构型指令并无区别。区别在于其造成修改的范围，属性型指令修改元素本身属性，结构型指令修改相关联的 DOM 结构。

`*` 作为使用指令的前缀时，是一种缩写语法，Angular 有一套特定的规则来缩写结构型指令（参阅：[Angular - Writing structural directives](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fguide%2Fstructural-directives%23structural-directive-shorthand)）。在结构型指令前使用 `*` 缩写语法时，Angular 会自动地将该元素和其子元素转换进 `<ng-template>` 中，这意味着可以直接在组件中取 TemplateRef 对象，即便显式的宿主元素不是 `<ng-template>`，方便指令中使用，进行 DOM 结构修改。同时，这也是一个标签上只能使用一个结构型指令的原因。

下面来举个例子（取材于官网）：

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
|   private templateRef: TemplateRef<any>,
|   private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
|     this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
|     this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
复制代码
```

使用方法：

```html
<p *appUnless="condition" class="unless a">
  (A) This paragraph is displayed because the condition is false.
</p>

<p *appUnless="!condition" class="unless b">
  (B) Although the condition is true,
  this paragraph is displayed because appUnless is set to false.
</p>
复制代码
```

## 增强指令类型检测（Type Checking）

1. Improving template type checking for custom directives [Angular - Writing structural directives](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fguide%2Fstructural-directives%23improving-template-type-checking-for-custom-directives)
2. Making in-template type requirements more specific with template guards [Angular - Writing structural directives](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fguide%2Fstructural-directives%23making-in-template-type-requirements-more-specific-with-template-guards)
3. Typing the directive's context [Angular - Writing structural directives](https://link.juejin.cn/?target=https%3A%2F%2Fangular.io%2Fguide%2Fstructural-directives%23making-in-template-type-requirements-more-specific-with-template-guards)

在编写指令时，可以对调用以及类型检测起到一些辅助作用。

有兴趣可以自行查阅。