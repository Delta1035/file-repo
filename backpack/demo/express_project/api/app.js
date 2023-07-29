const express = require('express');
const app = express();

const port = 3000;

app.get('/',(req,resp)=>{
    resp.send('test')
});

app.get('/test',(req,resp)=>{
    resp.send('test---test')
});

app.post('/post-data',(req,resp)=>{
    resp.send({
        name:'张三',
        age:12
    })
})


app.listen(port,()=>{
    console.log('启动成功'+port);
})