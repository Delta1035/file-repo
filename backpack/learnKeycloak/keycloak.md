## JWT

用户登陆提供正确的凭证后,服务器将创建一个jwt令牌返回给用户.

jwt由header,payload,signature组成,使用句点分割, header和payload使用secret数字加密,

> **注意：**有效负载可以包含任何内容 应用程序开发人员需要，但至少包含用户 ID。它不应包含用户密码。

```
// {base64UrlEncode-header}.{base64UrlEncode-payload}.{encrypted-signature}
eyJhbXVCJ9.eyJpZCI6Ij.I3wpRNCH4;
```

> 关于keycloak,目前只用到了验证与授权, 类似角色管理是由每个系统单独处理的
>
> 1. 解决的问题
>    - 每个系统都要维护自己的用户数据库
>    - 统一的安全校验

## keycloak

> angular



> loopback



### 开始运行keycloak镜像

> ```bash
> docker run -p 8080:8080 -e KEYCLOAK_ADMIN=delta -e KEYCLOAK_ADMIN_PASSWORD=delta23456 quay.io/keycloak/keycloak:20.0.1 start-dev
> docker run -d -p 8450:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin 528491526/keycloak:20.0.1 start-dev
> docker run -d -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak:16.1.1 start-dev
> ```

### 登录管理员控制台

点击[keycloak Admin Console](http://127.0.0.1:8080/auth/) 

### 控制台功能介绍

侧菜单栏的配置部分:

- `Realm Setting`是调整领域设置，如令牌到期、主题、缓存等。
- `Client`客户端是一个重要的选项卡，用于创建表示我们为产品构建的应用程序的客户端。
- `Client Scope`客户端作用域是客户端可以使用的常见作用域。作用域是帮助客户端（应用程序）决定授予或拒绝对其资源（资产）的访问权限的实体。
- `Role`角色是一组常见的分类，主要有助于授予对某些应用程序资产的访问权限。这些可以在所有客户端中常用。
- `Identity Providers`身份提供程序利用外部身份管理系统的功能进行身份验证。
- `User Federation`用户联合是将Keycloak的身份数据库与外部用户数据库（如LDAP服务器）集成。
- `Authentication`身份验证是为了控制Keycloak的默认身份验证/授权行为。在大多数情况下，您不需要调整它，因为它是一个稍微高级的功能，用于真正的微调目的。

管理部分相当直观，您可以在其中创建和管理用户、组和会话;并执行设置的导入和导出。事件选项卡用于检查管理员和用户日志（如登录，更改等）并添加您为Keycloak编写的插件。

### 开启中文

1. 选择master 

2. 选择theme选项卡

3. 选择internationalization enabled

4. 选择中文

5. 保存刷新

   ![image-20221210164057810](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041971.png)

### 创建领域

1. 鼠标移到master， add realm

   ![image-20221210164209598](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041478.png)

### 创建用户

1. 点击侧边栏的users =>  add user

2. username必填

3. 保存

   ![image-20221210165153050](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041449.png)

### 设置用户信息

![image-20221210170122647](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041060.png)

### 创建client

![image-20221210170703814](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041519.png)

### 配置client

1. 设置access type

   - public 适用于客户端应用，且需要浏览器登录的场景。典型的使用场景就是前端web系统，包括采用vue、react实现的前端项目等。

   - confidential 适用于服务端应用，且需要浏览器登录以及需要通过密钥获取access token的场景。典型的使用场景就是服务端渲染的web系统。

     **使用 confidential类型客户端可以同时使用用户名密码和access token两种登录方式**

   - bearer-only 适用于服务端应用，不需要浏览器登录，只允许使用bearer token请求的场景。典型的使用场景就是restful api。

![image-20221210171149473](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252041650.png)

### 保护应用程序和服务

#### 配置ca证书和mysql

[keycloak搭建开启https-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/789757)

1. 创建网络

   > docker network create keycloak-network

2. 启动mysql实例

   > ```
   > docker run --name mysql -d --net keycloak-network -e MYSQL_DATABASE=keycloak -e MYSQL_USER=delta -e MYSQL_PASSWORD=delta123456 -e MYSQL_ROOT_PASSWORD=delta123456 mysql
   > ```

3. 启动keycloak实例

   > ```
   > docker run --name keycloak --net keycloak-network jboss/keycloak
   > ```

4. 挂载ca证书目录

   - 注意: 由于是自签证书,需要先访问对应的服务器并且信任 https://124.221.95.189
   - 注意: ca证书需要改名,参考 [jboss/keycloak - Docker Image | Docker Hub](https://hub.docker.com/r/jboss/keycloak)
     - tls.crt 证书
     - TLS.key 私钥

   > ```
   > docker run --name keycloak -e DB_VENDOR mysql -e DB_ADDR http://124.221.95.189 -e DB_PORT 3307 -e DB_DATABASE keycloak -e DB_USER delta -e DB_PASSWORD delta123456 -e KEYCLOAK_USER=delta -e KEYCLOAK_PASSWORD=delta123456  -p 8080:8080 -p 443:8443 -v /usr/ca/keycloak:/etc/x509/https -d  jboss/keycloak:16.1.1
   > ```

#### nodejs配置keycloak

> 注意: 使用api配置keycloak,要在文档示例路径前面增加 `auth/admin/realms/`
>
> https://www.keycloak.org/docs-api/20.0.2/rest-api/index.html#_version_information



#### loopback配置认证策略



#### 前端配置keycloak

1. 安装keycloak-js

 ```html
  - npm i keycloak-js
  - <script src="http://127.0.0.1:8080/auth/js/keycloak.js"></script>
 ```

2. 在keycloak控制台将client设置为

   - Access Type : public

   - Redirect URIs : localhost:4200   (keycloak验证之后重定向回这个地址,写错回不来了)

   - web Origins : localhost:4200   (keycloak配置cors, *代表所有地址都可以访问)

   - installation => 选择 keycloak OIDC json 点击下载keycloak.json配置文件(根据官网的教程直接走不通)

     直接配置成对象

     ```javascript
     const keycloak = new Keycloak({
         url: 'http://keycloak-server$',
         realm: 'myrealm',
         clientId: 'myapp'
     });
     ```

     

   - 将下载好的配置文件放到angular项目assets/config/keycloak.json位置.

   ![image-20221211235530493](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252042250.png)

3. 

当后端项目继承keycloak之后我们无法直接访问后端接口,必须先获取token,携带token访问接口.

![image-20221210180835652](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252042640.png)





{
  "realm": "delta_realm",
  "auth-server-url": "http://127.0.0.1:8080/auth/",
  "ssl-required": "external",
  "resource": "delta_client",
  "public-client": true,
  "confidential-port": 0
}

K21040020 lcx112233*

authentication 身份认证

authorization 授权

请求 URL: 

http://127.0.0.1:8450/realms/myrealm/protocol/openid-connect/token

```
AUTH_SESSION_ID=ed59c846-18b8-4e70-a3c1-a82d30ab6968.4223a3caa516; AUTH_SESSION_ID_LEGACY=ed59c846-18b8-4e70-a3c1-a82d30ab6968.4223a3caa516; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYmZjMTIyZC00MzQyLTRmMDUtYTRhZi0wNDJjY2ZlZTI2OWYifQ.eyJleHAiOjE2NzA3MDAwMTMsImlhdCI6MTY3MDY2NDAxMywianRpIjoiNGE3OTljYjgtMTQxNS00Y2I5LWIyMzYtNWU5NTBmYmRkYTI0IiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL2F1dGgvcmVhbG1zL215cmVhbG0iLCJzdWIiOiIzOGYzMmNjYy0wZGExLTQxOWItYTczMy05OTI0ZjQ5ZTNmZjAiLCJ0eXAiOiJTZXJpYWxpemVkLUlEIiwic2Vzc2lvbl9zdGF0ZSI6ImVkNTljODQ2LTE4YjgtNGU3MC1hM2MxLWE4MmQzMGFiNjk2OCIsInNpZCI6ImVkNTljODQ2LTE4YjgtNGU3MC1hM2MxLWE4MmQzMGFiNjk2OCIsInN0YXRlX2NoZWNrZXIiOiJ6cU44ZnRoOFBZX0xpdVNrUE1ZSkVtem5OWUhQVDhfNjh5a092ZURCOExnIn0.Evo51TY7d9QpPa5A92Q_3I8l3rjXTeTwRKAHMwWdqng; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYmZjMTIyZC00MzQyLTRmMDUtYTRhZi0wNDJjY2ZlZTI2OWYifQ.eyJleHAiOjE2NzA3MDAwMTMsImlhdCI6MTY3MDY2NDAxMywianRpIjoiNGE3OTljYjgtMTQxNS00Y2I5LWIyMzYtNWU5NTBmYmRkYTI0IiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL2F1dGgvcmVhbG1zL215cmVhbG0iLCJzdWIiOiIzOGYzMmNjYy0wZGExLTQxOWItYTczMy05OTI0ZjQ5ZTNmZjAiLCJ0eXAiOiJTZXJpYWxpemVkLUlEIiwic2Vzc2lvbl9zdGF0ZSI6ImVkNTljODQ2LTE4YjgtNGU3MC1hM2MxLWE4MmQzMGFiNjk2OCIsInNpZCI6ImVkNTljODQ2LTE4YjgtNGU3MC1hM2MxLWE4MmQzMGFiNjk2OCIsInN0YXRlX2NoZWNrZXIiOiJ6cU44ZnRoOFBZX0xpdVNrUE1ZSkVtem5OWUhQVDhfNjh5a092ZURCOExnIn0.Evo51TY7d9QpPa5A92Q_3I8l3rjXTeTwRKAHMwWdqng; KEYCLOAK_SESSION=myrealm/38f32ccc-0da1-419b-a733-9924f49e3ff0/ed59c846-18b8-4e70-a3c1-a82d30ab6968; KEYCLOAK_SESSION_LEGACY=myrealm/38f32ccc-0da1-419b-a733-9924f49e3ff0/ed59c846-18b8-4e70-a3c1-a82d30ab6968
```

### 从keycloak服务器获取keycloak.js脚本

> http://127.0.0.1:8080/auth/js/keycloak.js 从keycloak服务器获取keycloak.js脚本

### keycloak admin rest api

1. 配置master realm

   - 选择client
   - 选中admin-cli
   - 在setting中将access type 设为 confidential
   - 启用 service Accounts Enable
   - 选择Mappers tab
   - 点击创建
   - ![image-20230103131827340](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/image-20230103131827340.png)

2. 请求keycloak-server:port/auth/realms/master/protocol/openid-connect/token

   - 参数

     ![image-20230103132039232](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/image-20230103132039232.png)

     client_secret 在 admin-cli客户端的credential获取

     ![image-20230103132143715](C:\Users\wh2104220\AppData\Roaming\Typora\typora-user-images\image-20230103132143715.png)

### 常用组件

[Component | LoopBack Documentation](https://loopback.io/doc/en/lb4/Component.html#using-components)

#### 通过组件贡献多个工件

[组件](https://loopback.io/doc/en/lb4/Component.html)可以被视为绑定的集合 添加到上下文中

```typescript
/**
 * Define a component to register the greeter extension point and built-in
 * extensions
 */
export class GreetingComponent implements Component {
  bindings = [
    createBindingFromClass(GreetingService, {
      key: GREETING_SERVICE,
    }),
    createBindingFromClass(EnglishGreeter),
    createBindingFromClass(ChineseGreeter),
  ];
}
```



### loopback 依赖注入

#### 配置要注入的内容

在 LoopBack 中，我们使用[上下文](https://loopback.io/doc/en/lb4/Context.html)来跟踪所有可注射的内容 依赖。

有几种不同的方法可以配置要注入的值，即 最简单的选择是调用 。`app.bind(key).to(value)`

常量 工厂函数 类 provider提供程序 作为另一个绑定的别名

1. server.bind().to('') 绑定值

2. server.bind().toClass() 绑定类

3. server.bind().toProvider() 绑定一个提供程序(value() 返回的值) 

4. server.bind().toDynamicValue()

   ctx.bind(CURRENT_DATE).toDynamicValue(()=>new Date());

``` typescript
const context = new Context();

context.bind('lead').toClass(DeveloperImpl);
context.bind('team').toClass(TeamImpl);
context.bind('project').toClass(ProjectImpl);


export namespace JWTAuthenticationStrategyBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.strategy.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.strategy.jwt.expires.in.seconds',
  );
}

...

server
  .bind(JWTAuthenticationStrategyBindings.TOKEN_SECRET)
  .to('myjwts3cr3t');

server
  .bind(JWTAuthenticationStrategyBindings.TOKEN_EXPIRES_IN)
  .to('600');

server.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(TokenService);

// 获取类的实例
const tokenService = await server.get(TokenServiceBindings.TOKEN_SERVICE);
// tokenService is a TokenService instance

app
  .bind(AuthenticationBindings.AUTH_ACTION)
  .toProvider(AuthenticateActionProvider);

const authenticate = await app.get(AuthenticationBindings.AUTH_ACTION);
// authenticate is the function returned by provider's value() method
```

#### 官方示例

```typescript

import {BindingKey, Context, inject, Provider} from '@loopback/context';

/**
 * A strongly-typed binding key for current date
 * 一个强类型绑定键 当前日期
 */
const CURRENT_DATE = BindingKey.create<Date>('currentDate');

/**
 * A strongly-typed binding key for `Greeter`
 * 接待员
 */
const GREETER = BindingKey.create<Greeter>('greeter');

/**
 * A factory function to return the current date
 */
const getCurrentDate = () => new Date();

/**
 * A class with dependency injection
 */
class Greeter {
  // 构造函数注入
  constructor(@inject('currentUser') private userName: string) {}

  // 属性注入
  @inject(CURRENT_DATE)
  private created: Date;

  // 属性注入
  @inject('requestId')
  private requestId: string;

  hello() {
    return `[${this.created.toISOString()}] (${this.requestId}) Hello, ${
      this.userName
    }`;
  }
}

/**
 * 一个提供者类类似于工厂函数但是需要依赖注入的功能
 * A provider is similar as the factory function but it requires dependency
 * injection. As a result, it's declared as a class with `@inject.*` decorations
 * applied.
 */
class RequestIdProvider implements Provider<string> {
  static ids: Map<string, number> = new Map();

  // Injection of `url`
  constructor(@inject('url') private url: string) {}

  // This method returns the resolved value for the binding
  value() {
    let id = RequestIdProvider.ids.get(this.url);
    if (id == null) {
      id = 1;
    } else {
      id++;
    }
    RequestIdProvider.ids.set(this.url, id);
    return `${this.url}#${id}`;
  }
}

export async function main() {
  const ctx = new Context('request');

  // Set the current user to `John` (a constant value)
  ctx.bind('currentUser').to('John');

  // Set current url
  ctx.bind('url').to('/greet');

  // Set the current date to a factory function that creates the value
  ctx.bind(CURRENT_DATE).toDynamicValue(getCurrentDate);

  // Bind `hello` to a class from which the value is instantiated
  ctx.bind(GREETER).toClass(Greeter);

  // Set `requestId` to a provider class which has a `value()` method to
  // create the value. It's a specializd factory declared as a class to allow
  // dependency injection
  // 一个特殊的工厂类允许依赖注入
  ctx.bind('requestId').toProvider(RequestIdProvider);

  // Bind `hello` as an alias to `GREETER`
  ctx.bind('hello').toAlias(GREETER);

  let greeter = await ctx.get(GREETER);
  console.log(greeter.hello());

  greeter = await ctx.get<Greeter>('hello');
  console.log(greeter.hello());
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
```



#### 依赖注入的三种风格

loopback支持三种依赖注入：

1. 构造函数注入：依赖项作为参数提供 类构造函数。
2. 属性注入：依赖关系存储在实例属性中之后 类已构造。
3. 方法注入：依赖项作为方法的参数提供 调用。请注意，构造函数注入是一种特殊形式的 方法注入，通过调用类的构造函数来实例化类。

#### 构造函数注入

```typescript
class ProductController {
  constructor(@inject('repositories.Product') repo) {
    this.repo = repo;
  }

  async list() {
    return this.repo.find({where: {available: true}});
  }
}
```

#### 属性注入

```typescript
class InfoController {
    
  @inject('logger', {optional: true})// 如果没有对应的依赖则返回undefined 而不是error
  private logger = ConsoleLogger();// 如果拿不到依赖注入的值就返回默认值ConsoleLogger()

  status() {
    this.logger.info('Status endpoint accessed.');
    return {pid: process.pid};
  }
}
```

#### 方法注入

```typescript
class InfoController {
  greet(@inject(SecurityBindings.USER) user: UserProfile) {
    return `Hello, ${user.name}`;
  }
}

```

#### 不同作用域绑定的依赖关系注入

上下文(new context())可以形成链，绑定可以在不同级别注册。 绑定作用域不仅控制绑定值的缓存方式，还控制绑定值的缓存方式 其依赖项已解析。

[依赖注入|环回文档 (loopback.io)](https://loopback.io/doc/en/lb4/Dependency-injection.html#method-injection)

```typescript
import {inject, Context, BindingScope} from '@loopback/core';
import {RestBindings} from '@loopback/rest';

interface Logger() {
  log(message: string);
}

class PingController {
  constructor(@inject('logger') private logger: Logger) {}
}

class MyService {
  constructor(@inject('logger') private logger: Logger) {}
}

class ServerLogger implements Logger {
  log(message: string) {
    console.log('server: %s', message);
  }
}

class RequestLogger implements Logger {
  // Inject the http request
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  log(message: string) {
    console.log('%s: %s', this.req.url, message);
  }
}

const appCtx = new Context('application');
appCtx
  .bind('controllers.PingController')// 给PingController这个类注入依赖
  .toClass(PingController)
  .inScope(BindingScope.TRANSIENT);

const serverCtx = new Context(appCtx, 'server');
serverCtx
  .bind('my-service')
  .toClass(MyService)
  .inScope(BindingScope.SINGLETON);// 注入一个myService单例

serverCtx.bind('logger').toClass(ServerLogger);
```

#### 依赖注入装饰器

- @inject
  用于注释类属性或构造函数参数的装饰器,注入的值应用于构造的实例,只能用于类的非静态属性或构造函数参数,装饰器允许您注入绑定到任何 [上下文](https://loopback.io/doc/en/lb4/Context.html)对象的实现，例如应用程序 实例或请求上下文实例。您可以绑定值、类定义、 并将函数提供给这些上下文，然后解析值

- @inject.gettter

  Syntax: .`@inject.getter(bindingSelector: BindingSelector)`

  返回一个promise或者一个符合过滤函数的数组返回值

  ```typescript
  import {inject, Getter} from '@loopback/core';
  import {UserProfile} from '@loopback/authentication';
  import {get} from '@loopback/rest';
  
  export class HelloController {
    constructor(
      @inject.getter('authentication.currentUser')// 返回一个promise
      private userGetter: Getter<UserProfile>,
    ) {}
  
    @get('/hello')
    async greet() {
      const user = await this.userGetter();
      return `Hello, ${user.name}`;
    }
  }
  // 返回一个符合条件的数组
  class MyControllerWithGetter {
    @inject.getter(filterByTag('prime'))
    getter: Getter<number[]>;
  }
  
  ```

  

- @inject.setter

- @inject.binding

- @inject.tag

- @inject.view

- @inject\.context

### loopback 上下文(context)

### loopback binding

绑定通常具有以下属性：

- key：每个绑定都有一个在上下文中唯一标识自身`key`

  ```typescript
   /**
     * Keycloak服務綁定 返回一个key
     */
    export const SERVICE_BINDING = BindingKey.create<KeycloakService>(
      'services.keycloak',
    );
  ```

  

- scop：作用域控制如何在其中创建和缓存绑定值背景(是否是单例)(Transient Singleton Context )

- tags：标记是用于描述或批注绑定的名称或名称/值对

- value：必须为每个绑定配置一种类型的值提供程序，以便 它可以解析为常量或计算值

#### 创建绑定的方法

- 构造函数: Binding

  ```typescript
  import {Context, Binding} from '@loopback/core';
  const context = new Context();
  const binding = new Binding('my-key');
  ctx.add(binding);
  ```

  

- Binding.bind()

  ```typescript
  import {Context, Binding} from '@loopback/core';
  const context = new Context();
  const binding = Binding.bind('my-key');
  ctx.add(binding);
  ```

  

- context.bind()

  ```typescript
  import {Context, Binding} from '@loopback/core';
  const context = new Context();
  context.bind('my-key');
  ```


#### 查找binding

``` typescript

import {
  BindingFilter,
  BindingTemplate,
  Context,
  createBindingFromClass,
  filterByTag,
  injectable,
} from '@loopback/context';

interface Greeter {
  language: string;
  greet(name: string): string;
}

const asGreeter: BindingTemplate = binding => {
  binding.tag('greeter');
};

const greeterFilter: BindingFilter = binding =>
  binding.tagMap['greeter'] != null;

class ChineseGreeter implements Greeter {
  language = 'zh';
  greet(name: string) {
    return `你好，${name}！`;
  }
}

@injectable(asGreeter)
class EnglishGreeter implements Greeter {
  language = 'en';
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}

export async function main() {
  const ctx = new Context('request');

  // Add EnglishGreeter for now
  ctx.add(createBindingFromClass(EnglishGreeter, {namespace: 'greeters'}));   
  // Add ChineseGreeter
  ctx.bind('greeters.ChineseGreeter').toClass(ChineseGreeter).tag('greeter');

  const enlishGreeterBinding = ctx.getBinding('greeters.EnglishGreeter');
  console.log(enlishGreeterBinding.key);

  let possibleEnglishGreeters = ctx.find('*.EnglishGreeter');
  console.log(possibleEnglishGreeters.map(b => b.key));

  possibleEnglishGreeters = ctx.find(/\w+\.EnglishGreeter$/);
  console.log(possibleEnglishGreeters.map(b => b.key));

  let greeterBindings = ctx.findByTag('greeter');
  console.log(greeterBindings.map(b => b.key));

  greeterBindings = ctx.find(filterByTag('greeter'));
  console.log(greeterBindings.map(b => b.key));

  greeterBindings = ctx.find(greeterFilter);// find还可以接收一个回调函数来过滤
  console.log(greeterBindings.map(b => b.key));
 
    // 没看懂在干嘛???
  const view = ctx.createView(greeterFilter, (b1, b2) =>
    b1.key.localeCompare(b2.key),
  );
  console.log(view.bindings.map(b => b.key));
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
```





### 身份验证组件

身份验证是向系统验证用户/实体的过程，它 启用对受保护路由的已识别/验证访问。

授权是决定用户是否可以对 受保护的资源。

[JWT 身份验证扩展|环回文档 (loopback.io)](https://loopback.io/doc/en/lb4/JWT-authentication-extension.html#adding-endpoint-in-controller)

额外配置

1. 更高token secret

   ```typescript
     // for jwt access token
     this.bind(TokenServiceBindings.TOKEN_SECRET).to("<yourSecret>");
     // for refresh token
     this.bind(RefreshTokenServiceBindings.TOKEN_SECRET).to("<yourSecret>");
   ```

2. 更改令牌过期时间

   ```typescript
     // for jwt access token expiration
       this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to("<Expiration Time in sec>");
     // for refresh token expiration
       this.bind(RefreshTokenServiceBindings.TOKEN_EXPIRES_IN).to("<Expiration Time in sec>");
   ```

   

### 扩展点和扩展



### loopback 调用rest api

### loopback service

- lb4 service => 选择datasource => 生成一个provider 和interface



keycloak public key



>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwphECBRuCV0OOhwxed395J9FWE67TBuPMjQ0EIGPmkNYVnLIePVu6UhqYuhw/u3zOIMbNfXiaJBcBoYDXLJ1Y3aGXdf+5LQ++Bb4Qb4d9VX09MHc/LEr0tYSQZrEJSa/OJtpMXFvonreoEiJ3ciac5ZQliZfgE9GJ751Sh+EbpDKXX6T/pdwj6ErK9t7sguxEa6dEo+1UeBcDZJfoZu7zSMrS+RBR9BsMO9WgUzThxFmU0mO+XuPVPPivK2vtnXeZawTdvgVIdKPwtTa+tvTX+DzHb6/4NOSN4v4LHHfVaZb6vmzWv8s2k7W1KRVji4V4tI31/4ehAA28YGsl3y+pwIDAQAB
>
>-----BEGIN CERTIFICATE----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwphECBRuCV0OOhwxed395J9FWE67TBuPMjQ0EIGPmkNYVnLIePVu6UhqYuhw/u3zOIMbNfXiaJBcBoYDXLJ1Y3aGXdf+5LQ++Bb4Qb4d9VX09MHc/LEr0tYSQZrEJSa/OJtpMXFvonreoEiJ3ciac5ZQliZfgE9GJ751Sh+EbpDKXX6T/pdwj6ErK9t7sguxEa6dEo+1UeBcDZJfoZu7zSMrS+RBR9BsMO9WgUzThxFmU0mO+XuPVPPivK2vtnXeZawTdvgVIdKPwtTa+tvTX+DzHb6/4NOSN4v4LHHfVaZb6vmzWv8s2k7W1KRVji4V4tI31/4ehAA28YGsl3y+pwIDAQAB
>
>-----END CERTIFICATE----- 



### 使用jsonwebtoken验证access token

![image-20221218010542278](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202212252042364.png)

1. 获取keycloak服务器的公钥
2. jwt.verify(token,publicjKey) 验证token 
