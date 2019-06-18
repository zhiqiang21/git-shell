# 介绍文档

## 简介

* `github.js` 当clone仓库时，可以在仓库clone完毕时给`.git/config`中设置`name` 和`email`，可以通过参数指定要设置的哪个可配置选项。
* `har.js` 解析浏览器开发者模式导出的har文件，并且校验在`shadowsocks`的`user-rule.txt`文件中是否已经添加过相应的规则。
* `urlhelp` 解析复杂的 url 将url中的query和hash分别输出。


## 使用方法：

- clone仓库后，先检查自己是否安装Node ，建议安装node8.0+
- 执行 `npm i`
- 执行`npm link`，将可执行脚本添加到当前系统的可执行的变量中


## 示例：

### urlhelp

```
// urlhelp [url]
url https://www.baidu.com?a=1&b=1/#hash
```


### har

```
// har [har file path]

har /Users/houzhiqiang/Downloads/codepen.io.har
```

### github

```
//gitclone url [仓库名字name 可选] -默认github  [-didi] [-github]
gitclone git@github.com:zhiqiang21/git-shell.git
```