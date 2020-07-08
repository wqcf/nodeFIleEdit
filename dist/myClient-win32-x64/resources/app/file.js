const fs = require('fs');
const path = require('path');
var os = require("os");
var readLine = require("readline");
//查找文件路径
var basePath = "";
//修改内容匹配表达式
const reg = /[1-6]/ig;
//修改第几行
var fileIndex = null;
//修改内容
var fileContent = null;
//修改
// run("E:/project/procedure", "a.txt", 1, "您好")
//找到需要修改的文件
function run(path, fileName, index, content) {
  basePath = path;
  fileIndex = index;
  fileContent = content;
  // alert(path+":"+fileName+":"+index+":"+content)
  mapDir(
    path,
    fileName,
    function (editPath) {
      console.log(editPath)
      editFile(editPath, reg).then((res) => {
        // 打开文件
        let fd = fs.openSync(editPath, 'w');
        // 同步写入内容
        fs.writeFileSync(fd, res, 'utf8');
        // 保存并退出
        fs.closeSync(fd);
        alert("文件：" + editPath +"！修改成功")
        // console.log("修改成功1")
        // dialog.showMessageBox({ "title": "消息", "message": "修改成功" });
      }).catch(() => {
        alert("文件：" + editPath +"！修改失败")
        // console.log("修改失败")
      });
    },
    function () {
      // console.log('xxx文件目录遍历完了')
    }
  )
}

//遍历文件夹
function mapDir(dir, dirname, callback, finish) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err)
      return
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename)
      if (isDirectory(pathname)) {
        mapDir(pathname, dirname, callback, finish)
      } else if (isFile(pathname)) {
        if (['.json', '.less'].includes(path.extname(pathname))) {
          return
        }
        if (filename == dirname) {
          callback && callback(pathname)
        }
      }
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}
//工具
function isDirectory(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}
function isFile(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}
function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}
//修改文件
function editFile(ip, reg) {
  return new Promise((resolve, reject) => {
    var readObj = readLine.createInterface({
      input: fs.createReadStream(ip)
    });
    var content = "";
    var index = 1;
    readObj.on('line', function (line) {
      if ((fileIndex / 1) == index) {
        content += fileContent + os.EOL;
      } else {
        line = line.replace(reg, "")
        content += line + os.EOL;
      }
      index++;
    });
    readObj.on('close', function () {
      console.log(content)
      resolve(content)
    });
  })
}
