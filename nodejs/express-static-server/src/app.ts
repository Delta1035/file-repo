import express from 'express';
import http from 'http';
import https from 'https';
const app = express();
app.get('/',(req,res) => {
    res.end('ok');
});
http.createServer(app).listen(8080,'127.0.0.1',() => {
    console.log('http server started: http://127.0.0.1:8080');
});
https.createServer(app).listen(8081,'127.0.0.1',() => {
    console.log('https server started: http://127.0.0.1:8081');
})

