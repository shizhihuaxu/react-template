## 技术选型

- node 版本管理：nvm 0.39.1
- node 版本：node 16.16.0
- 包管理：yarn 1.22.19
- 构建工具：
  - webpack 5（编译工具）
  - webpck-cli 5（命令行工具）
  - webpack-dev-server 4（热更新, webpack serve 启动）
  - webpack-merge（合并配置项）
  - HtmlWebpackPlugin（配置生成的html）
- 框架：react 18 + react-dom 18
- 路由：react-router-dom 6
- 状态管理：react-redux + redux-thunk
- 请求库：axios 
- 类型检查：
  - typescript 
  - @types/react 
  - @types/react-dom
  - @types/react-router-dom
  - fork-ts-checker-webpack-plugin（ts 错误输出在屏幕上）
- 编译器
  - babel-loader（webpack）
  - @babel/core
  - core-js@3（preset-env："useBuiltIns": "usage" 自动引入）
  - @babel/preset-env
  - @babel/preset-react
  - @babel/preset-typescript
- 代码风格：具体见 webpack 配置和 eslintrc.js、eslintignore 文件
  - eslint
  - eslint-webpack-plugin
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
- 预处理器：SCSS（用于书写样式）+ StyleLint 14.9.1
- 组件库：Antd



