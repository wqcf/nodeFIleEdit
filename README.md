###  1. 安装electron, 并保存为开发依赖项

```
npm install electron -D
```

### 2. 在package.json文件中配置指令

```
"scripts" : {
	"start": "electron ."
}
```

### 3. 执行测试命令

```
npm start
```

### 4.  安装打包工具electron-packager

```
npm install electron-packager -g
```

### 5. 配置打包工具

```
"scripts": {
    "start": "electron .",
    "pack": "electron-packager . myClient --win --out ../myClient --arch=x64 --app-version=0.0.1 --electron-version=2.0.0"
  }
```

> 命令结构如下（根据实际情况修改）：
>
> “.”：需要打包的应用目录（即当前目录），
>
> “myClient”：应用名称，
>
> “--win”：打包平台（以Windows为例），
>
> “--out ../myClient”：输出目录，
>
> “--arch=64”：64位，
>
> “--app-version=0.0.1”：应用版本，
>
> “--electron-version=2.0.0”：electron版本
>
> 执行打包命令：
>
> ```
> npm run pack
> ```
>
> 