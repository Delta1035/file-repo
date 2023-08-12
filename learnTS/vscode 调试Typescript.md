### vscode 调试Typescript

##### 安装ts依赖

> npm install typescript --save-dev

##### 目录结构

![image-20220822105613438](https://raw.githubusercontent.com/Delta1035/tuchuang/main/imgimage-20220822105613438.png)

##### 配置tsconfig.json

 > 在ts配置文件文件中设置soureMap : true

```json
{
 "compilerOptions": {
  "target": "ES2015",
  "types": ["reflect-metadata", "node"],
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "sourceMap": true,
  "outDir": "./dist"
   },
   "include": [
  "src/**/*"
   ]
}

```

##### 配置自动编译

利用 vscode 的 tasks 自动将 ts 编译为 js.也可以使用别的方式编译,如:gulp,webpack 等.
添加文件: `/.vscode/tasks.json`

```json
{
   "version": "2.0.0",
   "command": "tsc",
   "type": "shell",
   "args": ["-p", ".","-w"],
   "problemMatcher": "$tsc",
   "presentation":{
 "echo": true,
 "reveal": "always",
 "focus": false,
 "panel": "shared",
 "showReuseMessage": true,
 "clear": false
   }
}
```

然后使用快捷键 ctrl + shift + B 开启自动编译

##### 配置调试

调试时, 需要配置vscode的launch.json文件, 这个文件记录启动选项

添加或编辑 /.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "name": "launch",
          "type": "node",
          "request": "launch",
          "program": "${workspaceRoot}/dist/app.js",
          "args": [],
          "cwd": "${workspaceRoot}",
      }
  ]
}

```

注意 : `program` 需设置为你要调试的 ts 生成的对应的 js.
假如需要调试 `/src/app.ts`,则此处为 `${workspaceRoot}/dist/app.js`.

##### 开始调试

打开app.ts, 在左侧添加断电, 然后点击 debug 绿色的按钮 , 开始调试

![image-20220822110542680](https://raw.githubusercontent.com/Delta1035/tuchuang/main/imgimage-20220822110542680.png)

> 参考链接: [vscode 调试 TypeScript - 江召伟 - 博客园 (cnblogs.com)](https://www.cnblogs.com/jiangzhaowei/p/10298086.html)

## 报错

Uncaught Error Error: Cannot find module 'ts-node/register'
> typescript 和 ts-node都需要安装在本地
