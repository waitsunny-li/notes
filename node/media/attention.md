#### 如果想要获取一个函数中的异步操作结果，则必须通过回调函数来获取

```javascript
function fn(cb) {
    setTimeout(function() {
        let data = 'hello'
        cb(data)
    }, 1000)
}

fn(function(data) {
    console.log(data)   // hello
})
```

