# 使用node操作mysql

### 下载第三方包mysql

```shell
npm i mysql

```

配置：

```javascript
const mysql = require('mysql')\
const connection = mysql.createConnection({
    host: 'localhose',
    user: 'me',
    password: 'secret',
    database: 'my_db'
})

connection.connect()

connection.query('SELECT * FROM `users`', function(errir, results, fields) {
    if(error) throw error;
    
})

connection.end()
```

