
``` c
    #include <unistd.h>
    int execl(const char *path, const char *arg, ...); //  ....代表可变参数

- 参数：
            - path:需要指定的执行的文件的路径或者名称
                a.out ：相对路径 ；/home/nowcoder/a.out：绝对路径， **推荐使用绝对路径**
                ./a.out hello world (假设Hello world 是函数中参数)

            - arg:是执行可执行文件所需要的参数列表：可以是很多的参数
                第一个参数一般没有什么作用，为了方便，一般写的是执行的程序的名称
                从第二个参数开始往后，就是程序执行所需要的的参数列表。
                参数最后需要以NULL结束（哨兵）

        - 返回值：
            只有当调用失败，才会有返回值，返回-1，并且设置errno
            如果调用成功，没有返回值。


```
代码实例
```c
#include <unistd.h>
#include <stdio.h>

int main() {


    // 创建一个子进程，在子进程中执行exec函数族中的函数
    //  如果在当前进程使用exec函数就把当前进程的函数替换了，所以创建一个子进程
    pid_t pid = fork();

    if(pid > 0) {
        // 父进程
        printf("i am parent process, pid : %d\n",getpid());
        sleep(1);
    }else if(pid == 0) {
        // 子进程
        execl("hello","hello",NULL); // 相对路径法： 1：文件名2：可执行程序3：null
		
       //绝对路径法： execl("/bin/ps", "ps", "aux", NULL); 这个是可以执行shell命令
        perror("execl");
        //  下面这个不会执行，因为调用了execl函数，子进程里面的代码会被替换掉就不会执行了，只会执行hello 可执行里面的代码
        printf("i am child process, pid : %d\n", getpid());

    }
    //  子进程和父进程共享的代码
    for(int i = 0; i < 3; i++) {
        printf("i = %d, pid = %d\n", i, getpid());
    }


    return 0;
}
```