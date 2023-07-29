let fs = require('fs');
let willOutput = '这是从js文件输出出去的流数据';
// 创建写入流, 传递要写入的文件路径
let writeStream = fs.createWriteStream('output.txt');
// 使用utf-8编码写入数据
writeStream.write(willOutput,'utf8');
// 标记文件末尾
writeStream.end();
// 处理流事件
writeStream.on('finish',function(){
    console.log('写入完成');
})

writeStream.on('error',function(err){
    console.log(err.stack);
})


console.log('程序执行完毕');