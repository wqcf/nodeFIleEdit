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