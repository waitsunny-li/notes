## 1.为何使用express呢？

原生的http在某些方面不足以应对我们的开发需求，所以我们要加快我们的工作效率，让我们的代码高度统一。

### 2.express初体验

```javascript
 const express = require('express')
//  相当于http.createServer
 const app = express()

 app.get('/', (req, res) => {
   res.send('Hello World')
 })

 app.listen('3000', () => {
   console.log('APP is running');
 })
```

## 3.express 是怎样开放文件夹的

```javascript
//  开放公共资源   这样你就可以使用/public目录中的所有资源了
// 当以/public/开头的时候，去./public目录中找找对应的资源
// http://localhost:3000/public/index.html
app.use('/public/', express.static('./public/'))

// 当省略第一个参数时，则可以通过省略/public/的方式来访问
// http://localhost:3000/index.html
app.use(express.static('./public/'))


// 第一个参数就是：别名的意思，
// http://localhost:3000/a/index.html才可以访问到
app.use('/a/', express.static('./public/'))
```

### 4.通过query我们就可以拿到查询字符串参数了（表单的get请求）

```javascript
app.get('/', (req, res) => {
   console.log(req.query)
   res.send('Hello World')
 })
```



### 5.修改完代码自动重启

我们这里可以使用一个第三方命名航工具：`nodemon`来帮我们解决频繁修改代码重启服务器的问题，`nodemon`是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候独立安装

```javascript
npm install --global nodemon
```

## 6.基本路由

get：

```javascript
app.get('/', (req, res) => {
   console.log(req.query)
   res.send('Hello World')
 })
```

post :

```javascript
app.post('/', (req, res) => {
   res.send('Hello World')
 })
```

### 7.在express配置使用art-template

##### Install

```she
npm install --save art-template
npm install --save express-art-template
```

配置：

```javascript

// 配置使用art-template模板引擎
// 第一个参数，表示， 当渲染以.art结尾文件的时候，使用art-template模板引擎
// express-art-template是专门用来在Express中吧art-template整合到Express中
// 虽然外面这里不需要记载art-template但是也必须安装
app.engine('art', require('express-art-template'))

// expres 为response相应对象提供了一个方法：render
// render 方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去views目录查找该模板文件
// 也就是说express有一个约定：开发人员吧所有的视图文件都放到views目录中

注意：如果想要修改views目录，则可以
app.set('views', render函数的默认路径)

app.get('/', (req, res) => {
  res.render('index.art', {
      title: 'hahh'
  })
})
```



## 在express获取表单post请求体数据

在express中没有内置获取表单post请求体的API，这里我们需要使用一个第三方包：body-parser

要下载中间件；

```javascript
npm install --save body-parser  // 目前自带的有,无需安装
```

配置：

```javascript
// 配置body-parser 中间件（插件：专门用来解析表单POST请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
```

使用：

```javascript
app.post('/post', (req, res) => {
  console.log(req.body);
})
```

## 8.Express 提供了一个响应式方法：json

该方法接受一个对象作为参数，它会自动帮你转化为字符串在发送给浏览器



## 9.在express这个框架中，默认是不支持session和cookie的，但是我们可以使用第三方中间件：express-session

```javascript
1.npm install express-session
2.配置
3.使用
	// 当把这个插件配置好之后，我们就可以通过req.session来发访问和设置Session成员了
// 添加session数据：req.session.foo = 'foo'
// 访问session数据：req.session.foo

const session = require('express-session')

app.use(session({
    secret: 'liweilong',  // 加密字符串，他会在原有的基础之上和这个字符串拼起来去加密
    resave: 'false',
    saveUninitialized: true  // 无论你是否使用session，我都默认直接分配给你一把钥匙
}))
```

## 中间件

#### 1. 应用程序级别的中间件

```javascript
// 不关心请求路径和请求方法的中间件
// 也就是说任何请求都会进入这个中间件
// 中间件本身是一个方法，该方法接受三个参数
// request 请求对象
// response 响应对象
// next 下一个中间件 一旦匹配，没有next()就不会继续执行
app.use(function(req, res) {
    
})

// 以/xxx开头的路径中间件
app.use('/a', function(req, res, next) {
    console.log(req.url)
})


```

#### 2. 路由级别的中间件

```javascript

// 我们经常用的app.get和app.post都是中间件
// 这是严格匹配请求方法和请求路径
// 注意：同一个请求，用的req和res是同一个
app.get('/', (req, res) => {
    console.log('abc')
    req.foo = 'bar'
    next()
})

app.get('/', (req, res) => {
    console.log(req.foo)
})
```

#### 3.根据中间的原理，我们可以使用全局处理错误，和全局404

```javascript
app.get('/', (req, res, next) => {
    fs.readFile('./././jjj', (error, data) =>{
        if (error) {
            // return res.status(500).send('Server error')
            // 当调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别的中间件
            return next(error)
        }
    })
})

// 配置错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).json({
        err_code: 500,
        message: err
    })
})
```

