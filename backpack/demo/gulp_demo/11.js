const { src, dest } = require('gulp');

function defaultTask(cb) {
    console.log('默认task执行了', src('ionic.config.json'));
    cb();
}

exports.default = defaultTask;