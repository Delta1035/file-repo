可以使用`onpush`策略跳过整个组件子树中的变更检测.

## 使用OnPush

onpush策略仅会在一下情况为组件子树运行变更检测:

​	组件内部数据发生变化不会导致页面视图更新(即使onpush组件内部有定时器等可以触发变更检测的行为发生), 除非有一下两种情况发生

- 子树根组件接收到模板绑定结果的新的输入input. 使用 `==`比较当前值和过去值

- 在本子树的根组件或他的任何子组件(不管是否使用onpush变更检测方式)中处理使用onpush变更检测策略的组件中的事件(事件绑定,output输出绑定, @hostLitstener);

  

![image-20230201110455005](C:\Users\wh2104220\AppData\Roaming\Typora\typora-user-images\image-20230201110455005.png)

  

## 常见变更检测场景



### 事件由具有默认变更检测的组件处理

事件发生在没有设置onpush策略的组件上

- 会发生全局变更检测,但是会跳过onpush组件(除非onpush组件接收到新的input)
- 包括onpush组件的子onpush组件和默认变更检测组件

![Change detection propagation from non-OnPush component](https://angular.cn/generated/images/guide/change-detection/event-trigger.svg)