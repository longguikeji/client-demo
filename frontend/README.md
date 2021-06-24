```shell
遇到的问题：
npm install @babel/helper-compilation-targets --save-dev

TypeError: this.getOptions is not a function 引入less一直报错

是less-loader安装的版本太高，卸载重新安装7.0版本即可
// 卸载
npm uninstall --save less-loader
// 安装
npm install -D less-loader@7.x


```


# vue-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
