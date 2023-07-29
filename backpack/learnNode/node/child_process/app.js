const {exec,execFile,fork} = require('child_process') 
const { stdout, stderr } = require('process')
const path = require('path');
const { rejects } = require('assert');
// spawn('node',[path.join(__dirname,'./dir/test1.js')],{stdio:'inherit'});
// exec(`node ${path.join(__dirname,'./dir/test1.js')}`,(err,stdout,stderr)=>{
//     console.log(err,stdout,stderr);
// })

// 执行js脚本
const test1 = new Promise((resolve,reject)=>{
    exec(`node ${path.join(__dirname,'./dir/test1.js')}`,(error,stdout,stderr)=>{
        // console.log(err,stdout,stderr);
        if(error){
            console.log('执行打包错误');
            reject(error)
        }
        resolve(stdout);
    })
})

// 执行shell脚本
const test2 = new Promise((resolve,reject)=>{
    execFile(`${path.join(__dirname,'./dir/test2.sh')}`,(error,stdout,stderr)=>{
        // console.log(err,stdout,stderr);
        if(error){
            console.log('shell脚本错误');
            reject(error)
        }
        resolve(stdout);
    })
})

const test3 = new Promise((resolve,reject)=>{
    exec(`echo 'hello'`,(error,stdout,stderr)=>{
        // console.log(err,stdout,stderr);
        if(error){
            console.log('shell脚本错误',stderr);
            reject(error)
        }
        resolve(stdout);
    })
})
async function deploy(){
    try {
        const result1 = await test1;
        const result2 = await test2;
        const result3 = await test3;
        console.log(result1);
        console.log(result2);
        console.log(result3);
    } catch (error) {
        console.log(error);
    }

}

deploy();