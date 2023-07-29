## pnpm安装依赖包 manorepo

关键字: 

`install` `-w`  `-wD `

`add` `--filter`



- pnpm 提供了 -w, --workspace-root 参数，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。

  ```
  $ pnpm install rollup -w
  ```

- 如果是一个开发依赖的话，可以加上 `-D` 参数，表示这是一个开发依赖，会装到 `pacakage.json` 中的 `devDependencies` 中，比如：

  ```
  $ pnpm install rollup -wD
  ```

- 给某个package单独安装指定依赖

  `pnpm` 提供了 [--filter](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Ffiltering) 参数，可以用来对特定的package进行某些操作。

  因此，如果想给 pkg1 安装一个依赖包，比如 `axios`，可以进行如下操作：

  ```
  $ pnpm add axios --filter pk1
  ```

  需要注意的是，`--filter` 参数跟着的是package下的 `package.json` 的 `name` 字段，并不是目录名。

  关于 `--filter` 操作其实还是很丰富的，比如执行 pkg1 下的 scripts 脚本：
  
  ```
  $ pnpm build --filter @qftjs/monorepo1
  ```
  
  `filter` 后面除了可以指定具体的包名，还可以跟着匹配规则来指定对匹配上规则的包进行操作，比如：
  
  ```
  $ pnpm build --filter "./packages/**"
  ```
  
  此命令会执行所有 package 下的 `build` 命令。具体的用法可以参考[filter](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Ffiltering)文档。

- 模块之间相互依赖

  最后一种就是我们在开发时经常遇到的场景，比如 pkg1 中将 pkg2 作为依赖进行安装。

  基于 pnpm 提供的 `workspace:协议`，可以方便的在 packages 内部进行互相引用。比如在 pkg1 中引用 pkg2：

  ```
  $ pnpm install @qftjs/monorepo2 -r --filter @qftjs/monorepo1
  ```

  

### 只允许使用pnpm

当在项目中使用 `pnpm` 时，如果不希望用户使用 `yarn` 或者 `npm` 安装依赖，可以将下面的这个 `preinstall` 脚本添加到工程根目录下的 `package.json`中：

```
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

