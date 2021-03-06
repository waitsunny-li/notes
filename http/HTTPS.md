#### 1.了解

HTTPS并不是一个新的协议，它是HTTP+加密+认证+报文完整性的一个组合结果。

#### 2.**HTTPS** 采用混合加密机制 

1. HTTPS 采用共享密钥加密和公开密钥加密两者并用的混合加密 

机制。若密钥能够实现安全交换，那么有可能会考虑仅使用公开 

密钥加密来通信。但是公开密钥加密与共享密钥加密相比，其处 

理速度要慢。 

2. 所以应充分利用两者各自的优势，将多种方法组合起来用于通 

信。在交换密钥环节使用公开密钥加密方式，之后的建立通信交 

换报文阶段则使用共享密钥加密方式。 

#### 3.HTTPS通信过程：

步骤 **1**： 客户端通过发送 Client Hello 报文开始 SSL通信。报文中包 

含客户端支持的 SSL的指定版本、加密组件（Cipher Suite）列表（所使用的加密算法及密钥长度等）。 

步骤 **2**： 服务器可进行 SSL通信时，会以 Server Hello 报文作为应答。和客户端一样，在报文中包含 SSL版本以及加密组件。服务器的 加密组件内容是从接收到的客户端加密组件内筛选出来的。

步骤 **3**： 之后服务器发送 Certificate 报文。报文中包含公开密钥证 

书。

步骤 **4**： 最后服务器发送 Server Hello Done 报文通知客户端，最初阶段的 SSL握手协商部分结束。 

步骤 **5**： SSL第一次握手结束之后，客户端以 Client Key Exchange 报 文作为回应。报文中包含通信加密中使用的一种被称为 Pre-master secret 的随机密码串。该报文已用步骤 3 中的公开密钥进行加密。 

步骤 **6**： 接着客户端继续发送 Change Cipher Spec 报文。该报文会提示服务器，在此报文之后的通信会采用 Pre-master secret 密钥加密。 （是客户端发送的共享秘钥，且该秘钥是公钥加密后才发送给服务器的，服务器再用自己的私钥进行解密）

步骤 **7**： 客户端发送 Finished 报文。该报文包含连接至今全部报文的整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确解密该报文作为判定标准。 

步骤 **8**： 服务器同样发送 Change Cipher Spec 报文。 

步骤 **9**： 服务器同样发送 Finished 报文。

步骤 **10**： 服务器和客户端的 Finished 报文交换完毕之后，SSL连接 就算建立完成。当然，通信会受到 SSL的保护。从此处开始进行应用层协议的通信，即发送 HTTP 请求。 

步骤 **11**： 应用层协议通信，即发送 HTTP 响应。 

步骤 **12**： 最后由客户端断开连接。断开连接时，发送 close_notify 报文。上图做了一些省略，这步之后再发送 TCP FIN 报文来关闭与 TCP的通信



#### 4.加密协议：SSL和TLS

HTTPS 使用 SSL（Secure Socket Layer） 和 TLS（Transport Layer Security）这两个协议。

**TSL是以 SSL为原型开发的协议，有时会统一称该协议为 SSL。**

##### SSL慢吗？

- SSL的慢分两种。一种是指通信慢。另一种是指由于大量消耗 

  CPU 及内存等资源，导致处理速度变慢。

- 和使用 HTTP 相比，网络负载可能会变慢 2 到 100 倍。除去和 

  TCP 连接、发送 HTTP 请求 • 响应以外，还必须进行 SSL通信， 

  因此整体上处理通信量不可避免会增加。

- 另一点是 SSL必须进行加密处理。在服务器和客户端都需要进行 

  加密和解密的运算处理。因此从结果上讲，比起 HTTP 会更多地消耗服务器和客户端的硬件资源，导致负载增强。

##### 若想在现有 Web 实现所需的功能，以下这些 HTTP 标准就会成为瓶颈。

- 一条连接上只可发送一个请求。 

- 请求只能从客户端开始。客户端不可以接收除响应以外的指 令。

- 请求 **/** 响应首部未经压缩就发送。首部信息越多延迟越大。 

- 发送冗长的首部。每次互相发送相同的首部造成的浪费较多。 



##### 二：AJAX 的解决办法

- Ajax 的核心技术是名为 XMLHttpRequest 的 API，通过 JavaScript 脚本语言的调用就能和服务器进行 HTTP 通信。借由这种手段，就能从已 加载完毕的 Web 页面上发起请求，只更新局部页面。

- 而利用 Ajax 实时地从服务器获取内容，有可能会导致大量请求产生。另外，Ajax 仍未解决 HTTP 协议本身存在的问题。



##### 三：**Comet** 的解决方法 

- 一旦服务器端有内容更新了，Comet 不会让请求等待，而是直接给客户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端 推送（Server Push）的功能。

- 通常，服务器端接收到请求，在处理完毕后就会立即返回响应，但为了实现推送功能，Comet 会先将响应置于挂起状态，当服务器端有内容更新时，再返回该响应。因此，服务器端一旦有更新，就可以立即反馈给客户端
- 内容上虽然可以做到实时更新，但为了保留响应，一次连接的持续时间也变长了。期间，为了维持连接会消耗更多的资源。另外，Comet也仍未解决 HTTP 协议本身存在的问题。



### SPDY设计

**使用 SPDY 后，HTTP 协议额外获得以下功能**

- **多路复用流 **

  通过单一的 TCP 连接，可以无限制处理多个 HTTP 请求。所有请求 的处理都在一条 TCP 连接上完成，因此 TCP 的处理效率得到提高。

- **赋予请求优先级**

  SPDY 不仅可以无限制地并发处理请求，还可以给请求逐个分配优先级顺序。这样主要是为了在发送多个请求时，解决因带宽低而导致响应变慢的问题。 

- **压缩 HTTP首部 **

  压缩 HTTP 请求和响应的首部。这样一来，通信产生的数据包数量和发送的字节数就更少了

- **推送功能**

  支持服务器主动向客户端推送数据的功能。这样，服务器可直接发送数据，而不必等待客户端的请求。

- **服务器提示功能**

  服务器可以主动提示客户端请求所需的资源。由于在客户端发现资源之前就可以获知资源的存在，因此在资源已缓存等情况下，可以避免发送不必要的请求

### 使用浏览器进行全双工通信的WebSocket

利用 Ajax 和 Comet 技术进行通信可以提升 Web 的浏览速度。但问题在于通信若使用 HTTP 协议，就无法彻底解决瓶颈问题。WebSocket网络技术正是为解决这些问题而实现的一套新协议及 API。

当时筹划将 WebSocket 作为 HTML5 标准的一部分，而现在它却逐渐变成了独立的协议标准。WebSocket 通信协议在 2011 年 12 月 11 日，被 RFC 6455 - The WebSocket Protocol 定为标准。

#### 一：websocket的设计与功能

- WebSocket，即 Web 浏览器与 Web 服务器之间全双工通信标准。其 中，WebSocket 协议由 IETF 定为标准，WebSocket API 由 W3C 定为 标准。仍在开发中的 WebSocket 技术主要是为了解决 Ajax 和 Comet 里 XMLHttpRequest 附带的缺陷所引起的问题。

##### 二：**WebSocket** 协议

一旦 Web 服务器与客户端之间建立起 WebSocket 协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送 JSON、XML、HTML或图片等任意格式的数据。

- 由于是建立在 HTTP 基础上的协议，因此连接的发起方仍是客户端，而一旦确立 WebSocket 通信连接，不论服务器还是客户端，任意一方都可直接向对方发送报文。

- WebSocket的主要特点：

  - **推送功能** 

    支持由服务器向客户端推送数据的推送功能。这样，服务器可直接发送数据，而不必等待客户端的请求。

  - **减少通信量**

    只要建立起 WebSocket 连接，就希望一直保持连接状态。和 HTTP 相比，不但每次连接时的总开销减少，而且由于 WebSocket 的首部信息很小，通信量也相应减少了。

    

- 为了实现 WebSocket 通信，在 HTTP 连接建立之后，需要完成一次“握手”（Handshaking）的步骤

  - 握手-请求

    为了实现 WebSocket 通信，需要用到 HTTP 的 Upgrade 首部字段，告知服务器通信协议发生改变，以达到握手的目的。

  - 握手-响应

    对于之前的请求，返回状态码 101 Switching Protocols 的响应