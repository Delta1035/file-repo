npm init --yes
tsc --init 

├── build
|   ├── webpack.base.js # 公共配置
|   ├── webpack.dev.js  # 开发环境配置
|   └── webpack.prod.js # 打包环境配置
├── public
│   └── index.html # html模板
├── src
|   ├── App.tsx 
│   └── index.tsx # react应用入口页面
├── tsconfig.json  # ts配置
└── package.json

npm i webpack webpack-cli -D
npm i react react-dom -S
npm i @types/react @types/react-dom -D

### babel核心和预设
`npm i babel-loader @babel/core @babel/preset-react @babel/preset-typescript -D`
### 将静态资源引入html
npm i html-webpack-plugin -D

### 开发环境
npm i webpack-dev-server webpack-merge -D

### 生产环境
npm i serve -g