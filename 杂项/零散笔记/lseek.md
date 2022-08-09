
查看说明文档

```
man 2 lseek
man 3 fseek
```

```c
// 标准C库的函数
#include <stdio.h>
int fseek(FILE *stream, long offset, int whence);

// Linux系统函数
#include <sys/types.h>
#include <unistd.h>
off_t lseek(int fd, off_t offset, int whence);
		- 参数：
      	- fd: 文件描述符，通过 open 得到的，通过这个 fd 操作某个文件
        - offset: 偏移量
        - whence: 
			SEEK_SET
              设置文件指针的偏移量
            SEEK_CUR
              设置偏移量：当前位置 + 第二个参数 offset 的值
            SEEK_END
              设置偏移量：文件大小 + 第二个参数 offset 的值
		- 返回值：返回文件指针的位置
              
作用：
		1. 移动文件指针到头文件
    lseek(fd, 0, SEEK_SET);
		2. 获取当前文件指针的位置
    lseek(fd, 0, SEEK_CUR);
		3. 获取文件的长度
   	lseek(fd, 0, SEEK_END);
		4. 拓展文件的长度，当前文件 10b，110b，增加了 100 个字节
    lseek(fd, 100, SEEK_END);
```



拓展文件长度：

```c
// lseek.c
// 原 hello.txt 为 12 字节，拓展了 100 个字节，写入了 1 个空数据，最后为 113 字节大小
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    // 打开文件
    int fd = open("hello.txt", O_RDWR);
    if (fd == -1) {
        perror("open");
        return -1;
    }
    //拓展文件
    int ret = lseek(fd, 100, SEEK_END);   // 从文件末尾开始拓展 100 字节
    if (ret == -1) {
        perror("lseek");
        return -1;
    }

    // 写入一个空数据
    write(fd, " ", 1);

    // 关闭文件
    close(fd);
    return 0;
}
```

为什么要写入空数据？

lseek()不是扩展数据的功能，只是可以利用lseek()去扩展文件，lseek()只是单纯的移动文件指针偏移。而写入数据后才能扩展数据大小，显示出字节数。

拓展文件有什么实际用途？

在下载文件时，先按照文件大小拓展出来，然后再慢慢往里面下载，以防磁盘空间不足。