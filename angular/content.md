条件投影和多次渲染投影

```html
<p>content works!</p>
<ng-content select="one"></ng-content>

<ng-container *ngTemplateOutlet="menu"></ng-container>
```

```typescript
export class ContentComponent {
  name = 'from content';
    // 接收外部传进来的template模板,将其渲染到ngTemplateOutlet出口
  @Input()
  menu!: TemplateRef<HTMLElement>;
}

```

更复杂的投影(投影只能投入到组件标签的直接子节点)

*ngTemplateOutlet="templateRef;contextObject;imject"

contextObject = {

​ $implicit:'这是默认的属性',

​ keyName:'这是需要let声明后才可以使用的属性'

}

P```html
<ng-template #templateRefName let-default let-value='keyName'>
</ng-template>

```

上面的default接收的是$implicit的值,value接收的是context对象的keyName的值;

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
