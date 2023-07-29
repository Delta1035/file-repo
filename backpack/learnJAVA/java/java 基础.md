## JAVA环境

- JDK
- Maven
- IDEA

#### Maven

- 一个java工具
- 一个构建工具
- 一个依赖管理工具
- 一个文档工具

## JAVA基础1 

#### 基本变量类型

| 数据类型 | 关键字  | 位元数 | 范围 |      |
| -------- | ------- | ------ | ---- | ---- |
| 整数     | byte    | 8      |      |      |
| 整数     | short   | 16     |      |      |
| 整数     | int     | 32     |      |      |
| 整数     | long    | 64     |      |      |
| 浮点数   | float   | 32     |      |      |
| 浮点数   | double  | 64     |      |      |
| 布尔值   | boolean | 1      |      |      |
| 字符     | char    | 16     |      |      |

#### 常用工具类型

- scan 键盘输入

  ````java
  Scanner sc = new Scanner(System.in);
  int num = sc.nextInt();// 此时会让你输入int类型数字
  ````

  

- random 随机数

  ````java
  import java.util.Random;
  Random r = new Random();
  int number = r.nextInt(10);// [0,10) 取得这个范围的随机数
  ````

- 命令行参数 String[]

  ````java
  public class Sort {
      public static void main(String[] args){
          System.out.println(Arrays.toString(args));
      }
  }
  ````

  

#### 注解



#### 对象类型

- Object 所有类都继承Object类

#### 常用类

- String

- Math

- Array 

  > 注意:
  >
  > 1. Arrays.sort() 排序 会改变数组
  > 2. Arrays.toString() 显示数组的字符串

- Random

#### 在内存中的位置

- 基本类型在stack  引用类型在heap



#### 包引入

- `package essential.foo ` 
  - 意味着此源文件定义的全部类属于这个包.  解决命名冲突,类文件管理问题, 可以把一组功能相关的类放到同一个package下, 组成逻辑上的类库单元. 
  - 这条语句必须作为原文件第一条非注释语句, 且一个源文件只能指定一个包
- `import essential.foo.*`
  - 用于在某个原文件导入指定包下的某个类或者全部类, 在使用时可以省略前缀, 简化编程

#### try/catch 处理报错 `Exception`类型

- 在while循环中加入try/catch 能够处理exception, 不管出现几次, 不会影响循环执行

  ````java
  int i = 0;
  while(i<10){
      i += 1;
      try{
          if(i == 3){
           throw new Exception();   
          }
          System.out.println(i);
      }catch(Exception e){
   System.out.println('x')   
  }
  }
  // 1 2 x 3 4 5 6 7 8 9 10
  ````

  #### 写代码之前的思考

  #### IDE tips

  1. Debug command:
     - step over : F6
     - step into : F5
     - step return : F7
     - 去下一个断点 : F8
  2. 去指定的行 : Ctrl + R
  3. 获取结果: `ctrl` + `shift` + `D`

  #### 类文件很多

  1.  `alt` + `left`/`right`文件之间的前进后退
  2.  `ctrl` + `click` 跳转到代码声明的地方
  3. ctrl + shift + o 管理import 

  

## JAVA文件

- 一个Java源码只能定义一个`public`类型的class，并且class名称和文件名要完全一致；
- javac 可以将.java文件变异成.class 字节码文件
- java 可以执行已经编译好的java程序, 参数是类名
- class 内部同名方法 叫做建构式(类似 es6的 类的构造器), 即使没有写, 也会自动创建一个
- 构建式可以没有返回值
- main 表示编译成.class之后可以直接执行的这一段代码.(如果没有这段代码则不执行)

````java
public class Hello {
    public static void main(string[] args){
        System.out.println('hello java');
    }
}
````

- 

####  JAVA变量

1. local 在方法里面的变量
2. instance
3. static

#### 修饰词

1. private  外部不能修改

2. protected  子类可以看到

3. public 外部可以随意存取

4. static 表示可以不用new 实例 直接在类上面调用

   - 静态方法不能直接使用没有实例化的对象

5. final 表示值不可以再被修改(类似 const) 

   ````java
   public final static double PI = 3.14;
   ````

   

   

#### Date Object in JAVA

#### OOP

## JAVA Coding Rule

1. 一个package对应一个biz module
2. 一个java package 对应一个 程序
3. java package 命名必须小写
4. sub-package
   - controllers
   - fun
   - dao : 数据访问对象(data access object)
   - vo

## 数组操作

1. 遍历数组

   ````java
   // for 循环
   public class Main {
       public static void main(string[] args){
           int[] ns = {1,4,9,16,25};
           for(int i=0;i<ns.length;i++){
               int n = ns[i];
               System.out.println(n);
           }
       }
   }
   // for each循环
   public class Main {
    	public static void main(string[] args){
           int[] ns = {1,2,3,4};
        	for(int n : ns) {
               System.out.println(n);
           }
       }
   }
   
   // 倒序打印
       public static void main(String[] args) {
           int[] ns = { 1, 4, 9, 16, 25 };
           // 倒序打印数组元素:
           for (int n = ns.length-1; n>=0;n -= 1) {
               System.out.println(ns[n]);
           }
       }
   }
   // 直接打印数组 得到的是在jvm的引用地址
   System.out.println(ns); // 类似 [I@7852e922
   // Java标准库提供了Arrays.toString()，可以快速打印数组内容
   System.out.println(Arrays.toString(ns)); //[1, 1, 2, 3, 5, 8]
   ````




#### 网络编程

1. ipv4  32bit
   - 点分10进制
2. ipv6 128bit
   - 冒号分16进制
   - 可以省略前面的0
     - ![1652021744844](D:\triennium\培训\java\java 基础.assets\1652021744844.png)
   - 0位压缩
     - ![1652021657837](D:\triennium\培训\java\java 基础.assets\1652021657837.png)
3. java提供了一个类

## HTTP Methods

- Post	更新数据
- Get    获取数据
- Put    提交数据
- Delete    删除数据

#### http request

````
User-Agent : Fiddler
Host:localhost:8080
Content-length:40
Content-type:application/json
````

#### http response code

| Code | Description                                                 |
| ---- | ----------------------------------------------------------- |
| 1xx  | Informational<br /> 表示请求已收到, 但是还在处理中,等待回应 |
| 2xx  | SUCCESS<br /> 表示动作已经成功接收, 等待然后                |
| 3xx  | Redirection<br /> 要更多动作才能完成                        |
| 4xx  | 请求错误                                                    |
| 5xx  | 服务器错误                                                  |
|      |                                                             |
|      |                                                             |

## Essential 2

#### static and instance

- 非静态变量和方法只属于对象自己, 因此 每个对象的实例成员在存储在内存上的不同位置.
- 使用static 修饰符可以让对象的实例共享同一个静态成员. 他在内容中的固定位置.

#### 直接使用规则的唯一例外

- 实例方法可以直接使用实例成员(方法和变量)
- 实例方法可以直接使用类成员
- 类方法可以直接使用类成员
- 类方法不能直接使用实例成员, 必须使用一个对象的引用. 类方法不能使用 `this`关键字, 因为没有他的引用.

#### 类的加载过程

- 当你第一次创建一个类的对象或者第一次使用类的静态字段或方法, 这个类将会被加载.加载之后的初始化过程如下:
  1. 初始化类的变量和区块( 只执行一次 )
  2. 初始化实例变量和区块(每次对象被创建都会执行)
  3. 执行构造器(每次对象被创建都会执行)

#### JAVA值传递

- java传值方式, 对于原始数据类型他是值拷贝, 对象数据类型, 他是内存地址拷贝,这意味着通过引用取值

#### java内存

1. heap 堆
   - 通过JVM 申请内存给对象和类. 全局变量(类和实例) 保存在堆中. 类保存在一个特别的堆空间 叫做 永生代(PermGen)
   - 垃圾回收运行在堆内存, 当对象没有引用之后就会回收内存

2. stack 栈

   - 用于执行线程. 方法中声明的变量存储在栈中, 可以使原始类型或者堆中对象的引用地址
   - 栈内存相比较于堆内存 大小很小 非常快速
   - 后进先出 , 不管什么方法被调用, 新的块将被生成在栈内存中去用来存储局域变量. 当方法结束, 区块变得无效.

3. 当栈内存满了, jvm将抛出错误 `java.lang.StackOverFlowError` 不管heap 堆内存是否 满

   ` java.lang.OutOfMemoryError: Java Heap Space error`这是堆内存报错

4. 使用 `Xms` 和 `Xmx`  JVM选项去定义初始heap堆的最小和最大内存尺寸, 使用`Xss`去定义栈内存尺寸

   EX: java -Xmx2048m -Xms256m someClass

#### 类之间的关系

1. 所有的类都继承与 `java.lang.Object`, 每个类都是默认导入包`java.lang.`
2. `extends` 关键字只能继承一个`class`, 不支持多重继承
3. 子类拥有所有的资源(类, 实例成员) 来自父类的.
4. 子类可以复写 变量 和 方法, 最好是不要影响父类

#### 原始类型之间的赋值

1. 较短的类型可以复制给较长的类型 : int 是 32bit, double 是 64bit

   ````java
   int i = 3;
   double j = i; // 可以赋值
   
   // 但是
   double i2 = 3;
   int j2 = i2; // 这样不行
   ````

#### 数据比较

- 原始类型可以使用 `==`操作符
- 在对象中, 也可以使用`==`操作符, 他会对比两个对象之间的内存地址.
- 在Object 中也可以复写`equal`方法, 这是Object 对象默认的方法.

#### 数组

- 数组是一个对象`java.util.Arrays`, 他包含固定长度和有序存取数据.

#### 集合

- `java.util.Collection`是最顶层的接口 在java集合类层次树中

- 当一个集合是有序的, 意味着数据是按照插入时间和地址依次排序的

- 当一个集合被排序, 数据被特定的规则排列,通过对象属性等

- 一个集合容器可以有序才能排序, 无序集合不能排序

- 主要的三种集合类型

  | List             | Set                | Map                        |
  | ---------------- | ------------------ | -------------------------- |
  | 包含一个事物列表 | 包含独一无二的事物 | 包含事物独一无二的id和事物 |

  

#### 怎样使用Java集合

- 有序或者无序
- 元素是否可重复
- 线程安全 避免多线程访问集合
- 按键值对保存
- 随机访问,即时检索元素

#### 抽象类`abstract`

1. 抽象类不能被new
2. 抽象类能够被其他类`extends, 子类需要重写抽象类的抽象方法`

#### 接口 `interface`

1. 一个类可以实现很多接口, 一个借口也可以从另一个接口扩展

2. 一个接口下面功能是默认的

   - 变量:

     - public 对外开放的
     - static 不想被改变的
     - final 不想被改变的

   - 方法:

     - public 对外开放的

     - abstract 只能声明, 不能被实现

     - 当一个类实现了接口, 必须override 重写类的接口

     - 一个类实现多个接口发生变量名或者方法名冲突

       1. 变量有静态功能, 属于class, 不属于实例, 需要加类名在变量前面
       2. 只需要实现方法一次

       ![image-20220428105403214](E:\desktop\gitee\triennium\培训\java\java 基础.assets\image-20220428105403214.png)

#### 封装

- 对象属性 private 修饰, 采用public的 get set 方法去获取和设置属性值

- 封装的目标是将代码模块化，并使每个模块之间的关系降到最低。这样，我们就可以避免“小变化影响一切”。

- 希望降低代码的复杂性，便于开发和维护。

- 为此，Java提供了包、类和可见性设置(修饰符)。

#### 继承

- private 修饰符可以让方法和属性不被继承
- final 在类声明中可以让类不被extends

#### 多态

- 方法根据操作对象的不同执行不同的操作

#### 重用的方式

- 两种设计: 继承和组合

#### 对象的引用类型转换为超类或者子类

- 对象转换为超类或者子类 总是有效

- 但是如果类不是实例或者超类, 向下强制转换可能出错

  ````java
  Husky husky = new Husky();
  Chihuahua chihuahua = new Chihuahua();
  //向上轉型, 一定都合法
  Dog dog = husky; // 把哈士奇赋值给狗类 合法
  //向下轉型, 使用()來放轉型後的class name, 這是合法的例子
  husky = (Husky)dog;
  //向下轉型, 這是不合法的例子, 編譯不會檢查, 執行會出錯
  chihuahua = (Chihuahua)dog;// 把狗 赋值给吉娃娃 不合法
  
  ````

  

#### 重写

- 子类编辑继承的实例方法叫做override

- 判断方法是否被重写, 检查子类中的方法和炒类中的方法是否有符合以下条件:

  - 相同的方法名称

  - 相同的输入参数
  - 相同的返回类型(允许类型的子类)
  - 修饰符为public 不能是private
  - 方法不能是private, 或者 final

#### 重载

- 为方法提供更加灵活的输入参数
- 能够在一个类中声明两个相同的方法但是不同的输入参数
- 重载的条件:
  - 相同的方法名但是不同的参数
  - 返回值类型可以不一样, 当输入参数不同时
- 构造器也能够重载

#### 类的设计原则

- 单一职责 
- 高内聚低耦合
- 开闭原则, 最多支持扩展, 避免修改.
- 避免赋值粘贴

## Sprint

#### CORS

#### JSON

#### 调用其他项目的web services

#### 添加其他项目到已有的项目

#### 引入外部依赖

1. 阿里云maven仓库 `https://developer.aliyun.com/mvn/search` , 先查找想要的包, 

   的

#### 常用依赖

- jdbc
- 