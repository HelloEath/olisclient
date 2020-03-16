
汽车机油项目，根据不同类型发动机匹配不同类型机油
## 代码目录
- assets 用在vue结构中的图片资源
- common 公用js,ajax调用/弹出信息框
- components 通用组件,输入框/日期框/下拉框/表格/表单等
- layout 布局组件,跟具体业务相关的页面组件,按功能模块分类
- setting 快速配置,可以快速配置出各个功能模块的字段说明/列表字段/显示布局/表单布局/验证规则等
- store 全局状态数据,按模块划分
- validator 额外的验证组件
- static 因无法纳入vue而独立存在的css js 图片等资源

## 开发环境
- 需要安装noodjs，用到npm包管理工具
- 版本管理使用git

## 命令说明
- 安装vue-cli
$ npm install --global vue-cli
- 下载依赖包
$ npm install
- 运行并启动(启动热加载环境)
$ npm run dev
- 打包（包在dist目录下）
$ npm run build

