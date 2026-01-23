---
title: React 学习笔记 01：组件化思维
date: 2026-01-26
summary: 记录一下今天学到的 React 核心概念，关于 Props 和 State 的区别。
---

## 什么是组件化？

组件就像是乐高积木。我们不一次性盖好一栋楼，而是先造好门、窗户、墙壁，最后组装在一起。

### Props vs State

- **Props**: 像是因为 DNA 决定的特征（比如眼睛颜色），是父组件传给你，你改不了的。
- **State**: 像是你的心情（开心/难过），是你自己内部控制，可以随时改变的。

```tsx
// 一个简单的组件示例
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 今天的疑问

Hooks 到底是什么魔法？为什么不能在 if 语句里用？明天继续研究。
