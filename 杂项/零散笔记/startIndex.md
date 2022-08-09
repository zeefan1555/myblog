i++：本身就控制了递归到下一层，startIndex是用来控制下一层开始的起始位置

来控制for循环递归到下一层的起始位置
	如果是用一个集合来求组合就用startIndex
	如果是多个集合来求组合就不用startIndex，用另外的变量eg：[[5.电话号码的字母组合]]

startIndex是可以自定义从第几个位置开始的，eg：startIndex = 1就是从下一层的[1]位置开始
for循环中 i 从下一个时，i 就天生比startIndex大1了

[[8.组合总和II]]
	for循环汇总 i 从下一个时，i 就天生比startIndex大1了
	可以用[[startIndex]]来去重，就不用used数组了
```cpp
	if (i > startIndex && candidates[i] == candidates[i - 1]) { // 此时的i比startIndex大1，因为for循环中i++了，此时startIndex还未加1，所以
	continue;
	}
```


排列问题不用startIndex
