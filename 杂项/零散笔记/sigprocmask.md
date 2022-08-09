函数笔记：
![[按位与]]
```c

    int sigprocmask(int how, const sigset_t *set, sigset_t *oldset);
        - 功能：将自定义信号集中的数据设置到内核中（设置阻塞，解除阻塞，替换）
	        - 对阻塞信号集进行一系列的操作
        - 参数：
            - how : 如何对内核阻塞信号集进行处理
                SIG_BLOCK: 设置阻塞
	                将用户设置的**阻塞信**号集添加到内核中，内核中原来的数据不变
                    假设内核中默认的阻塞信号集是mask，自己设置的信号集为set
                    最终的结果为： mask | set(或)
                SIG_UNBLOCK:接触阻塞
	                根据用户设置的数据，对内核中的数据进行解除阻塞
                    mask &= ~set(和取反后的set进行与逻辑)
                SIG_SETMASK:覆盖内核中原来的值
            
            - set ：已经初始化好的用户自定义的信号集
            - oldset : 保存设置之前的内核中的阻塞信号集的状态，可以是 NULL(一般不使用)
        - 返回值：
            成功：0
            失败：-1
                设置错误号：EFAULT、EINVAL

    int sigpending(sigset_t *set);
        - 功能：获取内核中的未决信号集
        - 参数：set,传出参数，保存的是内核中的未决信号集中的信息。
        - 返回值：
            成功：0
            失败：-1
                设置错误号：EFAULT、EINVAL


```
代码实例
```c
// 编写一个程序，把所有的常规信号（1-31）的未决状态打印到屏幕，1表示未决，0表示非未决
// 设置某些信号是阻塞的(未决状态1)，通过键盘(2号：ctrl+c，3号：ctrl+\)产生这些信号

#include <stdio.h>
#include <signal.h>
#include <stdlib.h>
#include <unistd.h>

int main() {

    // 设置2、3号信号阻塞
    sigset_t set;//自定义的 
    sigemptyset(&set);
    // 将2号和3号信号添加到信号集中
    sigaddset(&set, SIGINT);
    sigaddset(&set, SIGQUIT);

    // 修改内核中的阻塞信号集
    sigprocmask(SIG_BLOCK, &set, NULL);

    int num = 0;

    while(1) {
        num++;
        // 获取当前的未决信号集的数据
        sigset_t pendingset;
        sigemptyset(&pendingset);
        sigpending(&pendingset);

        // 遍历前32位
        for(int i = 1; i <= 31; i++) {
            if(sigismember(&pendingset, i) == 1) {
                printf("1");
            }else if(sigismember(&pendingset, i) == 0) {
                printf("0");
            }else {
                perror("sigismember");
                exit(0);
            }
        }

        printf("\n");
        sleep(1);// 慢点打印
        if(num == 10) {
            // 解除阻塞
            sigprocmask(SIG_UNBLOCK, &set, NULL);
        }

    }


    return 0;
}

```
>原来都是0，后按ctrl+c 出现2号信号，使其位数变为1，ctrl+\出现3号信号，同理变1
>最后可以按ctrl+z停止程序(是切换到后台去了)但其实进程还在
>要进入ps aux中用kill -9 +pid 杀死进程
>![[Pasted image 20220424170944.png]]
>设置一个num使起运行10次就结束
>![[Pasted image 20220424172433.png]]


后台进程：在执行程序时后边加个&，当前程序在终端运行，但同时可以给终端输入命令输出内容
>![[Pasted image 20220424171708.png]]

前台进程，在执行程序时无法在终端输入命令执行，必须进入ps aux 用kill -9杀死(在复制个会话)

>![[Pasted image 20220424171924.png]]
> ![[Pasted image 20220424171216.png]]