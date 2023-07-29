const fs = require('fs');
const path = require('path')
console.log(path.resolve('./index.html'));
fs.createReadStream(path.resolve('./index.html')).pipe(fs.createWriteStream('test.txt'))