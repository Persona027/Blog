---
title: Unity 进阶笔记：物理系统与射线检测
date: 2026-01-24
summary: 详细讲解 Unity 中的 Tag、Layer 概念，以及 2D 物理系统核心组件（Collider2D, Rigidbody2D）和射线检测的使用方法。
cover: /logo.png
---

## Tag (标签)

Tag 是一个 string。
每一个 GameObject 都有一个 Tag (默认为 "Untagged")。
可以在编辑器里添加/删除 Tag。

Tag 可以给单个 GameObject 加上一个标签，它最大的作用是：
1. 用来判断一个物体是不是属于这个分类
2. 用来通过分类寻找该物体

- **访问 Tag**: `gameObject.tag`
- **寻找物体**: `GameObject.FindObjectWithTag()`，在 scene 中找到 tag 的 gameobject（可以用来初始化）

---

## Layer (层级)

Layer 是一个 int。
每一个 GameObject 都有一个 Layer (默认为 "Default")。
可以在编辑器里添加/删除 Layer。

Layer 可以给所有 GameObject 进行分组，它最大的作用是：
1. 让相机只渲染一些 Layer
2. 让物理运算只在一些 Layer 中进行

- **访问 Layer**: `gameObject.layer`
> *注意这 Layer 不是 Sorting Layer!（之后会出现)*

---

## Collider2D (碰撞盒)

Collider（碰撞盒）定义了一个物体的物理体积。
Unity 中有许多形状的 2D 碰撞盒：Box、Circle、Capsule、Edge 等等。

- **使用**：给物体添加上某种 Collider2D 组件即可。
- **注意**：要想看到真实的物理模拟效果，还得添加 RigidBody2D 组件。

Collider 组件有两种行为模式：
1. **Collider**（有物理体积）
2. **Trigger**（无物理体积，触发器）

---

## RigidBody2D (刚体)

RigidBody（刚体）定义了一个物体的物理行为。
最直观的效果是添加刚体的物体受重力影响了。

Rigidbody2D 有 3 种行为模式:
1. **Dynamic**: 完全参与物理模拟（e.g. 掉落物）
2. **Kinematic**: 不会主动移动，需要用代码让它移动（e.g. 程序驱动的角色移动）
3. **Static**: 完全不会移动 (e.g. 地面、墙壁）

**常用的参数：**
- `Gravity Scale`：这个物体受到重力的大小
- `Constraints`：锁定位移/旋转
- `Material`：控制弹力与摩擦

---

## Collision2D 事件函数 (碰撞)

每当两个物理物体相碰撞时 Unity 都会发出一个物理事件。我们可以在代码中处理这些物理事件，并实现“在碰撞时做某些事”。

> *暂时地，我们只使用 Dynamic types 的刚体。只有有 RigidBody 组件的物体才能接受物理事件。*

Collision 事件函数会在有个实际物理体积的碰撞盒碰撞时触发。它们是 MonoBehaviour 生命周期的一部分！（和 Start 性质一样）

- `void OnCollisionEnter2D()`: 在刚碰到时触发一次 (类比 GetKeyDown)
- `void OnCollisionExit2D()`: 在刚离开时触发一次 (类比 GetKeyUp)
- `void OnCollisionStay2D()`: 在碰撞时每帧触发 (类比 GetKey)

### OnCollisionEnter2D 详解

```csharp
void OnCollisionEnter2D(Collision2D collision)
```

这里有一个参数 `Collision2D collision`，其中包含了这次碰撞的所有信息，比如：
- `collision.collider`：对方的碰撞盒
- `collision.contacts`：接触点的位置
- `collision.gameObject`: 对方的 gameObject

---

## Trigger2D 事件函数 (触发)

```csharp
void OnTriggerEnter2D(Collider2D collision)
void OnTriggerExit2D(Collider2D collision)
void OnTriggerStay2D(Collider2D collision)
```

Trigger 事件函数会在两个无实际物理体积（Trigger）的碰撞盒碰撞时触发。它们也是 MonoBehaviour 生命周期的一部分。
与 Collision 不同，这里的参数是 `Collider2D`，即对方的碰撞盒。

---

## LayerMask

LayerMask 是一个 int，它代表了一些 layer 的集合 (比如一个 layermask 可以代表第 2、6、15、30 个 layer)。

**But how？一个整数是怎么表示这么多的 layer?**
在计算机中，一个整数变量是由 32 个 0 或 1 (bit）组成的！而 layermask 的原理正是将那 32 个 bit 中值为 1 的位置理解成“包含那个 layer”。

比如：`layermask = 9`，而 9 在二进制中是 `1001`。从右往左数，第 0 位和第 3 位是 1，所以该 layermask 代表的是第 0 个和第 3 个 layer。
*这也是为什么 Unity 只允许有 32 个 layer!*

**如何使用？用 `<<` 运算符**
- `int mask = 1 << 9;` 这代表了第 9 层的 layermask。
- `1 << n` 则代表第 n 层的 layermask。

---

## 射线检测 Raycast

可以使用 Raycast 函数在场景中向某个方向发出一根射线并获得与之碰撞的东西。

**例子**：可以每帧从主角的位置向前发射 2m 的射线，如果该射线碰撞到墙壁了，那么主角就不能继续往前走了。

射线检测有两个参与者：
- 发出射线的一方（A）：不需要有碰撞盒
- 碰撞到的一方（B）：需要有碰撞盒（需要物理体积）

### Physics2D.Raycast 函数

`Physics2D.Raycast` 是实现射线检测的函数，当它碰撞到第一个物体时就会停止。
`RayCastAll` 可以检测整条射线上的所有物体。

它有非常非常多可选的参数，其中比较常用的是：

```csharp
RaycastHit2D Raycast(Vector2 origin, Vector2 direction, float distance, int layerMask)
```

- `origin`：射线开始的位置
- `direction`：射线方向
- `distance`：射线长度
- `layerMask`：参与检测的 layer

---

> 可以用 effector2d 和 colloider2d 组合来实现不同的效果
