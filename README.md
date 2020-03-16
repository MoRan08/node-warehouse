
## 技术栈

nodejs + express + mongodb + mongoose + es6/7 + vue + element-ui


## 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (开启状态)
3、GraphicsMagick (裁切图片)
```

```
git clone https://github.com/MoRan08/node-warehouse

cd node-elm

npm install 

npm run dev

访问: http://localhost:8001（如果已启动前台程序，则不需打开此地址）

```


## 项目布局

```
.
├── InitData                        初始化数据
│   ├── 
├── config                          运行配置
│   ├── default.js                  默认配置
│   └── development.js              开发环境
├── controller                      处理中心，负责路由及数据库的具体操作
│   ├── admin
|
├── middlewares                     中间件
│   ├── check.js                    权限验证    
│   └── statistic.js                API数据统计
├── models                          模型(数据库)
│  
├── mongodb                         连接数据库
│   └── db.js
├── public                          静态资源目录
├── routes                          路由配置
│   ├── admin.js                    管理员
|
├── API.md                          接口文档
├── app.js                          基础配置
├── index.js                        入口文件
├── package.json                    
├── ecosystem.config.js             pm2配置文件
├── .gitignore						git设置忽略文件
├── .babelrc                        babel转码文件
├── README.md                  
.

```
