
const fs = require('fs');
const path = require('path');
const secret = fs.readFileSync(path.resolve('./pkey.pem'),{encoding:'utf-8'})
const token = fs.readFileSync(path.resolve('./tk.pem'),{encoding:'utf-8'})
const jwt = require("jsonwebtoken");
// const header = token.split(".")[0];
// const payload = token.split(".")[1];
// const sign = token.split(".")[2];
// console.log(header,payload,sign);
// console.log(jwt.decode(token));
console.log(jwt.verify(token, secret));
