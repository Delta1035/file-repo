const events = require("events");
const eventEmitter = new events.EventEmitter();

const connectHandler = function connectd() {
  console.log("连接成功");
  // 触发data_received事件
  eventEmitter.emit("data_received");
};
// 绑定 connection事件
eventEmitter.on("connection", connectHandler);

// 绑定 data_received 事件
eventEmitter.on("data_received", function () {
  console.log("数据接收成功.");
});

// 触发connection事件
eventEmitter.emit("connection");
console.log(eventEmitter.listenerCount("connection"));
console.log(eventEmitter.listenerCount("data_received"));
console.log(eventEmitter.listeners("connection"));
console.log(eventEmitter.listeners("data_received"));
console.log("程序结束");
