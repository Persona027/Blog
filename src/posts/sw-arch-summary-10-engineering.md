---
title: 软件开发架构复习：工程化思维和框架必要性
date: 2026-05-07
category: 软件开发架构总结
summary: 第十章复习要点：软件工程化思维、框架选型原则、开发效率与维护性平衡。
cover: /logo.png
---

> 面向对象：软件开发架构课程学习者，基于课堂课件整理<br/>
> 本文涵盖核心考点、概念和最佳实践。

------------------------------------------------------------------------

% ============================================================
## 内容回顾 (Chapter Overview)
% ============================================================

    - 项目案例：宠物商城首页 [p.2--3]
    - 异步请求相关内容 [p.2]
    
        - Promise 对象 (Promise Object) [p.2]
        - Fetch API 和 Axios 库 [p.2]
    
    - 前端项目的演进 [p.2]
    - 项目目录结构 [p.5]

% ============================================================
## 工程化和模块化分析 (Engineering \& Modularization Analysis)
% ============================================================

### 问题一：DOM 操作与业务逻辑耦合 (DOM-Business Logic Coupling)

    - **问题分析** [p.7--8]
    [label=(\arabic*)]
        - **违反关注点分离原则** (Violation of Separation of Concerns) [p.8]
        
            - HTML 结构直接嵌入 JavaScript 字符串中，模板与逻辑混杂在一起 [p.8]
            - 当需要修改 UI 结构时，必须在 JavaScript 代码中查找和修改 [p.8]
            - 前端设计师难以参与开发，因为 HTML 被隐藏在 JS 中 [p.8]
        
        - **代码可读性与可维护性差** (Poor Readability \& Maintainability) [p.8]
        
            - 字符串拼接方式难以阅读，特别是复杂的嵌套结构 [p.8]
            - 缺乏语法高亮和格式化支持 [p.8]
            - 修改模板结构容易出错 [p.8]
        
        - **潜在的安全风险** (Security Risks—XSS) [p.8]
        
            - 直接使用服务端数据（如 `category.name`）进行字符串拼接，存在 XSS 风险 [p.8]
            - 若数据中包含恶意脚本（例如 `category.name` 为 `<script>alert(`XSS')</script>`），会直接执行 [p.8]
        
        - **难以进行单元测试** (Difficult Unit Testing) [p.8]
        
            - 渲染逻辑与 DOM 操作耦合，难以单独测试 [p.8]
            - 测试需要真实的 DOM 环境 [p.8]
        
    

    - **解决方案一：封装模板类** (Encapsulate Template Class) [p.9--10]

    - **解决方案二：使用模板引擎** (Use Template Engine) [p.11--13]
    
        - 更优雅地分离 HTML 结构 (Structure) 和 JavaScript 逻辑 (Logic) [p.11]
    

### 问题二：重复代码与代码复用性差 (Duplicate Code \& Poor Reusability)

    - **问题分析** [p.14--15]
    [label=(\arabic*)]
        - **重复的渲染模式** (Repeated Rendering Patterns) [p.15]
        
            - 多个函数都执行相同流程：清空容器 $\to$ 遍历数据 $\to$ 生成 HTML $\to$ 插入 DOM [p.15]
        
        - **修改困难** (Difficult to Modify) [p.15]
        
            - 若需修改渲染逻辑，必须在多个地方修改，容易遗漏导致不一致 [p.15]
        
        - **缺乏统一的抽象** (Lack of Unified Abstraction) [p.15]
        
            - 没有通用的渲染工具，每个页面各自实现渲染逻辑 [p.15]
        
    

    - **解决方案：封装统一渲染工具类** (Unified Renderer Utility Class) [p.16--17]
    
        - 使用渲染工具类统一渲染数据 [p.17]
    

### 问题三：错误处理机制不完善 (Inadequate Error Handling)

    - **问题分析** [p.18--19]
    [label=(\arabic*)]
        - **错误处理过于简单** (Overly Simple Error Handling) [p.19]
        
            - 只捕获异常并抛出，没有向用户展示友好的错误信息 [p.19]
            - 用户不知道发生了什么错误 [p.19]
        
        - **缺乏错误分类** (Lack of Error Classification) [p.19]
        
            - 网络错误 (Network Error)、服务器错误 (Server Error)、超时错误 (Timeout Error) 等没有区分 [p.19]
            - 无法根据不同错误类型采取不同策略 [p.19]
        
        - **没有重试机制** (No Retry Mechanism) [p.19]
        
            - 网络不稳定时一次性失败，用户需要手动刷新页面 [p.19]
        
    

    - **解决方案：构建统一异常处理类** (Unified Error Handling Class) [p.20--21]

### 问题四：缺乏真正的模块化与组件化 (Lack of True Modularization \& Componentization)

    - **问题分析** [p.22--23]
    [label=(\arabic*)]
        - **静态 HTML 包含的局限性** (Limitations of Static HTML Includes) [p.23]
        
            - 只能包含静态内容，无法传递参数 [p.23]
            - 无法动态生成内容 [p.23]
        
        - **组件间通信困难** (Difficult Inter-Component Communication) [p.23]
        
            - 没有组件间数据传递机制 [p.23]
            - 依赖全局变量或 DOM 操作 [p.23]
        
        - **缺乏生命周期管理** (Lack of Lifecycle Management) [p.23]
        
            - 没有挂载 (Mount)、更新 (Update)、销毁 (Destroy) 等生命周期钩子 [p.23]
            - 难以管理资源清理 [p.23]
        
        - **难以进行单元测试** (Difficult Unit Testing) [p.23]
        
            - 组件逻辑与 DOM 紧密耦合，测试需要真实 DOM 环境 [p.23]
        
    

    - **解决方案：构建组件** (Build Components) [p.24]

### 项目现状分析小结与重构结果 (Summary \& Refactoring Results)

    - 项目现状分析小结 (Analysis Summary) [p.25]
    - 解决方案和重构结果 (Solutions \& Refactoring Results) [p.26--27]

% ============================================================
## 前端开发模式 (Frontend Architecture Patterns)
% ============================================================
### MVC 架构模式 (Model-View-Controller)

    - **定义** [p.29--30]
    
        - 以商品列表功能为例，使用 MVC 模式重构功能模块 [p.29--30]
    

    - **优点** (Advantages) [p.31]
    
        - **职责分离** (Separation of Concerns)：各层职责清晰，代码结构清晰 [p.31]
        - **代码复用** (Code Reusability)：Model 可被多个 View 复用 [p.31]
        - **可测试性** (Testability)：各层可独立进行单元测试 [p.31]
        - **灵活性** (Flexibility)：可以独立修改某一层而不影响其他层 [p.31]
    

    - **缺点** (Disadvantages) [p.31]
    
        - **Controller 臃肿** (Controller Bloat)：复杂应用中 Controller 可能变得庞大 [p.31]
        - **View 与 Controller 耦合** (View-Controller Coupling)：View 通常依赖特定的 Controller [p.31]
        - **数据流不够清晰** (Unclear Data Flow)：复杂应用中数据流向可能难以追踪 [p.31]
        - **双向依赖** (Bidirectional Dependency)：Controller 依赖 Model 和 View，View 也可能依赖 Controller [p.31]
    

    - **View 与 Controller 耦合举例** [p.32--33]

### MVP 架构模式 (Model-View-Presenter)

    - **定义**：MVP 是 MVC 的改进版本，主要改进了 View 和 Controller 之间的耦合问题 [p.34]
    
        - 以商品列表功能为例，使用 MVP 模式重构功能模块 [p.35--37]
    

    - **MVP 架构模式改进点** [p.38--39]
    
        - **View 完全解耦** (View Fully Decoupled)：View 只负责展示，不包含任何业务逻辑 [p.39]
        - **Presenter 集中处理** (Presenter Centralizes Logic)：所有业务逻辑集中在 Presenter 中 [p.39]
        - **更高可测试性** (Higher Testability)：Presenter 不依赖具体 View 实现，可独立测试 [p.39]
        - **代码结构更清晰** (Clearer Code Structure)：职责划分更明确 [p.39]
    

### MVVM 架构模式 (Model-View-ViewModel)

    - **定义** [p.40--41]
    
        - MVVM 引入了 ViewModel 作为 View 和 Model 之间的桥梁 [p.40]
        - 实现了数据的自动同步 [p.40--41]
    

    - **核心特性：响应式数据绑定** (Reactive Data Binding) [p.42--43]
    
        - MVVM 模式的核心特性是响应式数据绑定 [p.42--43]
    

    - **简化版响应式系统** (Simplified Reactive System) [p.44--45]

% ============================================================
## 三种架构模式对比 (Comparison of Three Patterns)
% ============================================================

| **特性** | **MVC** | **MVP** | **MVVM** |
| --- | --- | --- | --- |
| View 与逻辑层耦合 | 有耦合 [p.31] | 完全解耦 [p.39] | 通过数据绑定解耦 [p.40] |
| 业务逻辑位置 | Controller [p.29] | Presenter [p.34] | ViewModel [p.40] |
| 可测试性 | 中等 [p.31] | 高 [p.39] | 高 [p.42] |
| 数据同步方式 | 手动更新 | 手动更新 | 自动同步（响应式）[p.42] |

% ============================================================
## 本章小结 (Chapter Summary)
% ============================================================

    - 工程化和模块化分析：识别四大问题（DOM 耦合、代码重复、错误处理、组件化不足）并提出对应解决方案 [p.25--27]
    - 前端开发模式：MVC $\to$ MVP $\to$ MVVM 逐步演进，核心趋势是 View 与逻辑的解耦程度不断提高 [p.28--45]
    - MVC：Model-View-Controller，经典三层架构 [p.29--31]
    - MVP：Model-View-Presenter，解决 View-Controller 耦合 [p.34--39]
    - MVVM：Model-View-ViewModel，引入响应式数据绑定，实现自动同步 [p.40--45]
