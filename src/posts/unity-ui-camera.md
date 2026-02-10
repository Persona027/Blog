---
title: Unity 相机与 UI 系统详解
date: 2026-01-26
summary: 深入解析 Unity 中的 Camera 组件（透视与正交）、UI 系统架构（Canvas, Image, Text, Button）以及如何实现相机跟随和 UI 交互。
cover: /logo.png
category: Unity
---

> 原始笔记迁移。

## 相机组件

**Camera 组件**提供的功能是在一个位置以一个角度看出去并把看到的画面渲染在屏幕或纹理上。

### 透视相机 (Perspective) 与 正交相机 (Orthographic)

相机有两种主要的模式：**透视 Perspective** 和 **正交 Orthographic**。

*   **透视相机**:
    *   近大远小，一般用于 3D 游戏。
    *   视野范围是一个锥体（视锥）。可以看见 `Near Plane` 和 `Far Plane` 之间的物体。
    *   **Field of View**: 视锥的宽度。

*   **正交相机**:
    *   无论远近都是一个大小，一般用于 2D 游戏。
    *   视野范围一个长方体。
    *   **Size**: 视野范围的大小。

![相机视锥示意图](/assets/posts/unity/073ed11e-3c87-42ef-b63e-e05f5b15e3b5.png)

## 相机组件：颜色与渲染

一个场景里可以有不只一个相机！（明日方舟的透视是用了两个相机做的，一个场景一个 UI）。

`Camera` 组件具有以下常用的与颜色渲染相关的参数：

*   **Clear Flags**：定义了相机需要在空的地方（没有物体的地方）显示些什么
    *   `Skybox`：显示天空盒
    *   `Solid Color`：显示一个单色
    *   `Depth Only`：什么都不显示 (透明）
    *   `Don't Clear`：保留上一帧的颜色
*   **Background Color**：`Clear Flags` 模式下背景显示的颜色
*   **Culling Mask**：这个相机渲染的 layer (可以独立控制不同 layer)
*   **Depth**：这个相机本身的层级顺序；Depth 更大的相机会被渲染在更上面

## 相机跟随角色

> (真正用的大多是 cinemachine)

相机看出去的场景和其角度是由相机物体的 `position` 和 `rotation` 定义的。（为什么 `scale` 没有用？）

**如何实现相机跟随角色？**
让相机每一帧都随着角色一起移动即可。

**思路：**
1.  在开始时记录下相机和角色之间的 Z 距离（为什么？）
2.  在每一帧根据角色位置更改相机的位置（有更好的方法吗？)

## 什么是 UI?

UI 是 **User Interface（用户界面）** 的简称。游戏中的 UI 即为那些显示信息或可以交互的部分，比如文字、图片、按钮、进度条等等。

UI 是组成一个游戏至关重要的部分，一般来说一个游戏中绝大部分的信息都是通过 UI 传达的。

**那么 UI 和一般的物体有什么区别呢？**
*   UI 可能是“浮在”画面之上的（比如对话框这个 UI 不能被场景挡住）
*   UI 需要玩家用鼠标/键盘直接互动（比如在背包中整理物品）

## Unity 的 UI 系统

> Tips：场景里 Canvas 显示是一米其实是画面中的一个像素，所以 UI 在 Scene 中会很大。

UI 系统直观上是和场景分离的，但本质上是和其他物体一样存在于场景中的。
**最大区别**是所有 UI 组件（图片、文字等等）都需要 **Canvas** 组件来渲染；默认下 UI 并不归相机渲染。

*   **创建 UI 组件**：右键新建 > UI
*   新建组件后 Unity 会自动创建一个 `Canvas`
*   **UI 组件只有是 Canvas 子物体时才会被显示（为什么？）**

## UI 组件：Canvas

Canvas 的作用是渲染 UI 物体；可以理解为“照向 UI 的相机”。
Canvas 有几种基本的渲染模式：

*   **Overlay（显示在屏幕最上层）**
    *   这是默认的也是最常见的模式。所有属于 OverlayCanvas 的 UI 物体都会显示在场景上方。
    *   优点：使用简单
    *   缺点：不灵活。一般不可以有透视效果；场景物体不可以遮盖住 UI
*   **Camera（使用相机渲染）**
    *   将 Canvas 及其所有子物体的 Ul 组件使用某个相机渲染。
    *   优点：比较灵活，可以有透视效果，场景物体可以遮住 UI (How?)
    *   缺点：较复杂，需要处理层级关系及多相机协调
*   **World Space (世界坐标渲染)**
    *   将 Canvas 放在场景里，和所有其他物体一起被相机渲染。

## UI 组件: Canvas Scaler 和 Graphic Raycaster

当我们新建 Canvas 时 Unity 会自动添加上 `Canvas Scaler` 和 `Graphic Raycaster` 两个组件。
它们都是较轻量级的组件，通常我们不用放很多精力在它们身上。

*   **Canvas Scaler**
    *   会根据一定条件（默认比如屏幕分辨率）缩放 Canvas
    *   它是多设备适配至关重要的一环
    *   默认时 CanvasScaler 的缩放模式是 `ConstantPixelSize`，即不缩放
    *   我们一般会调成 `Scale with Screen Size` 来和屏幕分辨率适配
*   **Graphic Raycaster**
    *   有这个组件后 UI 系统才会检测玩家输入（比如点击按钮等）

## UI 组件：Image

`Image` 组件用于在 UI 上显示图片。
它和 `SpriteRenderer` 很相似，都是用于显示图片。
（它们的区别是什么？`Image` 在 canvas 中显示，`SpriteRenderer` 在 scene 中显示）

**Image 组件的属性：**
*   **Source Image**：显示的 Sprite
*   **Color**：染色（和 SpriteRenderer 一样是染色！）
*   **Material**：图片的材质（之后会讲材质相关知识）
*   **RaycastTarget**：如果点开那么它会接受并盖住鼠标输入（这和 Raycast 有什么关系？）
    *   Tips：UI 中有 raycast 都一般和鼠标有关

## UI 组件：Text

`Text` 组件用于在 UI 中显示文字。
有两种显示文字的组件：Unity 的 `Text` 和 `TextMeshPro` 的 Text。前者功能较少，后者更先进。主要用 TextMeshPro。
这里主要介绍 Unity 的 Text 组件。

**Text 组件的属性：**
*   字体、大小、颜色、内容、行距等等

## UI 组件：Button

`Button` 组件提供了 UI 按钮的功能。
有下面几个问题需要探索探索：
*   按钮的作用范围是哪里？我们点击哪里才会触发一个按钮？（接受子物体的 raycast）
*   按钮在鼠标经过、点击时的视觉效果怎么实现？
*   点击按钮之后会发生什么？（像 qt 的事件，触发一个 gameobject 上的一个 public 函数，为无参函数或只有一个参数的函数）
*   按钮的形状、颜色、文字等等怎么修改？
*   `Button` 组件和其他 UI 组件有什么关系？(比如 `GraphicRaycaster`）

## 在代码中访问 UI 组件

> using UnityEngine.UI

和我们之前看到的其他组件一样，UI 组件都是可以在代码中访问的。
*   每个组件都是一个类
*   在界面里看到的每一个选项都是该类中的成员

---

## 📚 知识点扩展 (AI 补充)

### 1. 相机渲染模式详解

*   **透视相机 (Perspective)**
    *   **特点**: 近大远小，模拟人眼视觉。
    *   **Field of View (FOV)**: 控制视锥角度。FOV 越大，视野越宽，边缘畸变越明显。
*   **正交相机 (Orthographic)**
    *   **特点**: 无论远近物体大小一致，常用于 2D/UI。
    *   **Size**: 控制视野高度的一半。

### 2. Canvas 渲染模式对比

| 模式 | 描述 | 应用场景 |
| :--- | :--- | :--- |
| **Screen Space - Overlay** | 覆盖在屏幕最上层，不需要相机 | HUD、简单 UI、设置菜单 |
| **Screen Space - Camera** | 由特定相机渲染，受透视/深度影响 | 需要 3D 粒子特效穿插的 UI |
| **World Space** | 作为 3D 物体存在于场景中 | 头顶血条、VR 菜单、3D 交互面板 |

### 3. UI 性能优化建议

*   **Raycast Target**: 图片如果只需要显示（如背景图），请**取消勾选** Raycast Target，减少射线检测开销。
*   **Canvas 分离**: 将频繁变化的 UI（如血条、倒计时）和静态 UI（如背景、边框）放在不同的 Canvas 下，避免整个 Canvas 重建。
*   **图集 (Atlas)**: 使用 Sprite Atlas 将小图标合并，减少 Draw Call。
