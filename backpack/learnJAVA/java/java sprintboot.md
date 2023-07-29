## 遇到的问题

#### 1. 使用maven 创建 sprint boot时@RestController 注解失效问题

- 报错 : Dependency 'org.springframework.boot:spring-boot-starter-web:' not found

![image-20220426174717738](E:\desktop\gitee\triennium\培训\java\java sprintboot.assets\image-20220426174717738.png)

pom.xml 文件 加入dependency 然后在idea 右边maven 栏位

![image-20220426174838512](E:\desktop\gitee\triennium\培训\java\java sprintboot.assets\image-20220426174838512.png)

![image-20220426174903176](E:\desktop\gitee\triennium\培训\java\java sprintboot.assets\image-20220426174903176.png)

lifecycle 选择安装对应的依赖

#### 2. JDK版本太高

- 报错 : Unable to make field private com.sun.tools.javac.processing.JavacProcessingEnvironment$DiscoveredProcessors com.sun.tools.javac.processing.JavacProcessingEnvironment.discover

#### 3. sprint boot 默认监听localhost:8080

#### 4. bean扫描不到的问题

- ![image-20220510173027018](E:\desktop\triennium\培训\java\java sprintboot.assets\image-20220510173027018.png)

- [关于spring boot自动注入出现Consider defining a bean of type ‘xxx‘ in your configuration问题解决方案_梦岚如雪的博客-CSDN博客](https://blog.csdn.net/a532672728/article/details/77702772)

## 文件结构

#### JAVA Coding Rule

- module
  - controller
  - dao
  - function
  - vo

![image-20220507163247127](E:\desktop\triennium\培训\java\java sprintboot.assets\image-20220507163247127.png)

- `common`存放公共数据
  - `entity` 存放数据库模型
- `Project`需求文件
  - `controller` 接收前端请求入参, 处理前端参数, 验证合法性, 将参数传给service层
  - `service`存放服务接口以及实现类的文件夹, 根据controller传递的参数, 实现业务, 拆解业务为对Dao层的基础操作,CURD并调用不同的Dao层方法实现
    - impl
      - IFirstServiceImpl 外面那个接口的实现
    - IFirstService (接口不需要方法体)
  - `mapper`（dao）数据持久层,仅仅做纯粹的数据库CURD操作存放接口,不涉及业务
  - `entity`(pojo,model) ===> 对应的数据库中存在的表和业务模型(VO)

#### 请求结构

controller => service => ...

## Mybatis 

> 10.50.140.4/temp/javaTraining

#### 增加mybatis依赖

````xml
		<dependency>
			<groupId>com.baomidou</groupId>
			<artifactId>mybatis-plus-boot-starter</artifactId>
			<version>3.4.1</version>
		</dependency>
````

- 增加@mapper注解 ( spring 提供了 @Repository  有类似功能)
  - 在对应的xml文件写sql语句

## 其他依赖

给你们一个需求,api 请求 输入一个入参，根据asc码判断他是个什么类型的
分为 小写字母\大写字母\数字字符\算术运算符\关系运算符\逻辑运算符 如果不存在于上面的任何一个类型 提示是其他运算符 如果这个字符的长度大于1 返回长度不能大于1

#### web

- 常用注解
  - @RestController
  - @GetMapping
    - @RequestParams() 类型 属性名 获取query请求参数
  - @PostMapping
  - @Autowired / @Resource 注入依赖
  - 

- 在controller文件中应该用@RestController注解 

````xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
````

#### Data

````
	<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>1.18.24</version>
		</dependency>
````

- @Data 将属性自动重写转成get set
- @Getter / @Setter  只是增加getter / setter (一般用这个)

```java
package com.wistron.common.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Integer id;
    private String name;
    private String password;
    private String tel;
    private Integer age;
}

```

#### JSON

````java
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>fastjson</artifactId>
			<version>2.0.1</version>
		</dependency>
````

````json
{
    "seq":"1652339871028wh2104220",
    "requestInfo":{
     "owner":"wh2104220",
     "plant":["F139"]
    }
}
````

- 所有的厂区
  - [F139, F601, F130, F301, F604, F137, F131, F134, F136]
  - F134 只有一笔
  - F130也只有6笔

## SQL语句

1. **select** **DISTINCT** address **from** data  选择不同的address 

## 常用

- BeanUtils.copyProperties(old,new);对象互相copy

## HTTP

1. 场景: api返回较大数据给前端, 会影响效能, 通过设定开启Gzip压缩

   > server.compression.enabled=true
   >
   > server.compression.mime-types=application/json
   >
   > server.compression.min-response-size=10240
   >
   > ![image-20220518112906400](E:\desktop\triennium\培训\java\java sprintboot.assets\image-20220518112906400.png)