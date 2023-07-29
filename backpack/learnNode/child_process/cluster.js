const cluster = require('cluster');
const http = require('http');
const cpuCoreLength = require('os').cpus().length;


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);// 主进程号
  
    // Fork workers.
    for (let i = 0; i < cpuCoreLength; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n'+process.pid);
    }).listen(8000);
  
    console.log(`Worker ${process.pid} started`);
  }

  