const dotenv = require('dotenv')
const argv = process.argv // 拿到命令行参数
// argv的0, 1 分别由默认的值了 所以从2开始取值
const mode = argv[2] === '--mode' ? argv[3] : ''
const envFile = mode ? `.env.${mode}` : '.env'
dotenv.config({ path: envFile })// 环境文件路径
console.log(process.argv);
// [
//     'D:\\node\\node.exe', //nodejs执行路径
//     'c:\\Users\\wh2104220_1203289522\\Desktop\\api-proxy-server\\server\\index.js'// 文件路径
//   ]