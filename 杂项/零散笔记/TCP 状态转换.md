



#flashcards/计算机网络  
为什么四次挥手中第 2. 3次ACK和FIN不一同发送
?
[margin](marginnote3app://note/F69FB942-D510-4A4F-86A5-1092F7D95657)
![[fa69a4bbf2c1b3c47c7227367f60be6f 3.png|475]]
因为客户端想跟服务端断开连接，但是服务端不一定想和客户端断开连接
服务端也许还想继续给客户端发送数据呢，不一定非要发送FIN
这是单方向的意愿
而三次握手中为什么能一块发送ACK，SYN是因为，他们两个都想建立连接，就一块发送了
<!--SR:!2022-05-28,3,250-->

<!--SR:!2022-05-28,3,250-->




#flashcards/计算机网络 
为什么要有2msl的等待时间
?
[margin](marginnote3app://note/F69FB942-D510-4A4F-86A5-1092F7D95657)
![[fa69a4bbf2c1b3c47c7227367f60be6f 3.png|475]]
因为防止第四次挥手的时候，服务端没有收到客户端的ACK，如果有一个等待时间
服务端可以在这个期间，多次发送FIN信号来请求客户端的ACK，以便来完成最后挥手
<!--SR:!2022-06-01,6,250-->





