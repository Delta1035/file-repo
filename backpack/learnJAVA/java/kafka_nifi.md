

ftp://10.50.140.4/temp/20220509/firstProject

## Kafka

#### 介绍

- 资料整合, 数据交换总线

## ElasticSearch

#### 部署单点es

1. 创建网络, 让es和kibana容器互联

   ```
   # 创建一个新的容器
   docker network create es-net
   # 或者通过加载已上传进去的tar压缩包加载镜像
   # pull 一个es镜像
   docker pull elasticsearch:7.12.1
   # 创建一个 es容器并运行
   # 官方推荐配置
   docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.12.1
   # 自定义配置
   docker run -d \
   	--name es \
   	-e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \ # 配置java 堆内存 es默认是1g
   	-e "discovery.type=single-node" \ # 运行模式 单点模式
   	-v es-data:/usr/share/elasticsearch/data \ # 数据卷 es数据存储目录
   	-v esplugins:/usr/share/elasticsearch/plugins \ # es插件存储目录
   	--privileged \
   	--network es-net \
   	-p 9200:9200 \
   	-p 9300:9300 \
   elasticsearch:7.12.1
   ```

#### 配置kibana

> 提供一个	es的 可视化界面

1. 部署

   ````
   docker run  -d \
   	--name kibana \
   	-p 5601:5601 \
   	-e ELASTICSEARCH_HOSTS=http://es:9200 \
   	--network=es-net \
   kibana:7.12.1
   	# 前面设置好的网络
   ````

   

2. 

- kibana	数据可视化

- logstash  数据抓取

- beats 数据抓取

- elasticsearch 是 elastic stack的核心, 负责存储, 搜索, 分析数据

  - 文档: 一条数据就是一个文档, es中是json格式
  - 字段: json文档中的字段
  - 索引: 同类型文档的集合
  - 映射索引中文档的约束, 比如字段名称和类型
  - - 一般es负责搜索数据
    - mysql负责数据的存储, 然后把数据同步到es
  - 中文分词器 `IK `

- ![image-20220510101253425](E:\desktop\triennium\培训\java\kafka.assets\image-20220510101253425.png)

- DSL 查询语法

  - 查询所有, 对能分词的内容 倒排查询

    - match_query 
      - ![image-20220510103501719](E:\desktop\triennium\培训\java\kafka.assets\image-20220510103501719.png)
    - multi_match_query

  - 精确查询, 一般查找keyword, 数值, 日期, 博哦了安等类型

    - ids
    - range(一般用在价格查询)
    - term(词条)

  - 地理查询, 根据经纬度查询

    - geo_distance: 查询到指定中心店小于某个距离的文档, 以FIELD为中心,distance为半径的圆的范围所有文档

      ![image-20220510105145132](E:\desktop\triennium\培训\java\kafka.assets\image-20220510105145132.png)

    - geo_bounding_box: 查询geo_point值落在某个矩形范围的所有文档

  - 符合查询compound, 将上述各种查询条件组合自来,合并查询

    - bool
    - function_score : 算分函数查询, 可以控制文档相关性算分, 控制文档排名,

#### 在sprintboot中连接es

- 安装依赖

  ````
  <dependency>
      <groupId>org.elasticsearch.client</groupId>
      <artifactId>elasticsearch-rest-high-level-client</artifactId>
      <version>7.9.2</version>
  </dependency>
          <dependency>
              <groupId>org.elasticsearch</groupId>
              <artifactId>elasticsearch</artifactId>
              <version>7.9.2</version>
   </dependency>
  ````

  

## Mybatis



- 一款优秀的持久层框架

- 标准数据层CURD功能
  - ![image-20220509171402214](E:\desktop\triennium\培训\java\kafka.assets\image-20220509171402214.png![image-20220509171433112](E:\desktop\triennium\培训\java\kafka.assets\image-20220509171433112.png)



## Nifi

- 添加一个Processor
  - settings
  - properties
  - comments
  
- queued 里面有上一个processor输出的数据, 两个processor之间必须要有一个queue缓冲

  - queue状态 + flow file数量(总的file的大小)

  - file以content claim形式存储在content repository, 一个claim包括一个或多个file, 最大为1m

  - 被用完的content claim会被移到archive

  - queue可以设定最多可以存储的档案, 满了知乎就不能接收前面的processor的档案了

    view conifg => settings => 设定存储阈值

- content repository默认设定

  - 空闲空间50%
  - archived content claims 15%  定期12小时清理
  - active content claim 35%

#### nifi cluster

- https://dxnifiprd.wistron.com:8443/nifi/
- 

## Kubernetes

## Docker

docker是一个cs架构的程序, 两部分组成:

- 服务端 : Docker守护进程 负责处理docker指令, 管理镜像, 容器

  - 组成结构

    > docker daemon 守护进程
    >
    > container 
    >
    > images ===> 从registry获取镜像或者自制镜像

- 客户端 : 通过命令或者restApi想多克发送指令,

  - 常用指令

    > 1. docker build
    > 2. docker pull
    >    - docker pull nginx 自动下载最新的nginx镜像
    > 3. docker run
    > 4. docker -v 查看版本
    > 5. docker images 查看镜像
    > 6. docker rmi 删除镜像
    > 7. docker push 将镜像推送到服务器上
    > 8. docker save 将镜像保存成压缩包
    > 9. docker load 加载压缩包为本地镜像
    > 10. docker xx --help 命令帮助文档

    ![image-20220517143600259](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220517143600259.png)

  - 系统指令

    > 1. systemctl start docker #启动
    > 2. systemctl stop docker # 停止
    > 3. systemctl restart docker #重启

#### Docker基本操作

- 镜像操作

  - 镜像名称一般分两部分组成:[repository]:[tag]  => mysql:5.7  不写tag 默认是latest最新版本

  - 常用命令:

    > 1. docker build
    > 2. docker pull
    >    - docker pull nginx 自动下载最新的nginx镜像
    > 3. docker run
    > 4. docker -v 查看版本
    > 5. docker images 查看镜像
    > 6. docker rmi 删除镜像
    > 7. docker push 将镜像推送到服务器上
    > 8. docker save 将镜像保存成压缩包
    > 9. docker load 加载压缩包为本地镜像
    > 10. docker xx --help 命令帮助文档

- 容器操作

  > 1. docker run 创建一个容器并处于运行状态
  > 2. docker pause 暂停(内存还在 但是cpu不分配)
  > 3. docker unpause 从暂停进入运行状态
  > 4. docker start 开始
  > 5. docker stop 停止(回收内存)
  > 6. docker ps 查看所有运行的容器及状态
  >    - docker ps -a 查看所有容器, 然后在删除容器
  > 7. docker logs 查看容器运行的日志
  >    - -f 持续查看日志
  > 8. docker exec 进入容器执行命令
  >    - docker exec -it 容器名 bash
  >      - docker exec 进入容器内部执行命令
  >      - -it 进入当前进入的容器创建一个标准的输入输出终端,允许我们与容器交互
  >      - bash 进入容器后执行的命令, bash是一个linux终端交互命令
  > 9. docker rm 删除指定容器

  - 创建一个nginx容器

    1. 在docker hub上查看nginx查看容器运行命令

       `docker run --name containerName -p 80:80 -d nginx`

       - docker run : 创建并运行一个容器
       - --name : 给容器起一个名字, 
       - -p : 将宿主机端口与容器端口映射, 冒泡左侧是宿主机端口, 右侧是容器内端口
       - -d : 后台运行容器
       - nginx : 镜像名称 没有写tag 则是最新版本
       - `docker run --name nginx-03 -p 4800:80 -d nginx`

- 数据卷(volume) 是一个虚拟目录, 指向宿主机文件系统中的某个目录

  - 数据卷操作基本语法`docker volume [COMMAND]`

  - > 1. create 创建一个create
    > 2. inspect 显示一个或多个volume信息
    > 3. ls 列出所有volume
    > 4. prune 删除未使用的volume
    > 5. rm 删除一个或多个指定的volume

  - 挂载数据卷 -v参数来挂载数据卷到某个容器

    - 数据卷在实体机的位置 docker volume inspect 显示一个json数据,Mountpoint表示的就是实体地址

    > 1. 将nginx容器内部的/usr/share/nginx/html目录挂载到html数据卷
    >
    > ​	`docker run --name nginx-html -v html:/usr/share/nginx/html -p 8080:80 nginx `  
>
    > `docker run --name ng-blog -v www/wwwroot/delta/ngBlog:/usr/share/nginx/html -p 8083:80 nginx `  
  
    ![image-20220517173239756](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220517173239756.png)
  
  ![image-20220517171955467](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220517171955467.png)

## Linux 基本操作

常用指令:

> 1. cat config  cat命令行含参数：把文件config的内容依次显示到屏幕上
>
> 2. cat命令行没有参数：会从标准输入中读取数据，并将其送到标准输出。
> #用户输入的每一行都立刻被cat命令输出到屏幕上，直到按Ctrl+d结束【标准输入接收到EOF（结束）标识符】
>
> 3. sed 替换文字
>
>    - sed -i 's#Welcome to nginx#修改nginx文件成功#g' index.html  
>    - sed -i 's#<head>#<head><meta charset="utf-8">#g' index.html
>
> 4. vi 编辑
>
> 5. ```
>    
>    ```
>
> ```
> 
> ```

## MinIO

## KeyCloak 

`identity provider`

- 云平台

  > ![image-20220518141328076](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220518141328076.png)

#### keycloak realm&client configuration

登录及身份认证是现代web应用最基本的功能之一，对于企业内部的系统，多个系统往往希望有一套SSO服务对企业用户的登录及身份认证进行统一的管理，提升用户同时使用多个系统的体验，Keycloak正是为此种场景而生。本文将简明的介绍Keycloak的安装、使用，并给出目前较流行的前后端分离应用如何快速接入Keycloak的示例。

#### Keycloak是什么

> Keycloak是一种面向现代应用和服务的开源IAM（身份识别与访问管理）解决方案

Keycloak提供了单点登录（SSO）功能，支持`OpenID Connect`、`OAuth 2.0`、`SAML 2.0`标准协议，拥有简单易用的管理控制台，并提供对LDAP、Active Directory以及Github、Google等社交账号登录的支持，做到了非常简单的开箱即用。


#### Keycloak常用核心概念介绍

> ![keycloak-core-concepts](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/2/171d5c547f5783eb~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
>
> 常用的4个核心概念:
>
> 1. user: 用户 , 使用并需要登陆系统的对象
> 2. roles : 角色, 用来对用户权限进行管理
> 3. clients : 客户端, 需要接入keycloak并被keycloak保护的应用和服务
> 4. realm : 领域, 管理一批用户,证书,角色,组等, 一个用户只能登陆到一个领域,, 领域之间是互相隔离的, 一个领域只能管理他下面所属的用户. 

#### Keycloak服务的安装及配置

- 安装keycloak(有多种方式)

  1. 使用docker安装

     ````
     # 必须使用https访问
     docker run -d --name keycloak \
         -p 8082:8080 \
         -e KEYCLOAK_USER=admin \
         -e KEYCLOAK_PASSWORD=admin \
         jboss/keycloak:10.0.0
         
     # 使用https://localhost:8443 访问 解决https require问题    
     docker run -d --name keycloak-https -p 8443:8443 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak
     ````

  2. 访问[http://localhost:8080](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8080%2Fauth%2F)并点击Administration Console进行登录

     > ![image-20220518171007004](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220518171007004.png)

- 创建realm

  创建一个新的realm: demo，后续所有的客户端、用户、角色等都在此realm中创建

  > ![keycloak-web-add-realm-2](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/2/171d5c7d79a00d83~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

  > ![keycloak-web-add-realm-1](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/2/171d5c76834b0527~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)
  >
  > 
  >
  > ![keycloak-web-add-realm-3](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/2/171d5c83f8a2ebac~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

## Oauth

#### 名词

1. client 第三方程序客户端, web页面

2. resource owner : 资源拥有者 比如账户拥有者

3. user agent : 用户代理, 一般是指浏览器

4. http service : 提供服务的http服务提供商,qq服务器, 可以和resource server 为同一个 也可以不是同一个

   > ![image-20220518152930828](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220518152930828.png)

5. authorization server : 认证服务器,服务提供商专门处理认证的服务器

6. resource server : 资源服务器, 服务商存放用户生成的资源的服务器

#### 设计思路

## FRC

`[RFC是什么 - 前端教程 (pipipi.net)](https://www.pipipi.net/5123.html)`

## 邮箱配置

![image-20220519135934904](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220519135934904.png)![image-20220519135952075](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220519135952075.png)

![image-20220519140023019](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220519140023019.png)

![image-20220519140033340](E:\desktop\triennium\培训\java\kafka_nifi.assets\image-20220519140033340.png)