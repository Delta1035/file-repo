// import { createServer } from 'https';
// import { readFileSync } from 'fs';
// import { WebSocketServer } from 'ws';
const ws = require('ws');
const WebSocketServer = ws.WebSocketServer;
// import http from 'http';
const http = require('http');
// const server = createServer({
//   cert: readFileSync('/path/to/cert.pem'),
//   key: readFileSync('/path/to/key.pem')
// });
const server = http.createServer();
const wsserver = new WebSocketServer({ server },()=>{
    console.log('生成websocket实例!');
});

wsserver.on('connection', function connection(wsserver) {
    // console.log('wsserver on',wsserver);
    wsserver.on('message', function message(data) {
    console.log('received: %s', data);
    wsserver.send(data);
  });

  wsserver.send('something');
});

server.listen(8080,'127.0.0.1',()=>{
    console.log('server start! ');
});