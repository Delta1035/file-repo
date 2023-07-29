const net = require('net');
const HOST = '127.0.0.1';
const PORT = 7777;
// 创建⼀个TCP服务器实例，调⽤listen函数开始监听指定端⼝
// net.createServer()有⼀个参数, 是监听连接建⽴的回调
// net.createServer() 相当于 new net.Server()
net.createServer((socket)=>{
    // 连接建立成功, 返回socket对象
    const remoteName = socket.remoteAddress +''+socket.remotePort;
    console.log(remoteName+' 连接到本服务器');
    // 当有消息过来时
    socket.on('data',(data)=>{
        console.log(remoteName+'-'+data);
        socket.write('你发来的消息是 :'+data+'吗?');
    })
    socket.on('close',(error)=>{
        console.log(remoteName+'连接关闭了');
    })
}).listen(PORT,HOST);
console.log('tcp 服务器启动!');