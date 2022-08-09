#网站发布
[csdn有用的博文](https://blog.csdn.net/weixin_45019350/article/details/121901433?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165356336816782246452174%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165356336816782246452174&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-121901433-null-null.142^v10^control,157^v12^new_style1&utm_term=hexo&spm=1018.2226.3001.4187)

[csdn2](https://blog.csdn.net/sinat_37781304/article/details/82729029?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165356855116781432929349%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165356855116781432929349&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-82729029-null-null.142^v10^control,157^v12^new_style1&utm_term=hexo+&spm=1018.2226.3001.4187).

GitHub上建站访问hexo，一定要注意的点

用`hexo d` 进行远程部署的时候
会让你输如Github的用户名和密码
输入密码在之前应该用先部署的你的用户名和邮件
```
git config --global user.name "yourname"
git config --global user.email "youremail"
```
用下面两条查看是否设置成功了
```
git config user.name
git config user.email
```
如果无法重设密码，就重新改一下邮箱，邮箱无所谓的，主要是让他更新

1、新建guthub仓库

仓库为：你的用户名+.github.io


2、安装hexo上传插件


```
npm install hexo-deployer-git --save
```



3、修改hexo配置文件指定仓库路径

可在文件夹中直接打开文件，也可通过vim直接编辑

vim _config.yml


### 0.1.1 2、安装hexo上传插件

```
npm install hexo-deployer-git --save
```

### 0.1.2 3、修改hexo配置文件指定仓库路径

可在文件夹中直接打开文件，也可通过vim直接编辑

```
vim _config.yml #找到Deploymentdeploy:  type: git  repo: 你的github仓库路径  branch: master
```

![image-20211203213606004](https://img-blog.csdnimg.cn/img_convert/57b7452a5399f57b0e3ef2ef1a5d8271.png)

### 0.1.3 4、推送站点到github

```
推送命令hexo d
```

推送过程中需要输入你的github用户名和密码。但是在2021年8月14日开始github官方就加强安全访问。不能通过原有账号密码git访问，密码需要用官方的token或者采用ssh公私钥访问。否则会出现下图：鉴权失败（用户名密码错误）

> 官方原话：
> 
> 近年来，GitHub 客户受益于 GitHub.com 的许多安全增强功能，例如双因素身份验证、登录警报、经过验证的设备、防止使用泄露密码和 WebAuthn 支持。 这些功能使攻击者更难获取在多个网站上重复使用的密码并使用它来尝试访问您的 GitHub 帐户。 尽管有这些改进，但由于历史原因，未启用双因素身份验证的客户仍能够仅使用其GitHub 用户名和密码继续对 Git 和 API 操作进行身份验证。
> 
> 从 2021 年 8 月 13 日开始，我们将在对 Git 操作进行身份验证时不再接受帐户密码，并将要求使用基于令牌（token）的身份验证，例如个人访问令牌（针对开发人员）或 OAuth 或 GitHub 应用程序安装令牌（针对集成商） GitHub.com 上所有经过身份验证的 Git 操作。 您也可以继续在您喜欢的地方使用 SSH 密钥

![image-20211203212949274](https://img-blog.csdnimg.cn/img_convert/0b77ef00dea01a42d089a5fa712dcb49.png)

解决方式就是获取token，登录github设置setting->Developer Settings->Prosonal access tokens 创建一个新token。然后就可以拿这个token当密码输入了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/d37913a8a514a257bb25eb18fdc495fd.png)

![image-20211203214601302](https://img-blog.csdnimg.cn/img_convert/af90dc7f99118b6b9c334b066ac7a560.png)

用户名和token输入后，上传成功。

![image-20211203212926297](https://img-blog.csdnimg.cn/img_convert/87a25160c6447e32e4e48c6b551a2947.png)

![image-20211203214825635](https://img-blog.csdnimg.cn/img_convert/79321b1e6f384008505a6efde3da9fcc.png)

### 0.1.4 5、尝试访问

输入你的仓库名称,即可访问成功。

https://lindaifeng.github.io/

![image-20211203235634499](https://img-blog.csdnimg.cn/img_convert/20916a10b797106b70474ae0fc93c27f.png)
image-20211203213606004
4、推送站点到github

推送命令hexo d


推送过程中需要输入你的github用户名和密码。但是在2021年8月14日开始github官方就加强安全访问。不能通过原有账号密码git访问，密码需要用官方的token或者采用ssh公私钥访问。否则会出现下图：鉴权失败（用户名密码错误）

    官方原话：

    近年来，GitHub 客户受益于 GitHub.com 的许多安全增强功能，例如双因素身份验证、登录警报、经过验证的设备、防止使用泄露密码和 WebAuthn 支持。 这些功能使攻击者更难获取在多个网站上重复使用的密码并使用它来尝试访问您的 GitHub 帐户。 尽管有这些改进，但由于历史原因，未启用双因素身份验证的客户仍能够仅使用其GitHub 用户名和密码继续对 Git 和 API 操作进行身份验证。

    从 2021 年 8 月 13 日开始，我们将在对 Git 操作进行身份验证时不再接受帐户密码，并将要求使用基于令牌（token）的身份验证，例如个人访问令牌（针对开发人员）或 OAuth 或 GitHub 应用程序安装令牌（针对集成商） GitHub.com 上所有经过身份验证的 Git 操作。 您也可以继续在您喜欢的地方使用 SSH 密钥

image-20211203212949274

解决方式就是获取token，登录github设置setting->Developer Settings->Prosonal access tokens 创建一个新token。然后就可以拿这个token当密码输入了。

在这里插入图片描述

image-20211203214601302

用户名和token输入后，上传成功。

image-20211203212926297

image-20211203214825635
5、尝试访问

输入你的仓库名称,即可访问成功。

https://lindaifeng.github.io/
