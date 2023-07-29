const fs = require('fs');
const zlib = require('zlib');
// 压缩文件
// fs.createReadStream('input.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('input.txt.gz')));
console.log('压缩程序执行结束');
// 将gz文件读取为可读流
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip().pipe(fs.createWriteStream('input.txt')));
console.log('文件解压完成');