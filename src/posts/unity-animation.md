---
title: Unity 进阶笔记：2D 渲染与动画系统
date: 2026-01-25
summary: 详解 Unity 字段修饰符、SpriteRenderer 核心概念、Sprite Mask 遮罩技术以及动画系统（Animation/Animator）的完整工作流。
cover: /assets/covers/logo.png
category: Unity
---

## 字段修饰符

**Recall**: 字段就是类中变量的别称。
Unity 提供了一些字段修饰符，它们会改变变量在引擎里显示的方式。

**常用修饰符：**
- `[SerializeField]`：让 private 变量也可以在引擎里显示并被修改。（**推荐：**尽可能用 `[SerializeField] + private` 的组合，而不是 public！！！）
- `[HideInInspector]`：让 public 变量不在引擎里显示。
- `[Range(x,y)]`：让一个变量以拖动条的方式显示，而非输入框。

---

## 2D 渲染：SpriteRenderer 组件

用来显示一张图片。

**核心属性：**
- `Color`: 注意这里的 Color 是**染色**！颜色只会变深不会变浅（白色 = 原图）。
- `Flip`: 翻转图片（X 或 Y 轴）。
- `Material`: 材质球。
- **Sorting Layer**:
    - 这代表了物体的显示层级。SortingLayer 越高，物体就越“靠前”。
    - **注意**：这和 GameObject 的 `Layer` 完全不一样！
        - `Layer` 是用来给物体分类（物理/摄像机）的。
        - `Sorting Layer` 是控制显示顺序的。

---

## 2D 渲染：SpriteMask 组件

可以做“两个世界”的效果，用来实现图片遮罩。
**功能**：让一些图片只在另一张图片的范围内显示（或隐藏）。

**使用方法：**
1. 给遮罩物体添加 `SpriteMask` 组件。
2. 设置被遮罩物体上 `SpriteRenderer` 的 `Mask Interaction` 选项 (Visible Inside Mask / Visible Outside Mask)。

---

## Sprite 与 Sprite Editor

**Sprite (精灵)**：背景是透明的，是图片的一种导入类型。
- 在 Project 窗口点选一张图片即可看到其信息。
- 每张图片都有一个种类，比如 Default、Sprite、Cursor、Normal Map 等等。
- **注意**：如果要用在 SpriteRenderer 里的话必须选择 **Sprite (2D and UI)** 类型。
- **大小上限**：每张图片有一个大小上限（默认为 2048x2048）。通过修改该上限可以粗略地“模糊”一张图片。当导入了特别大的图片（超过 2048）时，别忘了调高上限。

**Sprite Editor**：用来编辑图片的工具 (类似 TexturePacker)。
- **常用功能**：`Slicing` (切割图片集)。

**代码与 Sprite**：
`Sprite` 也是一个类，可以在代码中修改 `SpriteRenderer.sprite` 属性来动态切换图片。

---

## Unity 的动画系统

* **Animation 窗口** (`Ctrl+6`):
    - 功能：编辑动画、新建动画。
    - 每一个动画都是一个 `AnimationClip`，存放在 Assets 文件夹里。
* **Animator 窗口**:
    - 功能：管理动画播放顺序与逻辑。
    - 实际播放动画的是物体上的 `Animator` 组件。

---

## 编辑动画 (Animation)

动画是由**关键帧**定义的。我们只需在几个关键帧处修改物体身上组件的值，Unity 就在其中平滑过渡做成一段动画。

**一个物体上的动画能影响哪些值？**
- 所有该物体 Inspector 里可以改的值（position，color，我们自己写的变量等等）。
- 所有该物体的子物体身上的值。
- **注意**：动画不能影响已经有 Animator 组件的子物体！

**动画的优先级**：
**动画的优先级比代码高！**
比如：如果一个物体正在播放控制它的位置的动画，那无论我们在代码里怎么改它的位置都不会生效。（有不少“bug”是因为这个导致的）

---

## 管理动画 (Animator)

Animator 组件是用来管理动画播放的顺序与逻辑的。
每个有动画的物体都有一个 **AnimatorController**（可在 Animator 组件里查看）。

**核心组成部分：**
1. **States (状态)**：每一个 State 代表一个 AnimationClip。当运行到一个 State 时，播放对应的动画。
    - **橙色 State**：起始状态 (Entry)。
    - **Any State**：任何状态下都可触发的跳转。
2. **Transitions (过渡)**：连接两个 State 的白色箭头。
    - `Exit Time`: 是否等待上一个动画播完？(勾选后无法立即打断)
    - `Transition Duration`: 过渡需要多久？
3. **Variables (参数)**：用于控制 Transition 的条件。

---

## Animator Scripting (代码控制)

我们可以在代码里修改 Animator 中变量的值来控制动画的播放。

**常用 API:**

```csharp
// 设定一个 bool 变量的值
animator.SetBool("isRunning", true);

// 激活一个 trigger 变量 (触发一次即自动复位)
animator.SetTrigger("jump");
```

**更简单的动画播放 (适合 2D 帧动画):**

```csharp
// 直接跳转到对应的 State，无过渡
animator.Play("Idle");

// 重载方法：从头开始播放一个 state
// Play(stateName, layer, normalizedTime)
animator.Play("Attack", 0, 0f);
```
