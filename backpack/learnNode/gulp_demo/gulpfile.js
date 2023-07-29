const {src,dest} = require('gulp')
function defaultTask(cb) {
  // place code for your default task here
  // src(['E:\\desktop\\triennium\\**','!node_modules\\']).pipe(dest('E:\\C盘备份\\beifen'))
  cb();
}

exports.default = defaultTask;
