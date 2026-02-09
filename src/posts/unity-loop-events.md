---
title: Unity 进阶：协程与事件系统
date: 2026-02-09
summary: 深入解析 Unity 中的协程 (Coroutine) 实现原理，以及如何利用 C# 的 Action 和 Func 构建模块化的事件系统。
cover: /logo.png
---

> 本文内容基于课堂笔记整理，补充了解答与代码实践。

## “单线程”？

至今为止我们写的代码都是“单线程”的，即一路从上往下地执行一遍。
虽然场景里可以有很多个同时执行的脚本，在同一时间执行的代码只是一行
而已。（Unity会快速地从一个切换到另一个脚本来营造“同时执行”的假象）

在这种情况下，考虑这个问题：在一篇代码中，我们想要在2秒后执行某条指
令，即类似以下的功能：

```csharp
void func(){
    Wait(2);
    DoSomething();
}
```

虽然 Unity 有自带的 `Invoke` 函数实现这种功能，但该函数局限性很大，不建议使用。
怎么做呢？`Wait` 函数该怎么写？

当我们想在某处“分叉”出一段代码在一段时间后执行，就需要协程了！

---

## Coroutine 协程

Unity 中的协程提供了“多线程”的功能，即多份代码在同时以不同的“速度”执行。
比如：函数一在 2 秒后执行，在 6 秒后结束；函数二在 8 秒后执行，并每 1 秒再执行一次。

事实上 **Coroutine** 也是 Unity 伪装的多线程而已，内部其实还是单线程！（SC-102）

协程是一个函数；定义如下：

```csharp
IEnumerator <FuncName>(<params>)
{
    <content>
}
```

即把一个函数的返回值改为 `IEnumerator` 即可！

> 💡 **导师补充**: `IEnumerator` 是什么？
>
> 它是 C# 中的“迭代器接口”。在 Unity 中，协程本质上是一个状态机。当函数执行到 `yield` 时，它会暂停并保存当前状态（包括局部变量），将控制权交还给 Unity 引擎。Unity 会在下一帧（或指定时间后）恢复该函数的执行。

比如：

```csharp
IEnumerator MyCoroutine(float f) {
    f = 5;
    // ...
}
```

调用协程函数：

```csharp
StartCoroutine(MyCoroutine(5f));
```

注意这里要用这个专门的函数来调用协程！

> 💡 **导师补充**: 如果直接视作函数调用会怎么样？
>
> 如果直接调用 `MyCoroutine(5f);`，只会返回一个迭代器对象，函数内部的代码**一行都不会执行**。必须通过 `StartCoroutine` 将这个迭代器注册到 Unity 的协程管理器中，引擎才会开始“驱动”它。

---

## Coroutine 协程 (yield)

听起来十分抽象，那么协程的意义是什么呢？它有什么用呢？

协程系统还有一个很重要的组成部分：`yield`

`yield` 关键字的作用是将一个协程暂停，并在下一帧继续执行
`yield` 通常搭配 `return` 使用：`yield return xxx`

常用结构：

- `yield return null;`：下一帧继续执行协程（暂停并且返回）
- `yield return new WaitForSeconds(i);`：在 i 秒后继续执行（暂停并且等 i 秒）

例子：

```csharp
IEnumerator DisableAfterTwoSec(){
    yield return new WaitForSeconds(2);
    gameObject.SetActive(false);
}
```

---

## Coroutine 协程：更多例子

这个协程函数的作用是什么？这样写有什么好处？（方便管理不同协程）

```csharp
IEnumerator MyUpdate(){
    while(true){
        DoSomething();
        yield return null;
    }
}
```

那这个呢？

```csharp
IEnumerator StartUICutScene(){
    TurnOnBlackScreen();
    yield return new WaitForSeconds(0.5f);
    PlayCutscene();
}
```

---

## 关于 WaitForSeconds

一定要注意 `WaitForSeconds` 是一个类！（我们使用 `new WaitForSeconds()` 来构造实例)
一开始会觉得不是很直观，但其实可以把它理解成一个包装了一些信息（包括等待时间）的一个数据类型，在 `yield return` 时 Unity 会读取这个实例来弄清楚我们想要等的秒数。

**一个好习惯**：如果我们在循环中多次等待同一段时间，最好先建立 `WaitForSeconds` 实例再使用，而不是在循环中不断 `new`。

```csharp
WaitForSeconds w1 = new WaitForSeconds(1);
// …
while(true){
    yield return w1;
}
```

> 💡 **导师补充**: 为什么这是一个好习惯？
>
> 除了代码整洁外，更重要的是**性能优化**。在 `while(true)` 循环中频繁使用 `new` 关键字会不断创建新的对象，这会在堆内存中产生大量垃圾，导致垃圾回收（GC）频繁运行，从而引起游戏卡顿。预先缓存实例可以实现“零 GC”。

---

## 协程：实践

我们可以使用协程轻松地实现一些持续一段时间的功能
尝试不用动画系统在场景中加入以下要素吧：

1. 让一个平台在两点间来回移动
2. 收集金币：收集到时金币向上飞走并渐隐

如果使用动画系统，上述的功能实现起来也很简单。
那么协程和动画相比有哪些优势，又有哪些劣势呢？

> 💡 **导师补充**:
> - **优势**: 逻辑控制能力强（非线性流程），可以轻松访问代码变量，无需制作额外的 Animation Clip。
> - **劣势**: 无法像动画系统那样直观预览，复杂的运动曲线实现起来较麻烦，且大量协程可能导致性能开销（主要在 C# 与 C++ 的上下文切换）。

---

## 事件是什么?

考虑以下这个情景：
当玩家被敌人攻击时会发生这些事情：

1. 玩家的生命值会减少
2. 玩家的血条会减少
3. 屏幕会变黑 0.2 秒
4. 屏幕会抖动 0.4 秒
5. 在接下来的 0.8 秒中玩家不会再受到攻击

这五件事哪些是逻辑上的，哪些是画面上的？
我们应该在哪里写执行这些操作的代码呢？
如果把这 5 条的实现都放在一个函数（比如 `OnTakeDamage`）里怎么样？

事件的引入帮助我们将多个功能（1-5）连接到同一件事情（玩家受击）上，而同时保持了代码的模块化。

---

## C# 中的事件系统

在 SC-101 中我们首先学会使用事件系统，在后续的课程中会学习到 C# 中事件/委托相关的一系列知识 (delegate, event, Action, Func)。

C# 中的事件系统中有两个常用的组件：`Action` 和 `Func`。可以把它们想象成存储了许多函数的 `List`。当一个 `Action/Func` 执行时，其中所有的函数都会一起执行。（这是不是和之前玩家受击的需求很像？）

`Action`/`Func` 是一个类型，我们可以定义类型为 `Action`/`Func` 的变量并用它来存放函数。

比如：

```csharp
public Action onPlayerInjure;

void Start() {
    onPlayerInjure += ScreenFlash;
}
```

上方的代码所做的事是：定义了 `onPlayerInjure` 这个 `Action` 类型变量，并在游戏开始运行时将 `ScreenFlash` 这个函数放进 `onPlayerInjure` 里。

> 💡 **导师补充**: “+=” 是什么？
>
> 这是一个重载运算符，用于向委托链（Delegate Chain）中**注册**监听器。与之对应的 `-=` 用于注销。可以理解为“订阅”这个频道。

---

## Action：常用操作

`Action` 位于 namespace `System` 中。

> 💡 **导师补充**: 这意味着什么？
>
> 意味着你必须在脚本头部写上 `using System;`，否则编译器无法识别 `Action` 类型。

它能够存放的函数必须是**无返回值**的！（也就是 `void` 函数）
有关的常用操作有这些：

- 向一个 `Action` 中添加一个函数：“`+=`”
  - 比如: `onDamage += ScreenFlash;`
  - 注意，`+=` 右侧的值为想要添加的函数名
- 从一个 `Action` 中删除一个函数：“`-=`”
  - 比如: `onDamage -= UpdateHPBar;`
- 调用一个 `Action` 中所有的函数：把它当作一个函数来用即可
  - 比如：`onDamage();`

---

## Action：有参数的函数

`Action` 能够存放的函数必须是无返回值的，但是可以有参数！
每个 `Action` 类型的变量中的函数的参数必须都是相同的。

比如：
- `void A(int a)`
- `void B(float b)`
- `void C(float c)`

则 B 和 C 可以放在同个 `Action` 里，而 A 不行。

定义一个有参数的 `Action`：`Action<参数1类型，参数2类型，...>`

比如:

```csharp
private Action<float> onDamage;
```

这代表 `onDamage` 中的函数都是接受一个 `float` 类型的参数，且无返回值的函数。

这时，使用它的时候就可以传入一个参数了：

```csharp
onDamage(45.2f);
```

---

## Func：有返回值的函数

`Action` 可以用来存放 `void` 函数，那如果想要存放有返回值的函数怎么办？
这时就需要 `Func` 了！

`Func` 和 `Action` 是同一“家族”的，而它们唯一的区别就是**有无返回值**。

在定义 `Func` 的时候，需要在所有参数之后加上返回值的类型：

```csharp
private Func<int, float> func1;
// func1 中的函数接受 1 个 int 类型的变量，并返回 float

private Func<string> func2;
// func2 中的函数不接受变量，返回 string

private Func<int, int, int> func3;
// func3 中的函数接受 2 个 int 类型的变量，并返回 int

// private Func func4;
// func4 会报错，为什么？
```

> 💡 **导师补充**: 为什么 `func4` 会报错？
>
> 因为 `Func` 的语义是“带返回值的委托”。它至少需要一个泛型参数来指定返回值的类型。如果不返回任何值，应该使用 `Action`。

使用 `Func` 的时候，当一个普通的有返回值的函数即可！

```csharp
private Func<int, int, int> add;
// ...
int sum = add(4,5);
```

---

## Action 和 Func: 为什么需要它们?

1.  **“一个存放函数的变量”**。我们可以在 `Action`/`Func` 中存放函数并动态修改其中的函数。这在许多时候都会带来很大的便利。
    *   比如：一个四则运算程序中有加减乘除四个功能。使用 `Action`/`Func` 的话我们只需调用一个 `Action`/`Func` 并动态修改其中真正的函数是加减乘除中的哪一个。
2.  **促进代码的模块化**。我们可以在多个其他位置访问一个事件并向其中添加函数。相反地，如果我们把事件写成一个（调用很多其他位置函数的）函数的话会很乱。
3.  **“只在需要时做一件事”**。使用 `Action`/`Func` 后，我们能确保与其相关的函数只在其发出时执行一次，这样避免了多余的浪费。

这是程序设计中很重要的一个思想！我们写的程序需要“懒”并“有用”。
