# Persona

个人学习笔记、技术文章和生活收藏。使用 React 19、TypeScript、Vite；GitHub main 分支关联腾讯 EdgeOne Pages，生产域名为 https://depersona.top。

## 文档导航

- [开发与架构](docs/ARCHITECTURE.md)：目录、路由、数据流和本地环境。
- [设计规范](docs/DESIGN.md)：现有结构、原背景、日系细节和视觉验收。
- [内容维护](docs/CONTENT.md)：Markdown、PDF、课程讲义、素材与来源。
- [PDF 阅读器](docs/PDF.md)：中文字体映射、Worker、缓存和故障排查。
- [测试与发布](docs/OPERATIONS.md)：检查命令、EdgeOne 设置、线上验收和回退。
- [维护记录](docs/CHANGELOG.md)：关键改动和经验。
- [项目协作约束](AGENTS.md)：自动化工具与后续维护应遵守的规则。

## 本地运行

在仓库根目录使用 PowerShell 7。Node 版本以 `.nvmrc` 为准，目前为22.21.1。

```powershell
$projectRoot = (Get-Location).Path
$env:TEMP = Join-Path $projectRoot '.tmp'
$env:TMP = $env:TEMP
$env:npm_config_cache = Join-Path $projectRoot '.cache/npm'
$env:npm_config_userconfig = Join-Path $projectRoot '.npmrc'
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $projectRoot '.cache/playwright'
New-Item -ItemType Directory -Force $env:TEMP,$env:npm_config_cache,$env:PLAYWRIGHT_BROWSERS_PATH | Out-Null
npm ci --userconfig .npmrc
./.tools/run.ps1 dev
```

仓库必须位于授权的项目目录内。Windows 本地维护禁止向 C 盘安装或写入依赖、缓存和临时文件；优先复用项目工具。`.tools/run.ps1` 会为开发、构建和测试设置项目内缓存环境，不会自行安装运行时。

## 提交前检查

```powershell
./.tools/run.ps1 lint
./.tools/run.ps1 build
./.tools/run.ps1 test
```

测试使用生产构建。首次需安装浏览器时，先设置上述环境，再执行 `npx --no-install playwright install chromium --only-shell`。测试启动4173端口，先关闭占用该端口的本项目预览服务。

当前10项桌面/手机检查包含导航、筛选恢复、双格式阅读、PDF翻页、中文字体资源、收藏和404。测试数量会随覆盖范围变化，不以固定数量作为通过标准。

## 当前视觉与内容

保留首页、文章、课程分类、收藏、关于的既有结构。全站固定背景使用原有 `public/background.png`，加65%深色遮罩；墨紫与藤灰用于文字和界面层级。Markdown 阅读区有独立遮罩，PDF保留白纸阅读体验。

数学建模课程17讲已替换为原书版详细讲义，旧文章slug和PDF URL保持不变。课堂课件限定范围，《李宏毅深度学习教程》1.2.4作为主要内容依据，原书未覆盖的课堂内容明确标注。

## 仓库边界

提交源代码、文章、公开素材、PDF和维护文档。`dist/`、`artifacts/`、`.cache/`、`.tmp/`、下载字体及浏览器缓存不提交。`.env.local`只保存在本地，不进入前端或日志。第三方设计skill位于 `.agents/skills/frontend-design/`，保留其来源与许可证。
