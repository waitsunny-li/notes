#### path.basename(path[,ext])

获取一个路径中的的文件名，包含后缀

```javascript
 path.basename('c:/a/b/c/index.js')  // index.js

// 第二个参数表示：要去除的后缀名
 path.basename('c:/a/b/c/index.js', '.js')  // index
```

#### path.dirname(path)

获取一个路径中的目录部分

```javascript
path.dirname('c:/a/b/c/index.js')  // c:/a/b/c
```



#### path.extname(path)

获取一个路径中的扩展名

```javascript
path.extname('c:/a/b/c/index.js')   // .js
```



#### path.isAbsolute(path)

判断是否是绝对路径

```javascript
path.isAbsolute('c:/a/b/c/index.js')  //true
path.isAbsolute('./b/c/index.js')  //false
path.isAbsolute('/b/c/index.js')  //true 因为/表示盘符
```



#### path.parse(path)

获取一个总结，返回一个对象，如

```javascript
path.parse('c:/a/b/c/index.js')
// 输出
{ root: 'c:/',
  dir: 'c:/a/b/c',
  base: 'index.js',
  ext: '.js',
  name: 'index' }
```

