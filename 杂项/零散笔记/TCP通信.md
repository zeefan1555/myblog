# 1 服务器端通信
```c
// TCP 通信的服务器端

#include <stdio.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

int main() {

    // 1.创建socket(用于监听的套接字)
    int lfd = socket(AF_INET, SOCK_STREAM, 0);

    if(lfd == -1) {
        perror("socket");
        exit(-1);
    }

    // 2.绑定
    struct sockaddr_in saddr;// 用sockaddr比较麻烦，sockaddrin是模块化成员的比较好用
    //对成员赋值
    saddr.sin_family = AF_INET;
    // inet_pton(AF_INET, "192.168.193.128", saddr.sin_addr.s_addr);// //将网络字节序的整数,转换成点分十进制的IP地址字符串
    serverad
    saddr.sin_addr.s_addr = INADDR_ANY;  //这个是可连接的IP地址， 0.0.0.0，定义的这个宏INADDR_ANY就是0，因为只有服务端可以这样写，表示谁的都可以连接
    saddr.sin_port = htons(9999);// 主机会随机分配一个端口号，如果只写9999是不对的，因为这是主机字节序，要用网络字节序用到htons函数。
    int ret = bind(lfd, (struct sockaddr *)&saddr, sizeof(saddr)); // 转换sockaddr类型指针

    if(ret == -1) {
        perror("bind");
        exit(-1);
    }

    // 3.监听
    ret = listen(lfd, 8);// 给个8足够了
    if(ret == -1) {
        perror("listen");
        exit(-1);// exit(0)也可
    }

    // 4.接收客户端连接
    struct sockaddr_in clientaddr;// 定义客户端的地址信息
    int len = sizeof(clientaddr);// sizeof的返回值是int 不能用socklen_t，但len的类型应该给是socklen_t的，为了编译通过这样改了，可以强转socklen_t
    int cfd = accept(lfd, (struct sockaddr *)&clientaddr, &len); // accpet函数如果没有客户端连接会阻塞在这里
    
    if(cfd == -1) {
        perror("accept");
        exit(-1);
    }

    // 输出客户端的信息
    char clientIP[16];// 点分十进制，每个.前是3个字节也就是12个字节，又有三个”.“和最后的结束符，所以定义16
    inet_ntop(AF_INET, &clientaddr.sin_addr.s_addr, clientIP, sizeof(clientIP));// 将网络字节序的整数,转换成点分十进制的IP地址字符串(因为接受的网络字节序)
    unsigned short clientPort = ntohs(clientaddr.sin_port);// 获取端口+转换主机字节序的short    
    printf("client ip is %s, port is %d\n", clientIP, clientPort);

    // 5.通信
    char recvBuf[1024] = {0};
    while(1) {
        
        // 获取客户端的数据
        int num = read(cfd, recvBuf, sizeof(recvBuf));// read函数：如果客户端没有发来数据会阻塞在这里
        if(num == -1) {
            perror("read");
            exit(-1);
        } else if(num > 0) {
            printf("recv client data : %s\n", recvBuf);
        } else if(num == 0) {
            // 表示客户端断开连接
            printf("clinet closed...");
            break;// 断开连接就break
        }

        char * data = "hello,i am server";
        // 给客户端发送数据
        write(cfd, data, strlen(data));
    }
   
    // 关闭文件描述符：监听和接受描述符
    close(cfd);
    close(lfd);

    return 0;
}
```

# 2 客户端通信
```c
// [[TCP通信]]的客户端

#include <stdio.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

int main() {

    // 1.创建套接字
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if(fd == -1) {
        perror("socket");
        exit(-1);
    }

    // 2.连接服务器端
    struct sockaddr_in serveraddr; 
    serveraddr.sin_family = AF_INET;
    inet_pton(AF_INET, "192.168.193.128", &serveraddr.sin_addr.s_addr);
    int ret = connect(fd, (struct sockaddr *)&serveraddr, sizeof(serveraddr));

    if(ret == -1) {
        perror("connect");
        exit(-1);
    }

    
    // 3. 通信
    char recvBuf[1024] = {0};
    while(1) {

        char * data = "hello,i am client";
        // 给客户端发送数据
        write(fd, data , strlen(data));

        sleep(1);// 慢一点
        
        int len = read(fd, recvBuf, sizeof(recvBuf));
        if(len == -1) {
            perror("read");
            exit(-1);
        } else if(len > 0) {
            printf("recv server data : %s\n", recvBuf);
        } else if(len == 0) {
            // 表示服务器端断开连接
            printf("server closed...");
            break;
        }

    }

    // 关闭连接
    close(fd);

    return 0;
}
```

```col
![[Pasted image 20220512220917.png]]
第一开始运行服务端会阻塞着(因为accpet函数)，等待的客户端的连接

![[Pasted image 20220512220948.png]]
只通信一次的结果，没有while(1)死循环
```
作业：
客户端给服务器发送一个数据，服务器在把它发回客户端 (回射服务器)
客户端获取键盘录入的数据给服务器发过去，服务器在随便回个消息 





