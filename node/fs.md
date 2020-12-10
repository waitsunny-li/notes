## 读取文件

```javascript
const fs = require('fs');
fs.readFile('./jjj.md', (error, data) => {
  // <Buffer 0d 0a e6 88 91 e7 9f a5 e9 81 93 e6 88 91 e7 9a 84 e6 9c aa e6 9d a5 e4 b8 8d e6 98 af e6 a2 a6> 默认文件中存储的二位进制的数据
  console.log(data);
  console.log(data.toString())  // 转化为字符串形式
})
```

## 写入文件

```javascript
// 第一个参数是文件路径， 第二个参数：内容, 第三个参数：回调
fs.writeFile('./hhh', '未来可期啊，liweilong！', (error) => {
  if(error) {
    console.log('错误');
  }else {
    console.log('成功！');
  }
})
```

## 读取目录

```javascript
const fs = require('fs')

fs.readdir('E:/工作/需求供应平台/needsupplyPhone', (error, files) => {
  if (error) {
    console.log('访问的目录不存在');
  }
  console.log(files);  // 返回的是一个数组
})


// 第二个参数可以传入utf8，这样我们获取的数据data就是已经编辑过的字符串
 fs.readFile('./db.json', 'utf8', (error, data) => {
    if (error) res.status(500).send('Server Error')
    let students = JSON.parse(data).students
    res.render('index.html', {
      students
    })
  })
```

