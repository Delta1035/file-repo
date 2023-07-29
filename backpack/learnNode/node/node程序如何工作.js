// Node 应用程序是如何工作的？
// 在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数，
// 回调函数接收错误对象作为第一个参数。
// 接下来让我们来重新看下前面的实例，创建一个 input.txt ,文件内容如下：
const fs = require("fs");

fs.readFile("test1.txt", (error, data) => {
  if (error) {
    // error对象的相关xinxi
    console.log(error.stack);
    console.log(error.code);
    console.log(error.message);
    console.log(error.name);
    console.log(error.syscall);
    return;
  }
  //   try {
  //     // data 是一个buffer对象
  //     console.log("data", data.toString());
  //   } catch (error) {
  //     console.log("error");
  //   }
});
