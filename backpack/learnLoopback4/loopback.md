## loopback内部构造

- 

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