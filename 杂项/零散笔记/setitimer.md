函数概念
```c

    #include <sys/time.h>
    int setitimer(int which, const struct itimerval *new_value,
				  truct itimerval *old_value);
    
        - 功能：设置定时器（闹钟）。可以替代alarm函数。精度微妙us，可以实现**周期性定时**
        - 参数：
            - which : 定时器以什么时间计时
              ITIMER_REAL: 真实时间(real)，时间到达，发送 SIGALRM   **常用**
              ITIMER_VIRTUAL: 用户时间(虚拟时间virtual)，时间到达，发送 SIGVTALRM
              ITIMER_PROF: 以该进程在用户态和内核态下所消耗的时间来计算，时间到达，发送 SIGPROF

            - new_value: 设置定时器的属性
            
                struct itimerval {      // 定时器的结构体
                struct timeval it_interval;  // 每个阶段的时间，**间隔时间**
                struct timeval it_value;     // **延迟多长时间**执行定时器
                };

                struct timeval {        // 时间的结构体，上面两个函数的
                    time_t      tv_sec;     //  秒数     
                    suseconds_t tv_usec;    //  微秒    
                };

            过10秒后，每个2秒定时一次
           
            - old_value ：记录上一次的定时的时间参数，**一般不使用，指定NULL**
        
        - 返回值：
            成功 0
            失败 -1 并设置错误号

```

代码实例
```c
#include <sys/time.h>
#include <stdio.h>
#include <stdlib.h>

// 过3秒以后，每隔2秒钟定时一次
int main() {

    struct itimerval new_value;

    // 设置间隔的时间，struct timeval it_interval; 
    // 每个阶段的时间，间隔时间2s
    new_value.it_interval.tv_sec = 2;   //  秒数     
    new_value.it_interval.tv_usec = 0;  //  微秒    

    // 设置延迟的时间,3秒之后开始第一次定时
    new_value.it_value.tv_sec = 3;   //  秒数     
    new_value.it_value.tv_usec = 0;  //  微秒
	//其实就只设置间隔时间和延迟时间
	
    //注意new_value 是传递的地址
    int ret = setitimer(ITIMER_REAL, &new_value, NULL); // 非阻塞的，会立马执行打印代码，不会延迟
    printf("定时器开始了...\n");

    if(ret == -1) {
        perror("setitimer");
        exit(0);
    }

    getchar();//获取键盘录入，如果在这里不加这个函数，会直接向下return，这里用while()死循环也行
    //主要看setitimer，返回的信号能不能让进程停止

    return 0;
}
```