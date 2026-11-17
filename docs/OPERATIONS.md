# 测试、发布与排障

## 本地检查

使用README的项目内环境及 `.tools/run.ps1`：先lint，再build，再test。build包含内容校验、两份TypeScript配置检查和Vite产物生成。测试启动生产preview，不自动替你重建源码。4173端口占用时先确认来源。

Playwright包含desktop与mobile项目，当前共10项用例，覆盖：首页/无横向溢出；搜索、格式、分类及URL恢复；真实Markdown和本地PDF Worker、翻页与刷新；收藏、关于、404；原书版中文CMap与渲染截图。

测试报告、截图和失败trace在artifacts，均不入库。新增测试围绕真实回归风险，不写只重复实现的断言。UI改动还需查看截图，特别是背景文字对比度和手机换行。

GitHub `.github/workflows/check.yml`在main推送和PR时运行检查；Linux runner的系统依赖安装属于云CI，不是本地Windows安装指令。

## EdgeOne配置

仓库：Persona027/Blog；分支main。以当前项目目录作为仓库根目录。

| 设置 | 值 |
|---|---|
| 根目录 | ./ |
| Node | 22.21.1，以.nvmrc及控制台实际支持为准 |
| 安装 | npm ci |
| 构建 | npm run build |
| 产物 | dist |

edgeone.json配置SPA回退及nosniff等响应头。assets使用带哈希长缓存；pdfs使用max-age=0、must-revalidate。pdfjs资源目前依赖平台默认缓存策略，没有单独声明缓存头，不能假定与assets或pdfs相同。

PDF资源复制由vite.config.ts完成，不需要另开后端。正文公式字体、Worker和CMap不依赖外部CDN。Node版本升级需同时核对.nvmrc、.node-version、平台支持与锁文件，不能随意使用控制台未提供的补丁版本。

## 发布步骤

1. 查看git status与差异，只提交当前任务文件；检查无密钥、本机临时路径和生成缓存。
2. 完成本地检查与截图验收，提交并按授权推送main。
3. 确认远端收到commit。推送成功与生产成功分别报告。
4. 在EdgeOne核对对应commit的生产部署；其它平台的状态不能代替EdgeOne。
5. 访问生产首页、直接打开文章并刷新、测试收藏和PDF翻页。
6. 对替换PDF逐文件比较线上/本地哈希；对字体问题检查CMap真实二进制、Worker MIME和最终canvas截图。

线上可能短时混用缓存HTML与新资源。先识别页面实际引用的带哈希chunk，再判断是否已更新；不得在部署尚未完成时宣布修复上线。

## 回退

先确定故障commit及上一可用版本。可在EdgeOne恢复已验证的生产版本，或使用git revert创建可审计修复提交；不要以强制推送、reset或批量删除用户文件代替正常回退。回退后重复核心页面与PDF验证。

## 维护工具

封面同步、图片优化、历史PDF复制属于人工工具，不纳入默认云构建。同步需要的环境变量只存在.env.local；不要输出其内容。图片优化会改写资源，须检查差异，原背景不在封面批量优化目录内。

缓存/依赖/临时文件始终位于项目内。不要全局安装依赖，也不要为排障访问C盘技能目录或用户缓存；使用仓库内文档与工具。
