# 1 安装hexo
安装
npm install -g hexo-cli
初始化
hexo init myblog
	myblog是自己创的文件夹



安装完hexo后
输入以下命令
hexo g

hexo s


先配置一下你的用户名和邮箱

```
git config --global user.name "yourname"
git config --global user.email "youremail"
```
用以下两条，检查一下你有没有输对
```
git config user.name
git config user.email
```

远程git控制插件

```
npm install hexo-deployer-git --save
```

---
comments: true  是否可评论 
layout: post  公开文章 
toc: true  是否显示文章目录 
tags:    标签 
 - 我就是新的标签1
 - 老子是新的标签2
---


[[brew安装]]
---
title: ''
date: 
tags: []
published: true
hideInList: false
feature: 
isTop: false
---