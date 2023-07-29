const { src, dest, series } = require('gulp');
var exec = require("child_process").execSync;
var xmlTransformer = require('gulp-xml-transformer');
var jeditor = require("gulp-json-editor");
var ionicConfig = require('./ionic.config.json');
var env;
// const concat = require('gulp-concat');
// const through2 = require('through2');
// task, series, parallel, src, pipe, dest, on, watch

// task: 创建一个任务
// series：顺序执行多个任务
// prallel：并行执行多个任务
// src：读取数据源转换成stream
// pipe：管道-可以在中间对数据流进行处理
// dest：输出数据流到目标路径
// on：事件监听
// watch：数据源监听


// task 为创建gulp子任务
// gulp.task('concat', () => {
//     return gulp.src('./20201108/*.txt') // src: 读取文件转化为可读流，参数可以是文件通配符匹配
//       .pipe(gulpConcat('20201108.txt')) // pipe:管道，把gulp的执行步骤一步步串联起来，也是gulp的核心
//       .pipe(dest('./demo/')) // dest：存放文件
//       .on('end', () => { // 事件监听
//           console.log('concat: 文件合并完成');
//        })
//   })
  
  function myTask1(cb){
    console.log('myTask1 executed');
    src('./config.xml').pipe(
      xmlTransformer([
        {path:'//name',text:'myName'}
      ])
    ).pipe(dest('./test/', { overwrite : true }))
    cb();// 如果不写就会提示 tasks是否没有完成
  }


  exports.default = myTask1;
