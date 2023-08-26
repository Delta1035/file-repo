// 在上下文隔离启用的情况下使用预加载
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  doAThing: () => {},
});
