# alarm笔记
>需要的知识
>![[Pasted image 20220423175135.png]]
>
```c

    #include <unistd.h>
    unsigned int alarm(unsigned int seconds);
        - 功能：设置定时器（闹钟）。函数调用，开始倒计时，当倒计时为0的时候，
                函数会给当前的进程发送一个信号：SIGALARM
        - 参数：
            seconds: 倒计时的时长，单位：秒。如果参数为0，定时器无效（不进行倒计时，不发信号）。
                    取消一个定时器，通过alarm(0)。
        - 返回值：
            - 之前没有定时器，返回0
            - 之前有定时器，返回之前的定时器剩余的时间

    - SIGALARM ：默认终止当前的进程，每一个进程都有且只有唯一的一个定时器。
        alarm(10);  -> 返回0
        过了1秒
        alarm(5);   -> 返回之前的定时器剩余的时间，返回9

    alarm(100) -> 该函数是不阻塞的，可以继续向下执行代码，到了100秒后会发送一个信号(终止当前的进程)
```

# 代码实例1
```c

#include <stdio.h>
#include <unistd.h>

int main() {

    int seconds = alarm(5); // 
    printf("seconds = %d\n", seconds);  // 返回值，之前没有定时器，返回0

    sleep(2);
    seconds = alarm(2);    // 不阻塞，会立即执行下边的语句
    printf("seconds = %d\n", seconds);  // 之前有定时器，返回之前的定时器剩余的时间

    while(1) { // 一直死循环，alarm结束后会终止进程有死循环
    }

    return 0;
}
```
>输出的结果。如果系统是英文的：闹钟会为alarm
>![[Pasted image 20220423180420.png]]


# 代码实例2

程序运行的时间
    实际的时间 = 内核时间 + 用户时间 + 消耗的时间
    > 内核时间：系统调用的时间
    > 用户时间：代码一条一条执行的时间  
    >==**进行文件IO操作的时候比较浪费时间**==
    > 定时器，与进程的状态无关（自然定时法）。无论进程处于什么状态，alarm都会计时。
   
```c
// 1秒钟电脑能数多少个数？
#include <stdio.h>
#include <unistd.h>


int main() {    

    alarm(1);//定时1秒

    int i = 0;
    while(1) {
        printf("%i\n", i++);
    }

    return 0;
}
```
>从输出界面上看不止1秒，是因为，原本1秒内就数了那么多的数，但是打印出来的时间比较多
>进行文件IO操作的时候比较浪费时间
>![[Pasted image 20220423180958.png]]
>可以将内容重定向到一个文件中：./alarm1 >> a.txt，此时在执行，就会只过了1秒就输出“闹钟”
>![[Pasted image 20220423181319.png]]
>此时在看a.txt，这个时候输入的更多
>![[Pasted image 20220423181435.png]]
