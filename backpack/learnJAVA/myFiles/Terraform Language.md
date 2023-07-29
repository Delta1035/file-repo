## Terraform Language

这是一个配置语言。 他关系到用户和Terraform CLI，Terraform Cloud，Terraform Enterprice。 配置文件告诉Terraform要安装什么插件，要创建的基础架构以及要获取的数据。Terraform语言还使您可以在资源之间定义依赖项，并从单个配置块中创建多个相似的资源。 

Terraform语言的主要目的是声明代表基础架构对象的资源。存在所有其他语言功能，只是使资源的定义更加灵活和方便。  

Terraform配置是Terraform语言中的完整文档，它告诉Terraform如何管理给定的基础架构集合。配置可以由多个文件和目录组成。 

```latex
resource "aws_vpc" "main" {
  cidr_block = var.base_cidr_block
}

<BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
  # Block body
  <IDENTIFIER> = <EXPRESSION> # Argument
}

```

Terraform语言的语法仅包含一些基本元素：



### UCLOUD云主机

- 控制台

  > https://console.ucloud.cn/
  >
  > centos 7.9
  >
  > root
  >
  > yang3363787543

### win 安装chocolate

1. 管理员模式powershell

   > ```
   > Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   > ```

2. 安装chocolate

   > ```
   > choco install terraform
   > ```





### 坑点

- ucloud里面的api密钥 设置位置

公钥 4eXwDM8kCQjBFQMoCmmRwDAgfcUO1pQQV 

私钥 KcIWFaD4mtELPs6UVU17yf3OZOPQXgqBGCnq1EhNHEHr 