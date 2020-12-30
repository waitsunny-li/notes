#### http报文首部

通常我们所说的http报文首部包含：

- 请求行或状态行
- 请求首部字段或者响应首部字段
- 通用首部字段
- 实体首部字段



#### 通用首部字段

1. Cache-Control：
   - **publick **:
     - Cache-Control: public 。则明确表明其他用户也可利用缓存。
   - **private**：
     - Cache-Control: private ，缓存服务器会对该特定用提供资源缓存的服务，对于其他用户发送过来的请求，代理服务器则不会返回缓存。
   - **no-cache**:
     - Cache-Control: no-cache ,表示为了防止从缓存中返回过期的资源
   - **no-store** ：
     - 暗示请求（和对应的响应）或响应中包含机密信息。因此该指令规定缓存不能在本地存储请求或响应的任一部分
   - **max-age** ：
     - 当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。 另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发给源服务器。
     - 当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时间。
     - 注意：应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。
2. **Connection**：
   - 控制不在转发给代理的首部字段
     - Connection: 不再转发的首部字段名 ，就会把这个首部字段名去掉后发送。在客户端发送请求和服务器返回响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。
   - 管理持久连接
     - Connection: close ，当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。
     - HTTP/1.1版本的默认连接都是持久连接，为此，客户端会在持久连接撒花姑娘连续发送请求。
3. **Trailer**：
   - 首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时
4. **Transfer-Encoding** ：
   - 首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。HTTP/1.1 的传输编码方式仅对分块传输编码有效。
5. **Via**:
   - 使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。
   - Via 首部是为了追踪传输路径，所以经常会和 TRACE 方法一起使用。比如，代理服务器接收到由 TRACE 方法发送过来的请求（其中 Max-Forwards: 0）时，代理服务器就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到 Via 首部后，返回该请求的响应



#### 请求首部字段

1. **Accept**：

   - Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型
   - Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序

2. **Accept-Encoding**：

   - Accept-Encoding: gzip, deflate ，Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

3. **Accept-Language**：

   - Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3 ：首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），

4. **Authorization**：

   - 首部字段 Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的401 状态码响应后，把首部字段 Authorization 加入请求中。

5. **Host**：

   - 虚拟主机运行在同一个 **IP** 上，因此使用首部字段 **Host** 加以区分

6. **If-Match**：

   - 形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。
   - 只有当 **If-Match** 的字段值跟 **ETag** 值匹配一致时，服务器才会接受请求 。
   - 首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETag）值。
   - 服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 412Precondition Failed 的响应。

7. **If-Modified-Since**:

   - 首部字段 If-Modified-Since，属附带条件之一，它会告知服务器若 If-Modified-Since 字段值早于资源的更新时间，则希望能处理该请求。而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码 304 Not Modified 的响应.

   - 如果在 **If-Modified-Since** 字段指定的日期时间后，资源发生了 

     更新，服务器会接受请求 

   - 就是说：服务器判断是否在If-Modified-Since之后更新过内容，有：处理请求，无，返回304 Not Modified

8. **If-Range** :

   - 它告知服务器若指定的 If-Range 字段值（ETag 值或者时间）和请求资源的 ETag 值或时间相一致时，则作为范围请求处理。反之，则返回全体资源
   - 我们考虑下不使用首部字段 If-Range 发送请求的情况。服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效，当 然，范围请求作为前提是无效的。这时，服务器会暂且以状态码 412 Precondition Failed 作为响应返回，其目的是催促客户端再次发送请求。这样一来比if-range花费了两倍的时间了



#### 响应首部字段

1. **Location**：
   - 使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的URI。
2. **Vary**：
   - 当代理服务器接收到带有 **Vary** 首部字段指定获取资源的请求时，如果使用的 **Accept-Language** 字段的值相同，那么就直接从缓存返回响应。反之，则需要先从源服务器端获取资源后才能作为响应返回 
3. **Content-Type** ：“
   - 首部字段 Content-Type 说明了实体主体内对象的媒体类型
4. **Expires**：
   - 首部字段 Expires 会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在Expires 字段值指定的时间之前，响应的副本会一直被保存



#### Cookie和Set_Cookie

1. **Set-Cookie**:

   `Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31`

   - **expires**：表示指定浏览器可发送Cookie的有效期，当忽略时，其有效期仅限于维持浏览器会话（Session） 时间段内。这通常限于浏览器应用程序被关闭之前。
   - **httponly**：





#### 最常用的首部字段说明

1. **X-Frame-Options**:

   - 首部字段 X-Frame-Options 属于 HTTP 响应首部，用于控制网站内容在其他 Web 网站的 Frame 标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。

     - **DENY** ：拒绝

     - **SAMEORIGIN** ：仅同源域名下的页面（Top-level-browsing- context）匹配时许可。（比如，当指定 http://hackr.jp/sample.html页面为 SAMEORIGIN 时，那么 hackr.jp 上所有页面的 frame 都被允许可加载该页面，而 example.com 等其他域名的页面就不行 

       了

2. **X-XSS-Protection** :

   `X-XSS-Protection: 1 `

   - 首部字段 X-XSS-Protection 属于 HTTP 响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器 XSS 防护机制的开关。1表示开启，0表示关闭