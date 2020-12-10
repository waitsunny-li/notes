## 初识http

```javascript
const http = require('http')
// 创建服务端
const server = http.createServer()

// 监听request请求
server.on('request', () => {
  console.log('服务端已收到您的请求');
})

// 绑定端口号，自动启动服务器
server.listen(3000, () =>{
  console.log('服务端已经打开了，可以使用127.0.0.1:3000来进行访问了！');
})
```

## 发送响应(响应内容只能是字符串或者二进制)

```javascript
// 监听request请求
server.on('request', (request, response) => {
  console.log(request.url);

  // response有个写的操作，必须有个end结束，否者浏览器会一直转 
  response.write('Hello node.js')   // 也可以直接使用 response.end('Hello node.js') 
  response.end() // 
})
```

注意：支持两种数据类型， 一种是二进制，一种是字符串  所以在使用fs读取文件使，不用toString转化为字符串了,

**注意：**一次请求对应一次响应

## Content-Type

```javascript
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hellow 世界')
})

server.listen(3000, () =>{
  console.log('运行服务启动。。');
})
```

在服务端默认发送的数据，其实utf-8编码的内容，但是浏览器不知道你是utf-8编码的内容，**浏览器在不知道你是utf-8编码的内容就会按照你当前操作系统的默认编码去解析，中文操作系统默认编码是gbk，因此你要告诉浏览器已什么格式的编码方式去解析你发送的内容

- text/plain： 表示按照普通文本格式
- text/html：表示按照HTML文本格式
- 图片不需要指定编码
- 不同的资源对应的Content-Type是不一样的，具体参考：http://tool.oschina.net/commons



## 如何访问HTML等文件呢？

```javascript
const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  let url = req.url;
  if(url === '/index') {
     // 先读取文件，什么格式的编码方式，需要告知浏览器
    fs.readFile('./resource/index.html', (error, data) =>{
       res.setHeader('Content-Type', 'text/html;charset=utf-8')
       res.end(data)
    })
  }
})

server.listen(3000, () =>{
  console.log('运行服务启动。。');
})
```

注意：node开启的服务并不想阿帕奇那样可以访问资源文件里的任何内容文件，但node必须先读取文见，返回

## http还可以链式调用

```javascript

http.createServer((req, res) => {
  res.end('hhhh')
}).listen(3001, () => {
  console.log('服务器运行。。。');
})
```



## 如何通过服务器让客户端重定向

1. 状态码设置为302临时重定向

   statusCode

2. 在响应头中通过Location告诉客户端往哪儿重定向（如果客户端发现收到服务器的响应的状态码是302就会自动去响应头中找Location，所以你就可以看到客户端自动跳转了）

   setHeader

```javascript
res.statusCode = 302
res.setHeader('Location', '/')
res.end()
```

