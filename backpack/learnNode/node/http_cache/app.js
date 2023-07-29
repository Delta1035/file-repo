const Koa = require('koa');
const app = new Koa();

app.use(async ctx=>{
    ctx.body = 'hello koa'
})

app.listen(8080,()=>{
    console.log('Server start http://127.0.0.1:8080');
})