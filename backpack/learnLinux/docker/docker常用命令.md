## docker 基本操作

### 镜像和重起

- 镜像 image
- 容器 container

![image-20221105142443501](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202211051424881.png)

- docker hub 镜像仓库

### 命令启动docker

> systemctl start docker
>
> systemctl stop docker
>
> systemctl restart docker # 重启
>
> docker -v  # 查看版本

### docker基本操作

1. 操作镜像

   - 镜像相关命令(CRUD)

     > docker build
     >
     > docker pull  [image name]
     >
     > docker images 查看所有镜像
     >
     > docker rmi 删除镜像
     >
     > docker save 保存镜像为压缩包
     >
     > docker load 加载压缩包为镜像

     

     ![image-20221105145036302](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202211051450247.png)

     - 镜像名称 2部分组成 repositry:tag
     - 创建镜像: 
       - 通过DOckerfile文件 使用docker buiild命令读取本地文件构建本地镜像
       - 通过docker pull 从docker registry获取镜像
     - 查看镜像:
       - docker images

2. 操作容器
   ![image-20221105151940403](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img202211051519846.png)

   - 容器相关操作

     > docker run 
     >
     > docker pause 暂停运行 (进程挂起, 内存暂存)
     >
     > docker unpause 恢复运行
     >
     > docker stop 停止运行容器 (进程杀死,内存回收,仅保留文件)
     >
     > docker start 启动容器
     >
     > 
     >
     > docker ps 查看正在运行的容器状态
     >
     > - docker ps -a 查看所有容器状态 即使没有运行
     >
     > docker logs 查看运行日志
     >
     > - docker logs -f nginx-delta 持续抛出日志
     >
     > docker exec 进入容器内部执行命令
     >
     > docker rm 删除容器
     >
     > - docker rm -f 强制删除容器 即使在运行

   - 创建并运行一个nginx容器

     1. 去docker hub 上查看nginx的容器命令

        > docker run --name nginx-delta -p 80:80 -d nginx

        - docker run  创建并运行一个容器
        - --name 给容器命名
        - -p 80:80  宿主机端口:容器端口
        - -d [image name] 后台运行 镜像 (不写tag 默认是latest)

     2. 去容器内执行命令

        > docker exec -it nginx-delta bash
        >
        > 在容器内使用sed 命令 替换编辑文件(vi和vim被阉割)
        >
        > `sed -i "s/Welcome to nginx/huan ying lai dao nginx/g" index.html`
        >
        > exit 退出容器

        - -it 使用标准输入终端
        - nginx-delta 容器名称
        - bash 

        

3. 操作数据卷(管理容器数据)

   

## dockerFile

```yaml
FROM nginx:latest #拉取最新的nginx镜像作为基础镜像
RUN echo '这是本地构建的镜像' > use/share/nginx/www/index/index.html

#
COPY dist /use/share/nginx/www/
```

#### 开始构建镜像

> docker build -t nginx:v1 .            
>
> 注意: 最后面有一个.  表示当前目录环境

构建一个名为nginx:v1的镜像,  . 代表本次执行上下文是当前目录

## docker-compose

1. docker-compose up 执行当前目录下的docker-compose.yaml/yml文件

## docker hub

### 腾讯镜像仓库

推送镜像

> docker tag [imageId] ccr.ccs.tencentyun.com/delta1035/delta_repo:[tag]
>
> docker tag 716a76027fc5 ccr.ccs.tencentyun.com/delta1035/delta_repo:2
>
> docker push ccr.ccs.tencentyun.com/delta1035/delta_repo:[tag]
>
> 

## keycloak

> angular

keycloak.adapter.js

![image-20221208175817725](C:\Users\wh2104220\AppData\Roaming\Typora\typora-user-images\image-20221208175817725.png)



1. 请求 URL: 

   

   http://127.0.0.1:8450/realms/myrealm/protocol/openid-connect/token

> loopback



### 开始

> ```bash
> docker rmi -f quay.io/keycloak/keycloak:20.0.1 && docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v /usr/ca/keycloak:/etc/x509/https -d quay.io/keycloak/keycloak:20.0.2 start-dev
> 
> docker run -d -p 8450:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin 528491526/keycloak:20.0.1 start-dev
> docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak:16.1.1
> ```

### 登录管理员控制台

点击keycloak Admin Console

### 创建领域



{
  "realm": "delta_realm",
  "auth-server-url": "http://127.0.0.1:8080/auth/",
  "ssl-required": "external",
  "resource": "delta_client",
  "public-client": true,
  "confidential-port": 0
}

## nginx

> ```bash
> docker run -d -p 8446:80 nginx:v1
> ```





## docker控制面板fast

> docker run --restart always --name fast -p 8081:8081 -d -v /var/run/docker.sock:/var/run/docker.sock wangbinxingkong/fast



## mysql8

> ```
> docker run --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=delta123456 -d mysql
> ```

```bash
# docker 中下载 mysql
docker pull mysql

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Lzslov123! -d mysql

#进入容器
docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Lzslov123!';

#添加远程登录用户
CREATE USER 'delta'@'%' IDENTIFIED WITH mysql_native_password BY 'delta123456';
# 给delta账号增加权限
GRANT ALL PRIVILEGES ON *.* TO 'delta'@'%'; 


```

## rancher

> docker logs  31adc263d498  2>&1 | grep "Bootstrap Password:"
>
> 31adc263d498
