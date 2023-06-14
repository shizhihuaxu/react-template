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
- CSS：
  - style-loader
  - css-loader 默认对 [name].module.[ext] 的文件开启 css modules
  - sass 
  - sass-loader
  - classnames（解决css modules 中无法使用多个样式的问题）
  - postcss
  - postcss-loader(web pack)
  - postcss-preset-env（内置了 `autoprefixer、postcss-nesting/postcss-nested、postcss-import` 等相关功能）
- 组件库：Antd
- Git Hooks：husky
  - commit message 校验：@commitlint/cli、@commitlint/config-conventional
  - 代码格式化：lint-staged



