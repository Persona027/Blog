---
title: 软件开发架构复习：模块化与组件化开发
date: 2026-05-07
category: 软件开发架构总结
summary: 第九章复习要点：组件化设计原则、组件通信、状态管理、组件复用与测试。
cover: /logo.png
---

> 面向对象：软件开发架构课程学习者，基于课堂课件整理
> 本文涵盖核心考点、概念和最佳实践。

------------------------------------------------------------------------

% ==================== Title block ====================
{\LARGE 模块化与组件化开发\par}

{ ---\ 复习要点\par}

{ CH09   计算机学院  |  涵盖教材 pp.2--40（除案例全图页）\par}

% ================================================================
%  1. 前端模块化概述 (p.2)
% ================================================================
## 一、前端模块化概述 \pc{2}

### 模块化分类 \pc{2}

- \kk{外部模块化} \en{External Modularization}：引入第三方包或插件，通常由一个或多个 JS 文件组成。
- \kk{内部模块化} \en{Internal Modularization}：工程内部的分层或分类，内部一个模块一般由一个 JS 文件表示。

### 模块化的主要内容 \pc{2}

- 外部模块管理：\fn{Node.js} 和 \fn{NPM}（包管理器）。
- 内部模块组织：\fn{CommonJS}、\fn{ES6 Module} 和构建工具（Webpack 等）。
- 编译与转换：模块源码到目标代码，转译工具如 \fn{Babel}。

% ================================================================
%  2. Promise 对象 (pp.6--15)
% ================================================================
## 二、Promise 对象 \pc{6--15}

### 基本概念 \pc{6}

- Promise 是\kk{异步编程}的解决方案，比传统\en{事件 + 回调}更合理强大。
- 由社区最早提出，**ECMAScript 将其写入语言标准**，原生提供。
- Promise 是一个存取数据的\kk{容器}，封装基于 \fn{XMLHttpRequest} 异步请求后的状态和值。
- 从语法上说，Promise 是一个对象，提供\kk{统一 API}，各种异步操作均可用相同方法处理。

### 同步与异步 \pc{7}

- **同步** \en{Synchronous}：代码顺序执行，上一步完成后才执行下一步。
- **异步** \en{Asynchronous}：不等待上一步完成即继续执行。
- 核心问题：\kk{异步代码无法通过 \fn{return} 返回值}。

### 回调函数的问题 \pc{8--9}

- 回调函数 \en{Callback} 是异步编程的早期方案：将后续逻辑作为函数参数传入。
- 多次嵌套回调造成\kk{回调地狱} \en{Callback Hell}：代码层层缩进，可读性差，调试困难，维护成本高。

### Promise 基本用法 \pc{10}

- 构造函数\kk{必须有一个函数作为参数}：\fn{new Promise((resolve, reject) => \{...\})}
- 该函数的两个参数 \fn{resolve} 和 \fn{reject} 也是函数：分别在\kk{成功}和\kk{失败}时调用进行存值。
- 通过实例的 \fn{.then()} 方法中的两个回调分别在成功时\kk{取值}或失败时\kk{处理}。
- Promise 对象维护两个内部属性：

    - \fn{PromiseResult}：保存异步结果的值。
    - \fn{PromiseState}：保存状态\en{pending / fulfilled / rejected}。

- \fn{.then()} 监听 \fn{PromiseState} 的变化，选择对应的回调执行。

### Promise 的三种状态 \pc{11}

| lll@{}}

  **状态** | **含义** | **说明** |
| --- | --- | --- |
| \fn{pending} | 进行中 | 初始状态，既未成功也未失败 |
| \fn{fulfilled} | 已成功 | 操作成功完成 |
| \fn{rejected} | 已失败 | 操作失败 |

### Promise 的主要特点 \pc{11}

- **状态不受外界影响**：只有异步操作的结果可决定状态，任何其他操作无法改变。
- **状态一旦改变就凝固**：

    - 只能从 \fn{pending} $\to$ \fn{fulfilled}，或 \fn{pending} $\to$ \fn{rejected}。
    - 改变后不再变化，此时称为 \kk{resolved}（已定型）。

- **定型后可立即取值**：与事件不同，即使状态已定型，再添加回调函数，也会\kk{立即得到结果}。

### 使用范例要点 \pc{12--13}

- 范例一：基本创建与使用，演示 \fn{resolve}/\fn{reject} 和 \fn{.then()} 的配合。
- 范例二：结合 \fn{setTimeout} 模拟异步场景。

### 链式调用 \pc{14}

- \fn{.then()} 返回\kk{新的 Promise 对象}，实现链式调用 \en{Chaining}。
- 用链式调用\kk{替代回调函数嵌套}，使代码扁平化，消除回调地狱。
- 每个 \fn{.then()} 中的返回值会作为下一个 \fn{.then()} 的输入。

### Promise 的其他 API \pc{15}

- \fn{Promise.prototype.catch()}：专门捕获 rejected 状态，等价于 \fn{.then(null, onRejected)}。
- \fn{Promise.prototype.finally()}：无论 fulfilled 或 rejected，最终都会执行的回调。
- \fn{Promise.all(iterable)}：接受 Promise 数组，\kk{全部成功}则返回结果数组；\kk{任一失败}则整体 rejected。

% ================================================================
%  3. async / await (pp.18--21)
% ================================================================
## 三、async / await 关键字 \pc{18--21}

### async 关键字 \pc{18}

- 用于快速创建异步函数，是 Promise 的\kk{语法糖} \en{Syntactic Sugar}。
- 实际使用中，\fn{async} 与 \fn{await} 组合实现\kk{异步向同步的转换}。
- \fn{async} 函数始终返回一个 Promise 对象。

### await 关键字 \pc{19}

- \fn{await} 调用异步函数时\kk{阻塞当前执行流}，等待异步函数执行结束。
- 自动从返回的 Promise 对象中\kk{取值并返回}。
- **使用规则**：

    - 只能用于 \fn{async} 声明的异步函数中。
    - 只阻塞 \fn{async} 函数\kk{内部}代码，不阻塞外部代码。

- **优点**：用\kk{同步的方式}编写和使用异步，代码可读性大幅提升。
- **缺点**：reject 回调被自动忽略，必须用额外的 \fn{try-catch} 处理失败。\pc{19}

### async/await 使用注意事项 \pc{20--21}

- 将嵌套的 \fn{.then()} 链改写为顺序 \fn{await} 调用，代码更符合直觉。
- 注意\kk{并行 vs 串行}：多个不相关异步操作应用 \fn{Promise.all()} 并行执行，避免不必要的串行等待。
- 需要准确理解执行顺序：\fn{await} 后的代码等价于 \fn{.then()} 中的回调。

% ================================================================
%  4. Fetch API (pp.23--25)
% ================================================================
## 四、Fetch API \pc{23--25}

### 什么是 Fetch API \pc{23}

- \fn{fetch()} 是 \fn{XMLHttpRequest} 的\kk{升级版}，用于在 JS 中发出异步 HTTP 请求。
- 归属于\kk{ES6 标准}规范，绝大部分现代浏览器原生支持。
- 基于\kk{Promise 对象}实现，极大简化异步请求代码。

### fetch() 发送请求 \pc{24}

- 完整语法：\fn{fetch(url, optionObject)}
- GET 请求：可省略 \fn{optionObject}。
- POST 请求：在 \fn{optionObject} 中指定 \fn{method: 'POST'}、\fn{headers}、\fn{body} 等。

### fetch() 的响应对象 \pc{25}

- \fn{fetch()} 返回一个 **Response 对象**（Promise 包装）。
- 常用属性和方法：

    - \fn{Response.ok}      --- 布尔值，2xx 为 \fn{true}，其他 \fn{false}。
    - \fn{Response.status}  --- 整型，真实 HTTP 状态码。
    - \fn{response.text()}  --- 返回文本字符串（返回 Promise）。
    - \fn{response.json()}  --- 返回 JSON 对象（返回 Promise）。
    - \fn{Response.clone()} --- 底层通过 Stream 流实现，只能\kk{读取一次}，clone() 创建副本。


% ================================================================
%  5. Axios 库 (pp.28--29)
% ================================================================
## 五、Axios 库 \pc{28--29}

### Axios 简介 \pc{28}

- 基于 Promise 的\kk{第三方 HTTP 库}，可用于浏览器和 Node.js。
- 本质上是对原生 XHR 的封装，用 Promise 实现。
- Axios 封装后提供更便捷的 API：

    - \kk{拦截请求和响应} \en{Interceptors}：统一添加 token、日志、错误处理等。
    - \kk{转换请求/响应数据} \en{Transform}。
    - \kk{自动转换 JSON} 数据。


### Axios 使用范例要点 \pc{29}

- \fn{axios.get(url)} / \fn{axios.post(url, data)} 直接返回 Promise。
- 通过 \fn{axios.create(\{baseURL, timeout\})} 创建带默认配置的实例。
- 通过拦截器统一处理请求/响应逻辑。

% ================================================================
%  6. Fetch 与 Axios 对比 (pp.31--32)
% ================================================================
## 六、Fetch API 与 Axios 对比 \pc{31--32}

### Fetch API  \pc{31}

- **优点**：

    - 原生支持，无需额外依赖。
    - Promise 风格，比 XHR 更简洁。
    - 现代化设计，支持 \fn{async/await}。
    - \kk{流式处理} \en{ReadableStream}：适合大文件和渐进式加载。

- **缺点**：

    - 不自动处理 JSON：需手动调用 \fn{res.json()}。
    - \kk{错误处理不友好}：只对网络错误 reject，HTTP 错误码（404、500）不会抛错，需手动检查 \fn{response.ok}。
    - 不支持请求取消（早期），现需 \fn{AbortController}。
    - 缺乏对旧浏览器（如 IE）的支持。


### Axios  \pc{32}

- **优点**：

    - 自动转换 JSON，请求和响应自动序列化/反序列化。
    - \kk{更友好的错误处理}：HTTP 错误自动进入 \fn{.catch()}。
    - 支持请求取消：\fn{CancelToken} 或 \fn{AbortController}。
    - 请求和响应拦截器。
    - 更丰富的配置项：超时、请求头、转换函数等。
    - 更好的浏览器兼容性。

- **缺点**：

    - 需要额外引入库（增加体积和依赖）。
    - 非原生 API，项目越大依赖问题越明显。


% ================================================================
%  7. 项目案例 & 前端项目演进 (pp.34--39)
% ================================================================
## 七、项目案例与前端项目演进 \pc{34--39}

### 项目案例：宠物商城首页 \pc{4, 16, 26, 34}
贯穿全章的实践案例，展示前端项目从零到组件化的完整流程。

### 第一步：JavaScript 功能拆解 \pc{35--36}

- 将整体业务逻辑拆分为独立功能模块。
- 每个功能由一个或多个 JS 文件负责。
- 理清模块间的\kk{依赖关系}和调用顺序。
- 拆解使代码组织清晰，便于维护和复用。

### 第二步：静态资源打包 \pc{37}

- 使用构建工具（Webpack、Vite 等）对静态资源进行\kk{打包} \en{Bundle}。
- 目的：合并文件、压缩体积、语法转换 \en{Babel}、优化加载性能。
- 减少 HTTP 请求次数，提升页面加载速度。

### 第三步：模块化和组件化 \pc{38}

- \kk{模块化} \en{Modularization}：按功能划分代码，一个模块对应一个 JS 文件，关注代码组织和复用。
- \kk{组件化} \en{Componentization}：按视觉/交互单元划分，一个组件包含 HTML + CSS + JS，关注 UI 封装和复用。
- 两者结合使项目结构清晰、可维护性高、利于团队协作。

### 未来演进方向 \pc{39}

\subsubsection{架构方面}

- **MPA vs SPA**：多页应用 \en{MPA} 每个页面独立加载，SEO 友好；单页应用 \en{SPA} 用户体验流畅，但首屏加载慢。
- **SSR** \en{Server-Side Rendering}：SPA 首屏效率不高时，服务端渲染兼顾首屏速度和 SEO。

\subsubsection{技术方面}

- 渲染方法：从 **MVVM** \en{Model-View-ViewModel} 到\kk{双向绑定} \en{Two-way Data Binding}。
- **SPA 路由问题**：前端路由 \en{Hash / History API} 实现页面无刷新切换。
- **数据状态保持**：SPA 中跨组件的状态管理（Vuex/Redux 等）。

% ================================================================
%  8. 本章小结 (p.40)
% ================================================================
## 八、本章小结 \pc{40}

本章核心三部分：

- **异步请求**：Promise 对象\pc{6--15} + Fetch API\pc{23--25} + Axios 库\pc{28--29}。
- **前后对比**：Fetch（原生）与 Axios（第三方库）的优劣分析\pc{31--32}，async/await 语法糖\pc{18--21}。
- **项目工程化**：功能拆解 $\to$ 资源打包 $\to$ 模块化与组件化\pc{35--38}，未来向 SPA / SSR / MVVM 方向演进\pc{39}。

\columnbreak

% ================================================================
%  Quick Reference Box
% ================================================================

%

{ 速查表 --- 核心 API 一览
\footnotesize

| p{0.35\columnwidth}p{0.58\columnwidth}@{}}

  **API / 语法** | **说明** |
| --- | --- |
| \fn{new Promise(fn)} | 创建 Promise，fn 接收 resolve、reject |
| \fn{.then(onF, onR)} | 监听成功/失败，返回新 Promise 实现链式 |
| \fn{.catch(onR)} | 专门捕获错误 |
| \fn{.finally(fn)} | 无论成败都执行 |
| \fn{Promise.all([])} | 全部成功返回数组，一个失败即整体失败 |
| \fn{async function} | 声明异步函数，返回 Promise |
| \fn{await promise} | 阻塞等待 Promise 结果，仅用于 async 内 |
| \fn{fetch(url, opt)} | 原生 HTTP 请求，返回 Response（Promise） |
| \fn{axios.get(url)} | Axios GET 请求，自动 JSON 转换 |
| \fn{axios.post(u,d)} | Axios POST 请求 |

}

%

{ 状态转换图
| \fn{new Promise()} |
| --- |
| \downarrow |
| \fn{pending\ (进行中)} |
| \swarrow\qquad\searrow |
| \fn{resolve()}\qquad\fn{reject()} |
| \downarrow\qquad\qquad\downarrow |
| \fn{fulfilled}\qquad\fn{rejected} |
| \searrow\qquad\swarrow |
| \fn{resolved\ (已定型)} |
| \downarrow |
| \fn{.then() / .catch()\ 回调执行} |

}

%

{ Fetch vs Axios 决策速览
\footnotesize

| p{0.25\columnwidth}p{0.34\columnwidth}p{0.34\columnwidth}@{}}

  **特性** | **Fetch \pc{31**} | **Axios \pc{32**} |
| --- | --- | --- |
| 来源 | 原生 ES6 | 第三方库 |
| JSON 处理 | 手动 \fn{.json()} | 自动转换 |
| 错误处理 | 仅网络错误 reject | HTTP 错误自动 \fn{.catch} |
| 请求取消 | AbortController | CancelToken / AbortController |
| 拦截器 | 无 | 有（请求/响应） |
| 超时设置 | 无原生支持 | 内置 \fn{timeout} |
| 兼容性 | 不支持 IE | 更友好 |
| 体积 | 原生（0 依赖） | 需要额外引入 |

}

{\footnotesize 复习建议：结合教材 pp.12--14、pp.20--21、p.29 中的代码范例进行动手练习；理解状态转换机制和链式调用原理；能写出 fetch 和 axios 的基本请求代码。}

