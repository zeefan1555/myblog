```c

    #include <signal.h>
    typedef void (*sighandler_t)(int);  //函数指针
    sighandler_t signal(int signum, sighandler_t handler);
        - 功能：设置某个信号的捕捉行为
        - 参数：
            - signum: 要捕捉的信号
            - handler: 捕捉到信号要如何处理
                - SIG_IGN ： 忽略信号
                - SIG_DFL ： 使用信号默认的行为
                - 回调函数 :  这个函数是内核调用，程序员只负责写，捕捉到信号后如何去处理信号。
	                回调函数：
	                    - 需要程序员实现，提前准备好的，函数的类型根据实际需求，看函数指针的定义
	                    - 不是程序员调用，而是当信号产生，由内核调用
	                    - 函数指针是实现回调的手段，函数实现之后，将函数名放到函数指针的位置就可以了。

        - 返回值：
            成功，返回上一次注册的信号处理函数的地址(handler)。第一次调用返回NULL
            失败，返回SIG_ERR，设置错误号
            
    SIGKILL SIGSTOP不能被捕捉，不能被忽略。

```
>![[Pasted image 20220423202506.png]]
>![[Pasted image 20220423202539.png]]
>SIGKELL：必须得杀死进程，不可捕捉，SIGSTOP同理


```c
#include <sys/time.h>
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>

void myalarm(int num) {  //handler就是个函数，此时myalarm就是handler
	//int类型的参数表示捕捉到的信号的值。
    printf("捕捉到了信号的编号是：%d\n", num); // 所以这里直接打印的num的值就是SIGALRM的信号值14
    printf("xxxxxxx\n");
}

// 过3秒以后，每隔2秒钟定时一次
int main() {

    // 设置信号捕捉
	// signal(SIGALRM, SIG_IGN); eg：提起设置陷阱捕捉动物//SIG_IGN ： 忽略信号
    // signal(SIGALRM, SIG_DFL);//- SIG_DFL ： 使用信号默认的行为，相当于什么都没有设置
    // void (*sighandler_t)(int); 函数指针，*sighandler_t是函数指针的名称，返回值void，参数int
		//int类型的参数表示捕捉到的信号的值。
    signal(SIGALRM, myalarm);//信号捕捉一定要放在，设置定时器之前，不然会产生问题

    struct itimerval new_value;

    // 设置间隔的时间2s
    new_value.it_interval.tv_sec = 2;
    new_value.it_interval.tv_usec = 0;

    // 设置延迟的时间,3秒之后开始第一次定时
    new_value.it_value.tv_sec = 3;
    new_value.it_value.tv_usec = 0;

    int ret = setitimer(ITIMER_REAL, &new_value, NULL); // 非阻塞的
    printf("定时器开始了...\n");

    if(ret == -1) {
        perror("setitimer");
        exit(0);
    }

    getchar();

    return 0;
}
```
>注意gcc signal.c -o signal，这个命名不行，因为signal可能跟系统的某个函数冲突，随便设置成其他的
>![[Pasted image 20220423204304.png]]