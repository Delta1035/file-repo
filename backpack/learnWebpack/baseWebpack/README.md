
## 1. 快速上手

### 核心概念
- Entry:入口，webpack执行构建的第一步将从entry开始
- Module:模块，在webpack里一切皆模块，一个模块对应着一个文件
- Chunk:代码块，一个Chunk由多个模块组合而成，用于代码合并与分割
- Loader:模块转化器，用于把模块原内容按照需求转化成新的内容
- Plugin:扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建的结果或者做你想做的事儿
- Output:输出结果，在webpack经过一系列处理并得到最终想要的代码后输出结果

webpack启动后会从Entry里配置的module开始递归解析Entry依赖的所有的Module，每找到一个module，就会根据配置的loader去找出对应的转化规则，对module进行转化后，再解析出当前Module依赖的module.这些模块会以Entry为单位进行分组，一个Entry和其他所有依赖的module被分到一个组也就是一个Chunk。最后会把所有的Chunk转化成文件输出。在整个流程中wepback会在恰当的时机执行Plugin里面的逻辑


### 配置webpack
> npm install wepback webpack-cli -D
>
> 增加ts支持[Configuration Languages | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/configuration-languages/#typescript)
>
> npm install --save-dev typescript ts-node @types/node @types/webpack



- 创建src
- 创建dist
  - 创建index.html
- 配置文件webpack.config.js
  - entry:入口文件的地址
  - module:配置模块
  - output:配置出口文件
  - plugin:配置插件
  - devServer:配置开发服务器

### 配置开发服务器

> npm install webpack-dev-server -D
>
> [开发环境 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/development/#using-webpack-dev-server)

1. dist目录会当做静态文件目录
1. 启动命令 npx webpack serve --open

### 自动产出html

> npm install html-webpack-plugin -D

```js
  plugins: [
    // 生成一个html文件并把资源插入进去
    new HtmlWebpackPlugin({
      title: "my-custom-webpack",
      filename: "index.html",
      template:'./src/index.html',
      minify:true,
      // 对引入的资源加入hash
      hash:true,
    }),
  ],
```

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>my-custom-webpack</title>
    <script defer="defer" src="main.js?9090d4aabbc496fe17d8"></script>
  </head>
  <body></body>
</html>

```



### 加载图片

[资源模块 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/asset-modules/#root)

> npm install file-loader url-loader -D
>
> data url 格式 >> data:[mime];base64,[base64格式的数据]

资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

在 webpack 5 之前，通常使用：

- [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串
- [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中(也就是base64格式,一般会限制在某个比较小的范围)
- [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

当在 webpack 5 中使用旧的 assets loader（如 `file-loader`/`url-loader`/`raw-loader` 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 `'javascript/auto'` 来解决。

#### webpack5之前的写法

在js中使用图片

```js
let logo=require('./images/logo.png');
let img=new Image();
img.src=logo;
document.body.appendChild(img);
```

在css中引入图片

```js
.img-bg{
    background: url(./images/logo.png);
    width:173px;
    height:66px;
}
```

处理图片的loader

```js
{
    test:/\.(jpg|png|gif|svg)$/,
    use:'url-loader',
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
}
```

### 在html中使用图片

暂时不管

### 加载css文件

> npm install style-loader css-loader -D

配置:

```javascript
module:{
    rules:[
        {
            test:/\.css$/,
            use:['style-loader','css-loader'],
            include:path.join(__dirname,'./src'),
            exclude:/node_modules/
        }
    ]
}
```



### 分离css

注意: 该插件和style-loader冲突

> npm install extract-text-webpack-plugin -D  (已弃用)
>
> npm install --save-dev mini-css-extract-plugin

本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。

与 extract-text-webpack-plugin 相比：

- 异步加载
- 没有重复的编译（性能）
- 更容易使用
- 特别针对 CSS 开发

### 编译less和sass

#### sass

> pnpm add sass-loader sass webpack -D

```js
      {
        // 以css结尾的文件,文件名忽略大小写
        test: /\.(sa|sc|c)ss$/i,
        /**
         * 注意: MiniCssExtractPlugin.loader和style-loader冲突
         */
        use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader"],
      },
```



### 处理css属性前缀

> npm install --save-dev postcss-loader postcss autoprefixer
>
> autoprefixer是postcss的一个插件,用来生成不同浏览器厂商的css属性前缀

为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀

- Trident内核：主要代表为IE浏览器, 前缀为-ms

- Gecko内核：主要代表为Firefox, 前缀为-moz

- Presto内核：主要代表为Opera, 前缀为-o

- Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit

  npm install postcss-loader autoprefixer -D

```ts
{
        // 以css结尾的文件,文件名忽略大小写
        test: /\.(sa|sc|c)ss$/i,
        /**
         * 注意: MiniCssExtractPlugin.loader和style-loader冲突
         */
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
```



首先在根目录下新建一个postcss.config.js文件

### 转义es6/es7/jsx/ts

注意: 增加ts支持后,将entry入口文件的js后缀改为ts

> npm install --save-dev babel-loader @babel/core  @babel/preset-env @babel/preset-typescript

```ts
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
```

babel配置文件抽离到babel.config.json

```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ]
}
```



### 如何调试打包后的代码

### 拷贝静态文件

> npm install copy-webpack-plugin -D

```ts
    // 用于将项目中没有引用的文件复制到dist目录
    new CopyWebpackPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'public'),
          to:path.resolve(__dirname,'dist'),
        }
      ]
    }),
```



### 打包前清空dist输出目录

```ts
 output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // 自定义输出的别名
    assetModuleFilename: "images/[hash][ext][query]",
    // 输出前清空
    clean:true
  },
```



### 压缩js

webpack5默认production会自带压缩, 但是如果要自定义还是需要安装这个插件

> npm i terser-webpack-plugin -D

### resolve解析

### 区分环境变量

> npm install cross-env -D

### tip

1. tsx --init 生成tsconfig.json 文件 需要加入 

    "include":["./src/**/*"],

    "exclude":[],

   两个字段才不会报错

### 已使用的包

> 1. npm install wepback webpack-cli -D
> 2. npm install --save-dev typescript ts-node @types/node @types/webpack
>
> 3. npm install webpack-dev-server -D
>
> 4. npm install style-loader css-loader -D
>
> 5. npm install html-webpack-plugin -D
>
> 6. npm install extract-text-webpack-plugin -D 分离css
>
> 7. npm install sass-loader sass webpack --save-dev
>
> 8. npm install postcss-loader autoprefixer -D
>
> 9. npm install clean-webpack-plugin -D (不需要)
>
>    
