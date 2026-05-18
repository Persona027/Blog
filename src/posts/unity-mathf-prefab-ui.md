---
title: Unity 常用 API、预制件与进阶 UI 系统
date: 2026-01-28
summary: 详解 Unity 中常用的 Mathf 数学库、预制件 (Prefab) 的核心概念，以及 Slider、Mask、RectTransform 等进阶 UI 组件的使用技巧。
cover: /assets/covers/logo.png
category: Unity
---

> 原始笔记迁移。

## class Mathf

**Mathf 类**是 Unity 为我们提供的常用数学函数类，比如 `min`、`max`、`sin`、`cos`、`round` 等等。

**为什么叫 Mathf？“f”是什么意思？**
因为 C# 有一个自带的 `Math` 类，但其中使用的都是 `double` 类型的变量。Unity 把 C# 的 `Math` 类“封装”成了一个都使用 `float` 类型的 `Mathf` 类，因为我们更常用 `float` 表示小数。所以 f 是 float 的意思！

**Mathf 中几个常用的函数：**

*   `Mathf.Lerp(float a, float b, float t)`: **线性插值 (linear interpolation)**。
    *   简单来说就是得到一个 a 和 b 之间的数，当 t=0 时为 a，t=1 时为 b，t 在 0 到 1 之间时为从 a 到 b 相应比例的值。
    *   比如：`Mathf.Lerp(50, 100, 0.5)` 等于 75 (为什么？)
*   `Mathf.Min(float a, float b)`: 得到 a 和 b 中较小的那个值。( `Mathf.Max` 同理）
*   `Mathf.Clamp(float v, float min, float max)`: 将 v 保持在 min 到 max 这个区间内。如果 v 小于 min 值为 min，如果 v 大于 max 值为 max。

### Mathf.Lerp / Vector3.Lerp

`Lerp` 是一个初学者较难理解的但又十分有用的函数。

一个常见的用途是**“非线性动画”**，比如：


```
csharp
Vector3 pos = new Vector3(50, 0, 0);
void Update() {
    transform.position = Vector3.Lerp(transform.position, pos, 0.1f);
}
```


上方的代码是做什么的？`Vector3.Lerp` 是什么?

另一个（明显）的用途是**“混合”两个数据**。
比如 SAT 考试一个科目是 400-800 分，那 70% 正确的话是多少分？
`Mathf.Lerp(400, 800, 0.7f);`

![Lerp 示意图](/assets/posts/unity/b7b257ce-5e7c-45c1-82b8-b07a9bdf6aa7.png)

## Prefab 预制件

Unity 中的 **Prefab** 能够让我们把在场景里做的东西“保存”到项目文件夹里方便以后复用。

比如我们做了一个路灯，把它保存为 Prefab。之后我们就可以在场景里添加许多同样的路灯，且如果修改 Prefab，所有的路灯都会跟着一起被修改。

*   **创建预制件**：将 Hierarchy 中的物体拖入 Project 窗口即可。
*   **使用预制件**：将 Project 窗口中的 Prefab 拖入场景中即可（这叫做创建了一个 Prefab 的实例）。
*   **编辑预制件**：双击打开一个 Prefab。
*   **其他功能**：
    *   **Unpack**（解套）：不被统一影响。
    *   **Override**：在场景里对所有 Prefab 统一改，等等。

这是游戏开发中很重要的一个概念，在正式项目中会很频繁地使用 Prefab；这样做的优点是易于管理、易于模块化与标准化物体。

## UI 组件：Slider

**Slider 组件（拖动条）**可以用来在 UI 中实现类似进度条或滑条的功能。

*   **Slider 的结构**：
    *   `Background`（背景/后面）
    *   `Fill`（填充/血条颜色）
    *   `Handle`（把柄）
*   **核心属性**：其最主要的是 `Fill`，它显示了当前 Slider 的值。
*   **Value**：Slider 的 `value` 是一个 0 到 1 的小数，0 为空，1 为满。
    *   比如一个 67% 满的进度条就可以用一个 `value` 为 0.67 的 Slider 表示。
*   **使用 Slider**：可以在引擎/代码里修改 Slider 的值 (`slider.value`)。

## UI 组件：Mask

与 `SpriteMask` 很像，**Mask 组件**提供了 UI 中的遮罩功能。

**使用 Mask:**
1.  给一个 UI 图像组件物体（比如 `Image`）添加 `Mask` 组件。
2.  所有它的子物体都只能在其范围内被显示（只有子物体受 Mask 影响）。

### RectMask2D 组件
有时候我们只需要一个矩形的 Mask，而非一个任意形状的。这时就可以用 **RectMask2D 组件**代替 `Mask` 组件，因为 `Mask` 组件是较耗性能的。

## UI 组件：RectTransform

可以注意到所有 UI 物体上的 `Transform` 都被 Unity 替换为了 **RectTransform**。
`RectTransform` 是 `Transform` 的一个子类。它提供了一个矩形的位置、旋转、缩放、中心、锚点等信息，并可以根据 parent 的 `RectTransform` 组件调节自身。

简单来说，`RectTransform` 存放了 UI 物体的空间信息。

*   **RectTransform 的位置**：和 `Transform` 一样，由 `PosX`、`PosY`、`PosZ` 定义。(默认以屏幕中心点为参考系)
*   **RectTransform 的大小**：在 `Scale` 以外还可以看见 `Width` 和 `Height` 两个属性，它们直观地定义了矩形的长和宽，并且不会影响到 `Scale`。
*   **RectTransform 的旋转**：和 `Transform` 一样，但旋转中心是它的 `Pivot`。

那么 `Pivot`（蓝色圈圈，组件中心点）和 `Anchor`（风车一样的四角形，锚点相对于父物体）是什么呢?

### Pivot & Anchor

`Pivot` 和 `Anchor` 是 `RectTransform` 和 `Transform` 最大的区别。

*   **Pivot (中心点/轴心)**：它决定了物体旋转的中心。
    *   它是一个从 (0,0) 到 (1,1) 的值，分别对应左下角和右上角。
    *   比如如果 pivot 是 (1,1) 的话物体就会绕右上角旋转。

*   **Anchor (锚点)**：它决定了该物体左下角和右上角的位置。
    *   锚点由两个值：`Min`（左下角）和 `Max` (右上角）决定，它们都是从 (0,0) 到 (1,1) 的值，分别对应 **parent** 的左下角和右上角。
    *   **注意这里是相对于 parent 的!**
    *   比如：如果 `Min` 和 `Max` 都是（0,0)，那么该物体就会固定在 parent 的左下角。

**思考**：
*   这样设计有什么用处？为什么要用 parent 的位置？
*   所有 UI 物体都有 parent 吗？是哪一点允许了这种设计?

## 在 UI 中制作动画

动画是 UI 的灵魂！
一个平滑的过渡动画会极大地增强玩家体验。（比如 iOS 系统动画）

UI 中动画的逻辑一般很简单：当玩家点击一个按钮时播放一段动画。
比如：打开背包时背包界面慢慢渐变出现、点击开始游戏时场景变暗等等。

当我们尝试让一个 UI 面板渐变出现时会遇到一个问题：
一个界面里有很多张图片，并不是很方便一起调透明度。
怎么办呢？

### UI 组件：Canvas Group

**Canvas Group 组件**可以将其子物体的所有 UI 物体视为一个整体，一起调节：
1.  **Alpha (透明度)**
2.  **Interactable (可互动性)**
3.  **Blocks Raycasts (是否接受鼠标输入)**

其中透明度属性是最常用的。
**Tips**: 给每一个 UI 界面加上自己的 `Canvas` 和 `Canvas Group` 通常是一个好主意！

---

## 📚 知识点扩展 (AI 补充)

### 1. 插值算法对比

| 函数 | 用途 | 动画特性 |
| :--- | :--- | :--- |
| `Mathf.Lerp(a, b, t)` | 线性插值 | 匀速过渡，如果你在 Update 中使用 `current = Lerp(current, target, 0.1f)` 则是**减速**过渡（芝诺悖论式逼近）。 |
| `Mathf.SmoothDamp()` | 平滑阻尼 | 类似弹簧阻尼效果，非常平滑，常用于**相机跟随**。 |
| `Mathf.MoveTowards()` | 匀速移动 | 严格的匀速靠近，不会像 Lerp 那样最后变得无限慢。 |

### 2. Prefab 变体 (Prefab Variant) (Unity 2018.3+)
*   **概念**: 基于一个基础 Prefab 创建一个新的 Prefab。
*   **优势**: 基础 Prefab 的修改会同步到变体，但变体可以有自己独特的覆盖属性。
*   **应用**: 创建一个 "基础敌人" Prefab，然后创建 "红色敌人" 和 "蓝色敌人" 变体，此时修改 "基础敌人" 的碰撞体，红蓝敌人都生效。

### 3. Anchor (锚点) 速查表

锚点决定了 UI 元素如何随父容器的大小变化而变化（**响应式布局的核心**）。

| Min (X,Y) | Max (X,Y) | 效果 | 典型应用 |
| :--- | :--- | :--- | :--- |
| (0.5, 0.5) | (0.5, 0.5) | **居中**：保持固定大小，始终在父物体中心。 | 弹窗、确认框 |
| (0, 0) | (0, 0) | **左下对齐**：保持固定大小，跟随父物体左下角。 | 技能图标、状态栏 |
| (0, 0) | (1, 0) | **底部拉伸**：宽度随父物体对齐，高度固定。 | 底部导航栏 |
| (0, 0) | (1, 1) | **全屏拉伸**：四角完全贴合父物体四角。 | 背景蒙版、全屏面板 |
