const fs = require('fs');
// 创建一个可读流
let readStream = fs.createReadStream('test.txt');
// 创建一个可写流
let writeStream = fs.createWriteStream('output.txt');
// 读取 test.txt 并将内容吸入 output.txt
readStream.pipe(writeStream);
console.log('程序结束');