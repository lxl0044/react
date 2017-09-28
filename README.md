
### 配置文件说明
1. .babelrc 文件为 babel 插件配置文件
2. package.json 文件为项目依赖文件
3. postcss.config.js 文件为 postcss 插件配置文件
4. webpack.dev.config.js 文件为开发环境下 webpack 配置文件
5. webpack.prod.config.js 文件为生产环境下 webpack 配置文件

### 查看
1. 下载完整的代码库到本地
2. 在项目文件中打开 terminal 工具
3. 执行 npm install（GitLab并不包含node_modules模块）


### 启动服务
1. 默认以node方式启动，采用pm2进行节点管理（参考https://github.com/Unitech/pm2）。
2. 配置了hotload，修改源码即可自动编译生效

常用命令说明
编译：npm run prod
启动：npm start
停止：npm stop
重启：npm restart
