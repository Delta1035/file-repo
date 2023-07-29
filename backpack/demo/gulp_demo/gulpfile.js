const { task,src,dest,gulp } = require("gulp");

function defaultTask(cb){
    cb();
    console.log('gulp执行!',gulp);
}

exports.default = defaultTask;