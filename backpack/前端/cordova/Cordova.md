## Cordova

#### js 与 native通信

- js调用Native拦截URL scheme

- 测试 weixin://    mqq://  手机浏览器输入打开

- 协议具体格式:

  >scheme://\[path][?query]
  >
  >​	|								|
  >应用标识 			功能需要的参数

  - 安卓需要到AndroidManifest.xml文件注册scheme