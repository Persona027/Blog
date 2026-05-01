---
title: React
date: 2026-05-01
summary: React 核心复习笔记：JSX 语法、组件化开发、useState/useEffect Hooks、虚拟 DOM 与 Diff 算法、以及 MPA vs SPA 架构对比。
cover: /assets/covers/softwareDesign.jpg
category: 软件开发架构
---

> 来源：软件开发架构平台课程 CH11 | 考试复习笔记

## React 简介 (Introduction to React)

### React 的由来与背景 (Origin & Background)
- 2011 年，Facebook 工程师 **Jordan Walke** 创建 React，应对新闻动态页面日益复杂的挑战；2013 年正式开源。
  - 设计思路：Facebook 的新闻动态 (News Feed) 页面包含大量实时更新的 UI 组件（点赞、评论、分享），传统的 jQuery 式手动 DOM 操作导致代码中 DOM 操作与业务逻辑深度耦合，每次新增功能都需小心翼翼避免破坏现有代码。这种痛苦经历驱动了声明式 UI 框架的诞生，即让开发者只关心"UI 应该长什么样"，而非"如何一步步操作 DOM 达到目标状态"。
  - 设计目的：React 的创建初衷是从根源上解决大型前端应用中状态与 UI 同步的复杂性，将函数式编程的声明式思想引入前端视图层，使得 UI 代码可预测、可测试、可维护。
- 当时面临的核心问题：
  - 代码复杂度急剧上升：大量 DOM 操作与业务逻辑混杂在一起，难以维护。
    - 设计思路：在传统开发模式中，开发者需要手动查询 DOM 节点、手动更新节点内容、手动绑定事件——这些命令式操作分散在代码各处，形成所谓的"意大利面条代码"(Spaghetti Code)。React 的设计思路是将 UI 拆分为独立组件，每个组件的结构与行为封装在一起 (Encapsulation)，从而根治代码混杂问题。
    - 设计实现：通过 JSX 将 HTML 结构与 JavaScript 逻辑写在同一个文件中，组件的结构与行为内聚在同一个函数/类中，避免了传统开发中 HTML 文件、CSS 文件、JS 文件三地分离导致的认知负担和维护困难。
  - 数据同步困难：多个组件共享状态时，难以保持数据一致性。
    - 设计思路：当多个 UI 区域依赖同一份数据时，任何一个区域的数据变更都需要手动同步到其他所有依赖该数据的区域。React 通过单向数据流和状态提升 (Lifting State Up) 机制，确保数据只有一个源头 (Single Source of Truth)，从根本上消除数据不一致的风险。
    - 设计实现：状态存放在公共祖先组件中，通过 Props 向下单向传递；子组件通过回调函数向上通知数据变更，形成闭环的数据流循环。这种模式使得数据流动方向清晰可追踪，调试时只需沿着 Props 链向上追溯即可定位问题。
  - 性能问题：频繁的 DOM 更新导致页面卡顿。
    - 设计思路：浏览器中操作真实 DOM 的开销极大——每次修改 DOM 都可能触发浏览器的重排 (Reflow) 和重绘 (Repaint)，重排的计算成本随 DOM 树规模呈指数增长。React 的设计思路是在内存中维护一个轻量级的 DOM 副本（虚拟 DOM），通过批量计算最小变更集合后一次性更新真实 DOM，将多次 DOM 操作合并为一次。
    - 设计目的：虚拟 DOM 的设计目的不是"比直接操作 DOM 更快"（事实上单次操作虚拟 DOM 比直接操作真实 DOM 更慢，因为多了一层计算），而是通过减少真实 DOM 操作的次数和范围来提升整体性能，尤其适合频繁更新的复杂交互场景。

### React 的设计理念 (Design Philosophy)
- **Learn Once, Write Anywhere**（学习一次，随处编写）：同一套思想可用于 Web、移动端 (React Native)、桌面应用 (Electron + React) 等多种平台。
  - 设计思路：传统前端开发中，Web (HTML/CSS/JS)、iOS (Swift/ObjC)、Android (Kotlin/Java) 需要完全不同的技术栈和开发思维，团队难以复用知识和人力。React 的设计理念是将"组件化 + 声明式 UI = f(state)" 这一核心范式抽象为平台无关的编程模型，不同的渲染器 (Renderer) 负责将该模型映射到各平台的 UI 原语。
  - 设计实现：React 采用了渲染器可插拔的架构——react-dom 将虚拟 DOM 渲染为 Web DOM，react-native 将虚拟 DOM 渲染为 iOS/Android 原生控件，react-three-fiber 甚至将组件树渲染为 Three.js 的 3D 场景。核心的 Reconciler（协调器）与 Renderer（渲染器）分离，实现了"学一次，到处写"。
- **组件化思想** (Component-Based)：将复杂的 UI 拆分为独立的、可复用的组件。
  - 设计思路：借鉴了软件工程中"分而治之"(Divide and Conquer) 的经典策略——面对复杂系统时，将其拆解为高内聚、低耦合的模块。每个组件封装了自己的结构 (JSX)、样式 (CSS Modules / styled-components) 和行为 (Hooks / 事件处理)，对外暴露简洁的 Props 接口。
  - 设计目的：组件化不仅提升代码复用率（同一个 Button 组件可在全站使用），更重要的是降低了认知复杂度——开发者只需聚焦当前组件，无需同时关注整个页面。这在大型团队协作中尤为关键，不同开发者可并行开发不同组件而互不干扰。
- **状态驱动视图** (State-Driven UI)：UI 是状态的函数，状态变化自动更新视图。
  - 设计思路：这是 React 最核心的设计范式，用公式表达为 `UI = f(state)`。传统的命令式编程中，开发者需要维护一个复杂的"状态→DOM 操作"映射表，状态越多、映射越复杂。React 的设计思路是让开发者只定义 `f`（即组件函数），React 自动处理状态到视图的映射和更新。
  - 设计实现：当调用 setState / setXxx 时，React 触发 Reconciliation 流程——创建新的虚拟 DOM 树，与旧的虚拟 DOM 树进行 Diff，计算出最小变更集，最后批量更新真实 DOM。开发者只需关心 state 的值，无需关心 DOM 如何变化。
  - 设计目的：这种范式从根本上消除了 UI 开发中最常见的一类 Bug——视图与状态不同步。因为视图始终是状态的确定性产物，相同的状态总是渲染出相同的 UI（忽略副作用），使得 UI 行为可预测、可测试。
- 核心定位：专注于视图层 (View Layer)，提供声明式 (Declarative) 方式描述 UI，可与任意后端技术栈配合。
  - 设计思路：React 刻意保持职责单一——只做视图层，不越界处理路由、HTTP 请求、状态管理等职责。这是一种 Unix 哲学的设计选择："Do one thing and do it well"。相比于 Angular 等大而全的框架，React 选择做生态中的一块拼图，让开发者根据项目需求自由组合其他库。
  - 设计目的：这种定位使 React 具有极强的适应性和生命力——无论是传统的 REST API 后端、GraphQL 后端、还是 Serverless 架构，React 都可以无缝集成。技术栈的演进不会拖累视图层的重构。

### React 的主要功能特性 (Key Features)
- **声明式编程** (Declarative Programming)：描述 UI 在不同状态下的样子，React 自动处理 DOM 更新，避免手动 DOM 操作，代码更易理解。
  - 设计思路：声明式编程的核心是"说什么"而非"怎么做"。传统命令式开发中，要显示一个列表需要先创建容器元素、遍历数据、为每项创建子元素、追加到容器……声明式则只需 `data.map(item => <ListItem />)`。React 在内部封装了所有命令式操作。
  - 设计实现：JSX 是声明式编程的语法载体——开发者用类 HTML 的声明式语法描述 UI 结构，Babel 编译器将其转换为 `React.createElement` 调用链，生成虚拟 DOM 树对象。React DOM 再将虚拟 DOM 树渲染为真实 DOM。
  - 设计目的：声明式代码的读写比例通常为 1:10（写一次，读十次），因此优化可读性比优化编写速度更重要。声明式 UI 让代码具有自文档化 (Self-Documenting) 的特性——看 JSX 结构就能直观理解 UI 的组成。
- **组件化开发** (Component-Based Development)：将 UI 拆分为独立、可复用的组件，提高代码复用性，便于团队协作。
  - 设计思路：组件化的本质是封装 (Encapsulation) 与组合 (Composition)。封装意味着组件内部实现细节对外不可见，组合意味着可通过嵌套小组件构建复杂 UI。这是对面向对象编程中"组合优于继承"原则在前端领域的具体实践。
  - 设计目的：组件化使得代码组织方式与 UI 设计稿自然对应——设计师给出的设计稿中每个独立区域都可映射为一个组件，降低了设计与开发之间的沟通成本。同时，组件可独立测试、独立部署、独立迭代，支撑敏捷开发流程。
- **虚拟 DOM** (Virtual DOM)：高效的 DOM 更新策略，减少直接 DOM 操作，提升性能，避免频繁重排 (Reflow) 和重绘 (Repaint)。
  - 设计实现：虚拟 DOM 的本质是一个轻量级的 JavaScript 对象树，每个节点包含 type (标签/组件类型)、props (属性)、children (子节点) 三个核心字段。因为 JavaScript 对象的创建和对比速度远快于浏览器 DOM 操作（通常快 1000 倍以上），所以在 JS 层面计算差异再批量更新 DOM 是合理的性能优化策略。
  - 设计目的：虚拟 DOM 除了性能优化外，还有一个重要的架构价值——编程模型统一。无论底层渲染目标是 Web DOM、React Native 的原生控件还是 Canvas，上层的组件代码和 Diff 逻辑完全一致，只需替换不同的渲染器即可实现跨平台。
- **单向数据流** (Unidirectional Data Flow)：数据流向清晰可预测，易于调试和维护，避免数据混乱。
  - 设计思路：传统双向数据绑定 (Two-Way Binding)（如 AngularJS 1.x）虽然能减少模板代码，但当数据流错综复杂时，很难追踪某次数据变化是由哪个组件、哪个操作触发的，形成"数据变化的黑盒"。React 采用单向数据流——数据只能从父组件流向子组件，子组件不能直接修改父组件的数据。
  - 设计实现：父组件通过 Props 将数据传递给子组件；子组件通过回调函数 (Callback) 通知父组件需要变更数据，由父组件自行决定是否变更。这种设计强制形成了一个清晰的"数据拥有者"概念，每个 state 都有且只有一个组件对其负责。
  - 设计目的：单向数据流使得应用的数据流动可被形式化地追踪——状态变更总是从顶层组件向下传播，调试时只需沿组件树向下排查。这为 React DevTools 等调试工具提供了理论基础。
- **JSX 语法**：在 JavaScript 中编写类 HTML 结构，提升开发效率，增强代码可读性。
  - 设计思路：传统的前端开发中 HTML 和 JavaScript 在物理上是分离的（不同文件），但在逻辑上是耦合的（JS 需要操作 HTML 元素）。JSX 的设计思路是打破这种物理分离，让结构与逻辑在同一个文件中共存。这不是倒退到"内联 JS"的老路，而是认识到"UI 的结构与行为本质上是耦合的"，物理分离反而增加了认知负担。
  - 设计实现：JSX 本质是 `React.createElement(type, props, children)` 的语法糖。编译后的代码创建的是 JavaScript 对象（虚拟 DOM 节点），而非 HTML 字符串。这意味着 JSX 拥有 JavaScript 的完整表达能力（条件、循环、变量、函数调用），远超模板字符串的能力边界。

### 库与框架的区别 (Library vs. Framework)
- React 是**库 (Library)**，非框架 (Framework)：只负责 UI 的渲染和更新，不强制项目结构。
  - 设计思路：库与框架的核心区别在于控制权归属。库将控制权保留在开发者手中——开发者决定何时调用库的 API；框架将控制权掌握在自己手中——框架决定何时调用开发者的代码（控制反转, IoC）。React 选择了库的定位，只提供视图层渲染的核心能力，不约束项目结构、构建工具、数据层选型。
  - 设计目的：这种定位赋予开发者极大的灵活性——老旧项目可以渐进式引入 React（先在一个小模块试用），新项目可以根据团队技术偏好自由搭配技术栈（Next.js 或 Vite、Redux 或 Zustand、REST 或 GraphQL），不被框架锁定。
- 控制权对比：
  - 库：开发者调用库的 API；低约束，灵活使用；关注解决特定问题；易于替换和组合。
    - 设计思路：库的设计遵循"最小惊讶原则"——只做自己擅长的领域，其余交给用户。以 React 为例，它解决的是"如何根据状态渲染 UI"这一核心问题，至于路由、状态管理、数据获取等周边问题，React 主动退让，允许社区提供多样化方案。
  - 框架：框架控制执行流程；高约束，遵循约定；提供完整解决方案；难以替换核心模块。
    - 设计思路：框架的设计遵循"约定优于配置"(Convention over Configuration) 原则——通过预设的目录结构、命名规则、配置文件减少开发者的决策负担。这在大型企业级项目中体现为"统一规范"，减少团队内部的技术分歧，但代价是灵活性降低。
- React 无侵入性：可逐步引入现有项目，可与其他框架共存，不强制改变现有代码结构。
  - 设计实现：React 可以仅挂载到页面的某个特定 DOM 节点（如 `<div id="react-root">`），其余页面区域继续使用 jQuery、Vue 或其他框架。这种渐进式引入能力得益于 React 轻量级的架构——不劫持全局对象、不修改原生 API、不依赖特定的构建工具。
  - 设计目的：无侵入性降低了技术迁移的门槛。大型项目不可能一夜之间完成技术栈切换，必须支持逐步、局部的迁移策略。React 的这一特性使得其在企业级项目的技术升级中具有明显优势。
- 灵活技术选型：路由 (React Router、Next.js)、状态管理 (Context、Redux、Zustand、Jotai)、HTTP 请求 (axios、fetch、SWR、React Query) 均可自由选择。
  - 设计思路：React 生态遵循"一个核心 + 丰富周边"的模式——React 自身保持精简核心，周边库通过繁荣的竞争和迭代提供了多样化的解决方案。这种模式避免了 Angular 式"全家桶"带来的捆绑升级问题（Angular 版本升级时，路由、HTTP 模块必须同步升级）。
  - 设计目的：灵活选型权下放给团队，使团队能根据以下因素做出最佳选择：项目规模（小项目用 Context + fetch，大项目用 Redux + React Query）、团队经验（熟悉函数式编程的可选 Redux，偏好简洁 API 的可选 Zustand）、性能需求（SSR 用 Next.js，CSR 用 Vite）。
- 对比 Angular（框架）：强制使用 TypeScript、强制特定项目结构、内置路由/状态管理/HTTP 客户端、遵循严格设计模式和约定。
  - 设计思路：Angular 的设计哲学是"一个框架解决所有问题"——Google 团队预判了大型企业应用的全部需求，并将它们集成到一个统一框架中。这降低了架构决策成本（不用选型），但增加了学习曲线和迁移难度。

---

## JSX (JavaScript XML)

### 为什么需要 JSX？(Why JSX?)
- React 之前，前端主要采用两种方式构建 UI：手动 DOM 操作（命令式）或模板字符串拼接，可读性差、效率低下。
  - 设计思路：手动 DOM 操作 (`document.createElement` → `appendChild` → `setAttribute`) 的问题在于代码冗长且与 UI 实际结构之间没有直观对应关系，看代码无法快速脑补出页面结构。模板字符串拼接 (`'<div class="' + className + '">' + content + '</div>'`) 的问题在于缺乏语法高亮、无编译检查、XSS 风险高。JSX 的设计目标是让 UI 代码像 HTML 一样可读，同时保持 JavaScript 的完整能力。
  - 设计实现：JSX 既不是字符串也不是 HTML，它是 JavaScript 的语法扩展，经过编译后变成纯 JavaScript 函数调用。这意味着 JSX 天然拥有编译期检查能力——标签未闭合、属性名拼写错误等问题在编译阶段就能被发现，而非等到运行时。
- JSX 将 HTML 结构直接嵌入 JavaScript，兼顾可读性和开发效率，提供了一种更优雅的 UI 描述方式。
  - 设计思路：UI 组件天然具有结构与行为紧密耦合的特性——一个按钮既包含"看起来像按钮"的结构（边框、颜色、文字），也包含"行为像按钮"的逻辑（点击事件、防抖、加载状态）。将结构与行为强行分离（HTML 文件 + JS 文件）违反了高内聚原则。JSX 的设计思路是承认这种耦合，用内聚的方式组织代码。
  - 设计目的：更优雅的 UI 描述方式最终服务于开发效率——开发者可以在同一个上下文中看到组件的完整面貌，不需要在多个文件间切换，降低了认知负担。

### JSX 的定义与本质 (Definition & Essence)
- **JSX** (JavaScript XML)：JavaScript 的扩展语法，允许在 JavaScript 代码中编写类似 HTML 的结构。
  - 设计思路：选择类 HTML 语法而非其他描述方式（如 JSON 或纯函数调用链），是因为 HTML 是前端开发者最熟悉的结构化语言，学习成本接近零。同时 HTML 的标签嵌套结构天然适配组件的组合特性。
- 本质：JSX 不是浏览器原生支持的语法，会被 **Babel 编译器**转换为普通的 JavaScript 函数调用（`React.createElement`）。
  - 设计实现：编译过程发生在构建阶段(Build Time)，而非运行时。Babel 将 `<div className="app"><h1>Hello</h1></div>` 转换为 `React.createElement("div", { className: "app" }, React.createElement("h1", null, "Hello"))`。注意，新版的 React 17+ 引入了新的 JSX 转换 (`react/jsx-runtime`)，不再直接依赖 `React.createElement`，而是使用 `_jsx` 和 `_jsxs` 函数，这使得无需在每个文件中手动 `import React`。
  - 设计目的：编译时转换为函数调用的设计，使得 JSX 在运行时没有任何额外开销——它本质上就是 JavaScript 对象创建。这也意味着任何能运行 JavaScript 的环境都能处理 JSX（只需编译支持），不依赖浏览器特性。
- 编程范式对比：
  - **命令式编程** (Imperative)：告诉计算机"怎么做"，详细描述执行步骤。
    - 设计对比：命令式风格适合计算机理解（精确、无歧义），但开发者需要手动管理所有中间状态和边界条件。在 UI 开发中，命令式代码量随 UI 复杂度呈线性甚至指数增长。
  - **声明式编程** (Declarative)：告诉计算机"做什么"，描述目标状态。
    - 设计对比：声明式风格适合人类理解（直观、简洁），将底层执行细节委托给框架。React 通过声明式 JSX + 虚拟 DOM 自动完成状态到视图的映射，开发者无需关心中间过程。

### JSX 核心语法规则 (Core Syntax Rules)
- **必须有根元素包裹**：一个 JSX 表达式只能返回一个根元素，这是 React 的设计约束，便于统一处理。
  - 设计思路：JavaScript 函数只能返回一个值，`React.createElement` 也是如此——它创建的是一个虚拟 DOM 节点，只能有一个根。这一约束源于 React 内部的数据结构设计（虚拟 DOM 树是单根树），而非任意的语法限制。
  - 设计实现：当确实需要返回多个并列元素时，可使用 `<React.Fragment>` 或短语法 `<>...</>` 作为不可见的包裹容器。Fragment 不会在真实 DOM 中生成额外节点，避免产生无意义的 `<div>` 嵌套，保持 DOM 树的扁平化。
  - 设计目的：单根约束简化了 React 内部的 Reconciliation 算法——每个组件对应虚拟 DOM 树中的一个确定节点，组件树的 Diff 操作可以递归进行，无需处理多根节点的复杂组合情况。
- **标签必须闭合**：自闭合标签使用 `/>`，避免 HTML 语法错误。
  - 设计实现：这是 JSX 与原生 HTML 之间的一个重要差异。HTML 允许某些标签（如 `<input>`、`<br>`、`<img>`）省略闭合标签，但 JSX 基于 XML 语法规范，要求所有标签必须显式闭合。这种严格性减少了歧义，提高了编译器的解析效率。
- **使用 className 替代 class**：`class` 是 JavaScript 关键字，避免语法冲突。
  - 设计思路：JSX 运行在 JavaScript 的语法环境中，任何与 JS 关键字冲突的 HTML 属性名都需要重命名。这是语言层面的兼容性设计，而非 React 的任意规定。
- **使用 htmlFor 替代 for**：`for` 是 JavaScript 关键字，避免语法冲突。
  - 设计思路：与 className 同理，`for` 在 JavaScript 中是循环语句的关键字。React 使用 `htmlFor` 作为替代，保持了语义的直观性（for → htmlFor，即"给 HTML 元素的 for 属性"）。
- **大括号 {} 内写表达式**：`{}` 内可以写任意 JavaScript 表达式，实现动态内容渲染。
  - 设计实现：JSX 中的大括号是一种上下文切换机制——大括号外是 HTML 模板区域，大括号内是 JavaScript 表达式区域，两个区域无缝衔接。这种设计使得开发者可以在 UI 结构中自然地嵌入逻辑（条件渲染、列表渲染、变量引用），无需学习额外的模板指令语法（如 Vue 的 `v-if`、`v-for`），降低学习成本。

### JSX 的编译过程 (Compilation Process)
- 编译流程：JSX 源代码 → Babel 编译 → `React.createElement(type, props, ...children)` 调用 → 返回虚拟 DOM 对象 (JavaScript Object)。
  - 设计实现：这个编译流程的核心思想是"用 JavaScript 表达能力弥补 HTML 的描述局限性"。HTML 本质是静态的声明式语言，缺乏条件判断、循环、变量引用等编程能力；而 JavaScript 的 `createElement` 函数调用天然支持所有编程构造。JSX 在语法层面提供了 HTML 的直观性，在运行时层面继承了 JavaScript 的表达力。
  - 设计目的：编译后生成的是纯 JavaScript 数据对象，这意味着虚拟 DOM 不依赖任何浏览器 API——它可以运行在 Node.js 后端（SSR 服务端渲染）、Web Worker（后台渲染）、甚至测试环境（jsdom 模拟）中，实现真正的同构 (Isomorphic) 应用。
- 本质：JSX 是 `React.createElement` 的语法糖 (Syntactic Sugar)。
  - 设计思路：语法糖的价值在于"在不改变底层能力的前提下，让表达更人性化"。对比 `React.createElement('div', {className: 'app'}, React.createElement('h1', null, 'Hello'))` 和 `<div className="app"><h1>Hello</h1></div>`，后者更直观地反映了 UI 的层级结构。

---

## 组件化开发 (Component-Based Development)

### 组件化的基本概念 (Core Concepts)
- 将复杂的 UI 界面拆分为独立的、可复用的组件，每个组件负责自己的逻辑和样式。
  - 设计思路：组件化的设计灵感来源于多个软件工程原则——单一职责原则 (SRP) 要求每个模块只负责一个功能；关注点分离 (Separation of Concerns) 要求将不同关注点分散到不同模块中；封装 (Encapsulation) 要求模块内部实现对外不可见。将 UI 拆分为组件正是这些原则在前端领域的具体实践。
  - 设计实现：在 React 中，一个组件就是返回 JSX 的 JavaScript 函数。函数内部使用 Hooks 管理状态和副作用，使用 Props 接收外部数据，使用 JSX 描述 UI 结构。这种组织方式使得每个组件都是一个自包含的功能单元。
- 组件化的优势：
  - **高复用性**：一次编写，多处使用。
    - 设计实现：复用性依赖于组件接口的通用性设计——通过 Props 参数化组件的可变部分（内容、样式、行为），将不变部分封装在组件内部。例如 Button 组件通过 `variant`、`size`、`disabled` 等 Props 适应不同场景，而非为每种按钮样式写一个组件。
  - **低耦合**：组件之间相互独立，便于维护。
    - 设计思路：低耦合通过单向数据流和 Props 接口实现——组件间只通过 Props 接口通信，不直接访问彼此的内部状态。当一个组件的内部实现改变时，只要对外暴露的 Props 接口不变，使用该组件的父组件无需任何修改。
  - **易测试**：组件可以独立进行单元测试。
    - 设计目的：传统前端测试困难的一大原因是一个页面包含大量相互纠缠的 UI 逻辑，无法隔离测试。组件化将问题拆分为"每个组件给定特定Props和State，应输出特定的JSX结构"，适合编写自动化单元测试和快照测试 (Snapshot Testing)，保障代码质量。
  - **可维护性**：代码结构清晰，易于定位问题。
    - 设计目的：当应用出 Bug 时，可维护性体现在"快速定位"能力——开发者根据 Bug 现象确定问题所在的 UI 区域，直接查看对应的组件文件，无需在海量代码中搜索。
  - **团队协作**：不同开发者可以负责不同组件的开发。
    - 设计目的：团队协作的基础是解耦——不同开发者开发的组件通过约定的 Props 接口协作，无需了解彼此的代码实现。这使得多人并行开发、代码评审、功能迭代都能高效进行，避免了传统开发中多人修改同一文件导致的频繁冲突。

### 函数组件 (Function Components)
- 函数组件是定义组件的主要方式：使用 JavaScript 函数返回 JSX。
  - 设计思路：React 组件经历了从类组件到函数组件的范式迁移。函数组件的设计哲学是"组件是状态的函数"——`function Component(props) => JSX`，这与 React 的核心公式 `UI = f(state)` 完全吻合。相比之下，类组件的 `this.state`、`this.props`、生命周期方法属于面向对象范式，与 React 的函数式本质有认知摩擦。
  - 设计实现：Hooks（useState、useEffect 等）的出现使函数组件获得了类组件才有的状态管理和生命周期能力，消除了函数组件相比类组件的功能差距。2020 年 React 16.8 引入 Hooks 后，函数组件正式成为 React 官方推荐的首选方式。
  - 设计目的：函数组件相比类组件具有多项优势——代码量更少（无 constructor、render、this 绑定）；更容易被 JavaScript 引擎优化（函数调用 vs 类实例化）；更容易提取和复用逻辑（自定义 Hooks vs HOC/Render Props）；更符合 React 未来的 Concurrent Mode 和 Suspense 架构方向。
- 组件命名规范：
  - 必须以**大写字母开头**，区分组件和普通 HTML 标签。
    - 设计实现：JSX 编译时，Babel 通过首字母大小写判断一个标签是 HTML 原生元素还是自定义组件——小写开头编译为字符串形式 `createElement("div")`，大写开头编译为变量引用 `createElement(MyComponent)`。这是 JSX 解析规则的内在要求，不是编码风格建议。
  - 使用 **PascalCase**（大驼峰命名法）。
    - 设计目的：统一的命名规范降低团队沟通成本，新成员看到 `MyComponent` 就知道这是一个 React 组件，看到 `myFunction` 就知道这是普通工具函数。PascalCase 与 JavaScript 社区约定（类名用 PascalCase）保持一致。
  - 文件名与组件名一致，便于查找和维护。
    - 设计目的：文件命名的一致性直接影响开发效率——IDE 的文件搜索功能可以直接通过组件名定位文件，无需记忆额外的映射规则。这在大型项目中尤为关键。

### Props —— 组件间数据传递 (Props: Data Transfer)
- **Props** (Properties 的缩写)：组件间传递数据的方式，从父组件流向子组件。
  - 设计思路：Props 的设计借鉴了函数参数的思想——组件就是函数，Props 就是函数的参数，JSX 返回值就是函数的输出。`function Welcome(props) { return <h1>Hello, {props.name}</h1>; }` 本质上等价于 `function(name) => "<h1>Hello, " + name + "</h1>"`。这种一致性使得有函数式编程经验的开发者能快速理解 React 的组件模型。
  - 设计实现：Props 在 JSX 中以类 HTML 属性的语法传递——`<Welcome name="Sara" />`。React 在内部将所有属性收集到一个 JavaScript 对象中，作为组件函数的第一个参数传入。这种设计的巧妙之处在于它模拟了 HTML 的属性传递模式，降低了前端开发者的学习成本。
- Props 的核心特性：
  - **只读性** (Read-Only)：子组件不能修改 props，保证数据流向的单向性。
    - 设计思路：这是纯函数 (Pure Function) 概念在组件层面的应用——纯函数不修改输入参数，只返回新的输出。子组件对 Props 的只读约束确保了数据流的方向可预测：没有任何子组件能够"偷偷"修改父组件的数据，数据变更的唯一途径是父组件自行调用 setState。
    - 设计目的：只读性保证了对数据变更的可审计性 (Auditability)——当出现数据异常时，开发者只需在数据的所有者组件中排查 setState 的调用点，不需要在所有子组件中搜索可能的修改。
  - **单向传递** (Unidirectional)：只能从父组件传递到子组件，简化数据流追踪。
    - 设计实现：React 的数据流是严格单向的：State → Props → 子组件。这形成了一个有向无环图 (DAG)，数据从顶层组件逐层向下流动。与双向绑定相比，单向流消除了"修改来源不确定"的调试难题——数据变化只能来自一个方向。
    - 设计目的：单向数据流使得 React DevTools 可以可视化整个组件树的数据流动，支持时间旅行调试 (Time-Travel Debugging)，为高效的开发调试提供了基础。
  - **类型检查** (Type Checking)：可使用 PropTypes 或 TypeScript，提高代码健壮性。
    - 设计实现：PropTypes 是 React 内置的运行时类型检查机制，在组件 Props 接收时进行类型校验，若类型不匹配则在控制台输出警告。TypeScript 更进一步，在编译时就能发现类型错误，提供更强的类型安全保障和 IDE 智能提示。
  - **默认值** (Default Values)：可设置默认属性值，增强代码健壮性。
    - 设计思路：默认值设计遵循"防御性编程"原则——即使父组件未传递某个可选 Props，子组件也能正常工作而不崩溃。这通过 JavaScript 函数参数的默认值语法 (`function Comp({ name = "Guest" })`) 实现，简洁而优雅。
- **子传父**：子组件通过回调函数 (Callback Function) 向父组件传递数据。
  - 设计思路：子传父是 React 单向数据流闭环的关键环节。如果数据只能从上到下流动，子组件永远无法将用户交互的结果传递回父组件。回调函数机制解决了这个问题——父组件将自身的函数作为 Props 传给子组件，子组件在适当时机调用该函数，将数据作为参数"反向"传递。
  - 设计实现：这是一个"数据向下，事件向上"的模式——`<Child onUserAction={(data) => setParentState(data)} />`。子组件调用 `props.onUserAction(newData)` 时，实际上是在执行父组件定义的回调逻辑。从数据流角度看，真正的状态修改仍然发生在父组件内部（父组件拥有 setState 的调用权），数据流方向并未被破坏。

---

## 状态管理 —— useState (State Management)

### 为什么需要状态管理？(Why State Management?)
- 组件中存在动态变化的数据：用户输入的表单数据、购物车商品数量、按钮点击次数等。
  - 设计思路：静态 UI 只需 Props 即可描述（所有内容由父组件传入）。但真实的 Web 应用充满了交互——点击、输入、拖拽、异步请求回调等，这些交互产生的数据变化需要被"记住"并驱动 UI 更新。State 就是为了满足这一需求而设计的"组件内存"。
- 使用普通变量存储这些数据，数据变化**不会触发组件重新渲染**，UI 无法自动更新。
  - 设计实现：这是 React 响应式机制的核心原理。React 的组件渲染是由 setState 触发的——当 setState 被调用时，React 标记该组件为"需要更新"，并在合适的时机重新执行组件函数。普通变量赋值 (`let count = 1; count = 2;`) 不会触发任何 React 内部通知机制，React 不知道数据已经变化，自然不会重渲染。这解释了为什么必须使用 useState 而非普通变量的根本原因。
  - 设计目的：这种"显式触发更新"的设计避免了性能问题。如果每个变量赋值都触发重渲染，应用性能将无法控制。React 选择让开发者显式声明"这个数据变化需要更新 UI"（通过调用 setState），这是一种"白名单"式的性能优化策略。

### useState Hook
- **State** 是一种特殊的数据存储机制，当 State 变化时 React 会自动重新渲染组件（响应式, Reactive）。
  - 设计实现：useState 内部利用了 React 的 Fiber 架构——每个组件实例在 Fiber 节点上有一个 Hooks 链表，useState 根据调用顺序将状态值存储在对应位置。这就是"Hooks 不能在条件语句中使用"的底层原因——React 依赖于 Hooks 的稳定调用顺序来维护状态与 Fiber 节点的对应关系。如果某次渲染跳过了某个 Hook 调用，后续 Hook 的索引就会错位，导致状态映射到错误的变量。
  - 设计目的：响应式 (Reactive) 设计的核心价值在于自动化——开发者修改数据后无需手动调用 DOM API 更新 UI，React 自动完成数据到视图的同步。这消除了传统前端开发中最常见的一类 Bug：忘记更新 UI 或更新了错误的 UI 区域。
- State 的核心特性：
  - State 是**组件内部的可变数据**（组件私有，外部无法直接访问），用于存储组件的动态信息。
    - 设计目的：State 的私有性体现了封装原则——其他组件不需要知道某个组件内部如何管理其状态，只需通过 Props 接口与它交互。这种设计降低了组件间的耦合，使得内部实现可以随时重构而不影响外部使用方。
  - State **不可直接修改**，必须通过 setState 函数更新（Hook 机制）。
    - 设计思路：这是不可变更新 (Immutable Update) 原则的体现。直接修改 State (`state.count = 1`) 不会触发重渲染的根本原因在于 React 使用 `Object.is()` 进行新旧状态比较——如果直接 mutate 对象，新旧引用指向同一个对象，React 无法感知变化。`setState(newValue)` 则创建了新的引用，React 能准确判断状态已变化。
    - 设计实现：对于对象和数组类型的 State，更新时必须创建新副本——`setUser({ ...user, name: 'new' })` 而非 `user.name = 'new'`。这保证了 React 的 Diff 算法能正确识别状态变化，也是 React 应用数据一致性的基础保障。
  - 一个组件中若有多个 State，React 会**批量更新** (Batched Update)，以提高性能（异步更新, Asynchronous Update）。
    - 设计思路：假设一个事件处理函数中连续三次调用 setState，如果每次调用都立即触发重渲染，将导致三次不必要的渲染周期，即使这三次更新在逻辑上应该合并为一次。React 的批量更新机制将同一事件循环中的多次 setState 合并为一次更新，只触发一次渲染。
    - 设计实现：React 18 之后，所有 setState 调用都默认批量处理（包括 setTimeout、Promise 回调中的调用）。React 内部维护一个更新队列，在一次事件循环中收集所有 setState 调用，然后在微任务 (Microtask) 中统一处理，计算出新的 State 并触发一次渲染。
- 基本语法：`const [state, setState] = useState(initialValue);`
  - 设计思路：`useState` 返回一个数组而非对象，是为了支持数组解构的灵活命名——开发者可以自由命名 `[count, setCount]`、`[name, setName]` 等，而非被固定的对象属性名约束。这是 React API 设计中"面向开发者体验"的一个典型体现。
- 参数说明：
  - `initialValue`：初始值，可以是任意类型（数字、字符串、对象、数组等）。
    - 设计实现：如果初始值需要通过复杂计算获得，可使用惰性初始化——`useState(() => computeExpensiveInitialValue())`。传递函数而非函数调用结果，React 仅在首次渲染时调用该函数，后续渲染时直接忽略初始值参数，避免不必要的重复计算。
  - `state`：当前状态值。
    - 设计对比：与类组件 `this.state` 将多个状态聚合在一个对象中不同，函数组件的 useState 建议将无关的状态拆分为多个独立 State。这样做的好处是更新粒度更细——修改某个状态时不会影响其他状态，有助于性能优化和代码清晰度。
  - `setState`：更新状态的 Hook 函数。
    - 设计实现：`setState` 支持两种调用方式——直接传新值 `setState(newValue)`，或者传更新函数 `setState(prev => prev + 1)`。第二种方式确保获取的是最新的前值，适用于连续多次更新的场景。
- **异步更新注意事项**：连续多次调用 setState 可能不会立即反映最新值，应使用函数式更新 `setState(prev => prev + 1)` 获取前一次状态。
  - 设计思路：这是 React 批量更新机制的直接后果。在同一事件处理函数中连续调用 `setCount(count + 1)` 三次，最终的 count 只增加 1，因为每次调用时 `count` 的值都是闭包中捕获的旧值（还未更新）。函数式更新 `setCount(prev => prev + 1)` 解决这个问题，因为 `prev` 始终是 React 内部维护的最新值。
  - 设计目的：函数式更新机制确保了在批量更新场景下的数据正确性，避免因闭包陈旧值 (Stale Closure) 导致的逻辑错误。这是 React 面试和实际开发中的高频问题。

---

## 副作用处理 —— useEffect (Side Effects)

### 什么是副作用？(What are Side Effects?)
- **useEffect**（副作用 Hook 函数）：处理与组件渲染无关的操作，通过 Hook 实现。
  - 设计思路：React 组件的主体函数应该是纯函数 (Pure Function)——给定相同的 Props 和 State，总是渲染相同的 JSX。但真实应用离不开副作用——网络请求、本地存储读写、订阅/取消订阅等"不纯粹"的操作。useEffect 的设计目的是将这些副作用从组件主逻辑中分离，放入专门的副作用处理通道中执行。
  - 设计实现：useEffect 的运行时机在组件渲染完成之后（浏览器绘制屏幕之后），这确保副作用不会阻塞 UI 的首次呈现。用户首先看到页面内容（即使数据还未加载），然后副作用异步执行后才更新数据，这种"先渲染再取数据"的模式提升了用户感知性能。
  - 设计目的：将副作用与渲染逻辑分离有多个好处——渲染逻辑保持纯粹可测试（不依赖外部 API 调用），副作用可统一管理执行时机（挂载、更新、卸载），清理逻辑与设置逻辑放置在同一位置（返回的清理函数）。
- 常见副作用操作：
  - **数据获取** (Data Fetching)：调用 API 获取数据。
    - 设计实现：数据获取是 useEffect 中最常见的场景。通过在 useEffect 中发起异步请求，在请求完成后调用 setState 存储数据，React 自动触发重渲染展示新数据。这一模式实现了"声明式数据获取"——开发者声明"这个组件需要这些数据"，而无需关心数据获取的具体时机和过程。
  - **订阅事件** (Event Subscription)：WebSocket 订阅、事件监听。
    - 设计实现：订阅类副作用的特点是"设置-清理配对"——添加事件监听后必须在合适的时机移除，否则会导致内存泄漏和重复监听。useEffect 的返回函数机制天然适配这种场景：在 effect 中 `addEventListener`，在返回的清理函数中 `removeEventListener`。
  - **DOM 操作** (DOM Manipulation)：修改 document title、操作 DOM 元素。
    - 设计目的：某些 DOM 操作不能通过 JSX 声明式完成（如修改 document.title、管理焦点、滚动位置控制），useEffect 提供了这些命令式操作的"避难所"，使其仍处于 React 的控制范围内。
  - **定时器** (Timers)：setTimeout、setInterval。
    - 设计实现：定时器需要清理机制（clearTimeout / clearInterval）以防止组件卸载后定时器仍在运行，造成内存泄漏和潜在的 setState 调用在已卸载组件上的警告。useEffect 的返回值 (Cleanup Function) 是实现这一清理的标准方式。
  - **日志记录** (Logging)：发送分析数据到服务器。
    - 设计目的：日志、分析埋点等非核心功能通过 useEffect 实现，不侵入组件的主渲染逻辑，保持代码关注点的清晰分离。

### useEffect 依赖数组与执行时机 (Dependency Array & Execution Timing)
- **空数组 [ ]**：仅在组件挂载 (Mount) 时执行一次。适用场景：初始化操作、一次性数据获取。
  - 设计实现：空依赖数组表示"effect 不依赖于任何变量，所以永远不会需要重新执行"。React 在组件首次挂载后执行该 effect，后续重渲染时跳过它。这模拟了类组件中 `componentDidMount` 的行为。
  - 设计目的：将初始化操作集中在 useEffect 中而非组件函数体中，避免了在每次渲染时重复执行初始化代码的问题。组件函数体中的代码每次渲染都执行，useEffect 只在指定时机执行。
- **有依赖 [dep]**：挂载时执行，且每次依赖数据变化时重新执行。适用场景：依赖特定数据的操作。
  - 设计实现：React 使用 `Object.is()` 比较依赖数组中的每个值——如果所有依赖值都与上次渲染时相同，则跳过 effect；如果任何一个依赖值不同，则重新执行 effect（先执行上一次的清理函数，再执行新的 effect）。这种依赖追踪机制将"数据变化→副作用执行"的映射自动化，开发者只需声明依赖关系。
- **不写依赖数组**：每次组件渲染 (Render) 时都执行。适用场景：需要同步更新的操作。
  - 设计思路：不写依赖数组意味着"effect 无条件执行"，这在大多数场景下是不需要甚至有害的（导致无限循环），但在某些特殊场景（如需要每次渲染后同步读取 DOM 信息）下有其用途。不写依赖数组应谨慎使用，通常应优先指定明确的依赖数组。

### useEffect 清理函数 (Cleanup Function)
- useEffect 中可以返回一个函数，在组件卸载 (Unmount) 时或下次 effect 执行前调用。
  - 设计思路：清理函数的设计源自"资源生命周期管理"——任何资源的创建（订阅、定时器、网络请求）都应该有对应的销毁操作。useEffect 将创建和销毁放在同一个地方（effect 函数体中创建，返回值函数中销毁），保证了资源生命周期的完整性管理。
  - 设计实现：清理函数的调用时机分为两种情况——(1) 组件卸载时：清理函数在组件从 DOM 中移除前被调用；(2) 依赖变化导致 effect 重新执行时：先调用上一次 effect 的清理函数，再执行新的 effect。React 严格按照"先清理旧副作用，再执行新副作用"的顺序执行，确保同一时刻只有一个副作用实例在运行。
- 用于清除定时器、取消订阅、清理事件监听等资源释放操作。
  - 设计目的：资源清理是前端开发中容易被忽视但后果严重的问题。未清理的定时器可能持续消耗 CPU、未取消的订阅可能导致内存泄漏 (Memory Leak)、未移除的事件监听可能引发意外 Bug。useEffect 的清理机制将资源管理标准化，降低了因遗漏清理导致的线上问题。

### useState 与 useEffect 对比
- **useState**：管理状态数据，存储和更新组件内部的数据。
  - 设计定位：useState 负责回答"组件的数据是什么"——它是组件的记忆，是数据存储层。
- **useEffect**：处理副作用，执行与渲染无关的操作，管理副作用的执行时机。
  - 设计定位：useEffect 负责回答"组件渲染后要做什么"——它是组件的行为编排，是行为层。
  - 设计对比：useState 和 useEffect 共同构成了函数组件的完整能力——useState 管理"数据"，useEffect 管理"行为"，两者协作形成了"数据变化→渲染更新→副作用执行"的完整响应链。

---

## 虚拟 DOM (Virtual DOM)

### 虚拟 DOM 简介 (Introduction)
- **虚拟 DOM** (Virtual DOM)：真实 DOM 的 JavaScript 对象表示形式，即内存中的另一个 DOM 树对象。
  - 设计实现：虚拟 DOM 节点的核心数据结构是一个普通的 JavaScript 对象，主要包含以下字段：`type`（节点类型，如 `'div'`、`MyComponent`）、`props`（属性集合，包括 children）、`key`（用于列表优化的唯一标识）、`ref`（真实 DOM 引用）。因为它是普通的 JS 对象，创建 1000 个虚拟节点的成本远低于创建 1000 个真实 DOM 元素。
  - 设计目的：虚拟 DOM 的设计目的不是"比直接操作 DOM 更快"（实际上多了一层计算开销），而是让开发者不必关心 DOM 操作的细节（声明式的价值），同时通过最小化真实 DOM 操作的策略来保证性能可接受。其本质是用空间换时间——用额外的内存存储虚拟 DOM 树，换取批量更新带来的性能收益。
- 为什么需要虚拟 DOM：直接操作真实 DOM 是非常昂贵的操作，每次 DOM 操作都会触发浏览器的重排 (Reflow) 和重绘 (Repaint)，这是性能瓶颈的主要来源。
  - 设计思路：浏览器的渲染管线 (Rendering Pipeline) 包括多个阶段——Layout（计算元素的几何位置）、Paint（绘制像素到图层）、Composite（合并图层到屏幕）。修改 DOM 可能触发 Layout（重排），重排又会触发后续的 Paint 和 Composite，整个流程的开销很高。虚拟 DOM 的策略是将多次 DOM 修改合并为一次，将 Layout 和 Paint 的次数降到最低。
  - 设计目的：虚拟 DOM 为"性能优化"和"开发体验"提供了统一的解决方案——开发者不需要手动调用 `requestAnimationFrame`、使用 DocumentFragment 或手动批量操作来优化性能，React 的虚拟 DOM 机制自动完成了这些优化。这使得性能优化从"开发者手动操作"变为"框架自动保障"。

### 虚拟 DOM 工作原理 (Working Principle)
- **首次渲染** (Initial Render)：React 根据 JSX 创建虚拟 DOM 树，然后将其渲染为真实 DOM。
  - 设计实现：首次渲染时没有旧的虚拟 DOM 树可供对比，React 直接遍历整个虚拟 DOM 树，为每个节点调用 `document.createElement`、`setAttribute`、`appendChild` 等原生 API，一次性构建完整的真实 DOM 树并插入页面。这个过程称为 Commit 阶段 (Commit Phase)。
- **状态更新** (State Update)：当组件状态变化时，React 创建一个**新的虚拟 DOM 树**。
  - 设计思路：状态更新触发的第一步不是修改真实 DOM，而是重新执行组件函数生成新的虚拟 DOM 树。这意味着组件的每次渲染都是"从头开始"的——组件函数完全重新执行，生成全新的虚拟 DOM 描述，而非基于上一次的虚拟 DOM 进行增量修改。这种"每次从头开始"的设计简化了组件逻辑（不需要处理增量更新的边界情况），性能优化则交给后续的 Diff 算法处理。
- **Diff 算法** (Diff Algorithm)：React 使用高效的 Diff 算法对比新旧虚拟 DOM 树的差异。
  - 设计实现：Diff 算法在 React 内部称为 Reconciliation（协调）。它采用深度优先遍历 (DFS) 的方式对比两棵虚拟 DOM 树，在遍历过程中标记需要更新的节点（Placement、Update、Deletion），生成一个 Effect List（更新清单）。这个过程中 React 可能会决定跳过某些不需要更新的子树（shouldComponentUpdate 或 React.memo 优化）。
- **批量更新** (Batched Update)：React 计算出最小的 DOM 更新操作，然后批量应用到真实 DOM 上。
  - 设计实现：Diff 结束后，React 进入 Commit 阶段——按照 Effect List 的记录，一次性对真实 DOM 执行所有变更操作。这些操作在浏览器的一个渲染帧内完成，浏览器只需要执行一次 Layout 和 Paint，从而避免了多次操作导致的性能抖动。

### Diff 算法核心策略 (Core Diff Strategies)
- **同层比较** (Same-Level Comparison)：只比较同一层级的节点，不跨层级比较，时间复杂度从 O(n^3) 降至 O(n)。
  - 设计思路：将虚拟 DOM 树当作一棵树进行 Diff 的通用算法时间复杂度是 O(n^3)（n 为节点数），这在每次状态变化时都执行将导致严重性能问题。React 引入了启发式假设——Web 应用中 UI 节点的跨层级移动非常罕见（绝大多数操作是同一层级的增删改），因此只做同层比较，将复杂度优化到 O(n)。
  - 设计目的：这是一个"用通用性换取性能"的设计决策。虽然某些极端场景下跨层级移动节点的场景 Diff 结果不是最优（会销毁重建而非移动），但这类场景在实际应用中极少发生，因而不值得为之牺牲性能。开发者如果确实需要跨层级移动，应通过明确的代码设计重新组织组件结构。
- **类型不同则替换** (Type Mismatch → Replace)：新旧节点类型不同时，直接替换整个子树，不再递归比较子节点。
  - 设计思路：如果旧节点是 `<div>`，新节点是 `<span>`，那么旧节点下的所有子节点即使内容完全相同也会被全部销毁并重新创建。这是因为节点类型的改变通常意味着结构的根本性变化，继续递归比较子节点很可能产生大量无意义的差异，不如直接全量替换更高效。
  - 设计目的：这种策略减少了不必要的递归遍历开销，也反映了 UI 开发中的实际情况——一个 `<div>` 变成 `<span>` 往往不是因为开发者想复用旧的 `<div>`，而是想用不同的语义元素。
- **key 属性优化** (Key Optimization)：通过 key 属性唯一标识列表中的每个元素，使 Diff 算法能精确识别元素的增删和移动，避免不必要的重建。
  - 设计实现：在没有 key 的情况下，React 按列表顺序进行 Diff——如果列表头部插入一个元素，React 会误认为所有元素都变了（第一个原元素变成新元素，第二个变成原第一个……），导致整个列表被销毁重建。有了唯一的 key 后，React 能识别出"旧的 key='a' 在、新的 key='a' 也在，只是位置变了"，从而进行高效的移动而非销毁重建。
  - 设计目的：key 属性的正确使用对列表渲染性能至关重要。最佳实践是使用后端返回的唯一 ID 作为 key，而非数组索引——因为数组索引在元素增删时不稳定，失去了唯一标识的意义，可能导致不必要的 DOM 重建和状态丢失。

---

## 组件生命周期 (Component Lifecycle)

### 类组件生命周期 (Class Component Lifecycle)
- **挂载阶段** (Mounting)：constructor() → render() → componentDidMount()
  - 设计实现：constructor 用于初始化 state 和绑定方法；render 返回 JSX（必须是纯函数，不能包含副作用）；componentDidMount 在组件挂载到真实 DOM 后调用，是发起网络请求、添加事件监听的最佳时机。这三个阶段严格按顺序执行，保证组件在开始执行副作用之前已经完成 DOM 挂载。
- **更新阶段** (Updating)：render() → componentDidUpdate(prevProps, prevState)
  - 设计思路：componentDidUpdate 提供了对比新旧 Props/State 的能力——通过参数 `prevProps` 和 `prevState` 可以判断具体是哪个数据变化触发了更新，从而有条件地执行副作用（如仅在特定 Props 变化时重新请求数据），避免不必要的操作。
- **卸载阶段** (Unmounting)：componentWillUnmount() —— 用于清理定时器、取消订阅等。
  - 设计思路：类组件生命周期中，资源清理必须在 componentWillUnmount 中手动实现。开发者需要在 componentDidMount 中创建资源（如定时器），在 componentWillUnmount 中清理，这两个步骤分散在不同的生命周期方法中，容易遗漏。

### 函数组件中的生命周期 (Lifecycle in Function Components)
- **componentDidMount** ↔ useEffect 空依赖数组 [ ]：仅在挂载时执行。
  - 设计对比：与类组件相比，useEffect 将"挂载后执行"和"卸载前清理"放在同一个函数中（effect 函数 + 返回的清理函数），资源创建和销毁代码空间上是聚合的，逻辑上是成对出现的，降低了遗漏清理的风险。
- **componentDidUpdate** ↔ useEffect 有依赖 [dep]：依赖变化时执行。
  - 设计对比：useEffect 通过依赖数组声明"哪些变量变化时需要重新执行"，声明式地管理更新触发条件。而类组件的 componentDidUpdate 中需要通过 if 判断 `prevProps.xxx !== this.props.xxx`，代码冗余且易遗漏条件判断。
- **componentWillUnmount** ↔ useEffect 返回的清理函数 (Cleanup Function)：组件卸载前执行。
  - 设计目的：将清理逻辑放在 effect 的返回函数中，使得创建和清理成对出现，降低了因逻辑分散导致的资源泄漏风险。这是一种"RAII (Resource Acquisition Is Initialization)" 设计模式在 React 中的体现。
- 函数组件推荐使用 Hooks 替代传统生命周期方法。
  - 设计思路：Hooks 的设计理念是"按关注点组织代码"而非"按生命周期拆分代码"。在类组件中，同一个关注点（如订阅外部数据源）的代码被迫分散在 componentDidMount（订阅）和 componentWillUnmount（取消订阅）两个方法中。而 useEffect 将同一关注点的代码聚合在一起，每个 useEffect 对应一个独立关注点。

---

## 其他常用 Hooks (Other Common Hooks)

### useRef
- 用于保存可变值 (Mutable Value)，其变化不会触发组件重新渲染。
  - 设计思路：useState 适合存储"驱动 UI 更新"的数据（state 变化需要重渲染），useRef 适合存储"不影响 UI"的数据（如定时器 ID、DOM 引用、上一次的值）。两者的核心区别在于是否触发重渲染——这种区分使得开发者能精确控制渲染时机，避免不必要的重渲染。
  - 设计实现：useRef 返回一个普通的 JavaScript 对象 `{ current: value }`，这与 useState 返回的 `[value, setter]` 数组不同。修改 `ref.current` 是同步的直接赋值操作，不会经过 React 的更新管道。这使得 useRef 成为在多次渲染间保持数据持久性的方式，同时又不会像 useState 那样每次修改都触发渲染。
- 常用于获取 DOM 元素引用、保存定时器 ID、存储上一次的值等。
  - 设计实现：通过将 `ref={myRef}` 赋值给 JSX 元素，React 在组件挂载后自动将真实 DOM 元素赋值给 `myRef.current`。这种 DOM 引用获取方式替代了传统的 `document.getElementById`，保持了与 React 声明式模型的一致性，避免了全局 DOM 查询的性能开销和脆弱性。

### useMemo 与 useCallback
- **useMemo**：缓存计算结果 (Memoized Value)，仅在依赖变化时重新计算，避免每次渲染都执行昂贵计算。
  - 设计思路：useMemo 引入了计算缓存 (Memoization) 机制——如果依赖值未变，则直接返回上次缓存的计算结果，跳过重计算。这对于耗时的数据处理（如大数组的排序/过滤/聚合）能显著减少每次渲染的计算量。核心公式：`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
  - 设计目的：useMemo 并非万能优化工具，它本身也有开销（依赖比较、缓存存储）。React 官方建议只在真正昂贵的计算上使用 useMemo，而不是在所有计算上无差别使用。过早优化是万恶之源——首先写出正确的代码，然后在性能瓶颈处有针对性地使用 useMemo。
- **useCallback**：缓存函数引用 (Memoized Callback)，仅在依赖变化时重新创建函数，避免子组件不必要的重渲染（配合 React.memo 使用）。
  - 设计思路：JavaScript 中每次函数组件渲染时，内部定义的函数都是全新的引用。如果这个函数作为 Props 传递给用 `React.memo` 包裹的子组件，每次父组件渲染都会导致子组件"误以为" Props 变化了（因为函数引用变了，尽管函数逻辑相同），从而跳过 memo 的优化。useCallback 通过缓存函数引用解决了这个问题。
  - 设计实现：`const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);` 在 `a` 和 `b` 不变的情况下返回相同的函数引用。配合 React.memo 的子组件，只有当依赖变化导致回调函数的引用变化时，子组件才会重渲染。

### useContext
- 在函数组件中消费 Context 值，替代 Context.Consumer 的 render props 写法。
  - 设计思路：Context 解决了"跨层级 Props 传递"(Props Drilling) 问题——当数据需要从顶层传到孙子组件时，中间组件被迫接收并转交它们不需要的 Props，这破坏了代码的整洁性。Context 创建了一条"数据隧道"，允许祖先组件直接向任意深度的后代组件提供数据，跳过中间无需该数据的组件。
  - 设计实现：`useContext(MyContext)` 使得函数组件消费 Context 的代码极其简洁——一行代码即可获取 Context 当前值，无需类组件的 `static contextType` 或 `Context.Consumer` 的嵌套 render props 写法。这使得组件代码的嵌套层级更浅、可读性更强。

---

## React 最佳实践 (React Best Practices)

- **单一职责原则** (Single Responsibility Principle)：每个组件只负责一个功能，保持组件简洁和可维护。
  - 设计思路：单一职责原则是软件工程中最基础也最重要的原则之一。在 React 中，一个组件的"职责"应能用一句话描述——"这个组件用来展示用户头像和信息"是好的，而"这个组件用了展示用户信息、处理表单提交、显示购物车数量"则职责过多。
  - 设计实践：判断组件是否违反单一职责原则的一个经验法则是——如果不能用一句话描述组件的功能，或者修改一个功能时必须触及组件代码，那么该组件可能承担了过多职责，应考虑拆分。
- **状态提升** (Lifting State Up)：将共享状态提升到最近的公共祖先组件中管理，保持数据流的单向性。
  - 设计思路：当两个兄弟组件需要共享同一份数据时，React 不允许横向直接通信（没有"兄弟组件间 Props 传递"的机制）。解决方案是将共享状态提升到最近的公共父组件中，父组件将状态通过 Props 分发给两个子组件，子组件通过回调函数通知父组件更新状态。这种模式保证了数据始终是单向流动的。
  - 设计目的：状态提升确保了 Single Source of Truth 原则——每个状态数据只有一个拥有者组件，任何对该数据的修改都必须通过该组件。这消除了状态冗余和不一致的风险。
- **代码组织规范** (Code Organization)：合理的文件结构，组件、样式、测试文件就近放置。
  - 设计实现：推荐的组织方式是按功能/特性 (Feature-Based) 而非按文件类型 (Type-Based) 组织——将同一功能模块的组件、样式、测试、工具函数放在同一目录下（如 `UserProfile/` 目录包含 `index.tsx`、`styles.module.css`、`UserProfile.test.tsx`）。这种方式使得功能模块独立性强，便于代码导航、重构和团队分工。
- **命名规范** (Naming Convention)：组件使用 PascalCase，文件名与组件名一致；普通函数/变量使用 camelCase。
  - 设计目的：统一的命名规范是团队协作的基础设施。当所有 React 开发者遵循相同的命名约定时，代码评审能更快聚焦于逻辑而非风格问题，新成员上手项目的时间也能显著缩短。
- **导入顺序** (Import Order)：第三方库优先 → 绝对路径导入 → 相对路径导入 → 样式文件放在最后。
  - 设计目的：一致的导入顺序使得依赖关系清晰可见——第三方库导入一眼可知项目使用了哪些外部依赖，内部模块导入反映了功能之间的依赖关系。样式放在最后是因为样式不包含逻辑，且通常依赖于组件代码的存在。
- **使用 key 属性**：列表渲染时为每个元素设置唯一稳定的 key，帮助 React 高效更新列表。
  - 设计实践：key 值的选择标准是——在列表的多次渲染间保持不变且唯一。后端返回的 ID 是最佳选择；若数据无 ID 但有稳定的组合字段（如 `category + name`），可使用组合值；避免使用数组索引 index，因为列表增删时 index 会变化导致 key 不稳定，造成不必要的 DOM 重建和可能的 UI 状态丢失（如输入框内容错位）。
- **避免直接修改 State**：始终使用 setState / setXxx 函数更新状态，保持不可变更新 (Immutable Update)。
  - 设计原理：不可变更新的核心价值在于可预测性——每次状态变更都产生新对象/数组，React 只需比较引用（浅比较）即可判断数据是否变化。对于深层对象，推荐使用对象展开语法 `{ ...obj, field: newValue }` 或工具库如 Immer 来简化不可变更新代码。

---

## MPA 与 SPA 架构 (MPA vs. SPA Architecture)

### 概念定义 (Definitions)
- **MPA** (Multi-Page Application, 多页面应用)：
  - 传统的 Web 应用架构，每个页面都是独立的 HTML 文件。
    - 设计思路：MPA 是 Web 诞生之初的天然架构——每个 URL 对应服务器上一个真实的 HTML 文件，浏览器通过 HTTP 请求获取完整的 HTML 页面。这是 RESTful 架构在 Web 应用层的直接体现，充分利用了 HTTP 协议的无状态特性和浏览器的缓存机制。
  - 流程：用户点击链接 → 浏览器发送请求 → 服务器返回新 HTML → 浏览器重新渲染整个页面。
    - 设计实现：每次导航都是一次完整的 HTTP 请求-响应周期。服务器端接收 URL 请求，通过路由匹配到对应的页面控制器，控制器组装数据并渲染 HTML 模板，返回完整的 HTML 文档。浏览器的渲染引擎销毁当前页面，重新解析 HTML、构建 DOM 树、加载 CSS/JS 资源，完成新页面的呈现。
    - 设计目的：MPA 的架构天然适配以内容为中心的网站（如新闻门户、文档站点）——每个页面独立可被搜索引擎索引、可独立缓存、可通过 URL 直接分享。
- **SPA** (Single-Page Application, 单页面应用)：
  - 现代前端应用架构，只有一个 HTML 文件，所有内容通过 JavaScript 动态更新。
    - 设计思路：SPA 的核心思想是将"页面"的概念从"服务器端完整的 HTML 文档"转变为"客户端 JavaScript 动态管理的一组 UI 状态的快照"。浏览器只加载一次 HTML 壳文件（通常包含 `<div id="root">`），之后所有页面切换都在客户端通过 JavaScript 完成，不再向服务器请求完整的 HTML 页面。
    - 设计目的：SPA 的设计目标是提供类似桌面应用的用户体验——页面切换无闪烁、操作即时响应、数据缓存复用。这种体验使得 SPA 特别适合强交互场景（如在线协作工具、数据仪表盘、社交应用）。
  - 流程：用户首次访问 → 加载唯一的 HTML → 后续导航通过 JavaScript 处理 → 仅更新部分页面。
    - 设计实现：首次加载时，浏览器下载完整的 JavaScript 应用包（可能包含路由、状态管理、所有组件代码）。之后用户的所有导航操作（点击链接、前进/后退）被前端路由拦截——路由模块根据 URL hash 或 History API 更新浏览器地址栏，匹配对应的页面组件，在 `<div id="root">` 中替换渲染内容，而不向服务器发起完整请求。
- SPA 的核心技术：
  - **前端路由** (Frontend Routing)：如 React Router、Vue Router。
    - 设计实现：前端路由通过拦截浏览器的导航行为来实现页面的客户端切换。Hash 模式利用 URL hash (`#/page`) 不会触发服务器请求的特性；History 模式利用 HTML5 History API (`pushState` / `replaceState`) 实现无 hash 的干净 URL。无论哪种模式，路由切换都只在前端发生，不向服务器发送请求。
  - **虚拟 DOM** (Virtual DOM)：高效的局部更新。
    - 设计关联：SPA 中的页面切换本质上是用新的虚拟 DOM 树替换旧的虚拟 DOM 树，Diff 算法计算出需要更新的 DOM 节点并进行精准的局部更新，而非像 MPA 那样全页面重建。
  - **状态管理** (State Management)：如 Redux、React Context。
    - 设计关联：SPA 中用户操作产生的数据在整个会话期间保持在内存中，不同"页面"之间共享这些数据。状态管理库负责管理这些跨路由的数据，使得用户在不同页面间切换时数据不会丢失。

### MPA 与 SPA 架构对比 (Comparison)
- **页面加载方式**：MPA 每次导航重新加载整个页面；SPA 首次加载后仅更新局部内容。
  - 设计对比：MPA 的每次全量加载带来了"慢但可预测"的特性——每次导航的时间都差不多；SPA 的局部更新带来了"快但不均匀"的特性——首次加载慢但后续操作快。
- **用户体验**：MPA 有页面刷新感；SPA 流畅无刷新。
  - 设计对比：MPA 的页面刷新感源于浏览器销毁旧页面再重建新页面的"白屏间隙"，这会打断用户的操作流；SPA 通过避免全页面卸载消除了这种打断，使得页面切换和动画过渡可以连续进行，用户体验更接近原生应用。
- **首屏加载时间**：MPA 较快（只需加载当前页面）；SPA 较慢（需加载完整应用）。
  - 设计对比和解决方案：SPA 首屏慢的根本原因是默认打包方式会将所有页面代码打包到一个 bundle 中。解决手段包括代码分割 (Code Splitting) 和懒加载 (Lazy Loading)——将不同路由页面的代码拆分为独立的 chunk，仅当用户访问该路由时才加载对应的代码，显著降低首屏加载量。SSR (Server-Side Rendering) 则从另一个角度解决——首屏在服务器端生成 HTML 直接返回，客户端 JavaScript 后续再接管交互。
- **SEO 友好性**：MPA 天然友好（每个页面独立 URL）；SPA 需要额外处理（SSR / SSG, 服务端渲染 / 静态站点生成）。
  - 设计对比：搜索引擎爬虫在抓取 SPA 页面时，通常只获取初始 HTML 壳（`<div id="root">` 为空），无法执行 JavaScript 来获取实际内容。MPA 的 HTML 在服务器端已包含完整内容，爬虫可以直接解析。SSR 通过在服务器端执行 React 组件并将渲染结果嵌入 HTML，使得爬虫获取的 HTML 也包含完整内容，兼顾了 SPA 的开发体验和 MPA 的 SEO 友好性。
- **开发复杂度**：MPA 较低；SPA 较高（需处理路由、状态等）。
  - 设计对比：SPA 的额外复杂度来自"把服务器端的工作搬到了浏览器端"——路由、状态管理、数据缓存、客户端鉴权等原本由服务器处理的职责现在需要前端实现。前端工程化 (Webpack/Vite 构建、模块化、代码分割) 也因此变得更加重要。
- **资源复用**：MPA 低（重复加载公共资源）；SPA 高（一次加载，多次复用）。
  - 设计对比：MPA 中，虽然浏览器会缓存静态资源（JS/CSS/图片），但每个页面的 HTML 文档本身需要重新下载和解析。SPA 中，公共组件库、工具函数、UI 框架只需加载一次，在后续导航中直接使用内存中已加载的代码，减少了网络传输和解析开销。
- **适用场景**：MPA 适合简单网站、内容型网站；SPA 适合复杂应用、交互型应用。
  - 设计选择指南：选择 MPA 还是 SPA 应基于项目特征而非技术偏好——内容展示为主的站点（博客、新闻、文档）优先考虑 MPA 或 SSG (如 Next.js 的静态生成模式)；强交互型应用（后台管理系统、在线协作、社交应用）优先考虑 SPA。现代框架如 Next.js 已模糊了二者的界限，可在同一项目中混合使用 SSR、SSG、CSR 三种渲染策略。

---

## 本章小结 (Chapter Summary)

- React 是一个用于构建用户界面的 JavaScript 库，专注于视图层。
  - 设计总结：React 的核心价值主张是"让 UI 开发变得可预测、可测试、可维护"。通过声明式编程、组件化架构、虚拟 DOM 和单向数据流四大支柱，React 从根本上改变了前端开发的方式——从手动控制 DOM 操作转向声明 UI 的最终状态。
- 核心知识体系包括：声明式编程与 JSX、组件化开发 (函数组件 + Props)、状态管理 (useState)、副作用处理 (useEffect)、虚拟 DOM 与 Diff 算法。
  - 学习路径建议：React 的学习存在一条清晰的依赖链——JSX 是语法基础 → 组件化和 Props 是核心思维 → useState 赋予组件动态能力 → useEffect 处理异步世界 → 虚拟 DOM 和 Diff 算法解释其内部原理。建议按此顺序学习，而非跳级学习内部原理。
- React 作为库的特点：灵活、无侵入、可逐步引入；与 Angular 等框架的设计思路不同。
  - 设计对比：选择 React 还是 Angular 本质上是在"灵活可组合"和"开箱即用"之间做权衡——React 给了你最大自由度，但也要求你做出更多技术决策；Angular 给了你完整的工具集，但也将你固定在特定范式上。
- MPA 与 SPA 是两种主要的 Web 应用架构模式，各有优劣和适用场景。
  - 发展趋势：MPA 和 SPA 的边界正在模糊——Next.js 等 React 元框架通过混合渲染策略（SSR、SSG、ISR、CSR）使得开发者可以根据页面特征选择最合适的渲染方式，而非在架构层面做二选一的决策。
- 通过丰富的生态系统（路由、状态管理、HTTP 请求等），React 可组合成完整的开发解决方案。
  - 设计哲学：React 的生态繁荣源于其"做减法"的设计哲学——React 核心保持极简，把扩展空间留给社区。这种策略使得 React 生态能够快速响应新需求（如数据获取领域的 SWR / React Query 快速走红），而不需要等待 React 核心团队将其纳入框架。

---

## 客观考点总结

### 选择题 / 填空题考点

1. React 由 Facebook 工程师 **Jordan Walke** 于 **2011** 年创建，**2013** 年正式开源。
2. React 的核心定位是**视图层 (View Layer)**，提供**声明式 (Declarative)** 方式描述 UI。
3. React 的三个核心设计理念：**Learn Once, Write Anywhere**、**组件化思想 (Component-Based)**、**状态驱动视图 (State-Driven UI)**。
4. JSX 的本质是 **React.createElement** 的**语法糖 (Syntactic Sugar)**，编译后返回**虚拟 DOM 对象 (JavaScript Object)**。
5. JSX 中 `class` 替换为 **className**，`for` 替换为 **htmlFor**，因为 `class` 和 `for` 是 JavaScript 的**关键字 (Keyword)**。
6. JSX 必须有一个**根元素包裹**，编译工具是 **Babel**。
7. React 组件的命名必须以**大写字母开头**，使用 **PascalCase**（大驼峰命名法）。
8. Props 的核心特性：**只读性 (Read-Only)**、**单向传递 (Unidirectional)**，只能从**父组件传递给子组件**。
9. 子组件向父组件传递数据通过**回调函数 (Callback Function)** 实现。
10. useState 返回一个数组，包含两个元素：**当前状态值 (state)** 和**更新函数 (setState)**。
11. State 不可直接修改，必须通过 **setState 函数更新**。连续多次调用 setState 时，应使用**函数式更新** `setState(prev => prev + 1)` 获取最新的前值。
12. useState 的更新是**异步 (Asynchronous)** 的，React 会对多个 setState 调用进行**批量更新 (Batched Update)**。
13. useEffect 的三个依赖数组模式：**空数组 [ ]**（仅挂载时执行，模拟 componentDidMount）、**有依赖 [dep]**（依赖变化时执行，模拟 componentDidUpdate）、**不写依赖数组**（每次渲染都执行）。
14. useEffect 返回的函数称为**清理函数 (Cleanup Function)**，在组件**卸载 (Unmount)** 或**下次 effect 执行前**调用，用于释放资源。
15. 虚拟 DOM 是**真实 DOM 的 JavaScript 对象表示形式**，存储在**内存**中。
16. Diff 算法的三个核心策略：**同层比较 (Same-Level Comparison)** → 复杂度 O(n)；**类型不同则替换 (Type Mismatch → Replace)**；**key 属性优化 (Key Optimization)**。
17. key 应该使用**唯一且稳定**的值（如后端返回的 ID），不应使用**数组索引 index**。
18. 类组件生命周期三阶段：**挂载 (Mounting)**：constructor → render → componentDidMount；**更新 (Updating)**：render → componentDidUpdate；**卸载 (Unmounting)**：componentWillUnmount。
19. 函数组件中对应关系：**componentDidMount** ↔ useEffect 空数组 [ ]；**componentDidUpdate** ↔ useEffect 有依赖 [dep]；**componentWillUnmount** ↔ useEffect 返回的清理函数。
20. useRef 返回的 `ref.current` 变化**不会触发组件重新渲染**。
21. useMemo 用于缓存**计算结果**，useCallback 用于缓存**函数引用**。
22. React 是**库 (Library)** 而非框架，控制权在**开发者**手中。
23. 对比 Angular：Angular 是**框架 (Framework)**，强制使用 TypeScript、特定项目结构、内置路由/状态管理/HTTP 客户端。
24. MPA (Multi-Page Application) 每次导航**重新加载整个页面**；SPA (Single-Page Application) 只有**一个 HTML 文件**，内容通过 JavaScript 动态更新。
25. SPA 的核心技术：**前端路由 (Frontend Routing)**、**虚拟 DOM (Virtual DOM)**、**状态管理 (State Management)**。
26. MPA: **首屏加载快**、**SEO 天然友好**、**开发复杂度低**；SPA: **用户体验流畅无刷新**、**资源复用高**、适合**复杂交互型应用**。
27. 状态提升 (Lifting State Up) 是将共享状态提升到**最近的公共祖先组件**中管理。
28. 单一职责原则要求每个组件**只负责一个功能**。

### 简答题考点

1. **简述 React 的三大设计理念并解释各自含义。**
   - Learn Once, Write Anywhere：学习一次核心思想，可在 Web (react-dom)、移动端 (React Native)、桌面端 (Electron + React) 等不同平台开发。
   - 组件化思想：将复杂 UI 拆分为独立、可复用的组件，每个组件封装自己的结构和逻辑。
   - 状态驱动视图 (UI = f(state))：UI 是状态的函数，状态变化时 React 自动更新视图，开发者只需关心状态。

2. **解释 JSX 的本质及编译过程。**
   - JSX 是 JavaScript 的语法扩展，本质是 `React.createElement` 的语法糖。
   - 编译过程：JSX 源代码 → Babel 编译 → `React.createElement(type, props, children)` 函数调用 → 返回虚拟 DOM 对象 (JavaScript Object)。
   - 浏览器不能直接理解 JSX，必须经过编译才能在浏览器中运行。

3. **阐述 Props 与 State 的核心区别。**
   - Props：从父组件传递给子组件的数据；只读不可修改；用于组件间通信；由外部传入。
   - State：组件内部管理的可变数据；可通过 setState 修改；用于存储组件的动态信息；组件私有。
   - 子传父通过回调函数实现：父组件将函数作为 Props 传给子组件，子组件调用该函数并传入数据。

4. **解释虚拟 DOM 的工作原理（首次渲染 → 状态更新 → Diff → 批量更新）。**
   - 首次渲染：根据 JSX 创建虚拟 DOM 树 → 渲染为真实 DOM。
   - 状态更新：状态变化 → 创建新的虚拟 DOM 树。
   - Diff 算法：对比新旧虚拟 DOM 树差异（同层比较、类型不同则替换、key 优化）。
   - 批量更新：将最小 DOM 变更操作批量应用到真实 DOM。

5. **阐述 Diff 算法的三个核心策略及其设计目的。**
   - 同层比较：只比较同级节点，不跨层级，复杂度从 O(n^3) 降至 O(n)。
   - 类型不同则替换：节点类型变化时直接替换整个子树，不再递归比较子节点。
   - key 属性优化：通过唯一 key 标识列表元素，精确识别增删移动，避免不必要的重建。

6. **对比 MPA 与 SPA 架构的优缺点及适用场景。**
   - MPA 优点：首屏加载快、SEO 天然友好、开发复杂度低；缺点：用户体验有刷新感、资源复用低。
   - SPA 优点：用户体验流畅无刷新、资源复用高、适合复杂交互；缺点：首屏加载慢、SEO 需额外处理 (SSR/SSG)、开发复杂度高。
   - 适用场景：MPA 适合内容型网站（博客、新闻）、SPA 适合强交互应用（后台管理系统、在线协作工具）。

7. **解释 React 中"单向数据流"的含义及其优势。**
   - 含义：数据从父组件通过 Props 流向子组件，子组件不能直接修改父组件数据。子组件通过回调函数通知父组件变更数据。
   - 优势：数据流向清晰可预测；易于调试和追踪数据变化；避免多组件共享状态时的数据混乱。

8. **说明 React 是"库"而非"框架"的含义及影响。**
   - 库：开发者控制调用时机；低约束、高灵活性；只负责视图层；易于替换和渐进式引入。
   - 框架：框架控制执行流程 (IoC)；高约束、遵循约定；提供完整解决方案；难以替换核心模块。
   - 影响：React 可逐步引入现有项目、可与其他技术共存、路由/状态管理等需自行选型。

9. **解释 useState 的异步更新（批量更新）机制及如何获取最新状态值。**
   - 异步更新：同一事件循环中多次 setState 会被 React 合并为一次更新，减少不必要的渲染。
   - 获取最新值：使用函数式更新 `setState(prev => prev + 1)`，其中 `prev` 始终是 React 内部维护的最新值，避免闭包陈旧值问题。

10. **解释 useEffect 清理函数 (Cleanup Function) 的作用和调用时机。**
    - 作用：清除副作用操作（定时器 clearTimeout、取消订阅 unsubscribe、事件监听 removeEventListener 等），释放资源、防止内存泄漏。
    - 调用时机：组件卸载时；或下一次 effect 执行前（依赖变化触发的重新执行）。

### 易混淆概念

1. **库 (Library) vs 框架 (Framework)：** 库 = 你调用它，框架 = 它调用你（控制反转 IoC）。React 是库，Angular 是框架；React 灵活但需自行选型周边工具，Angular 开箱即用但约束强。

2. **命令式编程 vs 声明式编程：** 命令式 = 描述步骤（怎么做，如手动 `document.createElement`）；声明式 = 描述结果（做什么，如 JSX `<div>Hello</div>`）。React 采用声明式，自动将声明式描述转换为命令式 DOM 操作。

3. **Props vs State：** Props 外部传入（父→子），只读不可修改；State 组件内部管理，可通过 setState 更新。Props 用于组件间数据传递，State 用于组件内数据存储。

4. **真实 DOM vs 虚拟 DOM：** 真实 DOM = 浏览器实际渲染的对象，操作开销大（触发重排重绘）；虚拟 DOM = 内存中的 JavaScript 对象，操作开销小。React 在虚拟 DOM 层面计算差异后批量更新真实 DOM。

5. **useState vs useRef：** useState 值变化会触发组件重新渲染；useRef 值变化不会触发重渲染。useState 用于驱动 UI 的数据，useRef 用于持久化存储不驱动 UI 的值（DOM 引用、定时器 ID 等）。

6. **useMemo vs useCallback：** useMemo 缓存计算结果（值），useCallback 缓存函数引用（函数）。useMemo 返回缓存的值，useCallback 返回缓存的函数。useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。

7. **useEffect 空数组 vs 有依赖 vs 不写：** [ ] = 只执行一次（模拟 componentDidMount）；[dep] = 依赖变化时重新执行（模拟 componentDidUpdate）；不写 = 每次渲染都执行（通常不推荐且危险）。

8. **MPA vs SPA：** MPA 多页面独立 HTML，每次导航重载整页，首屏快、SEO 好、开发简单；SPA 单页面动态更新，体验流畅、资源复用高，但首屏慢、SEO 需额外方案 (SSR/SSG)。

9. **componentDidMount vs componentDidUpdate vs componentWillUnmount：** Mount = 组件挂载后执行（发起请求、添加监听）；Update = 组件更新后执行（响应数据变化）；Unmount = 组件卸载前执行（清理资源）。函数组件中分别对应 useEffect 的三种依赖数组模式。

10. **不可变更新 (Immutable Update) vs 直接修改 (Mutate)：** 不可变 = 创建新对象/数组后再 setState（如 `{ ...obj, key: newVal }`）；直接修改 = 修改原对象后 setState（如 `obj.key = newVal`）—— 直接修改不会触发重渲染，因为 React 用 `Object.is()` 比较，原地修改不会改变引用。
