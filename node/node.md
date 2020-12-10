## 导出与导入

例如：在a模块中导入来自b模块中的函数

```javascript
a.js
	// 获取foot为{foo: 'foo'}的对象
	let foot = requirt('./b.js')  
    
b.js
	let foo = 'bar'
    exports.foo = foo  // 这可以导出，已一个对象的形式导出
// {foo: 'foo'}
```

如果一个模块需要直接导出某个成员，而非重新赋值，那这个时候必须使用下面的这种方式

```javascript
b.js 
	module.exports = 'hello'
a.js
	let foot = requirt('./b.js')  // foot = 'hello'
```

## 原理

```javascript
exports.foo = 'foo'

// 等价于
moudle.exports.foo = 'foo'

// moudle.exports  可以在node中看做是这样的底层
let moudle = {
    exports: {
        
    }
}

// 默认返回（一定要记住最后return的是module.exports）
return module.exports

// 而已因为module.exports太长，node为了简化module.exports转化为exports。
let exports = module.exports
// 因此exports只是一个module.exports的引用
```

## node加载第三方包的原理

```javascript
let template = require('art-template')
```

- 先找到当前文件所处目录中的node_module目录
- node_module/art-template/package.json文件中的main属性
- main属性中就记载了art-template的入口模块
- 然后加载使用这个第三方包
- 实际最终加载的还是文件

没有找到：

- 如果package.json文件不存在或者main指定的模块入口也没有
- 则node会自动找该目录下的index.js，index.js是默认备选项

持续找到：

如果还没有找到，就会去上一级的node_module目录下找。一直到盘符，否者会报错，can not find module xxx

## 包说明

- 建议每个项目的根目录想都有一个package.json文件，可以使用`npm init`来进行初始化操作
- 建议执行`npm install 包名`都要加上`--save`这个选项，目的是用来保存依赖项信息，方便记录并安装



### 通过路由模块的提取

```javascript
router.js

const express = require('express')
const fs = require('fs')
const router = express.Router()


router.get('/students', (req, res) => {
  fs.readFile('./db.json', 'utf8', (error, data) => {
    if (error) res.status(500).send('Server Error')
    let students = JSON.parse(data).students
    res.render('index.html', {
      students
    })
  })
})

router.get('/students/new', (req, res) => {
  
})

router.post('/students/new', (req, res) => {
  
})

router.get('/students/edit', (req, res) => {
  
})

router.get('/students/edit', (req, res) => {
  
})

router.get('/students/delete', (req, res) => {
  
})


module.exports = router
```

```javascript
app.js

const express = require('express')
const app = express()
const router = require('./router')

app.engine('html', require('express-art-template'))


app.use(router)

app.listen(3000, () => {
  console.log('服务器已经运行');
})
```

### node中的其他成员

在每个模块中，除了`require`、`exports`等模块相关API之外，还有特殊的成员：

- `__dirname`：可以用来获取当前文件模块所属目录的绝对路径
- `__filename`：可以用来获取当前文件的绝对路径

***注意***： 在文件 操作中，使用相对路径是不可靠的，因为在node中文件操作的路径被设计为相对于执行node命令所处的路径（这不是bug），

解决方法：把相对路径变为绝对路径

这里我们就可以使用`__dirname`或者`__filename`来解决了

还有一点需注意：模块中的路径标识和文件操作中的相对路劲标识不一致，模块中的路径标识就是相对于当前文件模块，不受执行node命令所处路径影响