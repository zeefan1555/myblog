
### read函数和write函数

查看说明文档

```
man 2 read
man 2 write
```

```c
// read 函数
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
		参数：
      	- fd: 文件描述符，open 得到的，通过这个文件描述符操作某个文件
        - buf: 需要读取数据存放的地方，数组的地址（传出参数）
        - count: 指定的数组的大小
    返回值：
        - 成功: 
          	> 0: 返回实际的读取到的字节数
            = 0: 文件已经读取完了
        - 失败: -1 ，并且设置 errno
```

```c
// write 函数
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t count);
		参数：
      	- fd: 文件描述符，open 得到的，通过这个文件描述符操作某个文件
        - buf: 要往磁盘写入的数据
        - count: 要写的数据的实际的大小
    返回值：
        - 成功: 实际写入的字节数
        - 失败: -1 ，并且设置 errno
```

文件拷贝：

```cpp
// copyfile.c
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    // 1. 通过 open 打开 english.txt 文件
    int srcfd = open("english.txt", O_RDONLY);  // 源文件的文件描述符
    if (srcfd == -1){
        perror("open");
        return -1;
    }
    // 2. 创建一个心的文件（拷贝文件）
    int destfd = open("cpy.txt", O_WRONLY | O_CREAT, 0664); // 目标文件的描述符
    if (destfd == -1){
        perror("open");
        return -1;
    }
    // 3. 频繁的读写操作 
    char buf[1024] = {0};
    int len = 0;
    while((len = read(srcfd, buf, sizeof(buf))) > 0) {
        write(destfd, buf, len);
    }

    // 4. 关闭文件
    close(destfd);
    close(srcfd);
    return 0;
}
```

### lseek函数
[[lseek]]

### stat函数和lstat函数

查看说明文档

```
man 2 stat
```



```c
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

int stat(const char *path, struct stat *buf);
		作用：获取一个文件相关的一些信息
    参数：
      	- pathname：操作的文件的路径
        - statbuf：结构体变量，传出参数，用于保存获取到的文件的信息
    返回值：
      	成功：返回 0
      	失败：返回 -1 ，设置 errno
int lstat(const char *path, struct stat *buf);
		作用：获取软链接文件相关的一些信息
    参数：
      	- pathname：操作的文件的路径
        - statbuf：结构体变量，传出参数，用于保存获取到的文件的信息
    返回值：
      	成功：返回 0
      	失败：返回 -1 ，设置 errno
```

在 Linux 中也有一个命令 stat ，通过它可以查看一个文件的信息。

```
stat a.txt
```

```
  文件："a.txt"
  大小：13        	块：8          IO 块：4096   普通文件
设备：fd01h/64769d	Inode：658603      硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-04-03 16:07:04.823402070 +0800
最近更改：2022-04-03 16:07:04.823402070 +0800
最近改动：2022-04-03 16:07:04.826402123 +0800
创建时间：-
```

stat结构体

```c
struct stat {
		dev_t		st_dev;					// 文件的设备编号
    ino_t		st_ino;						// 节点
		mode_t		st_mode;				// 文件的类型和存取的权限
		nlink_t		st_nlink;				// 连到该文件的硬连接数目
    uid_t			st_uid;					// 用户ID
    gid_t			st_gid;					// 组ID
    dev_t			st_rdev;				// 设备文件的设备编号
    off_t			st_size;				// 文件字节数(文件大小)
    blksize_t		st_blksize;		        // 块大小
    blkcnt_t 		st_blocks;		        // 块数
    time_t 			st_atime;		     	// 最后一次访问时间
    time_t 			st_mtime;		    	// 最后一次修改时间
    time_t			st_ctime;		    	// 最后一次改变时间(指属性)
 };
```

st_mode变量

![image-20220403162503909](https://cdn.jsdelivr.net/gh/huyup1e2n3g/WebServer/img/20220403174524.png)

获取 a.txt 的信息，返回大小

```c
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    struct stat statbuf;
    int ret = stat("a.txt", &statbuf);
    if(ret == -1){
        perror("stat");
        return -1;
    }
    printf("size: %ld\n", statbuf.st_size);
    return 0;
}
```

创建软链接

```
ln -s a.txt b.txt
```

创建出软链接 b.txt ，指向了 a.txt

```
lrwxrwxrwx 1 root root    5 Apr  3 16:41 b.txt -> a.txt
```

用 `stat b.txt` 查看信息

```
  File: ‘b.txt’ -> ‘a.txt’
  Size: 5               Blocks: 0          IO Block: 4096   symbolic link
Device: fd01h/64769d    Inode: 658601      Links: 1
Access: (0777/lrwxrwxrwx)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2022-04-03 16:41:44.509931636 +0800
Modify: 2022-04-03 16:41:44.412929931 +0800
Change: 2022-04-03 16:41:44.412929931 +0800
 Birth: -
```

用 `stat` 获取软链接文件的信息，其实获取的是软链接 b.txt 指向的 a.txt 的信息，如果要获取 软链接 b.txt 的信息就要用 `lstat` 。

### 模拟实现 ls -l 命令

模拟实现 ls-l 命令的程序代码：

[ls-l.c](https://github.com/huyup1e2n3g/WebServer/blob/main/code/lesson1.25/ls-l.c)

### 文件属性操作函数

```c
// 判断文件的权限或判断文件是否存在
int access(const char *pathname, int mode);
// 修改文件的权限
int chmod(const char *filename, int mode);
// 修改文件的所有者或者所在组
int chown(const char *path, uid_t owner, gid_t group);
// 缩减或扩展文件的大小
int truncate(const char *path, off_t length);
```

查看说明文档：

```
man 2 access
man 2 chmod
man 2 chown
man 2 truncate
```

#### access函数

```c
#include <unistd.h>
int access(const char *pathname, int mode);
		作用：判断某个文件是否有某个权限，或者判断文件是否存在
    参数：
      - pathname：判断的文件路径
      - mode：
      	R_OK: 判断是否有读权限
        W_OK: 判断是否有写权限
        X_OK: 判断是否有执行权限
        F_OK: 判断文件是否存在
		返回值：
      成功：返回 0
      失败：返回 -1
```

```c
// access.c
#include <unistd.h>
#include <stdio.h>
int main() {
    // 判断文件是否存在
    int ret = access("a.txt", F_OK);
    if(ret == -1){
        perror("access");
    }
    printf("文件存在\n");
    return 0;
}
```

#### chmod函数

```c
#include <sys/stat.h>
int chmod(const char *path, mode_t mode);
		作用：修改文件的权限
    参数：
      - pathname: 需要修改的文件的路径
      - mode_t: 需要修改的权限值，八进制的数
    返回值：
      成功：返回 0
      失败：返回 -1
        
```

```c
// chmod.c
#include <sys/stat.h>
#include <stdio.h>
int main(){
  	// 修改文件权限
    int ret = chmod("a.txt", 0775);
    if(ret == -1){
        perror("chmod");
        return -1;
    }
    return 0;
}
```

修改前：

```
-rw-r--r-- 1 root root   14 Apr  4 15:52 a.txt
```

修改后：

```
-rwxrwxr-x 1 root root   14 Apr  4 15:52 a.txt
```

#### truncate函数

```c
#include <unistd.h>
#include <sys/types.h>
int truncate(const char *path, off_t length);
		作用：缩减或扩展文件的尺寸至指定的大小
    参数：
      - path: 需要修改的文件的路径
      - length: 需要最终文件变成的大小
    返回值：
      成功：返回 0
      失败：返回 -1
```

```c
// truncate.c
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
int main(){
    // 扩大文件大小
    int ret = truncate("b.txt", 20);
    if(ret == -1){
        perror("truncate");
        return -1;
    }
    return 0;
}
```

扩展前：

```
-rw-r--r-- 1 root root   13 Apr  4 16:03 b.txt
```

扩展后：

```
-rw-r--r-- 1 root root   20 Apr  4 16:03 b.txt
```



### 目录操作函数

```c
// 创建目录
int mkdir(const char *pathname, mode_t mode);
// 删除空目录
int rmdir(const char *pathname);
// 重命名目录
int rename(const char *oldpath, const char *newpath); 
// 更改当前的目录
int chdir(const char *path);
// 获取当前的路径
char *getcwd(char *buf, size_t size);
```

查看说明文档

```
man 2 mkdir
```

#### mkdir函数

```c
#include <sys/stat.h>
#include <sys/types.h>
int mkdir(const char *pathname, mode_t mode);
		作用：创建一个目录
    参数：
      - pathname: 创建的目录的路径
      - mode: 权限，八进制的数
    返回值：
    	成功：返回 0
      失败：返回 -1   
```

```c
// mkdir.c
#include <sys/stat.h>
#include <sys/types.h>
#include <stdio.h>
int main(){
    // 创建一个 aaa 目录
    int ret = mkdir("aaa", 0777);
    if(ret == -1){
        perror("mkdir");
        return -1;
    }
    return 0;
}
```

生成 aaa 目录：

```
drwxr-xr-x 2 root root 4096 Apr  4 16:20 aaa
```

#### rename函数

```c
#include <stdio.h>
int rename(const char *oldpath, const char *newpath);
```

```c
// rename.c
#include <stdio.h>
int main(){
    // 将 aaa 目录改名为 bbb
    int ret = rename("aaa", "bbb");
    if(ret == -1){
        perror("rename");
        return -1;
    }
    return 0;   
}
```

#### chdir函数

```c
#include <unistd.h>
int chdir(const char *path);
		作用：修改进程的工作目录
    	比如在 /home/nowcoder 启动了一个可执行程序 a.out ，进程的工作目录就是 /home/nowcoder
    参数：
      - path: 需要修改的工作目录
```

#### getcwd函数

```c
#include <unistd.h>
char *getcwd(char *buf, size_t size);
		作用：获取当前工作目录
    参数：
      - buf: 存储的路径，指向的是一个数组（传出参数）
      - size: 数组的大小
    返回值：
      返回的指向的一块内存，这个数据就是第一个参数
```

```c
// chdir.c
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(){
    // 获取当前的工作目录
    char buf[128];
    getcwd(buf, sizeof(buf));
    printf("当前的工作目录是：%s\n", buf);

    // 修改工作目录
    int ret = chdir("/root/Linux/lesson1.27/bbb");
    if(ret == -1){
        perror("chdir");
        return -1;
    }

    // 创建一个新的文件
    int fd = open("chdir.txt", O_CREAT | O_RDWR, 0664);
    if(fd == -1){
        perror("open");
        return -1;
    }
    // 关闭文件
    close(fd);

    // 获取当前的工作目录
    char buf1[128];
    getcwd(buf1, sizeof(buf1));
    printf("当前的工作目录是：%s\n", buf1);

    return 0;
}
```



### 目录遍历函数

```c
// 打开目录
DIR *opendir(const char *name);
// 读取目录里的内容
struct dirent *readdir(DIR *dirp);
// 关闭目录
int closedir(DIR *dirp);
```

查看说明文档

```
man 3 opendir
```

#### opendir函数

```c
#include <sys/types.h>
#include <dirent.h>
DIR *opendir(const char *name);
		参数：
      - name: 需要打开的目录的名称
    返回值：
      DIR * 类型，理解为目录流
      错误返回 NULL
```

#### readdir函数

```c
#include <dirent.h>
struct dirent *readdir(DIR *dirp);
		作用：读取目录中的数据‘
    参数：dirp 是 opendir 返回的结果
    返回值：
      	struct dirent 代表读取到的文件的信息
        读取到了末尾或者失败了，返回NULL
```

dirent 结构体

```c
struct dirent {
  	// 此目录进入点的inode
		ino_t		d_ino;       /* inode number */
    // 目录文件开头至此目录进入点的位移
  	off_t   d_off;       /* not an offset; see NOTES */
    // d_name 的长度，不包含 NULL 字符
 		unsigned short d_reclen;    /* length of this record */
    // d_name 所指的文件类型
 		unsigned char  d_type;      /* type of file; not supported by all file system types */
    // 文件名
  	char		d_name[256]; /* filename */
};
```

d_type

```
DT_BLK      This is a block device.			 块设备
DT_CHR      This is a character device.	     字符设备
DT_DIR      This is a directory.			 目录
DT_FIFO     This is a named pipe (FIFO).	 软连接
DT_LNK      This is a symbolic link.	     管道
DT_REG      This is a regular file.			 件
DT_SOCK     This is a UNIX domain socket.	 套普通文接字
DT_UNKNOWN  The file type is unknown.		 未知
```



#### closedir函数

```c
#include <sys/types.h>
#include <dirent.h>
int closedir(DIR *dirp);
		作用：关闭目录
```

遍历目录下文件数量程序代码：

[readFileNum.c](https://github.com/huyup1e2n3g/WebServer/blob/main/code/lesson1.28/readFileNum.c)





[[dup]]```


# fcntl函数
```c
int fcntl(int fd, int cmd, ... /* arg */ ); 
// 复制文件描述符
// 设置/获取文件的状态标志
```

```c
#include <unistd.h>
#include <fcntl.h>
int fcntl(int fd, int cmd, ... /* arg */ );
    参数：
        fd : 表示需要操作的文件描述符
        cmd: 表示对文件描述符进行如何操作
            - F_DUPFD : 复制文件描述符,复制的是第一个参数fd，得到一个新的文件描述符（返回值）
                int ret = fcntl(fd, F_DUPFD);

            - F_GETFL : 获取指定的文件描述符文件状态flag
              获取的flag和我们通过open函数传递的flag是一个东西。

            - F_SETFL : 设置文件描述符文件状态flag
              必选项：O_RDONLY, O_WRONLY, O_RDWR 不可以被修改
              可选性：O_APPEND, O)NONBLOCK
                O_APPEND 表示追加数据
                NONBLOK 设置成非阻塞
        
        阻塞和非阻塞：描述的是函数调用的行为。
```

```c
// fcntl.c
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>

int main() {

    // 1.复制文件描述符
    // int fd = open("1.txt", O_RDONLY);
    // int ret = fcntl(fd, F_DUPFD);

    // 2.修改或者获取文件状态flag
    int fd = open("1.txt", O_RDWR);
    if(fd == -1) {
        perror("open");
        return -1;
    }

    // 获取文件描述符状态flag
    int flag = fcntl(fd, F_GETFL);
    if(flag == -1) {
        perror("fcntl");
        return -1;
    }
    flag |= O_APPEND;   // flag = flag | O_APPEND

    // 修改文件描述符状态的flag，给flag加入O_APPEND这个标记
    int ret = fcntl(fd, F_SETFL, flag);
    if(ret == -1) {
        perror("fcntl");
        return -1;
    }

    char * str = "nihao";
    write(fd, str, strlen(str));

    close(fd);

    return 0;
}
```

