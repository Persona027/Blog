# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 更新日志 (2026-01-23)
- **内容新增**: 创建了 Unity 板块下的核心文章，并优化了文章详情页 API 扩展性。
- **样式优化**: 游戏列表改为 Grid 布局，且移动端强制 1:1 封面圆角处理。
- **资源整理**: 将旧路径图 logo.png 移动到 public 文件夹。

## 更新日志 (2026-02-02)
- **新增板块**: 增加番剧 (Anime) 分类页面，基于电影板块样式进行适配。
- **数据填充**: 创建 `src/data/animes.ts`，并收录了宫崎骏从《风之谷》到《你想活出怎样的人生》的主要作品。
- **资源配置**: 新建 `public/anime` 目录用于存放封面图片。
- **UI 调整**: 番剧板块采用粉色 (Pink) 主题色，并展示“制作公司 (Studio)”字段。

## 更新日志 (2026-02-09)
- **文档新增**: 收录了 Unity 协程 (Coroutine) 与事件系统 (Action/Func) 的进阶教程文章。
- **排版优化**: 将原始笔记转化为结构清晰的 Markdown 技术文档，并增加了导师视角的补充问答。

## 更新日志 (2026-02-10)
- **功能新增**: 在“其他”板块实现了社交媒体与游戏账号的展示系统。
- **技术实现**: 引入 CSS Mask 技术实现外部 SVG 的动态着色，支持品牌色悬停高亮。
- **交互逻辑**: 实现社交账号点击跳转、游戏 ID 点击复制的差异化交互。
- **数据管理**: 新增 `src/data/socials.ts` 和 `public/other/` 图标库，包含 GitHub、Bilibili、Steam、Discord、豆瓣及网易云等。
- **UI 优化**: 将“其他”板块的分类标题由占位符更新为“链接”与“ID”。
- **内容调整**: 在“链接”分区新增 Steam 个人主页与知乎，并将 Steam 从“ID”分区移除以便统一展示为跳转链接。
- **ID 细化**: 移除了 Discord 账号，并在“ID”分区新增了暴雪战网 (Battle.net)、明日方舟 (Arknights) 以及瓦罗兰特 (Valorant) 三个游戏的 ID 复制卡片。
- **图标重绘**: 对 Steam、知乎、战网、明日方舟及瓦罗兰特的 SVG 图标进行了重绘，提升了图准度与视觉美感。

## 更新日志 (2026-02-11)
- **功能新增**: 实现了音乐 (Music) 板块的专辑展示与网易云歌单播放系统。
- **UI 段落**: 专辑板块基于“横向长条”布局，展示歌手、发行年份、流派标签及精选评价。
- **重构优化**: 对 `Collections.tsx` 进行了深度重构，将各分类渲染逻辑模块化，显著提升了代码可维护性。
- **交互设计**: 实现了专辑详情的展示逻辑，去除了外部播放器以维持站点纯净与稳定性。
- **数据管理**: 新增 `src/data/music.ts` 用于管理专辑配置。
- **资源配置**: 预留了 `public/music/` 目录用于存放专辑封面。
- **架构升级**: 重构了首页逻辑，新增 `Home.tsx` 作为全新的入口页面，实现 Hero Landing + 内容流的结构。
- **视觉增强**: 首页引入全屏 Hero Section，支持 `Welcome` 文案跟随滚动淡出及平滑滚动指引。
- **导航优化**: 统一 Navbar 左侧为 "Persona" 品牌标识，并新增了独立的“首页”与“文章”导航项。
- **资源统一**: 全站背景图统一替换为 `background.png`，旨在提供更纯净的视觉背景。

## 更新日志 (2026-02-12)
- **内容引擎升级**: 为所有 Markdown 文章引入了 `category` 字段，支持结构化分类。
- **多维视图系统**: 重构 `ArticleList.tsx`，实现了“卡片网格”、“归档总览”（按年份分组）与“分类探索”（按领域分组）三种展示模式。
- **菜单交互增强**: Navbar 中的“文章”项升级为悬停下拉菜单，支持快速在不同文章展示维度间切换。

