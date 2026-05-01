---
title: Spring MVC
date: 2026-05-01
summary: Spring MVC 复习要点，涵盖架构原理与请求处理流程、控制器与 URL 映射、数据绑定、响应处理与视图方案、拦截器、参数校验及全局异常处理等核心考点。
cover: /assets/covers/softwareDesign.jpg
category: 软件开发架构
---

> 来源：软件开发架构平台课程 CH04 | 考试复习笔记

## Spring 框架与 Spring MVC 简介 (Framework & MVC Introduction)

### Spring Framework 概述

- Spring Framework 是一个为 Java 应用提供全面基础设施支持 (Infrastructure Support) 的 Java 平台。
  - 设计思路：传统的 Java EE 开发需要开发者自行管理大量的基础设施代码（如连接池、事务、安全等），这将业务逻辑与底层设施责任混为一谈，导致代码臃肿且难以维护。Spring 的核心理念是将这些横切关注点抽象为可配置的模块，让框架承担起"基础设施即服务"的角色。
  - 设计实现：通过 IoC 容器和 AOP 机制，Spring 以声明式（XML 配置、注解或 Java Config）的方式向应用交付基础设施能力——开发者只需声明需求，框架负责在运行时织入对应的服务。
  - 设计目的：彻底分离业务逻辑与基础设施逻辑（Separation of Concerns），使开发者遵从"只写业务代码"的原则，从而提升代码的可读性、可测试性与可维护性。

- 核心理念：让开发者专注于业务应用，Spring 处理底层基础设施。
  - 设计思路：此理念源于 Rod Johnson 在《Expert one-on-one J2EE Development without EJB》中对 EJB 模型的批判——EJB 要求开发者实现大量框架接口，导致业务代码与框架紧耦合。Spring 反其道而行，认为框架应为业务服务，而非业务迁就框架。
  - 设计实现：Spring 通过依赖注入（DI）将对象创建与依赖组装的责任从开发者转移到 IoC 容器；通过 AOP 将日志、事务、安全等横切关注点从业务代码中抽取到独立的切面中。业务类本身是一个纯 POJO，无需任何框架依赖。
  - 设计目的：降低开发复杂度、强化代码的可测试性和可维护性，确保业务逻辑类始终保持"脏代码最少、框架痕迹最轻"的纯净状态。

- 支持通过 POJO (Plain Old Java Object) 构建应用，非侵入式 (Non-invasive) 地应用企业级服务。
  - 设计思路：EJB 时代的"侵入式"设计要求开发者必须继承指定基类或实现框架接口，一旦选择 EJB，整个代码库就与 EJB 生命周期绑定。Spring 的非侵入式设计从根本上扭转了这一格局，允许 POJO 在不需要任何 Spring 特定引入的情况下获得企业级能力。
  - 设计实现：通过运行时代理和 IoC 容器，Spring 在 POJO 实例外部织入企业级服务（事务管理、声明式安全等），POJO 源码本身完全不受框架污染。开发者编写的类可以在脱离 Spring 的环境下独立编译、测试和复用。
  - 设计目的：遵循"最小侵入"原则，保证业务代码与技术框架之间的松耦合，使应用架构具有更高的灵活性和更长的生命周期。

- 适用于 Java SE 编程模型以及全部或部分 Java EE 场景。
  - 设计思路：很多企业级框架要求全盘采用其生态，Spring 的模块化哲学则允许按需引入，既可在轻量级 Java SE 环境运行，也可深度集成到 Java EE 应用服务器中。这种"可裁剪性"使 Spring 成为跨度最广的 Java 框架。
  - 设计实现：Spring 采用分层模块架构，包含 Core、Context、JDBC、ORM、Web、AOP 等独立模块，每个模块都可以单独使用也可组合使用。例如，一个桌面应用可以只引入 Spring Core + JDBC，而无需引入 Spring MVC。
  - 设计目的：避免框架的"全有或全无"陷阱，提供灵活的选择性架构，允许应用根据实际需求按粒度引入框架能力，防止过度设计与不必要的运行时开销。

- 创始人：Rod Johnson，Interface21 公司 CEO，曾从事 C/C++ 开发和金融行业。
  - 设计思路：Rod Johnson 的 C/C++ 背景赋予其对底层资源管理（内存、线程、连接）的深刻洞察；金融行业经历则强化了他对高可靠性和代码可测试性的极端追求。两者的交汇塑造了 Spring 的核心设计取向：既有底层的精细控制力，又不失面向对象的分层美学。
  - 设计目的：Spring 的设计哲学——简洁、实用、可测试——实际上是 Rod Johnson 个人技术理念的延伸，即"好的框架应当让正确的设计变得容易，让错误的设计变得困难"。

- 2002 年著作 *Expert one-on-one J2EE Development without EJB*，核心信条："Don't Reinvent the Wheel" (不要重复造轮子)。
  - 设计思路：该著作系统性地证明了使用轻量级 POJO 容器替代重量级 EJB 容器的工程可行性。"不要重复造轮子"在此语境下有两层含义：一是不要在每一个项目中都重新编写基础设施代码，应使用统一的、社区验证过的框架；二是框架本身不要重复发明已有的优秀标准，应尽量利用 JDBC、JTA、JPA 等已有的 Java 标准。
  - 设计实现：Spring 一贯遵循"整合优于替代"的策略——对于已有成熟标准（如 JPA、JMS、Servlet），Spring 提供整合层而非重新实现，只在前者不够简洁或不够灵活的地方提供 Spring 原生方案。
  - 设计目的：减少重复劳动，收敛行业最佳实践，为 Java 社区提供一条不依赖 EJB 的轻量级开发路径，推动整个生态向更简洁、更模块化的方向演进。

### Spring IoC / AOP 基础回顾

- IoC (Inverse of Control，控制反转) / Bean 容器：管理对象生命周期与依赖注入。
  - 设计思路：传统编程中，对象主动创建或查找其依赖（new、工厂模式、JNDI 查找），这导致对象间的强耦合，也难以替换实现（如切换数据库、Mock 测试）。IoC 将依赖的控制权从对象内部反转到外部容器，这一思想俗称为"好莱坞原则"——"Don't call us, we'll call you"。
  - 设计实现：Spring IoC 容器（BeanFactory / ApplicationContext）通过读取配置元数据（XML、注解、Java Config），在启动时创建 Bean 定义并完成依赖注入。容器负责 Bean 的完整生命周期：实例化 → 依赖注入 → 初始化 → 使用 → 销毁。
  - 设计目的：通过反转控制流来实现组件间的完全解耦，每个组件只依赖于抽象接口而不依赖具体实现，使得系统具备高可配置性和高可测试性，是分层架构中"依赖倒置原则"的核心体现。

- AOP (Aspect-Oriented Programming，面向切面编程)：用于权限/安全管理切面、日志管理、事务管理等横切关注点。
  - 设计思路：面向对象编程擅长纵向分解（按功能模块分层），但对横向散布在多个模块中的共通行为（日志、事务、安全校验）无能为力——这些行为会形成代码重复（Scattering）和核心逻辑混淆（Tangling）。AOP 从二维视角出发，将这些横切关注点从核心业务逻辑中分离，集中到切面中统一管理。
  - 设计实现：Spring AOP 基于动态代理（JDK 动态代理用于接口代理，CGLIB 用于类代理），在目标 Bean 的方法调用前后织入通知（Advice）。切面由切点（Pointcut，定义"何处"）和通知（Advice，定义"何时做什么"）组成。
  - 设计目的：严格贯彻单一职责原则——业务类只承载业务逻辑，日志/事务/安全等切面职责由专门的切面承担。这不仅维护了代码的清晰度，也让切面逻辑可以被独立开发、测试和复用。

- 经典三层架构：表示层 (Servlet/JSP)、业务逻辑层 (Service/Business Bean)、模型层 (DAO/Bean)。
  - 设计思路：分层架构是软件工程中最基础、应用最广泛的结构模式。其核心思想是将应用按职责抽象为不同层次，每一层仅依赖于其下一层提供的接口，而不越过层次直接访问更底层。三层架构直接回应了"关注点分离"这一架构性要求。
  - 设计实现：表示层负责 HTTP 请求接收和响应渲染；业务逻辑层承载核心业务规则和流程编排，不依赖任何 Web 细节；持久层（模型层）封装数据访问，对上层屏蔽底层数据库差异。
  - 设计目的：通过严格的层次隔离，使各层可以独立演化、独立测试、独立替换——例如将 JSP 替换为 Thymeleaf 后业务层无需任何变动，或将 MySQL 切换为 PostgreSQL 仅需修改持久层配置。这是"高内聚低耦合"在架构层面的典型实践。

- Spring MVC 运行于 IoC 容器之上，所有对象（Controller、Service 等）均由 IoC 容器管理。
  - 设计思路：Spring MVC 不是孤立的新框架，而是 Spring IoC 容器在 Web 层的自然延伸。这意味着 Web 层的 Controller 与业务层、持久层的 Bean 处于同一套 IoC 管理体系下，无需任何额外的桥接或 JNDI 查找即可完成依赖注入。
  - 设计实现：DispatcherServlet 初始化时创建专属的 WebApplicationContext，并与根 ApplicationContext 形成父子容器关系：子容器（Web 层）可以访问父容器（Service/DAO 层）的 Bean，反过来则不行。这种单向依赖保证了依赖方向的正确性。
  - 设计目的：实现 Web 层与业务层的无缝集成，使分层架构中各层之间的依赖关系由 IoC 容器在启动时一次性解析完成，运行时零开销。同时确保 Controller 的单元测试同样享有依赖注入的便利。

### Spring MVC 简介

- Spring Web MVC 是 Spring 体系中的轻量级 Web 表示层 (Presentation Layer) 框架。
  - 设计思路："轻量级"的三层含义：不强制特定 View 技术（JSP/FreeMarker/Thymeleaf 自由选择），不绑定特定应用服务器（可运行在任何 Servlet 3.0+ 容器中），核心 jar 体积小、依赖少。这区别于 Struts 等重量级框架的"全家桶"捆绑策略。
  - 设计实现：Spring MVC 的核心 DispatcherServlet 只需约几百行关键代码，其扩展点全部通过策略接口暴露（HandlerMapping、HandlerAdapter、ViewResolver），开发者可以按需定制或替换任一组件。
  - 设计目的：在分层架构中精确定位表示层的边界——只负责 HTTP 协议适配和视图渲染，绝不侵入业务逻辑。这种清晰的边界定义是 Spring MVC 能与任意业务层框架组合使用的根本原因。

- Spring MVC 的核心是 Controller (控制器)，用于处理请求和响应。
  - 设计思路：Spring MVC 采用前端控制器模式（Front Controller Pattern）加页面控制器（Page Controller）的复合架构。DispatcerServlet 作为唯一入口集中处理所有请求的通用逻辑（字符编码、文件上传、安全校验），然后将请求分发给具体的页面控制器（@Controller 标注的类）执行业务逻辑。
  - 设计实现：每个 Controller 是一个被 IoC 管理的单例 Bean（必须保证线程安全），其方法通过方法级别的注解（@GetMapping、@PostMapping 等）声明与 URL 的映射关系。这种设计比传统 Servlet 的类级别映射粒度更细、更灵活。
  - 设计目的：将"请求路由"和"请求处理"分离——路由决策由 DispatcherServlet 和 HandlerMapping 集中完成，业务处理由各 Controller 分散完成。既避免了单点臃肿，又保留了全链路统一管理能力。

- Spring MVC 基于 Spring IoC 容器运行，所有对象被 IoC 容器管理。
  - 设计思路：这是一条被反复强调的设计原则，因为它是 Spring MVC 与 Struts、原生 Servlet 最根本的架构差异。在 Spring MVC 中，Controller 就是普通的 Spring Bean，享有所有 Bean 的能力：依赖注入、AOP 代理、生命周期回调等。
  - 设计实现：DispatcherServlet 在 init() 阶段初始化 WebApplicationContext，扫描 @Controller 注解类并注册为 Bean。此后每个请求的分发都是通过 BeanFactory 获取已存在的 Controller 实例而非每次新建。
  - 设计目的：消除 Web 组件与业务组件之间的技术壁垒，使 Controller 能够以标准的 DI 方式注入 Service、Repository 等，天然支持分层架构。

- Spring 5.x：要求 JDK 8、Servlet 3.1 (Tomcat 8.5+)，支持 JDK 8+ 新特性，支持响应式编程 (Reactive Programming，事件回调机制)。
  - 设计思路：传统 Servlet 采用 Thread-per-Request 同步模型——每个请求独占一个线程直到响应完成，在高并发场景下线程上下文切换消耗巨大。响应式编程采用事件驱动 + 非阻塞 I/O，用少量线程（通常等于 CPU 核心数）即可处理海量并发请求。
  - 设计实现：Spring 5.x 引入 WebFlux 模块，基于 Reactor 库实现完全非阻塞的响应式 Web 栈。核心接口从 `HttpServletRequest/HttpServletResponse` 变为 `ServerHttpRequest/ServerHttpResponse`，方法返回值从同步对象变为 `Mono<T>` 或 `Flux<T>`。
  - 设计目的：适应微服务和云原生场景下的高并发、高吞吐需求，为不同场景提供两种 Web 技术栈选择：Servlet 栈（Spring MVC，同步阻塞）与 Reactive 栈（Spring WebFlux，异步非阻塞）。

- Spring 6.x：要求 JDK 17、Servlet 5.0 (Tomcat 10.x)。
  - 设计思路：JDK 17 是 Java 的下一个长期支持（LTS）版本，Servlet 5.0 将 `javax.servlet` 命名空间迁移至 `jakarta.servlet`，这是 Jakarta EE 从 Oracle 迁移至 Eclipse 基金会后最重大的 API 变更。Spring 6.x 借此机会全面拥抱新版 Java 和新版 Servlet 规范。
  - 设计目的：保持与 Java 生态的同步演进，使框架能利用 Record、密封类、模式匹配等新语言特性改进内部实现和开发者体验；同时明确 Jakarta EE 的迁移方向，为整个 Spring 生态指明技术路标。

---

## Spring MVC 架构与核心原理 (Architecture & Core Principles)

### 请求处理流程 (Request Processing Flow)

1. 请求首先到达前端控制器 (DispatcherServlet / Front Controller)，委托给具体的控制器处理请求。
   - 设计思路：前端控制器模式将所有入口收敛到单一网关（DispatcherServlet），系统可以在请求进入 Controller 之前在统一位置完成通用操作（字符编码设置、安全令牌校验、请求日志记录等），而不需要在每个 Controller 中重复编写这些代码。
   - 设计实现：DispatcherServlet 维护一条处理器执行链（HandlerExecutionChain），链上可以注册多个拦截器（HandlerInterceptor），在请求到达 Controller 之前和之后执行通用逻辑。这条链本身也是 Spring AOP 思想在 Web 层的应用。
   - 设计目的：实现"横切关注点"在 Web 层的集中管理——让公共逻辑只需编写一次且仅影响一个位置，遵循"不要重复自己"（DRY）原则。

2. 前端控制器通过查询处理器映射 (Handler Mapping)，找到 URL 对应的控制器 (Controller)。
   - 设计思路：URL 到 Controller 的映射本质是一个策略模式（Strategy Pattern）的实现。HandlerMapping 接口定义了寻找处理器的统一契约，但具体策略（基于注解扫描、基于 XML 配置、基于 BeanName 等）可以在实现类中自由定义。
   - 设计实现：最常用的 `RequestMappingHandlerMapping` 在容器启动时扫描所有 `@Controller` 和 `@RequestMapping` 注解，构建一个多级映射表（URL Pattern → Controller.Method）。请求到来时通过 URL 匹配查找对应方法，复杂度为 O(1) 的 HashMap 操作。
   - 设计目的：将"映射策略"与"请求分发"解耦。DispatcherServlet 只依赖 HandlerMapping 接口而非具体实现，这使映射策略可插拔——从简单 URL 映射到复杂的注解映射，底层实现可以完全不同但上层代码无需修改。

3. 控制器处理请求，包括处理数据、调用业务逻辑 (Business Logic) 等。
   - 设计思路：在分层架构中，Controller 的职责边界十分明确——它只负责接收参数、调用 Service 层、返回结果，绝不在 Controller 方法中编写核心业务逻辑。Controller 的角色是"编排者"（Orchestrator）而非"执行者"（Executor）。
   - 设计实现：Controller 方法通过参数绑定直接获得请求数据（已由框架完成类型转换和校验），调用注入的 Service Bean 执行真正的业务操作，然后将结果封装为 ModelAndView 或直接返回响应体。
   - 设计目的：将 Web 协议适配与业务逻辑彻底分离。Controller 是"薄层"——它的存在只是为了让 HTTP 请求能被正确地翻译为业务层的调用。这保证了业务逻辑可以脱离 Web 环境独立测试和执行。

4. 控制器将模型数据 (Model) 打包，连同逻辑视图名 (Logical View Name) 返回给前端控制器。
   - 设计思路：Controller 不直接操作 HttpServletResponse 进行页面渲染，而是返回一个"逻辑视图名"（如 "userList"），将"页面路由"与"页面渲染"两个职责进一步分离。逻辑视图名是一个抽象标识，不包含具体的模板文件路径或视图技术细节。
   - 设计实现：Model 本质上是一个 Map<String, Object>，Controller 向其中填充数据，然后把 Model 和逻辑视图名封装为 ModelAndView 对象返回给 DispatcherServlet。
   - 设计目的：Controller 只决定"用哪个数据填充哪个视图"，而"该视图在文件系统中的具体位置"和"该视图用何种技术渲染"由 ViewResolver 决定。这种解耦使得视图技术切换（JSP → Thymeleaf）时 Controller 代码无需任何修改。

5. 视图解析器 (View Resolver) 将逻辑视图名匹配成具体的视图实现。
   - 设计思路：ViewResolver 应用了策略模式，将逻辑名到物理视图的映射规则集中管理。不同的 ViewResolver 实现对应不同的映射策略：`InternalResourceViewResolver` 通过前缀+后缀拼接物理路径，`BeanNameViewResolver` 通过 Spring Bean 名称查找视图实例。
   - 设计实现：DispatcherServlet 维护一个 ViewResolver 链，按优先级依次尝试解析逻辑视图名。第一个成功解析的 ViewResolver 返回 View 对象，后续解析器不再执行。这种链式设计允许项目中同时存在多种视图技术。
   - 设计目的：将视图技术选择推迟到配置阶段而非编码阶段。Controller 在任何视图技术下都返回相同的逻辑视图名，视图技术的选择和配置完全由 ViewResolver 在运行时决定。

6. 视图 (View) 进行模型数据和视图实现的渲染 (Rendering)。
   - 设计思路：View 接口将数据合并到模板的过程抽象为一个统一操作 `render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response)`。无论底层是 JSP 的 Java 代码融合、Thymeleaf 的 DOM 处理还是 FreeMarker 的模板引擎，View 接口屏蔽了所有差异。
   - 设计实现：View 对象持有模板的物理地址和视图技术细节，调用渲染方法时将 Model 中的数据注入模板，生成最终的 HTML 字符串写入 HttpServletResponse。
   - 设计目的：实现"数据"与"呈现"的最终分离——Model 中的数据是纯粹的 Java 对象，View 中的模板是纯粹的页面结构描述，两者的合并完全由 View 组件在运行时完成，互不干扰。

7. 交付模型数据，给出 Web 响应 (Response)。
   - 设计思路：经过完整的处理链后，最终的 HTML（或 JSON/XML）内容通过 HttpServletResponse 的输出流返回给客户端。DispatcherServlet 在此步骤完成资源的最终释放和日志收尾。
   - 设计实现：响应写回后，DispatcherServlet 遍历已经执行过的拦截器链中的 `afterCompletion` 回调，执行资源清理和日志输出操作。这是整个请求生命周期中最后一个执行点。
   - 设计目的：以统一且有序的方式结束每个请求的生命周期，无论请求成功还是抛出异常，都确保资源被正确释放，避免内存泄漏和连接泄漏。

### 核心组件 (Core Components)

- **DispatcherServlet (前端控制器/前端调度器)**：统一入口，所有 HTTP 请求首先到达此处；协调 HandlerMapping、Controller、ViewResolver 等组件协同工作；可在 `web.xml` 中配置，也可通过 Java Config 配置。
  - 设计思路：前端控制器是 Spring MVC 架构的枢纽，其设计遵循"中介者模式"（Mediator Pattern）——DispatcherServlet 自己不执行实际的请求处理，而是将请求分派给各个专职组件，由这些组件协作完成处理。这种设计避免了单一组件过于臃肿的问题。
  - 设计实现：DispatcherServlet 继承自 HttpServlet（最终继承链：HttpServlet → HttpServletBean → FrameworkServlet → DispatcherServlet），在 service() 方法中执行核心分发逻辑：doDispatch()。其通过策略接口（HandlerMapping、HandlerAdapter、ViewResolver）与各组件交互，所有策略接口均支持多实例链式调用。
  - 设计目的：实现"调度"与"执行"的彻底分离——DispatcherServlet 是纯粹的调度者，不包含任何业务处理或视图渲染代码。这使得每个组件都可以被独立地替换、Mock 和测试。

- **Handler Mapping (处理器映射)**：根据请求 URL 找到对应的 Controller 及方法。
  - 设计思路：HandlerMapping 的核心问题是"URL 路由"——如何将形如 `/user/123/orders?status=paid` 的请求精确路由到 `UserController.getOrders(int userId, String status)`。这涉及路径模式匹配、路径变量提取、参数条件筛选等多个子问题。
  - 设计实现：`RequestMappingHandlerMapping` 在启动时构建一个多级的注册表（Registry），使用 Ant 风格路径模式（`?` `*` `**`）进行匹配，支持按 HTTP 方法、请求参数、请求头、Content-Type 等多维度筛选最优处理器。
  - 设计目的：将路由逻辑从业务代码中抽离。开发者只需通过注解声明映射关系，复杂的路径解析和匹配算法由框架透明完成。

- **Controller (控制器)**：处理业务逻辑，返回 Model 和逻辑视图名。
  - 设计思路：Controller 在架构中的定位是"薄适配层"——它将 HTTP 协议世界（URL、请求参数、Session）转换为 Java 对象世界（方法参数、返回值），然后委托给 Service 层。Controller 本身不包含业务规则。
  - 设计实现：Spring MVC 中，Controller 方法支持极其灵活的参数签名——框架通过参数解析器（HandlerMethodArgumentResolver）自动识别方法参数的类型和注解，注入对应的值。返回值同样通过返回值处理器（HandlerMethodReturnValueHandler）进行适配。
  - 设计目的：让 Controller 的代码简洁到极致——开发者只需声明"输入什么参数、返回什么视图"，所有的参数提取、类型转换、校验、视图渲染细节均由框架透明完成。

- **View Resolver (视图解析器)**：将逻辑视图名解析为具体视图技术（JSP、FreeMarker、Thymeleaf 等）。
  - 设计思路：ViewResolver 提供一致的命名服务——将 Controller 返回的简短逻辑名（如 "index"）映射为各种视图技术的物理资源（如 `/WEB-INF/views/index.jsp` 或 `classpath:/templates/index.html`）。这种抽象使得同样的逻辑视图名可以映射到完全不同的视图技术上。
  - 设计实现：`InternalResourceViewResolver` 通过前缀+后缀拼接（prefix + viewName + suffix）实现最简单的 JSP 解析。`ThymeleafViewResolver` 则通过模板引擎搜索 classpath 下的 HTML 模板。多个 ViewResolver 组成有序链，按优先级依次尝试。
  - 设计目的：将视图技术的选择权从编码时推迟到部署时。开发者在 Controller 中只使用逻辑名，运维人员可以通过配置决定使用何种视图技术，实现视图方案的可替换性。

- **View (视图)**：渲染模型数据，生成最终 HTML 响应。
  - 设计思路：View 接口是对各种视图技术的统一抽象。无论是 JSP 的编译执行、Thymeleaf 的 DOM 替换还是 FreeMarker 的模板合并，都要通过同一个 `render()` 方法完成。这使得 DispatcherServlet 在渲染阶段完全不感知底层视图技术的差异。
  - 设计实现：每个 View 实现类封装一种特定的视图技术：`InternalResourceView` 封装 JSP（通过 RequestDispatcher 转发），`ThymeleafView` 封装 Thymeleaf 模板引擎，`MappingJackson2JsonView` 封装 JSON 序列化（虽然不是传统意义上的"视图"）。
  - 设计目的：将渲染职责封装在最小的可替换单元中。新增一种视图技术只需实现 View 接口和对应的 ViewResolver，无需修改 DispatcherServlet 或 Controller 的任何代码。

### 与原生 Servlet 对比 (Comparison with Native Servlet)

- 原生 Servlet：需要手动继承 HttpServlet，在 `web.xml` 中逐一配置 URL 映射；处理请求和响应的代码量大、重复度高。
  - 设计思路：原生 Servlet 的 API 设计暴露了大量底层细节（手动读取流、手动设置响应头、手动处理字符编码），导致即使是"Hello World"也需要大量样板代码。这种设计的初衷是给开发者最大控制权，但代价是需要开发者在每个 Servlet 中重复处理相同的 HTTP 协议细节。
  - 设计实现：每个原生 Servlet 必须继承 HttpServlet 并覆盖 doGet()/doPost() 方法，手动从 HttpServletRequest 中解析参数，手动向 HttpServletResponse 中写入响应。任何通用逻辑（编码设置、登录检查）都需要在 Servlet 基类中通过继承复用，或使用 Filter 机制。
  - 设计目的：Servlet 规范的设计目标是为所有 Web 框架提供统一的底层接口，因此保持最小化 API 面，将更高层的抽象留给框架实现。

- Spring MVC：通过注解 (@Controller、@GetMapping 等) 声明式配置，大幅简化开发；自动封装请求参数、自动处理响应类型转换。
  - 设计思路：Spring MVC 用"约定优于配置"和"声明式编程"替代原生 Servlet 的"指令式编程"。开发者只需通过注解声明"我要接收什么样的请求"和"我要返回什么样的结果"，框架自动完成中间所有的转换和编排工作。
  - 设计实现：通过参数解析器链（HandlerMethodArgumentResolver）自动将请求参数注入方法参数；通过返回值处理器链（HandlerMethodReturnValueHandler）自动将方法返回值转换为 HTTP 响应。整个流程中，开发者无需手动调用任何 HttpServletRequest 或 HttpServletResponse 的底层 API（除非有特殊需求）。
  - 设计目的：将开发者的注意力从"如何操作 HTTP 协议"转移到"如何处理业务逻辑"，显著提升开发效率和代码可读性，同时遵循分层架构中的"Controller 为薄层"原则。

---

## 控制器与请求映射 (Controllers & Request Mapping)

### Controller 编写 (Writing Controllers)

- `@Controller` 注解：标识该类为一个 Servlet 控制器，Spring IoC 容器会自动扫描并管理其实例。
  - 设计思路：`@Controller` 是 `@Component` 注解的语义化特化——在 Spring IoC 层面它和 `@Component` 完全等效（都是让类被自动扫描为 Bean），但通过特殊的命名传达该 Bean 在 Web 层扮演的特定角色。这是"惯例优先于配置"（Convention over Configuration）思想的体现。
  - 设计实现：Spring 的组件扫描（`<context:component-scan>` 或 `@ComponentScan`）在启动时扫描指定包下的所有类，将标注了 `@Controller` 的类实例化为单例 Bean 并注册到 IoC 容器中。Spring Boot 进一步将其自动化，主类上的 `@SpringBootApplication` 已内置组件扫描。
  - 设计目的：消除 XML 配置文件的编写负担，通过约定（注解所在包路径）自动发现和注册 Web 组件，使 Controller 的创建和管理对开发者完全透明。

- `@ResponseBody` 注解：直接以字符串内容进行响应，不进行页面跳转和视图渲染。
  - 设计思路：传统的 Web 应用的最终响应几乎总是 HTML 页面，但在前后端分离和 RESTful API 场景下，Controller 更多返回 JSON/XML 数据而非 HTML 页面。`@ResponseBody` 正是为这种场景设计的——它告诉 Spring MVC 跳过视图解析流程，直接将返回值序列化后写入响应体。
  - 设计实现：当 Spring MVC 检测到方法上存在 `@ResponseBody` 注解时，会使用 `HttpMessageConverter` 将返回值转换为客户端请求的格式（通常通过 Accept 头协商）。例如，返回一个 Java 对象时，Jackson 的 `MappingJackson2HttpMessageConverter` 自动将其序列化为 JSON。
  - 设计目的：统一前后端分离与传统的页面渲染两种使用场景为一种 Controller 编程模型。开发者无需记忆两套不同的返回值处理规则。

- 控制器方法处理请求后，返回模型数据 (Model) 和逻辑视图名，或直接返回响应体。
  - 设计思路：Controller 方法的返回值有两种语义路径：返回逻辑视图名时走视图渲染流程（View Resolution + View Rendering），返回带有 `@ResponseBody` 注解的 Java 对象时走消息转换流程（HttpMessageConverter）。两种路径共享相同的前置处理（参数绑定、校验），仅在后期分叉。
  - 设计目的：提供灵活的响应策略——同一 Controller 可以同时包含返回 HTML 页面的方法和返回 JSON 数据的方法，满足现代应用中的混合模式需求。

### URL 映射注解 (URL Mapping Annotations)

- Spring MVC 通过 URL 映射将 Web 请求的 URL 和 Controller 中的方法进行映射。
  - 设计思路：URL 映射是 Spring MVC 实现前端控制器模式的关键环节。不同于传统 Servlet 的"一个 URL 对应一个类"的粗粒度映射，Spring MVC 实现了"一个 URL（含 HTTP 方法、参数、请求头等多维度约束）对应一个方法"的细粒度映射，极大提升了路由表达的精确度。
  - 设计实现：`RequestMappingHandlerMapping` 在启动阶段扫描所有 `@RequestMapping` 及其快捷注解变体，使用 `RequestMappingInfo` 对象存储每个映射的完整约束条件（patterns、methods、params、headers、consumes、produces），构成一个多级的路由匹配表。
  - 设计目的：将路由配置从外部配置文件移到代码本身（通过注解就近声明），减少配置文件的维护成本，同时利用编译期检查避免 URL 拼写错误。

- URL 映射基于方法 (Method-level mapping)，比传统 `web.xml` 中 Servlet 映射粒度更小、使用更灵活。
  - 设计思路：传统的 Servlet 映射以类为最小单位——一个 Servlet 类处理一组 URL 模式下的所有 HTTP 方法和所有业务操作。Spring MVC 将映射粒度细化到方法级别后，一个 Controller 类可以包含数十个处理方法，每个方法处理某个特定资源（Resource）的某个特定操作（GET/POST/PUT/DELETE）。
  - 设计实现：Controller 类上的 `@RequestMapping` 定义基础路径（如 `/users`），方法上的 `@GetMapping` 等注解定义子路径和 HTTP 方法约束（如 `/{id}`），两者组合为完整 URL（如 `GET /users/{id}`）。这种"类前缀 + 方法后缀"的路径组合模式是 RESTful API 设计的自然映射。
  - 设计目的：遵循 REST 资源导向的设计原则，让 URL 结构直接反映资源的层级关系，使 API 路径表达更为清晰、直观。

- `@RequestMapping`：通用映射，不区分请求方法 (GET/POST/PUT/DELETE)，常用于 Controller 类级别进行全局路径前缀设置。
  - 设计思路：`@RequestMapping` 是最底层的映射注解，其他四个 HTTP 方法特定的注解（`@GetMapping` 等）实际上都是它的组合快捷方式。将其放在类级别用于设置基础 URL 前缀，将更具体的方法约束放在方法级别，形成"类 = 资源路径" + "方法 = HTTP 操作"的 REST 映射范式。
  - 设计实现：`@RequestMapping` 除了 `value`/`path`（URL 模式）和 `method`（HTTP 方法约束），还支持 `params`（请求参数约束）、`headers`（请求头约束）、`consumes`（请求 Content-Type 约束）、`produces`（响应 Accept 约束）等高级过滤条件。
  - 设计目的：提供一套统一的、可组合的映射声明机制，支撑 RESTful 架构中"资源与操作的分离表达"这一核心要求。

- `@GetMapping`：GET 请求映射，作用于具体方法。例：`@GetMapping("/hello")` 映射至 `http://localhost:8080/hello`。
  - 设计思路：GET 请求在 HTTP 语义中代表"安全"（不修改服务器状态）和"幂等"（多次调用效果相同）的资源读取操作。`@GetMapping` 把这一语义约束直接编码在注解中，防止开发者错误地将写操作用 GET 方法暴露。这是"按 HTTP 语义编程"理念的体现。
  - 设计实现：`@GetMapping` 是 `@RequestMapping(method = RequestMethod.GET)` 的快捷方式，其源码中通过元注解的方式组合了该语义。
  - 设计目的：让 API 设计自文档化——一看注解就知道该接口用于读取资源，符合 RESTful 设计的最佳实践。

- `@PostMapping`：POST 请求映射，作用于具体方法。
  - 设计思路：POST 在 HTTP 语义中代表资源的创建操作（非幂等、非安全）。`@PostMapping` 将此语义固定为注解名称，使得 API 设计者在方法上标记时即自然遵守 REST 规范。
  - 设计目的：通过注解命名强制语义自说明，降低 API 方法语义混淆的概率。

- `@PutMapping`：PUT 请求映射。
  - 设计思路：PUT 在 REST 中代表资源的全量更新操作（幂等但非安全）。`@PutMapping` 将更新语义显式化，通常与路径变量配合标识要更新的资源 ID。
  - 设计目的：与 GET/POST/DELETE 一起构成完整的 RESTful CRUD 映射集，覆盖资源操作的全部标准语义。

- `@DeleteMapping`：DELETE 请求映射。
  - 设计思路：DELETE 代表资源删除操作（幂等但非安全）。`@DeleteMapping` 使删除语义在代码层面一目了然。
  - 设计目的：完善 RESTful API 的方法级映射拼图，让 HTTP 方法语义直接指导 Controller 方法的设计。

---

## 数据绑定与请求参数获取 (Data Binding & Request Parameters)

### 参数获取原理 (Parameter Acquisition Principle)

- 模型驱动 (Model-Driven)：Controller 对象构造时，Spring MVC 自动构建一个 Model 对象 (Map 类型)，用于存放请求相关的值，替代 `request.setAttribute()` 的方式。
  - 设计思路：传统 Servlet 开发中，向视图传递数据必须通过 `request.setAttribute("key", value)` 将数据放入 HttpServletRequest 的属性 Map 中——这不仅冗长，而且将数据传递与原生 Servlet API 紧耦合。Spring MVC 引入独立的 Model 对象，将数据容器从 HttpServletRequest 中解耦出来。
  - 设计实现：Model 接口的实现类 ExtendedModelMap 本质上是一个 LinkedHashMap，但与 HttpServletRequest 解耦——它在请求处理完成后由框架自动合并到 Request 的 attribute 中，对开发者而言全程无需接触原生 Servlet API。
  - 设计目的：降低 Controller 代码对 Servlet API 的依赖，使单元测试无需 Mock HttpServletRequest 即可验证数据传递是否正确，提升可测试性。

- 请求到达 Controller 前会经过一系列过滤器/拦截器 (Filters/Interceptors)，实现类型转换 (Type Conversion)、集合取值等功能，开发者也可对其进行扩展。
  - 设计思路：HTTP 协议传输的所有参数都是字符串（String），但 Controller 方法需要的参数是强类型（int、Date、List<User> 等）。Spring MVC 在请求到达方法之前通过一系列预处理器完成类型转换，使开发者无需在每个方法中手动编写类型转换代码。
  - 设计实现：Spring MVC 内置了丰富的转换器（Converter）、格式化器（Formatter）和属性编辑器（PropertyEditor），支持 String → int / long / double / Date / Enum / Collection 等常见转换。开发者可通过实现 `Converter<S, T>` 接口或 `Formatter<T>` 接口扩展自定义类型转换逻辑，并注册到全局转换服务中。
  - 设计目的：将数据格式转换逻辑集中管理、统一配置，避免在每个 Controller 中重复编写相同的转换代码，贯彻 DRY（不要重复自己）原则。

### 三种获取参数方式

- **方式一 —— 方法参数直接接收**：使用方法参数直接接收网页属性，基于规则匹配，需确保前后端属性名称一致。若不一致，使用 `@RequestParam` 注解进行参数名映射。
  - 设计思路：方法参数名与请求参数名的自动匹配是 Spring MVC 中最常用的参数绑定方式。其设计假设是"前后端命名一致是最常见的情况"，在此基础上提供 `@RequestParam` 作为命名不一致时的显式声明方案。
  - 设计实现：Spring MVC 通过 Java 反射获取方法参数名（需使用 `-parameters` 编译选项或 `ParameterNameDiscoverer`），与请求参数名进行匹配。若方法参数名与请求参数名一致则自动赋值；若不一致，通过 `@RequestParam("formFieldName")` 显式指定映射关系。
  - 设计目的：在"约定优于配置"的前提下保留灵活性——大多数情况无需额外配置，特殊情况下通过注解精确控制，兼顾开发效率和表达能力。

- **方式二 —— JavaBean 封装接收**：使用 JavaBean 接收封装后的大量数据，配合 `@RequestBody` 注解，更为常用，支持 JSON 数据自动转换。
  - 设计思路：对于包含 10+ 字段的表单或 JSON 请求体，逐字段使用方法参数接收会导致方法签名臃肿且难以维护。JavaBean 封装方式将所有字段打包为一个 DTO（Data Transfer Object），方法签名只包含一个参数，简洁清晰。
  - 设计实现：对于 `application/x-www-form-urlencoded` 或 `multipart/form-data` 类型的请求，Spring MVC 通过属性名匹配自动将请求参数填充到 JavaBean 的各属性中。对于 `application/json` 类型的请求，配合 `@RequestBody` 注解，Spring MVC 使用 HttpMessageConverter（通常是 Jackson）将 JSON 反序列化为 JavaBean。
  - 设计目的：将数据对象化——请求数据不再是零散的键值对，而是具有完整类型信息的 Java 对象，提升代码的类型安全性和可维护性。

- **方式三 —— 路径变量与请求头**：`@PathVariable` 获取请求 URI 中的值；`@RequestHeader` 获取请求头中的值。
  - 设计思路：RESTful URL 设计将资源标识符（如用户 ID）嵌入到 URL 路径中而非放在查询参数中（`/users/123` vs `/users?id=123`）。`@PathVariable` 正是为这种风格设计，从 URL 模板变量中提取值。`@RequestHeader` 用于获取元数据信息（如 Content-Type、Authorization、User-Agent 等）。
  - 设计实现：`@PathVariable` 通过 URI 模板中的变量名匹配（`@GetMapping("/users/{id}/orders/{orderId}")` 中的 `{id}` 和 `{orderId}` 作为模板变量）。`@RequestHeader` 直接读取 HTTP 请求头中指定名称的头信息值。两者都由框架的参数解析器自动完成类型转换。
  - 设计目的：全面覆盖 RESTful 架构中所有参数传递方式——Query 参数、Path 参数、Header 参数、Body 参数，使控制器方法能自然地表达 REST 接口的完整语义。

### 常用参数注解总结

- `@RequestParam`：单个请求参数与控制器方法参数的绑定，可指定参数名映射。
  - 设计思路：`@RequestParam` 用于从 URL 查询参数（`?key=value`）或表单 POST 参数中提取单个值。它的存在让参数映射从"隐式（自动匹配）"变为"显式（明确声明）"，增强代码的可读性和健壮性。
  - 设计实现：支持 `required`（是否必填，默认 true）、`defaultValue`（默认值）、`name`/`value`（参数名）三个核心属性。当 `required=true` 且参数缺失时，框架自动抛出 `MissingServletRequestParameterException`。
  - 设计目的：提供精确的参数级别控制——每个参数可以独立声明是否必填、默认值是什么、来源参数名是什么，使 API 契约在代码层面完全可见。

- `@RequestBody`：将 HTTP 请求体 (Body) 绑定到 JavaBean 对象，常用于 POST/PUT 请求的 JSON 数据接收。
  - 设计思路：随着 JSON 成为前后端通信的事实标准，请求体通常是一个完整的 JSON 对象而非零散的键值对。`@RequestBody` 将整个请求体作为一个整体绑定到 Java 对象上，支持复杂的嵌套结构。
  - 设计实现：Spring MVC 通过 `HttpMessageConverter` 链查找能处理 `Content-Type: application/json` 的转换器（通常是 `MappingJackson2HttpMessageConverter`），将 JSON 字符串反序列化为目标 Java 对象。转换失败时抛出 `HttpMessageNotReadableException`。
  - 设计目的：实现 JSON 与 Java 对象的透明互转，使 RESTful API 的请求接收如同调用普通 Java 方法一样自然。

- `@PathVariable`：绑定 URI 模板变量，用于 RESTful 风格的 URL。
  - 设计思路：REST 风格将资源定位信息嵌入 URL 路径中，体现资源的层级结构和唯一标识。`@PathVariable` 使开发者能直接在方法参数中获取这些路径片段的值。
  - 设计实现：URL 模板中的 `{variableName}` 与方法参数上的 `@PathVariable("variableName")` 通过名称匹配。支持正则表达式约束（如 `{id:\\d+}` 限制只匹配数字）。
  - 设计目的：原生支持 RESTful URL 设计范式，使 URL 路径中的资源标识符与 Controller 方法参数自然对应。

- `@RequestHeader`：绑定请求头中的值。
  - 设计思路：HTTP 请求头承载了大量元数据（认证令牌、内容类型、缓存控制等），`@RequestHeader` 让这些元数据可以像普通方法参数一样被访问和校验。
  - 设计目的：将请求头的访问从低层 API（`request.getHeader("...")`）提升到方法参数级别，统一了所有请求数据的获取方式。

- `@ModelAttribute`：自定义取值及赋值方法，可用于数据预初始化。
  - 设计思路：`@ModelAttribute` 允许开发者在 Controller 的每个处理方法执行前，预先从数据库或其他数据源加载数据并放入 Model 中。这常见于编辑页面的数据回显场景（如修改用户信息前先查出用户当前数据填充到表单中）。
  - 设计实现：标注了 `@ModelAttribute` 的方法会在每个请求处理方法之前执行（在同一个 Controller 中），其返回值自动放入 Model 中供后续处理方法和视图使用。
  - 设计目的：分离数据预加载逻辑与核心业务处理逻辑，避免在每个处理方法中重复编写数据初始化代码。

---

## 响应处理与视图 (Response Handling & Views)

### 响应处理方式 (Response Methods)

- Spring MVC 对传统 Servlet 的响应处理进行了大量简化，提供 ModelAndView 对象将响应的内容 (Model) 和视图 (View) 进行解耦合 (Decoupling)。
  - 设计思路：传统 Servlet 中，模型数据通过 `request.setAttribute()` 放入请求作用域，视图通过 `request.getRequestDispatcher().forward()` 进行跳转——数据和视图是松散耦合的，依赖开发者的编程纪律来保证一致性。Spring MVC 通过 ModelAndView 将"去哪"（View）和"带什么"（Model）封装为一个统一的对象，使请求处理的返回语义更加清晰。
  - 设计实现：ModelAndView 内部维护一个 ModelMap（存储数据）和一个视图名或 View 对象（指定跳转目标）。Controller 返回 ModelAndView 后，DispatcherServlet 将其拆解为 Model 和 View 分别交给 ViewResolver 和 View 处理。
  - 设计目的：以显式的数据结构表达"模型与视图"的绑定关系，消除"数据放了但视图不对"和"视图对了但数据没放"这两类常见错误。

- `@ResponseBody`：不进行页面跳转和视图渲染，直接输出响应文本，包括标准 JSON 格式；实际使用中一般返回 JSON 字符串。
  - 设计思路：在前后端分离架构中，后端的职责是提供数据接口而非渲染 HTML 页面。`@ResponseBody` 使操作方法绕过整个视图解析渲染流程，直接将返回值序列化后写入 HTTP 响应体。
  - 设计实现：当方法标注 `@ResponseBody` 时，返回值处理器使用 `HttpMessageConverter` 链进行序列化。对于返回类型为 Java 对象的方法，Jackson 自动将其转为 JSON；对于返回类型为 String 的方法，直接写入响应体。Spring MVC 还支持内容协商（Content Negotiation），根据请求的 Accept 头决定输出 JSON 或 XML。
  - 设计目的：使同一个 Controller 编程模型能同时满足"页面渲染"和"API 接口"两种场景，无需在不同框架间切换。

- **ModelAndView (模型与视图)**：通过 JSP、FreeMarker、Thymeleaf 等模板引擎进行视图渲染。
  - 设计思路：ModelAndView 是"服务端渲染"模式的承载对象。它封装了渲染一个页面所需的所有信息：数据（Model）和目标模板（View），将这两个关注点打包为一个原子单元交给框架处理。
  - 设计目的：为服务端视图渲染提供标准化的数据载体，确保不同视图技术（JSP、FreeMarker、Thymeleaf）在使用方式上保持一致。

- 默认视图采用 JSP 方式；老版本推荐 FreeMarker；3.x 开始推荐 Thymeleaf。
  - 设计思路：Spring 推荐 Thymeleaf 的决定反映了视图技术的演进方向——从 JSP 的"Java 代码嵌入 HTML"到 FreeMarker 的"模板语言嵌入 HTML"，再到 Thymeleaf 的"纯 HTML 加属性标注"。"纯 HTML"意味着模板文件可以在浏览器中直接打开预览，极大改善了前后端并行开发的体验。
  - 设计目的：推进视图技术的现代化——降低前端与后端的耦合度，使模板文件脱离服务器也能独立存在和预览。

### ModelAndView 详解

- 产生页面跳转的方法返回类型为 ModelAndView。
  - 设计思路：将页面跳转决策从 `request.getRequestDispatcher().forward()` 这类底层 API 抽象为方法返回值的类型声明——方法的签名直接表明"这个方法会产生一次页面跳转"。
  - 设计目的：让方法的返回类型自文档化地表达其职责——返回 ModelAndView 表示页面渲染，返回 @ResponseBody 标注的类型表示数据响应。

- ModelAndView 中的对象默认作用域为 request (请求作用域)。
  - 设计思路：请求作用域（Request Scope）是 Web 应用中最安全的数据作用范围——数据仅在一次 HTTP 请求的生命周期内有效，请求结束后自动释放。将 Model 默认放在 request 作用域中，避免了 Session 作用域中数据驻留导致的内存占用和数据污染问题。
  - 设计目的：遵循最小作用域原则——数据只在需要它的范围内存在，减少并发环境下的数据混淆风险。

- ModelAndView 的页面跳转方式默认为 forward (转发)。
  - 设计思路：forward（转发）是服务器内部的资源流转，URL 不变、请求对象不变、客户端无感知。与之相对的 redirect（重定向）会让浏览器发起一个新的 HTTP 请求，URL 改变、请求对象丢失。将 forward 设为默认是基于这样一个判断：大多数视图渲染场景下前端不需要感知后端的内部跳转。
  - 设计目的：给开发者提供一致的默认行为（转发），同时保留在需要时通过前缀 `redirect:` 实现重定向的能力。

- ModelAndView 在 Model 的基础上添加了视图对象，需要程序员手动创建。
  - 设计思路：这是 ModelAndView 与 Model 的核心区别——Model 只承载数据，视图名由方法的 String 返回值指定；ModelAndView 将视图和数据封装为一个对象，由程序员在方法体中显式创建。
  - 设计目的：提供两种不同抽象级别的编程范式——轻量级（返回 String/Model）用于简单页面，重量级（返回 ModelAndView）用于需要精细控制视图和数据绑定的场景。

### Model / ModelMap / ModelAndView 对比

- Spring MVC 中用于存放数据的有三个对象：`ModelMap`、`Model`、`ModelAndView`。
  - 设计思路：Spring MVC 同时提供三个数据存放对象并非冗余设计，而是面向不同使用场景和不同编程习惯的分层抽象。理解它们的继承关系和创建时机是区分它们的关键。
  - 设计实现：三者的继承关系为 `ModelMap` → `LinkedHashMap<String, Object>`；`Model` → `ModelMap`；`ModelAndView` 组合了 `ModelMap` 和视图对象。在具体使用中，`Model` 是接口，`ModelMap` 是实现，`ModelAndView` 是两者的包装和扩展。

- ModelMap 和 Model 由拦截器自动创建 (类似于 Struts 2 的值栈概念)，在 Controller 功能方法之前运行。
  - 设计思路：与 Struts 2 的值栈（Value Stack）类似，Spring MVC 在请求到达处理方法之前自动准备好数据容器。开发者只需在方法参数中声明 `Model model`，框架即传入已创建好的实例。这种"容器自动初始化"的设计让开发者无需关心数据容器的生命周期管理。
  - 设计目的：进一步降低 Controller 代码中的框架侵入性——开发者写 `model.addAttribute("user", user)` 即可，无需 `new ModelMap()`。

- 可使用 `@ModelAttribute` 注解自定义取值及赋值方法。
  - （设计要点已在参数注解章节阐述）
- ModelAndView 在 Model 基础上添加了视图对象，需要程序员创建。
  - （设计要点已在 ModelAndView 章节阐述）

- 根据继承关系，赋值和取值能力排序：**ModelAndView > Model > ModelMap**。
  - 设计思路：这种能力梯度反映了设计的自然结果——`ModelMap` 是基础实现，`Model` 接口可能添加了额外方法，`ModelAndView` 进一步添加了视图相关操作。开发者应根据实际需求选择合适层次的对象，避免使用超出需求的能力（如只需要加数据时用 ModelAndView 反而引入不必要的视图操作复杂度）。
  - 设计目的：尊重接口隔离原则——使用最小粒度的接口满足当前需求，降低不必要的耦合。

### 视图层解决方案 (View Layer Solutions)

- Spring MVC 支持多种 View 层解决方案：JSP (默认)、FreeMarker (老版本推荐)、Thymeleaf (Spring Boot 推荐、当前主流)。
  - 设计思路：视图技术是 Web 框架中最容易产生"技术锁定"的环节。Spring MVC 通过 View 接口和 ViewResolver 策略将视图技术彻底抽象化，使得任何一种视图技术都可以被"插入"框架中。这种设计哲学是 Spring 一贯的"不重新发明轮子，而是提供统一的抽象层"。
  - 设计实现：通过实现 View 接口和对应的 ViewResolver，Spring MVC 支持几乎所有主流视图技术——JSP、FreeMarker、Thymeleaf、Velocity、Groovy Markup、Mustache，甚至 PDF、Excel 等非 HTML 视图。
  - 设计目的：让架构师根据项目特点和技术演进趋势自由选择最合适的视图技术，而不被框架锁定。

- 传统 JSP、FreeMarker 等在组件化 (Componentization) 和去耦合 (Decoupling) 上有明显缺点。
  - 设计思路：JSP 的本质是编译为 Servlet 的 Java 代码，模板中可直接写入 Java 脚本（Scriptlet），这导致业务逻辑可能泄露到视图层，破坏分层架构。FreeMarker 虽然禁止了内嵌 Java 代码，但其自定义模板语法使得模板文件无法脱离后端独立查看——页面原型必须在服务器启动后才能预览。
  - 设计实现：JSP 在编译时将 `<% ... %>` 中的 Java 代码直接嵌入生成的 Servlet 类中，使得视图和逻辑深度耦合。FreeMarker 使用 `${...}` 和 `<#...>` 语法，浏览器无法解析这些非标准标签。
  - 设计目的：识别并淘汰那些违背"数据与呈现分离"原则的视图技术方案。

- **Thymeleaf** 的核心特点是数据和 HTML 的分离 (Separation of Data and HTML)，模板文件可以直接在浏览器中预览。
  - 设计思路：Thymeleaf 的设计哲学是"自然模板"（Natural Template）——模板文件本身就是一个合法的、可正常打开的 HTML 文件。`th:text` 等 Thymeleaf 属性在浏览器中会被忽略（HTML5 允许自定义属性），数据占位符则显示为示例文本。这意味着前端工程师可以用浏览器直接打开模板文件查看页面效果，无需启动后端服务器。
  - 设计实现：Thymeleaf 使用标准 HTML 属性（`th:text`、`th:each`、`th:if` 等）进行数据注入，模板处理时 Thymeleaf 引擎解析 DOM 树，将 `th:*` 属性替换为实际数据，生成最终的 HTML 输出。
  - 设计目的：实现真正的前后端并行开发——前端写 HTML 原型，后端在同一份文件上添加数据绑定属性，两者可以在不启动服务器的情况下交替工作。

- 模板语法对比：
  - Velocity: `<p>$message</p>`
  - FreeMarker: `<p>${message}</p>`
  - Thymeleaf: `<p th:text="${message}">Hello World!</p>`
  - 设计思路：从三种模板语法的演进可以看到视图技术"去侵入化"的清晰轨迹。Velocity 和 FreeMarker 的语法直接嵌入 HTML 文本内容区域，破坏了 HTML 的静态有效性。Thymeleaf 的语法是作为 HTML 的自定义属性存在的，模板文件在浏览器中打开时显示 `Hello World!`（占位样例文本），在服务器端渲染时替换为实际数据。
  - 设计目的：让模板文件在"静态预览"和"动态渲染"两种模式下均有合理的表现，弥合前端开发与后端开发之间的体验断层。

- Thymeleaf 的优势：静态原型即模板，前端和后端可并行开发。
  - 设计思路：这是 Thymeleaf 架构价值的核心概括。"静态原型即模板"意味着前端工程师产出的 HTML 页面不需要经过后端工程师的二次改造即可直接作为模板使用——后端只需在其中添加 `th:*` 属性标注动态部分。这从根本上改变了传统流程中"先写后端模板，前端再做样式"或"前端写完静态页，后端再人工转换成 JSP/FreeMarker"的低效模式。
  - 设计目的：通过"自然模板"设计消除前端开发与后端开发之间的阻塞依赖，使团队协作流程从串行变为并行，显著提升开发效率。

---

## Web 容器对象使用 (Web Container Objects)

- 在 Spring MVC 的 Controller 中使用 Web 容器对象 (HttpServletRequest, HttpServletResponse, HttpSession 等)，分为耦合方式和非耦合方式。
  - 设计思路：Web 开发中不可避免地需要访问一些原生的 Servlet 容器对象（如获取 Session 中的用户信息、设置 Cookie、读取请求头中的 Token 等）。Spring MVC 提供了两种使用方式，开发者需要根据"可测试性"和"便利性"之间的权衡做出选择。
  - 设计目的：在"屏蔽底层 API"和"访问底层 API"之间架设一座灵活选择的桥梁，既保证正常情况下的高层抽象，又保留特殊场景下的底层访问能力。

- **耦合方式 (Coupled)**：通过接口在 Controller 方法参数中直接声明并获取容器对象，代码与 Servlet API 紧耦合。
  - 设计思路：耦合方式是在 Controller 方法签名中直接声明 `HttpServletRequest request` 作为参数，框架自动将当前请求的容器对象注入。这种方式最简单直观，兼容所有原生 Servlet API，但代价是 Controller 代码与 Servlet API 深度耦合——单元测试时必须提供 Mock 的 `HttpServletRequest` 等对象。
  - 设计实现：Spring MVC 的参数解析器链中包含 `ServletRequestMethodArgumentResolver`，当检测到方法参数类型为 `HttpServletRequest`、`HttpServletResponse`、`HttpSession` 等时，自动注入当前请求对应的容器对象。
  - 设计目的：为需要直接操作原生 Servlet API 的场景（如文件下载设置响应头、特殊 Cookie 操作）提供最直接的访问路径，不剥夺开发者的底层控制权。

- **非耦合方式 (Decoupled)**：通过 Spring MVC 提供的接口进行注入，降低对 Servlet API 的直接依赖，更有利于单元测试 (可轻松 Mock 容器对象)。
  - 设计思路：非耦合方式的核心思想是"依赖倒置"——Controller 不直接依赖 Servlet API 的具体类，而是依赖 Spring MVC 提供的抽象接口或直接在参数中接收已提取好的数据对象（如通过 `@RequestParam` 接收参数而不是 `request.getParameter()`）。这样在单元测试中只需提供普通的 Java 对象即可，无需模拟整个 Servlet 环境。
  - 设计实现：通过 `@RequestParam`、`@PathVariable`、`@RequestHeader` 等注解直接从容器对象中提取值，避免方法体中出现 `request.getParameter()` 调用。对于需要访问 Web 作用域数据的场景，使用 `@SessionAttributes` 或 `RequestContextHolder` 等更抽象的方式。
  - 设计目的：最大化 Controller 的可测试性——脱离 Servlet 容器的 Controller 单元测试可以像普通 Java 类一样快速地运行和验证，不需要启动重量级的 Servlet 容器。

---

## 参数校验 (Parameter Validation)

### @Valid 与 @Validation 注解对比

- `@Validation` 注解：Spring Framework 提供的验证机制，是 JSR-303 规范的一个变种 (Variant)；可使用在类型、方法和方法参数上，但**不能**使用在类的成员属性上（不支持嵌套验证）。
  - 设计思路：`@Validation` 是 Spring 在 Hibernate Validator 成为 JSR-303 参考实现之前提供的过渡方案。它可以作为方法级的验证入口，但设计上不支持嵌套验证（即被验证对象的属性中包含另一个需要验证的对象时，不会递归验证子对象属性）。
  - 设计实现：`@Validation` 通过 Spring 自身的 `Validator` 接口（`org.springframework.validation.Validator`）工作，验证逻辑完全由 Spring 管理，不依赖外部的 Bean Validation 实现。
  - 设计目的：在早期 JSR-303 规范不成熟的阶段，为 Spring 应用提供一套自包含的参数验证机制。

- `@Valid` 注解：Hibernate 框架提供的验证机制，符合 JSR-303 标准规范，比 @Validation 更强大；可以使用在类的成员属性上，所以支持嵌套验证 (Nested Validation)。
  - 设计思路：`@Valid` 源自标准的 Bean Validation 规范（JSR-303/JSR-380），其设计理念是将验证规则以注解的方式声明在 JavaBean 的属性上，由验证框架在运行时自动执行。支持嵌套验证意味着当 User 对象包含一个 Address 对象时，`@Valid` 会递归验证 Address 对象的属性——这是处理复杂嵌套表单的核心能力。
  - 设计实现：Hibernate Validator 作为 Bean Validation 的参考实现，在运行时通过反射读取注解约束，构建验证器元数据，然后对目标对象进行深度优先的递归验证。验证失败的结果封装在 `BindingResult` 或 `Errors` 对象中，不会直接抛出异常。
  - 设计目的：提供一套标准的、与框架无关的 Java Bean 验证方案，使验证逻辑可以跨层（Web 层、Service 层、持久层）共享同一套注解约束。

- Spring Framework 默认使用 @Validation 进行参数校验；Spring Boot 同时集成了两种注解，开发者可自行选择。
  - 设计思路：Spring Framework 的历史包袱使其默认选用了 `@Validation`，但 Spring Boot 作为更现代的集成方案同时暴露两种选择，让开发者根据需求选择。在实践中，由于嵌套验证的刚需和标准化趋势，`@Valid` 的使用更为广泛。
  - 设计目的：兼容旧系统（使用 `@Validation` 的老项目可以平稳迁移到 Spring Boot），同时为新项目提供标准的 `@Valid` 选择。

### 常用验证注解 (Common Validation Annotations)

- `@NotNull`：不能为 null
  - 设计思路：`null` 是 Java 中最常见的数据异常来源，`@NotNull` 在数据进入业务逻辑之前就拦截了 null 值，避免了散落在代码各处的空指针异常（NullPointerException）。
  - 设计目的：将 null 校验从业务代码中提升到数据验证层，实现"快速失败"（Fail Fast）原则。

- `@Null`：必须为 null
  - 设计思路：某些场景下需要确保某个字段确实没有值（如新增记录时 ID 字段应为 null，由数据库自动生成）。`@Null` 提供这种"反向校验"能力。

- `@AssertTrue` / `@AssertFalse`：必须为 true / false
  - 设计思路：用于布尔表达式的语义校验，如"用户必须同意服务条款"（`@AssertTrue` 标注在 `agreedToTerms` 字段上）。

- `@Digits`：必须为数字（可指定整数和小数位数）
  - 设计思路：金额类字段需要精确的数字格式约束，`@Digits(integer=5, fraction=2)` 确保数字不超过 99999.99。

- `@Max` / `@Min`：指定整数的最大值和最小值
  - 设计思路：将业务规则（如"年龄必须在 18 到 65 之间"）直接编码为注解，便于规则的可视化和统一管理。

- `@Length`：指定字符串的最小和最大长度
  - 设计思路：数据库字段长度限制应尽早在前置验证中反映，避免持久化时才报错。

- `@NotEmpty`：不能为空（包括 null、空字符串、空集合）
  - 设计思路：`@NotEmpty` 将"存在性"校验泛化到字符串和集合类型——不仅是 null 检查，还包括空字符串和空集合的检查。

- `@NotBlank`：不能为空（包括 null、trim 后为空字符串）
  - 设计思路：`@NotBlank` 进一步排除了纯空白字符（空格、制表符等）的输入，是最严格的"非空"约束。适合用于用户名、标题等不允许纯空白的字段。

- `@Email`：必须为合法的 Email 格式
  - 设计思路：电子邮件格式是 Web 应用中最常见的格式校验需求，通过声明式注解替代手动正则表达式实现。

- `@Pattern`：必须符合指定的正则表达式
  - 设计思路：`@Pattern` 是万能格式校验的后门——当内置注解无法满足需求时，通过正则表达式自定义格式约束。

---

## 拦截器 (Interceptors)

### 拦截器概述 (Overview)

- Spring MVC 拦截器 (Interceptor) 类似于 Servlet 技术中的过滤器 (Filter)，用于对请求进行前置 (Pre-handle) 和后置 (Post-handle) 的过滤处理。
  - 设计思路：拦截器是 Spring MVC 提供的"请求拦截"抽象层。虽然 Servlet 规范已经提供了 Filter 机制，但 Filter 运作在 Servlet 级别而非 Spring MVC 级别，无法访问到 Spring 特有的上下文信息（如被调用的具体 Controller 和方法）。拦截器填补了这一粒度差距。
  - 设计实现：拦截器围绕 Controller 方法的执行前后提供三个切入点——`preHandle()`（方法执行前）、`postHandle()`（方法执行后、视图渲染前）、`afterCompletion()`（视图渲染后）。这三个切入点的设计遵循了 AOP 环绕通知（Around Advice）的模式。
  - 设计目的：在 Spring MVC 的请求处理链中提供一个面向 Spring 生态的切面拦截层，将"跨 Controller 的通用逻辑"集中处理。

- 实现系统的 plug-in (插件) 功能，达到业务功能部分 (Business Logic) 和非业务功能部分 (Cross-cutting Concerns) 解耦的目的。
  - 设计思路："插件化"设计的本质是将非核心功能从核心流程中解耦，使其可以独立开发、独立启用、独立替换。拦截器天然是一个插件化的设计——每个拦截器是一个独立的组件，可以在配置中灵活增删、排序，而无需修改任何 Controller 的代码。
  - 设计实现：拦截器的注册和排序通过实现 `WebMvcConfigurer` 接口或通过 `@Configuration` + `implements WebMvcConfigurer` 完成。多个拦截器组成有序链，`preHandle` 按注册顺序执行，`postHandle` 和 `afterCompletion` 按逆序执行。
  - 设计目的：遵循开闭原则（Open-Closed Principle）——对扩展开放（新增拦截器），对修改关闭（已有 Controller 代码无需变动）。

- Spring MVC 拦截器的实现机制基于 **Spring AOP**，与 Servlet 中的过滤器及其他 Web 框架的过滤/拦截器机制不同。
  - 设计思路：拦截器不是对 Servlet Filter 的简单封装，而是一套独立设计的基于 Spring AOP 的拦截体系。之所以基于 AOP，是因为拦截器需要能够访问被拦截方法（Handler）的元信息——这是纯 Servlet Filter 做不到的。
  - 设计实现：DispatcherServlet 在执行 Handler 之前构建 `HandlerExecutionChain`，链中包含注册的拦截器和目标 Handler。`HandlerExecutionChain.applyPreHandle()` 依次调用拦截器的 `preHandle()`，任何一个返回 false 都会中断链的继续执行。
  - 设计目的：利用 AOP 的思想实现"对 Controller 方法的环绕拦截"，既获得更丰富的上下文信息，又保持与 Spring 生态（依赖注入、AOP 配置）的完全一致性。

### 拦截器与过滤器对比 (Interceptor vs Filter)

- **实现机制不同**：拦截器基于 Spring AOP，过滤器基于 Servlet 规范。
  - 设计思路：这是两者最根本的差异。过滤器是 Servlet 规范定义的组件，由 Servlet 容器（Tomcat、Jetty 等）负责管理和调用。拦截器是 Spring MVC 框架定义的组件，由 Spring IoC 容器管理和调用。两者处于不同的抽象层次。
  - 设计目的：理解这个差异有助于在合适的场景选择合适的工具——需要拦截所有进入容器的请求（含静态资源）选 Filter；需要拦截 Controller 方法执行的选 Interceptor。

- **作用范围不同**：过滤器作用于所有进入容器的请求 (含静态资源)；拦截器只作用于经过 DispatcherServlet 的 Controller 请求。
  - 设计思路：Filter 在 DispatcherServlet 之前执行，因此可以拦截到对静态资源（CSS、JS、图片）的请求。Interceptor 在 DispatcherServlet 内部执行，此时请求已经被分发到具体的 Handler，只作用于对应的 Controller 方法。
  - 设计目的：这种范围差异决定了拦截器的代码可以更大胆地使用 Spring 特性（如依赖注入 @Autowired），因为拦截器本身就是 Spring Bean；而 Filter 通常需要额外配置 `DelegatingFilterProxy` 才能享受 Spring 的依赖注入。

- **控制粒度不同**：拦截器可以更细粒度地控制，能够获取被拦截方法 (Handler) 的上下文信息 (如目标 Controller、方法参数等)；过滤器只能访问 Request/Response 对象。
  - 设计思路：这是拦截器相比过滤器的核心优势。拦截器的 `preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)` 中的 `handler` 参数提供了被拦截的目标处理器信息——通过 `handler instanceof HandlerMethod` 可以获取到具体的 Controller 类、方法名、方法参数和注解信息。
  - 设计实现：利用 `HandlerMethod` 的反射能力，拦截器可以实现基于注解的声明式权限控制（如检查方法上是否有 `@AdminOnly` 自定义注解），这是 Filter 无法直接做到的。
  - 设计目的：将访问控制逻辑与 API 方法绑定在代码层面，而非分散在配置文件中。

- **生命周期管理不同**：拦截器由 Spring IoC 容器管理，可以使用依赖注入；过滤器由 Servlet 容器管理。
  - 设计思路：生命周期管理的差异直接影响了组件的"一等公民"地位。拦截器是 Spring Bean，可以轻松注入 Service、Repository 等依赖，享受 AOP 增强等 Spring 能力。Filter 默认由 Servlet 容器管理，不在 Spring IoC 容器中。
  - 设计目的：让需要访问业务服务的拦截逻辑（如登录校验需要调用 UserService）可以自然地使用 Spring 的依赖注入，而不需要通过手动查找或额外配置。

### 拦截器典型应用场景

- 登录权限检查 (Authentication)：拦截未登录请求，跳转到登录页。
  - 设计思路：认证拦截是最经典的拦截器场景。通过在 `preHandle` 中检查 Session 是否存在用户信息，拦截未登录用户对受保护页面的请求，统一跳转到登录页。这对所有需要登录才能访问的 Controller 透明生效，无需在每个 Controller 方法中重复编写登录检查代码。
  - 设计目的：将认证关注点从业务 Controller 中完全抽离，由拦截器统一处理。

- 日志记录 (Logging)：记录请求 URL、参数、响应时间、用户信息等。
  - 设计思路：通过拦截器的三个切入点可以完整记录一次请求的生命周期——`preHandle` 记录请求开始时间和入参，`postHandle` 记录处理结果，`afterCompletion` 计算处理耗时并输出完整日志。
  - 设计目的：日志记录是典型的横切关注点，通过拦截器实现零侵入式日志收集。

- 性能监控 (Performance Monitoring)：统计每个请求的执行时间。
  - 设计思路：与日志记录类似，性能监控通过在 `preHandle` 中记录开始时间戳，在 `afterCompletion` 中计算耗时差值，可以将每个接口的执行时间输出到监控系统。
  - 设计目的：在不修改任何业务代码的前提下，为系统提供全面的性能基线数据。

- 结合 Logback 实现用户流量的监控 (Traffic Monitoring)。
  - 设计思路：将拦截器获得的请求数据与 Logback 等日志框架集成，可以将流量监控数据输出到文件、数据库或监控平台（如 Grafana + Prometheus），实现生产环境的用户行为分析。

---

## 全局异常处理 (Global Exception Handling)

- 通过 `@ControllerAdvice` 注解定义全局异常处理器 (Global Exception Handler)。
  - 设计思路：在大型应用中，不同的 Controller 可能抛出相同类型的异常（如 `UserNotFoundException`、`ValidationException`），若在每个 Controller 中逐个 try-catch 处理，会造成大量重复且不一致的异常处理代码。全局异常处理器将所有 Controller 的异常处理逻辑汇聚到一个或多个切面类中，实现了异常处理的集中化。
  - 设计实现：`@ControllerAdvice` 注解本质上是一个特殊的 `@Component`，作用域覆盖所有（或选定包下的）Controller。标注了 `@ControllerAdvice` 的类中的 `@ExceptionHandler` 方法会在匹配的异常发生时被自动调用。
  - 设计目的：统一异常处理口径，保证无论哪个 Controller 抛出同类型异常，都返回一致的错误响应格式，改善 API 的消费体验。

- 结合 `@ExceptionHandler` 注解处理特定类型的异常。
  - 设计思路：`@ExceptionHandler` 的方法签名声明了该方法负责处理的异常类型，方法体定义具体的处理逻辑（如记录日志、发送告警、返回用户友好的错误信息）。框架通过异常类型匹配找到最具体的处理器方法。
  - 设计实现：当 Controller 抛出异常时，Spring MVC 首先查找该 Controller 内部的 `@ExceptionHandler` 方法，若未找到，则查找所有 `@ControllerAdvice` 类中的匹配方法。这种两级查找机制兼顾了局部特殊处理和全局通用处理。
  - 设计目的：建立"异常类型 → 处理逻辑"的声明式映射体系，将异常处理从 try-catch 的指令式编程提升为声明式编程。

- 避免在每个 Controller 中重复编写 try-catch 逻辑，实现异常处理的统一管理和一致的错误响应格式。
  - 设计思路：重复的 try-catch 是代码坏味道（Code Smell）的典型表现。全局异常处理通过 AOP 思想在 Controller 外围织入异常处理逻辑，使得 Controller 方法本身只需要正常抛出异常（Fail Fast），由外围切面统一捕获和翻译。
  - 设计目的：贯彻 DRY 原则和单一职责原则——Controller 负责正常流程，异常处理由专门组件负责，两者各司其职。

---

## 登录功能实现示例 (Login Implementation)

- Spring MVC 可实现完整的登录功能：用户提交登录表单 → Controller 接收参数 → 调用 Service 层验证 → 根据结果返回不同视图或 JSON 响应。
  - 设计思路：这个流程展示了 Spring MVC 经典的分层协作模式——Web 层（Controller + 拦截器）、业务层（Service）、数据层（DAO/Repository）各司其职，层与层之间通过接口通信。Controller 不直接操作数据库，Service 不处理 HTTP 细节，体现了严格的关注点分离。
  - 设计实现：Controller 方法通过 `@PostMapping` 接收登录表单或 JSON 数据，使用 `@RequestParam` 或 `@RequestBody` 绑定账号密码，调用 Service 层执行认证逻辑，根据认证结果返回不同视图（成功跳转首页、失败返回登录页带错误信息）或 JSON 响应（`{ "success": true, "token": "..." }` 或 `{ "success": false, "message": "用户名或密码错误" }`）。
  - 设计目的：以完整的登录案例验证分层架构的可行性——每一层的职责边界在实际业务中确实清晰可辨，不存在职责交叉或职责漏洞。

- 可结合拦截器实现登录状态检查与页面保护 (Authentication Interceptor)。
  - 设计思路：登录保护是拦截器的最典型应用——在 `preHandle` 中检查 HttpSession 是否包含当前用户信息，若有则放行，若无则重定向至登录页。除登录页、注册页和静态资源外，所有页面都应该被这个拦截器保护。
  - 设计目的：通过拦截器实现声明式的安全控制，使安全策略的变更（如新增免登录路径）只需调整拦截器配置，不影响任何业务 Controller。

---

## HelloWorld 最小化配置回顾 (HelloWorld Recap)

- Maven 依赖：`spring-webmvc`。
  - 设计思路：`spring-webmvc` 作为传递依赖会自动引入 `spring-context`、`spring-beans`、`spring-core`、`spring-web` 等核心模块，体现了 Spring 模块化设计的精髓——开发者只需声明对表示层框架的依赖，底层的 IoC、AOP 等基础设施由依赖传递自动引入，无需手动逐一添加。
  - 设计目的：降低新手的学习和配置门槛——一个依赖即可获得完整的 Spring MVC 运行时环境。

- web.xml 配置：注册 DispatcherServlet，指定配置文件路径。
  - 设计思路：DispatcherServlet 是 Spring MVC 的唯一入口，必须在 web.xml 或通过 Java Config 进行注册。传统 web.xml 配置方式中，通过 `<servlet>` 和 `<servlet-mapping>` 声明 DispatcherServlet 并指定其 URL 模式（通常为 `/` 代表拦截所有请求）。
  - 设计目的：将框架入口显式注册到 Servlet 容器中，建立 Servlet 容器与 Spring IoC 容器之间的桥梁。

- applicationContext.xml 配置：开启组件扫描 (Component Scan)、配置视图解析器 (View Resolver)。
  - 设计思路：组件扫描是 Spring 自动发现和管理 Bean 的基础机制。视图解析器配置决定了 Controller 返回的逻辑视图名如何转换为物理视图文件路径。这两个配置是 Spring MVC 启动的最小必要配置集。
  - 设计目的：通过最小配置集体现 Spring MVC 的"约定优于配置"理念——默认行为已经足够好，开发者只需显式配置必要的差异项。

- Controller 编写：`@Controller` + `@GetMapping("/hello")` + `@ResponseBody`。
  - 设计思路：这三个注解的组合构成了 Spring MVC 中最小的可用 Controller——`@Controller` 标识类为控制器、`@GetMapping("/hello")` 声明 URL 映射、`@ResponseBody` 指定返回内容直接写入响应体。三者代表了 Controller 的三个核心职责：身份标识、路由映射、响应策略。
  - 设计目的：让开发者在一分钟内完成第一个可运行的 Web 接口，降低学习曲线。

- 运行时访问：`http://localhost:8080/hello`。
  - 设计思路：该 URL 由三部分组成：主机（localhost）、端口（8080，Tomcat 默认端口）、路径（/hello，与 @GetMapping 中的路径对应）。请求到达 Tomcat → 匹配 DispatcherServlet 的 URL 模式 → 进入 Spring MVC 处理流程 → HandlerMapping 找到对应方法 → 执行并返回结果。
  - 设计目的：通过最简单的 HelloWorld 场景完整走通 Spring MVC 的请求处理全链路，建立对整体架构的感性认知。

---

## 本章小结 (Chapter Summary)

- **Spring 框架与 Spring MVC 简介**：Spring Framework 是提供全面基础设施支持的 Java 平台；Spring MVC 是其表示层模块，基于 IoC 容器运行。
  - 设计思路总结：Spring 生态系统通过严格的模块化分层实现了"核心容器 → 领域模块 → 表示层框架"的架构谱系。Spring MVC 不是孤立框架，而是 Spring IoC 生态在 Web 层的自然延伸和特殊化应用。
  - 设计目的总结：让开发者以一致的编程模型（POJO + 注解 + 依赖注入）横跨业务层到 Web 层，消除不同层之间的技术范式断层。

- **架构和核心原理**：DispatcherServlet (前端控制器) → HandlerMapping (处理器映射) → Controller (控制器) → ModelAndView (模型与视图) → ViewResolver (视图解析) → View 渲染 → Response (响应)。
  - 设计思路总结：这条处理链是前端控制器模式、策略模式和模板方法模式三种经典设计模式在 Spring MVC 中的综合运用。每一步都通过接口抽象，每一步都可被开发者替换和定制。
  - 设计目的总结：将 HTTP 请求的完整生命周期分解为七个职责单一的阶段，每个阶段由专门的组件负责，组件之间通过接口解耦，实现高内聚、低耦合的架构目标。

- **使用详解核心技术点**：URL 映射注解 (@RequestMapping / @GetMapping / @PostMapping)、请求参数获取 (@RequestParam / @RequestBody / @PathVariable)、响应处理 (@ResponseBody / ModelAndView)、视图解决方案 (JSP / FreeMarker / Thymeleaf)、参数校验 (@Valid / @Validation)、Web 容器对象使用 (耦合/非耦合方式)。
  - 设计思路总结：这些核心技术点围绕一个中心展开——让 Controller 成为一个"薄适配层"，它的全部工作是将 HTTP 协议转换为 Java 方法调用，再将 Java 返回值翻译回 HTTP 响应。
  - 设计目的总结：使开发者能以书写普通 Java 方法的方式编写 Web 接口，将 HTTP 协议的复杂性完全封装在框架层。

- **扩展学习**：拦截器 (基于 Spring AOP 的请求预处理与后处理)、全局异常处理 (@ControllerAdvice + @ExceptionHandler)、最佳实践问题。
  - 设计思路总结：拦截器和全局异常处理是 Spring MVC 中两个重要的"横向扩展"机制——它们不改变请求处理的主流程，而是在主流程的固定节点上提供了扩展点，体现了框架设计中的开闭原则。
  - 设计目的总结：鼓励开发者在掌握核心流程后，利用框架提供的扩展点构建健壮、可维护的企业级应用。

---

## 客观考点总结

### 选择题 / 填空题考点

1. Spring MVC 的前端控制器是 **DispatcherServlet**，它是整个请求处理流程的统一入口。
2. Spring MVC 的请求处理流程：请求 → DispatcherServlet → **HandlerMapping** → Controller → ModelAndView → **ViewResolver** → View 渲染 → 响应。
3. `@RequestMapping` 用于通用 URL 映射，`@GetMapping` 专门用于 **GET** 请求，`@PostMapping` 用于 **POST** 请求，`@PutMapping` 用于 **PUT** 请求，`@DeleteMapping` 用于 **DELETE** 请求。
4. `@RequestParam` 用于绑定单个请求参数；`@RequestBody` 用于绑定 **HTTP 请求体**（通常为 JSON）；`@PathVariable` 用于绑定 **URI 模板变量**。
5. 产生页面跳转的方法返回类型为 **ModelAndView**，其默认作用域为 **request**，页面跳转方式默认为 **forward**。
6. Spring MVC 的视图层方案中，Spring Boot 推荐使用 **Thymeleaf**，其核心特点是 **数据和 HTML 的分离**。
7. 拦截器基于 **Spring AOP** 实现，过滤器基于 **Servlet 规范** 实现。
8. 全局异常处理使用 `@ControllerAdvice` 结合 **@ExceptionHandler** 注解实现。
9. Model / ModelMap / ModelAndView 三者的赋值和取值能力排序：**ModelAndView > Model > ModelMap**。
10. `@Valid` 支持 **嵌套验证**，`@Validation` **不支持**嵌套验证。
11. Spring 5.x 要求 JDK **8** 和 Servlet **3.1**；Spring 6.x 要求 JDK **17** 和 Servlet **5.0**。
12. Spring MVC 运行于 **IoC 容器** 之上，所有对象（Controller、Service 等）均由 IoC 容器管理。
13. Spring MVC 的核心理念：让开发者专注于 **业务应用**，Spring 处理 **底层基础设施**。
14. 拦截器 `preHandle()` 返回 **false** 时，请求处理链中断，后续拦截器和 Controller 不再执行。
15. `@ResponseBody` 的作用是 **不进行页面跳转和视图渲染，直接将返回值写入响应体**。

### 简答题考点

1. **简述 Spring MVC 的请求处理流程（七个步骤）**：请求到达 DispatcherServlet → HandlerMapping 查找对应 Controller → Controller 处理请求并调用业务逻辑 → Controller 返回 ModelAndView → ViewResolver 解析逻辑视图名 → View 渲染模型数据 → 返回 HTTP 响应。

2. **拦截器与过滤器的区别**：拦截器基于 Spring AOP，过滤器基于 Servlet 规范；拦截器只作用于经过 DispatcherServlet 的 Controller 请求，过滤器作用于所有进入容器的请求（含静态资源）；拦截器可以获取被拦截方法的上下文信息（目标 Controller、方法参数等），过滤器只能访问 Request/Response 对象；拦截器由 Spring IoC 容器管理（可使用依赖注入），过滤器由 Servlet 容器管理。

3. **@Valid 与 @Validation 的区别**：`@Valid` 符合 JSR-303 标准规范，支持嵌套验证（可用在类的成员属性上），由 Hibernate Validator 提供；`@Validation` 是 Spring 提供的验证机制，是 JSR-303 的变种，不支持嵌套验证（不能用在类的成员属性上）。

4. **使用 Web 容器对象的耦合方式与非耦合方式的区别及优缺点**：耦合方式在 Controller 方法参数中直接声明 HttpServletRequest、HttpServletResponse 等，代码简单但紧耦合 Servlet API，单元测试需 Mock 容器对象；非耦合方式通过 @RequestParam、@PathVariable 等注解间接获取数据，降低对 Servlet API 的依赖，更利于单元测试。

5. **Thymeleaf 相比 JSP 和 FreeMarker 的核心优势**：Thymeleaf 的模板是纯 HTML 文件，可直接在浏览器中预览（静态原型即模板），实现前后端并行开发；JSP 和 FreeMarker 的模板无法脱离服务器环境独立查看。

6. **Spring MVC 如何实现全局异常处理**：通过 `@ControllerAdvice` 注解定义全局异常处理器类，在其方法上使用 `@ExceptionHandler` 注解声明处理特定类型的异常，避免在每个 Controller 中重复编写 try-catch 代码，实现异常处理的统一管理。

### 易混淆概念

| 概念 A | 概念 B | 关键区别 |
|--------|--------|----------|
| `@RequestParam` | `@PathVariable` | `@RequestParam` 从 URL 查询参数（`?key=value`）获取值；`@PathVariable` 从 URL 路径模板（`/users/{id}`）中获取值 |
| `@RequestBody` | `@ModelAttribute` | `@RequestBody` 绑定整个 HTTP 请求体（JSON → JavaBean）；`@ModelAttribute` 绑定表单参数或用于数据预初始化 |
| `@ResponseBody` | `ModelAndView` | `@ResponseBody` 直接输出响应体（JSON/字符串），跳过视图渲染；`ModelAndView` 进行页面跳转和视图渲染 |
| `@Valid` | `@Validation` | `@Valid` 支持嵌套验证、符合 JSR-303 标准；`@Validation` 不支持嵌套验证、Spring 变种 |
| 拦截器 (Interceptor) | 过滤器 (Filter) | 拦截器基于 Spring AOP，作用于 Controller 请求，由 IoC 容器管理；过滤器基于 Servlet 规范，作用于所有请求，由 Servlet 容器管理 |
| Model | ModelMap | Model 是接口，ModelMap 是实现；ModelMap 是 Model 的基类，功能更基础 |
| forward (转发) | redirect (重定向) | forward 是服务器内部行为，URL 不变，请求对象不丢失；redirect 是客户端新请求，URL 改变，请求对象丢失 |
| `@NotNull` | `@NotBlank` | `@NotNull` 只检查 null；`@NotBlank` 检查 null + 空字符串 + 纯空白字符串（trim 后为空也算） |
| DispatcherServlet | 普通 Servlet | DispatcherServlet 是前端控制器，统一分发请求给 Controller；普通 Servlet 直接处理特定 URL 的全部逻辑 |
| IoC | DI | IoC（控制反转）是思想原则，将对象控制权交给容器；DI（依赖注入）是 IoC 的具体实现方式，通过注入完成对象组装 |
