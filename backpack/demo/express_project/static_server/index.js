const express = require("express");
const http = require("http");
const app = express();
const path = require('path');
const history = require('connect-history-api-fallback');// 解决spa跳转问题
app.use((req,res,next)=>{
  console.log(req.url);
  next()
})
app.use(history()); 
app.use(express.static(path.join(__dirname, "delta")));
app.use("/app/vue/*", (req, res) => {
  console.log(req.params);
  return res.sendFile(path.join(__dirname,'delta/vue/index.html'));
  return 'ok';
});
app.use("/app/react/*", (req, res) => {
  console.log(req.params);
  return res.sendFile(path.join(__dirname,'delta/react/index.html'));
  return 'ok';
});

http.createServer(app).listen(8081, () => {
  console.log("启动成功 :>> 10.50.140.157:8081");
});
