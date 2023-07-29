const session = require('express-session');
const express = require('express');
const http = require('http');
const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.get('/login', (req, res) => {
    console.log(req.query);
})
http.createServer(app).listen(3000, '127.0.0.1', () => {
    console.log('server start 127.0.0.1:3000');
})
app.set('env', 'production')
console.log(app.get('env'));
