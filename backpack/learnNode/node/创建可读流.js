const fs = require('fs');
let data = '';//接收读取的流数据
// 创建可读流
let readStream = fs.createReadStream('test.txt');
// 设置编码格式
readStream.setEncoding('UTF8');
// 处理流事件 --> 
readStream.on('data',function(chunk){
    console.log('chunk',chunk);
    data += chunk;
})

readStream.on('end',function(){
    console.log('chunk',data);
})
console.log('流读取完毕');