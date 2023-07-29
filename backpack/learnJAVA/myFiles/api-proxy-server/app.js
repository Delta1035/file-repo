// "dev": "NODE_ENV=development webpack --config webpack.dev.config.js"
const config = require('dotenv').config(); // config() 方法 读取.env文件
console.log(config);