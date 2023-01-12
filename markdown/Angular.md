## Angular

#### 安装包

- ts-node  直接运行ts代码
- typings  ts代码提示
- rimraf  递归的删除文件 用来删除node_modules   rimraf node_modules

#### vscode插件

- angular snippets 实现html和ts代码提示
- formate css格式化插件
- angular language service 代码自动补全,错误检查,查看定义,快速定位

#### 创建ts配置文件以及监视ts文件

- tsc --init 生成 tsconfig.json
- tsc --node 直接运行ts文件
- 终端 => 运行任务 =>Typescript =>tsc:监视-tsconfig.json

#### TS数据类型

- 变量的含义
  1. 变量是一个存储空间
  2. 空间大小由数据类型决定
  3. 变量名是存储空间名
  4. 变量值是存储空间的内容
  5. 存储内容是可以变化的
- null和undefined类型
  1. 默认情况下两种类型是其他类型的子类型,可以赋值给其他类型
  2. 当启用严格空校验时,null和undefined只能赋值给void或者本身对应的类型

- void和never类型
  1. void类型表示没有任何类型,用于没有返回值的函数一般
  2. never是其他类型的子类型(包括null和undefined),表示从不会出现的值

#### appModule

```typescript
@NgModule({
  declarations: [ //引入指令, 管道 , 组件
    AppComponent
  ],
  imports: [ //引入模块 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }], //存放服务
  bootstrap: [AppComponent]
})
```

#### Injectable 可注入的

- provideIn 说明服务由哪个模块提供的  root代表AppModule提供的

#### 注意点:

- <router-outlet></router-outlet> 路由器的出口

  > 路由器的出口 根据url地址切换画面

- @viewChild('componentName', { static:true(静态模板) })   如果组件或元素被*ngIf等修饰符修饰 就是动态的 
  true : 变更检测之后计算模板查询时间
