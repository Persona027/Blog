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

