const express = require('express')

var bodyParser = require('body-parser')

const app = express()

const cors=require('cors')//用来配置跨域

const path=require('path');

app.use(cors())

app.use(express.json*());

app.use(express.urlencoded({ extended: false }));
