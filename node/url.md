## url模块是对url进行处理的

- 比如我们要获取表单提交的数据，也就是默认的get请求，查询字符串格式的，但是我们使用node来怎么获取，可以使用url模块：url.parse（）

  ```javascript
  const url = require('url')
  console.log(url.parse('/pinglun?name=李威龙&content=jjjjj'));
  
  // 输出
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?name=李威龙&content=jjjjj',
    query: 'name=李威龙&content=jjjjj',
    pathname: '/pinglun',
    path: '/pinglun?name=李威龙&content=jjjjj',
    href: '/pinglun?name=李威龙&content=jjjjj' }
  
  console.log(url.parse('/pinglun?name=李威龙&content=jjjjj', true));
  // 加上true，第二个参数为true，表示把查询字符串转化为对象形式，方便我们取值
  // 输出
  {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?name=李威龙&content=jjjjj',
    query: [Object: null prototype] { name: '李威龙', content: 'jjjjj' },
    pathname: '/pinglun',
    path: '/pinglun?name=李威龙&content=jjjjj',
    href: '/pinglun?name=李威龙&content=jjjjj' }
  ```

  