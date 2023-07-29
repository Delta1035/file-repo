const path = require("path");
const Service = require("node-windows").Service;

const service = new Service({
  name: "start task",
  description: "a node window task",
  script: path.resolve("./task.js"),
});

service.on('install',function(){
    service.start();
    console.log('service start');
})

service.install();

// service.on("uninstall", function () {
//   console.log("Uninstall complete.");
//   console.log("The service exists: ", service.exists);
// });
// service.uninstall();
