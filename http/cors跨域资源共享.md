#### 一个 CORS 预检请求是用于检查服务器是否支持 [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) 即跨域资源共享。

 它一般是用了以下几个 HTTP 请求首部的 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 请求：[`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) 和 [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)，以及一个 [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 首部。



举个例子：一个客户端可能会实际发送一个DELETE请求之前，先向服务器发起一个预检请求，用于询问是否可以向服务器发起一个 [`DELETE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE) 请求：

```http
PTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

如果服务器允许，那么服务器就会响应这个预检请求。并且其响应首部 [`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) 会将 `DELETE` 包含在其中：

```http
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```



#### 简单请求与非简单请求的区别

```http
* 请求方式:HEAD,GET,POST
* 请求头信息:
    Accept
    Accept-Language
    Content-Language
    Last-Event-ID
    Content-Type 对应的值是以下三个中的任意一个
        application/x-www-form-urlencoded
        multipart/form-data
        text/plain
```

只有同时满足以上两个条件时,才是简单请求,否则为非简单请求

针对简单请求

- 我们只需要设置 就行了，

  ```js
   res.setHeader('Access-Control-Allow-Methods', 'POST,GET')
    // http动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
    res.setHeader('Access-Control-Allow-Origin', http)
  ```

- 如果对于非简单请求（如：发送json数据）

  ```js
   res.setHeader('Access-Control-Allow-Methods', 'POST,GET')
    // http动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
    res.setHeader('Access-Control-Allow-Origin', http)
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,token")
  ```

  