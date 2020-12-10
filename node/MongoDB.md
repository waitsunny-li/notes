### 1. 关系型数据库和非关系型数据库

表就是关系，表与表之间存在关系，

- 所有的关系型数据库都需要通过sql语言来操作
- 而MongoDB是所有非关系型数据库中最像关系型数据库
- 就相当于key-value
- 可以多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合中可以多个文档（表记录）



```javascript
{
    qq: {
        users: [
            {anme: '张三', age: 21},
            {anme: '张三', age: 21},
            {anme: '张三', age: 21},
        ]
    },
    taobao: {
        
    }
}
// qq和taobao都是数据库，users表示集合，users内容表示文档
```





### 2.开启与关闭和连接

```shell
mongod     // 开启
```

```she
mongo      // 连接数据库
```



### 3.基本命令

1. `show dbs`： 展示数据库（数据库中数据才会显示出来）
2. `use 数据库名称`：切换到指定数据库（如果没有会新建）
3. `db.students.insertOne({"name":"Jack"})`：插入一条数据
4. `show collections`：展示当前数据库中的所有集合



### 4.在node中如何操作MongoDB数据库

#### 1.使用官方的包`mongodb`包来操作

#### 2，使用第三方mongoose来操作数据库：mongoose基于mongodb 包进行一个封装

## 使用mongoose操作数据库步骤：



```javascript
// 链接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// 1.设计数据库
const Schema = mongoose.Schema


// 2.设置表模型，(集合)表结构
var blogSchema = new Schema({
  title:  {
    type:String,
    required: true  // 必须有
  },
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


// 3.将文档发布一个创模型
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称，mongoose会自动将大写名词的字符串生产 小写复数 的集合 ， 例如这里的Cat 最终会变为cats集合名称
const Blog = mongoose.model('Blog', blogSchema);

// 4.当我们有了模型构造函数之后，就可以使用这个构造函数对Blog集合中的数据为所欲为了
```

#### 1. 增加数据

```javascript
const b1 = new Blog({
  title: "我知道我的未来不是梦",
  author: "Jack",
  body: "没问问题的法论",
})

b1.save().then(res =>{
  console.log('保存成功！')
})
```

#### 2.查询

```javascript
Blog.find().then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
})  // 返回的是一个数组
// findOne()可以查询一个对象，而不是数组
```

#### 3.删除数据

```javascript
Blog.remove({author: 'Jack'}).then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
})  //
```

