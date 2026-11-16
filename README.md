# Persona

个人学习笔记、技术文章与生活收藏。React、TypeScript、Vite 构建的静态站点，部署到腾讯 EdgeOne，保留既有 `/article/:slug` 链接。

## 本地运行

Node.js 使用 `.nvmrc` 中的版本（22.21.1）；所有项目依赖采用本地安装。

Windows 下先将临时目录和浏览器缓存指向项目内，避免写入用户目录：

```powershell
$env:TEMP = "$PWD/.tmp"
$env:TMP = $env:TEMP
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/playwright"
New-Item -ItemType Directory -Force .tmp,.cache/playwright | Out-Null
npm ci --userconfig .npmrc
./.tools/run.ps1 dev
```

`.npmrc` 将 npm 缓存设在 `.cache/npm`。禁止全局安装；不要将 `.env.local`、缓存、浏览器或构建产物提交到仓库。

## 代码与内容

- `src/App.tsx`：按页面加载的路由、站点壳层与错误边界。
- `src/pages`：首页、文章、关于和收藏页面。
- `src/features/reader`：按需加载的 Markdown 阅读器。
- `src/components`：导航、文章行、PDF 阅读器、收藏组件。
- `src/posts/*.md`：Markdown 原文及 YAML frontmatter。
- `src/data/pdfPosts.ts`：PDF 元信息；同 slug 允许同时包含正文与 PDF。
- `src/data/content.generated.json`：由构建生成的轻量索引，不能手工编辑。
- `scripts/content.ts`：校验日期、必需字段、重复 PDF slug、PDF/封面存在性及本机盘符路径。

文章有正文时默认显示正文，可切换到 PDF；只有 PDF 时直接打开阅读器。目录和正文使用兼容的 GitHub slug 算法，重复标题有独立锚点。列表的搜索、课程、格式、视图和分页保存在 URL。

## 检查

```powershell
./.tools/run.ps1 lint
./.tools/run.ps1 build
# 首次运行测试前：下载到 D 盘的项目缓存目录
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/playwright"
npx playwright install chromium --only-shell
./.tools/run.ps1 test
```

测试基于生产构建，覆盖桌面和移动端：导航、搜索/筛选恢复、双格式阅读、PDF 翻页和刷新、收藏入口、404 及横向溢出。截图和报告存入 `artifacts/`。

## EdgeOne 部署

仓库根目录为本目录，不是本机的 `D:/myWebsite`。项目须绑定 `Persona027/Blog` 的 `main` 分支。

| 设置     | 值                     |
| -------- | ---------------------- |
| 根目录   | `./`                   |
| Node     | 22.21.1，使用 `.nvmrc` |
| 安装命令 | `npm ci`               |
| 构建命令 | `npm run build`        |
| 输出目录 | `dist`                 |

`edgeone.json` 配置 SPA 回退和响应头。部署后直接访问并刷新 `/article/math-modeling-08self`，确认页面可打开、PDF 返回 PDF 文件而不是 HTML。Worker、数学字体、缺图回退均不依赖第三方 CDN。带哈希的 `/assets/` 长缓存；同名 PDF 使用重新验证，避免替换后仍展示旧版本。

当前 EdgeOne 项目可使用 Node 22.21.1；只使用控制台列出的可用版本，不能假设任意补丁版本均可切换。平台对 `.mjs` 静态文件可能返回 `application/octet-stream`，因此 Vite 将 PDF 模块 Worker 输出为 `.js`。上线验收需检查 Worker 的 JavaScript MIME 类型，并实际打开 PDF，不能仅检查部署状态。

推送成功只代表代码到达远端。应继续检查 EdgeOne 生产部署状态与对应 commit，再访问生产域名验证首页、文章刷新、PDF 和收藏。GitHub 中若另有 Vercel 检查，它不代表 EdgeOne 的部署状态。

封面同步脚本是维护工具，只在人工需要时运行，不加入构建过程；密钥仅存 `.env.local`，不会发送到前端。历史封面不会在获取新数据前批量删除。

## 设计

深蓝 `#101821`、表面 `#17232e`、正文 `#ecf2f5`、辅助文本 `#a6b7c3`、交互青色 `#79d9cc`。中文阅读采用本机字体栈，局部衬线标题表达个人笔记气质。无全屏背景下载与装饰性自动动画；尊重减少动画偏好。项目设计技能固定在 `.agents/skills/frontend-design/`，保留来源与许可。
