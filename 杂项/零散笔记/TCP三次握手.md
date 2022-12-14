三次握手的目的是保证双方互相之间建立了连接
三次握手发生在客户端连接的时候，当调用connect()函数时，底层会通过TCP协议进行三次握手。

seq：序号
ACK：标志位
	ack(AcK)：确认序号，只有当 ACK=1 时确认序号才有用
TCP是用字节流传输，会为每个字节分配一个序号 
# 1 三次握手
时序图
![](https://s1.vika.cn/space/2022/05/26/9e8848db48ec40d2a865d364ed1dfe16)

牛客总结
	第一次握手：
	1.客户端将SYN标志位置为1，向服务端请求建立连接，
	2.生成一个随机(<font color=#F36208>其实是有固定算法的</font>)的32位的序号seq=J，这个序号后边是可以携带数据（数据的大小）
	第二次握手：
	1.服务端将<font color=#F36208>标志位</font><font color=#F36208>ACK</font>置为1，接收客户端的连接。
		并且回发一个确认序号：ack=客户端的序号 +  数据长度+ SYN/FIN（按一个字节算）
	2.服务器端会向客户端发起连接请求：SYN=1
	3.服务器会生成一个随机序号(<font color=#F36208>其实是有固定算法的</font>)：seq = K
	第三次握手：
	1.客户单应答服务器的连接请求：ACK=1
	2.客户端回复收到了服务器端的数据：ack=服务端的序号 +数据长度 + SYN/FIN（按一个字节算）
自己总结
	<font color=#F36208>	第一次握手：客户端发起连接</font>
		1.客户端将标志位SYN置位1，表示向服务端请求连接。2.并且根据算法生成一个客户端序号cseq：J
	<font color=#F36208>	第二次握手：服务端回复请求，发起连接</font>
		1.服务端将ACK置为1，表示接受连接。2.发送一个确认序号ack = 客户端的序号(J) + 数据字节个数 + SYN/FIN(算一个字节)  
		3.服务端将标志位SYN置位1，表示向客户端请求连接。4.并且根据算法生成一个服务端序号sseq：K
	<font color=#F36208>	第三次握手：客户端回复请求</font>
		1.客户端将ACK置为1，表示接受连接。2.发送一个确认序号ack = 服务端的序号(K) + 数据字节个数 + SYN/FIN(算一个字节)  


第一次握手(客户端→服务端)：客户端请求连接
	客户端与服务端还没有建立连接，不能发数据
第二次握手(客户端←服务端)：服务端同意连接+请求与客户端连接
第三次握手(客户端→服务端)：客户端同意连接
	此时客户端已经和服务端已经建立了连接，这次客户端的握手已经可以携带数据了
之后服务端与客户端都互相建立了连接，可以互相自由通信
## 1.1 三次握手实例
![](https://s1.vika.cn/space/2022/05/26/e1cbc619a8b445c5a3cb9282c0d21c21)


## 1.2 为什么不能两次握手
因为要确保客户端能<font color=#C32E94>收发</font>消息，服务端能<font color=#C32E94>收发</font>消息，3次握手正好少一次都不行
![](https://s1.vika.cn/space/2022/05/26/7f7c22713cf345368d2778005723b9b1)

四次握手也是可以的，服务端的ACK和SYN连在一起发了，拆开发就是四次握手
保证可靠连接的最小次数是三次握手





