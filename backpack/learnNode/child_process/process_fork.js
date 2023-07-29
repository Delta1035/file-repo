const http = require("http");
const fork = require("child_process").fork;
const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/get-sum") {
    console.log("主进程 id", process.pid);
    const childProcess = fork("./compute.js");
    childProcess.send("hi 我是主进程");
    childProcess.on("message", (msg) => {
      console.log("来自子进程的消息", msg);
      res.end("sum is :" + msg);
    });
    childProcess.on("error", () => {
      console.log("子进程报错");
      childProcess.kill();
      res.end("error,子进程报错");
    });
  }
});
server.listen(3001, () => {
  console.log("http://127.0.0.1:3001");
});
