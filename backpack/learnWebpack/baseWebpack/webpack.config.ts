/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-01-09 10:13:47
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-09 17:53:11
 * @FilePath: \baseWebpack\webpack.config.ts
 * @Description:
 * webpack配置文件
 *
 */

import * as path from "path";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
const config: webpack.Configuration = {
  resolve: {
    aliasFields: ["browser"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@public": path.resolve(__dirname, "public/"),
    },
  },
  entry: "./src/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // 自定义输出的别名
    // assetModuleFilename: "images/[hash][ext][query]",
    // 输出前清空
    clean: true,
  },
  devServer: {
    // 静态文件目录
    static: "./dist",
    // 开启gzip
    compress: true,
    port: 4200,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        // 注意 webpack5内置的资源处理用type
        // type 设为asset表示通用资源类型, 可以统一设置dataUrlCondition
        type: "asset",
        parser: {
          // 当符合这个条件(不超过4kb)的时候使用data url
          dataUrlCondition: {
            maxSize: 8 * 1024, // 4kb
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
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
    ],
  },
  plugins: [
    // 用于将项目中没有引用的文件复制到dist目录
    // 可能会出现报错: ERROR in Conflict: Multiple assets emit different content to the same filename index.html
    // new CopyWebpackPlugin({
    //   patterns:[
    //     {
    //       from:path.resolve(__dirname,'public'),
    //       to:path.resolve(__dirname,'dist'),
    //     }
    //   ]
    // }),
    // 将css单独分离出去
    new MiniCssExtractPlugin(),
    // 生成一个html文件并把资源插入进去
    new HtmlWebpackPlugin({
      title: "my-custom-webpack",
      filename: "index.html",
      template: "./public/index.html",
      minify: true,
      // 对引入的资源加入hash
      hash: true,
    }),
  ],
};

export default config;
