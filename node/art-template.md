## 在node使用模板

```javascript
const http =  require('http')
const fs = require('fs')
const template = require('art-template')

const server = http.createServer()

server.on('request', (req, res) => {
  fs.readFile('./template.html', (error, data) => {
    if(error) {
      return req.end('出现错误！')
    }
    // 此时的data是一个二进制的数据,而template.render(str, object)第一个参数需要接受字符串，因此要转化为字符串
    let ret = template.render(data.toString(), {
      name: 'liweilong',
      sex: '男',
      hobbies: [
        '乒乓球',
        '羽毛球',
        '你猜'
      ]
    })

    res.end(ret)
  })
})
```

## 在express中默认res.render是不可以用的

需要配置art-template才可以使用

```java
themesRouter.get('/', (req, res) => {
  
  res.render('index.html', {
    name: 'liweilong'
  })
})
```

