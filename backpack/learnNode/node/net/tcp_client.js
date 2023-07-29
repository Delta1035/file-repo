const net = require('net');
const HOST = '127.0.0.1';
const PORT = 7777;

const client =new net.Socket();
const ServerName = HOST+PORT;
let count = 0;
client.connect(PORT,HOST,()=>{
    console.log('成功连接到 '+ServerName);
    const timer = setInterval(() => {
        if (count > 10) {
        client.write('我没事了, 告辞');
        clearInterval(timer);
        return;
        }
        client.write('⻢冬梅' + count++);
        }, 1000)
})

client.on('data',(data)=>{
    console.log(ServerName+'-'+data);
    // client.destroy();//关闭连接
})

client.on('close',()=>{
    console.log('连接关闭');
})

client.on('error',error=>{
    console.log(error);
})