# core文件
```c
#include <stdio.h>
#include <string.h>

int main() {

    char * buf;// 这个指针虽然创建出来了，但是没有指向内存，是一个野指针

    strcpy(buf, "hello");// 无法运行，因为是野指针

    return 0;
}
```
core 文件是保存错误信息的文件，上述无法生产core文件，
生成和查看core文件
	1. ulimit -a 指令
	> ![[Pasted image 20220423155830.png]]
	2. ulimit -c 1024(可以是其他值，这里是举例)
	> ![[Pasted image 20220423160046.png]]
	3. 运行程序(./a.out)，然后就会生产core文件
	4. gdb a.out ,  core-file core 会出现错误信息


# kill，raise， abort函数
```c
    #include <sys/types.h>
    #include <signal.h>

    int kill(pid_t pid, int sig);  //不但可以杀死进程，也可以发送信号
        - 功能：给任何的进程或者进程组pid, 发送任何的信号 sig
        - 参数：
            - pid ：
                > 0 : 将信号发送给指定的进程
                = 0 : 将信号发送给当前的进程组
                = -1 : 将信号发送给每一个**有权限接收这个信号**的进程
                < -1 : 这个pid=某个进程组的ID取反 （-12345）
            - sig : 需要发送的信号的编号或者是宏值(宏值和信号值是一一对应的)，0表示不发送任何信号

        kill(getppid(), 9); // 给父进程发送9号信号
        kill(getpid(), 9); // 给自己发送9号信号
        
    #include <sys/types.h>
    #include <signal.h>

    int raise(int sig);
        - 功能：给**当前进程**发送信号
        - 参数：
            - sig : 要发送的信号
        - 返回值：
            - 成功 0
            - 失败 非0
      raise(9)= kill(getpid ()，sig)

    #include <sys/types.h>
    #include <signal.h>

    void abort(void);
        - 功能： 发送SIGABRT信号(6号进程)给当前的进程，杀死当前进程并生产core文件
        
        = kill(getpid(), SIGABRT);


```
 三个函数的代码实例 
```c

#include <stdio.h>
#include <sys/types.h>
#include <signal.h>
#include <unistd.h>

int main() {

    pid_t pid = fork();

    if(pid == 0) {
        // 子进程
        int i = 0;
        for(i = 0; i < 5; i++) {
            printf("child process\n");
            sleep(1);
        }

    } else if(pid > 0) {
        // 父进程
        printf("parent process\n");
        sleep(2);
        printf("kill child process now\n");
        kill(pid, SIGINT); // **在父进程中返回是子进程的pid**
    }

    return 0;
}

```

多进程程序，两者是抢夺cpu的执行权，有时谁先执行谁后执行是不确定的
比如运行kill程序，本来子进程是该输出两次的，但输出了三次
后来在执行一下，就又好了，说明父子进程谁先执行是不确定的

>第一次执行
>![[Pasted image 20220423170143.png]]

>第二次执行
>![[Pasted image 20220423170400.png]]