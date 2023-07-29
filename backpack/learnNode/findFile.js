const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(__filename);
const paths = fs.readdirSync(__dirname);
paths.filter()
console.log(paths);
paths.forEach((_path) => {
    fs.stat(_path, (error, stat) => {
        if (error) {
            console.log(error);
        }
        if (stat.isDirectory() && _path.includes('.git')) {
            console.log(_path);
        }
    })
})

function readDir(paths) {

}