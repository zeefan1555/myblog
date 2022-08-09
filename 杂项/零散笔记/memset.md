


memset是一个初始化函数，作用是将某一块内存中的全部设置为指定的值。
用于数组清空

```c
void *memset(void *s, int c, size_t n); 
	s指向要填充的内存块。
    c是要被设置的值。
    n是要被设置该值的字符数。
    返回类型是一个指向存储区s的指针。

eg：memset(buf, 0, 1024)

```