# 开发与架构

## 应用结构

这是静态SPA，没有本站用户账号或写入后台。React Router管理页面，Vite构建输出dist，EdgeOne负责静态托管和路由回退。保持既有技术栈，不因参考原生JS网站而重写应用。

| 位置 | 责任 |
|---|---|
| src/App.tsx | 全站背景、导航、页脚、路由、懒加载和错误边界 |
| src/pages | Home、ArticleList、ArticleDetail、Collections、About |
| src/data/postsIndex.ts | 文章索引查询、按需加载Markdown |
| src/data/pdfPosts.ts | PDF文章元信息 |
| src/data/content.generated.json | 构建生成的轻量内容索引 |
| src/posts | Markdown正文与frontmatter |
| src/features/reader | Markdown、KaTeX、目录与标题锚点 |
| src/components/PdfViewer.tsx | PDF翻页、缩放、全屏、下载和字体配置 |
| src/components/collections、src/data | 收藏展示组件及相应数据 |
| public | 原背景、公开封面、PDF、站点地图等静态资源 |
| scripts/content.ts | 内容校验、生成索引及站点地图 |
| vite.config.ts | React插件、资源别名、PDF资源复制和Worker扩展名 |
| .tools/run.ps1 | 本机项目内环境与npm脚本入口 |
| .github/workflows/check.yml | GitHub上的构建与浏览器检查 |

## 路由与阅读状态

- `/` 首页；`/articles` 文章、搜索、课程和归档。
- `/article/:slug` 阅读详情，既有slug长期保留。
- `/collections` 收藏入口；`/collections/:category` 对应收藏分类。
- `/about` 关于；其它路径显示404。

文章列表在查询参数保存q、category、format、view、page。详情通过 `?format=pdf` 选择PDF，`#page=2`保存PDF页码。Markdown与PDF同slug时默认正文，只有PDF时直接显示PDF。不能让路由切换丢失这些可分享状态。

## 数据与构建

`content:check`读取PDF元信息与Markdown frontmatter，生成排序索引及 `public/sitemap.xml`。build随后进行应用/脚本类型检查与Vite构建。正文与阅读器按需加载，避免首页载入所有文章、PDF或收藏工具。

目录与正文采用兼容的GitHub slug生成方式；重复标题需有不同锚点。KaTeX样式和字体由构建带入本地assets。PDF资源从当前安装的pdfjs-dist复制，不能混用其它版本的Worker或CMap。

## 本地维护

按README配置项目环境。包版本以package-lock.json为准；Node以.nvmrc为准。不要在文档中把兼容版本范围误写成已安装版本。

4173用于生产预览与浏览器测试。端口被占用时确认是本项目预览后再停止，不结束其它项目进程。测试产物位于artifacts；源码发生变动后先重新build再运行使用preview的测试。
