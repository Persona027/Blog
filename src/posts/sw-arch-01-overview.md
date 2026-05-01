---
title: 开发架构与框架技术概述
date: 2026-05-01
summary: 概述软件开发架构平台的基础概念，涵盖框架技术的由来、三类框架（表示层、持久层、容器）的职责与主流技术栈，以及 Struts 1/2 与 Spring MVC 的演进对比，并介绍 Maven 项目管理与自动化构建的核心机制。
cover: /assets/covers/softwareDesign.jpg
category: 软件开发架构
---

> 来源：软件开发架构平台课程 CH01 | 考试复习笔记

## 课程概述与基础概念

### 课程基本信息

- 课程名称：软件开发架构平台（Software Development Architecture Platform），聚焦 Java EE 平台与企业级 Web 应用

  该课程的定位是让学生在掌握 Java SE 基础开发能力之后，进一步理解企业级应用架构的分层设计思想。Java EE（Java Enterprise Edition）平台提供了一套标准化的企业级组件模型（如 Servlet、JSP、EJB），课程通过讲解这些组件的协作方式，帮助学生建立从"单机编程"到"分布式企业开发"的思维跨越。架构平台的核心目标不是教会某个具体框架的 API，而是培养设计可维护、可扩展的企业级系统的能力。

- 前置知识（Prerequisites）：JavaSE、DB/SQL、JDBC、JSP/Servlet、HTML/CSS/XML、JavaScript、AJAX

  这些前置知识构成了企业级 Web 开发的完整技能栈：JavaSE 是语言基础，DB/SQL 和 JDBC 负责数据层交互，JSP/Servlet 是 Java Web 的基础组件模型，HTML/CSS/XML/JavaScript/AJAX 则是前端呈现与异步通信的必备技能。理解这些前置知识之间的关系，有助于学生在学习框架技术时明白"框架到底替我们做了什么"——本质上框架是对这些基础 API 的高层封装与抽象，目的是让开发者专注于业务逻辑而非底层通信细节。

- 开发架构（Development Architecture，面向"人"）与 系统架构（System Architecture，面向"机器"）

  - 开发架构：系统分层 MVC、前后端分离、各种框架技术

    开发架构关注的是代码组织方式和开发效率，其设计目标是让程序员能够快速理解项目结构、定位代码位置、并行协作开发。MVC 分层将应用程序切分为模型（数据与业务）、视图（界面展示）、控制器（请求调度）三个独立模块，使得每个层次可以由不同开发者独立开发和测试，从而实现团队协作的横向分工。前后端分离则进一步将前端 UI 开发与后端 API 开发解耦，前端通过 REST API 或 GraphQL 等接口与后端通信，这种架构模式在现代微服务体系中尤为重要。

  - 系统架构：数据缓存技术（Caching）、服务器集群部署（Clustering）、服务与 REST API 设计

    系统架构关注的是运行时质量属性，包括性能（Performance）、可用性（Availability）、可伸缩性（Scalability）和安全性（Security）。缓存技术（如 Redis、Memcached）通过在内存中暂存高频访问数据，显著降低数据库 I/O 压力，提升系统响应速度。集群部署通过多台服务器组成一个逻辑整体对外提供服务，实现负载均衡（Load Balancing）和故障转移（Failover），保障系统的高可用性（High Availability）。REST API 设计则定义了服务间通信的契约，好的 API 设计遵循统一接口（Uniform Interface）和无状态（Stateless）原则，使系统更易于演化和集成。

- 考核方式：闭卷考试（60%）+ 实验（40%）；实验分组，每组 4--6 人

  闭卷考试侧重考察学生对架构理论、框架原理和核心概念的掌握程度，这要求学生不仅要会使用框架，还要理解其底层设计机制。实验分组采用 4-6 人的团队模式，模拟真实企业中的协作开发场景，培养学生在团队中使用版本控制工具（如 Git）、遵循编码规范、进行代码评审（Code Review）等工程实践能力。

- 参考书籍：《Spring in Action》

  《Spring in Action》是 Spring 社区的经典实战书籍，以"行动导向"（Action-Oriented）的方式讲解 Spring 生态系统。该书从实际项目出发，逐步引入 Spring 的核心概念——依赖注入（DI/IoC）、面向切面编程（AOP）、Spring MVC 等，与课程"理论结合实践"的教学理念高度契合。

---

## 框架技术的由来（Origins of Framework Technology）

### Java Web MVC 架构

- 经典的 MVC（Model-View-Controller）开发架构已成为事实标准（de facto standard）

  MVC 模式之所以能成为 Web 开发的"事实标准"，是因为它从根本上解决了早期 Web 应用（如纯 JSP 或纯 Servlet 方案）中业务逻辑、页面渲染、请求调度三者混杂导致的代码混乱问题。通过将职责分离（Separation of Concerns），MVC 使得每一层可以独立演变：Model 层的业务规则修改不影响 View 层的页面布局，View 层的 UI 调整也不触及底层的持久化逻辑。这种架构上的解耦是实现大型企业级应用可维护性的基石。

- Model 层进一步细分为三部分:

  - 业务逻辑对象（Service / Business Bean）：完成业务逻辑

    Service 层是业务逻辑的核心承载者，通常以接口（Interface）+ 实现类（Impl）的方式组织，以便于后续通过依赖注入（DI）替换具体实现。这种设计遵循"面向接口编程"（Program to Interface）原则，使得上层调用者只依赖抽象契约，不依赖具体实现，从而降低了模块间的耦合度。例如，当需要将支付逻辑从支付宝切换为微信支付时，只需更换 Service 的实现类，Controller 层代码无需任何改动。

  - 数据持久化对象（DAO, Data Access Object）：实现数据持久化操作

    DAO（Data Access Object）设计模式的核心思想是将数据访问逻辑与业务逻辑分离。DAO 层封装了所有与数据库交互的细节（SQL 语句、连接管理、事务控制），向 Service 层暴露一个干净的接口。这种设计使得当底层数据库从 MySQL 切换到 Oracle 或 PostgreSQL 时，只需要修改 DAO 层的实现，Service 层和 Controller 层完全不受影响，体现了分层架构对变更的隔离能力。

  - 值对象（POJO, Plain Old Java Object）：仅用于表达数据的值对象

    POJO 是一种不继承任何框架特定类、不实现任何框架特定接口的纯 Java 对象。它的设计哲学是"简单即是美"——通过保持对象的纯粹性，使得数据可以在不同层次之间自由传递而不引入框架依赖。POJO 通常与数据库表一一映射（ORM 映射），其字段对应表的列，这种"贫血模型"（Anemic Model）虽然牺牲了部分面向对象的封装性，但换来了极高的可理解性和可序列化性（便于 JSON/XML 序列化）。

- 请求--响应链路：客户端请求 → Servlet → Service → DAO → POJO ↔ 数据库服务器；响应经 JSP 返回客户端

  这条请求-响应链路体现了 MVC 架构中控制流（Control Flow）的完整路径：Servlet 作为前端控制器接收请求并进行初步参数封装，然后将业务处理委托给 Service 层，Service 层调用 DAO 层完成数据持久化，DAO 层通过 POJO 与数据库进行数据交换。处理完成后，结果数据被设置到请求属性中，通过 JSP 页面渲染为 HTML 返回给客户端。这个流程的每一环都体现了"单一职责原则"（Single Responsibility Principle），每层只做好自己份内的事。

- 严格遵守 MVC 模式的 Web 项目应具有规范的文件/包结构

  规范的文件/包结构（如 `controller/`、`service/`、`dao/`、`model/`、`view/`）不是形式主义，而是团队协作的"隐形契约"。当所有项目都遵循相同的包结构约定时，新成员可以快速定位代码位置，IDE 的自动导入也能正常工作。这种约定（Convention）降低了沟通成本，是 Maven 的"约定优于配置"（Convention over Configuration）理念在最基本的项目结构层面的体现。

### MVC 架构带来的两个核心问题

- 问题一：在开发过程中如何约束程序员遵循 MVC 架构

  在没有框架的情况下，程序员完全可以把业务逻辑写在 JSP 页面中、把 SQL 语句嵌入 Servlet 里，从而破坏 MVC 的分层约束。这是人性的弱点——在没有强制约束时，开发者倾向于选择最"省事"的做法，即使这种做法长远来看会造成灾难。因此需要一种机制从外部强制约束开发行为，这正是框架（Framework）的核心价值之一：通过预定义的扩展点和代码模板，将"正确的做法"设置为默认路径，让"错误的做法"变得困难甚至不可能。

- 问题二：在使用 MVC 架构开发过程中如何简化和规范代码

  即使程序员遵循 MVC 架构，每个 Servlet 中仍存在大量重复的样板代码（Boilerplate Code）：获取请求参数、类型转换、校验、调用 Service、转发/重定向。这些重复劳动不仅降低了开发效率，还增加了出错概率。框架通过将这些通用逻辑抽取为可复用的组件，实现了"一次编写，处处使用"（Write Once, Use Everywhere），让程序员只需关注业务差异部分即可。

### Servlet 代码分析：相同点与不同点

- **相同点（不可变部分）**：每个 Servlet 程序的流程基本一致，一般由三个部分组成:

  1. 从客户端获取数据

     这一步涉及 HTTP 请求参数的解析、类型转换和基本校验，是所有 Web 请求处理的共同起点。从架构设计角度看，将参数获取标准化意味着可以引入统一的参数绑定（Data Binding）机制——框架自动将请求参数映射到 Java 对象的属性上，省去了大量 `request.getParameter()` 调用。Struts 1 的 ActionForm、Struts 2 的 ModelDriven 拦截器、Spring MVC 的 `@RequestParam` 和 `@ModelAttribute` 都是在解决这个"不可变流程"的自动化问题。

  2. 调用业务逻辑进行处理

     业务逻辑调用本身因场景不同而不同，但"调用"这个动作是共通的。框架通过引入 Service 层的依赖注入，使得 Controller 不需要通过 `new` 关键字创建 Service 实例，而是由容器自动装配（Autowired）。这种控制反转的设计不仅简化了代码，还便于单元测试——测试时可以用 Mock 对象替换真实的 Service 实现。

  3. 根据处理的结果响应视图（JSP 页面）

     视图跳转逻辑（转发 forward 与重定向 redirect）在每个 Servlet 中都重复出现。框架通过配置化的视图映射（View Mapping），将逻辑视图名（如 "success"、"error"）与物理 JSP 路径（如 "/WEB-INF/jsp/result.jsp"）解耦，使得视图路径的修改不需要改动 Java 代码。

- **不同点（可变部分）**：具体操作的数据不一样——获取数据的个数/类型、调用业务逻辑的方法、响应的 JSP 页面

  可变部分反映了每个业务场景的独特需求，这正是程序员应该集中精力编写的"业务差异化代码"。框架的设计哲学是：让开发者只编写"这部分不同"的内容，其余不可变的流程由框架接管。这种"模板方法模式"（Template Method Pattern）在框架设计中反复出现——框架定义流程骨架（Skeleton），开发者在指定的扩展点（Extension Point）中填充业务逻辑。

- **表示层框架的设计思想**：使用配置文件设定可变部分，将不可变部分用框架的方式确定下来，不由程序员编写

  这是框架设计的核心思想——"反转控制"（Inversion of Control）在宏观层面的体现。传统的库（Library）是被应用程序调用的，而框架（Framework）反过来调用应用程序的代码（即"好莱坞原则"：Don't call us, we'll call you）。配置文件（XML 或注解）是框架与开发者之间的"契约"，它定义了可变部分的映射关系，使框架能够在运行时动态组装应用程序的各个组件。

- **效果**：约束了程序员遵循 MVC 架构规范，提高了 Web 应用程序表示层的开发效率，同时使项目具有较好的可维护性和可扩展性

  这三重效果对应软件工程的三个核心追求：规范性（确保代码质量下限）、效率（缩短交付周期）、演进性（适应需求变更）。三者之间存在精妙的平衡——过于强调规范性会牺牲效率，过于追求效率则会损害可维护性。好的框架正是在这三者之间找到了最佳平衡点。

---

## 三类框架及其职责

### 表示层框架（Presentation Layer Framework）

- 代表框架：Struts、Spring MVC

  Struts 是最早的 Java Web MVC 框架，它的出现定义了表示层框架的基本范式。Spring MVC 作为 Spring 生态系统的一部分，凭借与 Spring 容器的无缝集成、注解驱动的开发方式以及优秀的 REST 支持，逐渐取代了 Struts 成为主流的表示层选择。理解这两者的演进关系，有助于把握 Web 框架设计思想从"配置驱动"到"注解驱动"、从"高侵入性"到"低侵入性"的发展脉络。

- 解决目标：MVC 架构中 View 层（JSP 页面）和 Controller 层（Servlet 类）的规范与简化问题

  表示层框架的定位非常精准：只负责 Web 层的请求调度和视图渲染，不涉及业务逻辑和持久化操作。这种"分而治之"（Divide and Conquer）的设计原则确保了框架职责的单一性，使得每个框架可以将其专属领域做到极致。也正因为表示层框架不处理业务和数据，才有了持久层框架和容器框架的用武之地。

### 持久层框架（Persistence Layer Framework）

- 代表框架：MyBatis、Hibernate、JPA

  MyBatis 采用半自动化的 SQL 映射方式，开发者自行编写 SQL，框架负责结果集到对象的映射，给予开发者最大的 SQL 控制权。Hibernate 则采用全自动化的 ORM（Object-Relational Mapping）方式，通过对象关系映射自动生成 SQL，开发者几乎不需要写 SQL 语句。JPA（Java Persistence API）是 Java EE 标准的持久化规范，Hibernate 是其最常用的实现。三种框架代表了从"手写 SQL"到"零 SQL"的不同抽象层级，选择哪个取决于项目对 SQL 控制力、开发效率和数据库可移植性的不同取舍。

- 解决目标：MVC 架构中 Model 层的数据访问对象（DAO 包）的规范与简化问题

  在没有持久层框架的时代，JDBC 编程充斥着大量重复代码：加载驱动、获取连接、创建 Statement、遍历 ResultSet、关闭资源（且要在 finally 块中做）。持久层框架通过模板模式将这些样板代码封装起来，开发者只需关注 SQL 或对象映射关系本身。这不仅大幅减少了代码量，更重要的是消除了手动资源管理导致的内存泄漏和连接耗尽风险。

### 容器类框架（Container Framework）

- 代表框架：Spring、EJB

  Spring 的核心理念是"轻量级容器"——它不像 EJB 那样需要重型应用服务器，而是可以在普通的 Servlet 容器（如 Tomcat）中运行。Spring 通过 IoC 容器管理对象的生命周期和依赖关系，使得应用程序由一个个松耦合的组件"组装"而成，而非硬编码的"搭建"而成。EJB（Enterprise JavaBeans）是 Java EE 标准的重量级容器方案，提供了声明式事务、分布式计算等企业级能力，但因其复杂性和侵入性在轻量级应用场景中逐渐被 Spring 取代。

- 解决目标：MVC 各组件之间的耦合问题，包括横向耦合（同层组件间）和纵向耦合（跨层组件间）

  横向耦合指的是同一层次内不同组件间的依赖——例如 Controller A 直接 new Controller B 的实例，或 Service A 直接依赖 Service B 的具体实现类。纵向耦合指的是跨层依赖——例如 Controller 直接 new DAO 对象来操作数据库，跳过了 Service 层。容器框架通过依赖注入（Dependency Injection）消除了这两类耦合：所有组件的依赖关系都由容器在运行时动态注入，组件本身只需声明依赖而不负责创建。这种设计使得组件间的关系从"硬连线"变为"软配置"，大幅提升了系统的可测试性和可扩展性。

### 主流技术栈组合

- SSH：Spring + Struts2 + Hibernate

  SSH 是 2010 年前后 Java Web 开发的"黄金组合"。Spring 负责整体的组件管理和事务控制，Struts2 负责表示层的请求分发，Hibernate 负责持久层的 ORM 映射。三者的整合虽然功能强大，但配置文件繁多（需要同时维护 struts.xml、hibernate.cfg.xml 和 Spring 的 applicationContext.xml），被戏称为"配置地狱"（Configuration Hell），这也为后来 Spring Boot 的"自动配置"理念埋下了伏笔。

- SSM（传统）：Spring + Spring MVC + MyBatis

  SSM 以 Spring MVC 替换 Struts2 作为表示层，以 MyBatis 替换 Hibernate 作为持久层，实现了"全 Spring 生态"的统一。相比于 SSH，SSM 的最大优势在于配置的统一性——所有配置都集中在 Spring 的配置文件中，不再需要维护多个框架的独立配置文件。此外，MyBatis 对 SQL 的精细控制能力使其在复杂查询场景下优于 Hibernate 的全自动 ORM。

- SSM（现代/SpringBoot）：SpringBoot + Spring MVC + MyBatis

  Spring Boot 是 SSM 的"进化版"，它引入了"自动配置"（Auto-Configuration）和"起步依赖"（Starter Dependencies）机制，使得开发者几乎不需要编写任何 XML 配置文件即可搭建一个完整的 SSM 项目。Spring Boot 的设计哲学是"习惯优于配置"的极致实践——只要你按约定放置文件（如 application.yml 放在 resources 目录下），框架自动为你配置好一切。这种"开箱即用"（Out of the Box）的体验大幅降低了 Java Web 开发的入门门槛。

---

## Struts 框架的发展历史

- 2000 年 5 月，Craig R. McClanahan 向 Java 社区提交了一个 Web 框架，这是 Struts 1 的前身

  Craig R. McClanahan 是 Apache Tomcat 的核心开发者之一，他设计 Struts 的初衷是为当时混乱的 JSP/Servlet 开发模式提供一个标准化的 MVC 解决方案。这一贡献奠定了 Java Web 框架的基本范式，后续几乎所有 Java Web 框架（包括 Spring MVC）都或多或少受到了 Struts 设计思想的影响。了解奠基者的背景有助于理解 Struts 为什么如此强调 Servlet 规范——因为 McClanahan 本身就是 Servlet 容器的开发者。

- 2001 年 6 月，Struts 1.0 发布，成为 ASF Jakarta 项目的子项目

  Struts 1.0 选择了 Apache 软件基金会（ASF, Apache Software Foundation）作为孵化平台，这保证了其开源、中立、社区驱动的开发模式。作为 Jakarta 项目的子项目，Struts 与 Tomcat 共享同一套社区治理体系，这使得两者在 Servlet 规范的支持上可以同步演进。

- 2004 年 3 月，Struts 升级为 ASF 中的顶级项目

  从子项目升级为顶级项目，意味着 Struts 社区已经具备了独立的治理能力和足够大的用户群体，不再需要 Jakarta 项目的"监护"。这是 Struts 影响力的巅峰时期——当时几乎所有的 Java Web 项目都以使用 Struts 为标准技术选型。

- 2013 年 4 月，Struts 1.x 宣布 EOL（End of Life，生命周期结束）

  EOL（End of Life）意味着官方不再提供任何安全补丁和 Bug 修复。Struts 1.x 的 EOL 标志着"配置驱动 + 高侵入性"框架时代的正式终结。遗留项目中仍在使用 Struts 1.x 的系统面临严重的安全风险（后续曝光的多起严重漏洞即为明证），这也提醒我们：架构技术的"生命力"是选择框架时必须考量的重要因素。

- 在此期间 WebWork 也在发展，随后拆分为 WebWork 2.0 和 XWork 1.0 两个框架

  WebWork 是由 Rickard Oberg 创建的一个与 Struts 竞争的 MVC 框架，其核心创新在于将 Web 层的请求处理与底层的命令模式（Command Pattern）框架分离——WebWork 2.0 负责 Web 层（Servlet 集成），XWork 1.0 负责核心的命令调度和拦截器链。这种"关注点分离"（Separation of Concerns）的设计使得 XWork 可以被任何 Web 层使用（甚至可以不依赖 Web 环境进行单元测试），为后来 Struts 2 的低侵入性架构奠定了基础。

- 2006 年，出于多方原因考虑，WebWork 2.0 与 XWork 1.0 合并，并改名为 Struts 2

  合并的"多方原因"包括：Struts 1 社区急需引入 WebWork 的先进特性（拦截器、低侵入性 Action），而 WebWork 社区则希望借助 Struts 的品牌知名度和用户基数扩大影响力。这次合并本质上是一次"品牌+技术"的资源整合，Struts 获得了技术升级，WebWork 获得了市场推广。

- 关键要点：Struts 2 是基于 WebWork 2.3 进行改良的，本质上和 Struts 1.x 没有关系

  这个考点在考试中极易出现：Struts 2 不是 Struts 1 的升级版，而是 WebWork 的"换皮"版本。从设计哲学到代码实现，Struts 2 与 Struts 1 几乎没有任何继承关系——Struts 1 以 ActionServlet 为核心，Action 需继承框架类；Struts 2 以 FilterDispatcher（后改为 StrutsPrepareAndExecuteFilter）为核心，Action 是纯 POJO。理解这一本质区别，有助于正确回答关于两者对比的简答题。

- Struts 2 最新版本为 2.5.26，流行版本是 2.3.x

  版本号差异反映了企业级项目"稳定性优先"的版本选择策略：尽管最新版修复了更多 Bug，但企业更倾向于使用经过大规模生产环境验证的流行版本（2.3.x），以规避新版本中可能引入的未知问题。这也是软件工程中"稳定版 vs 最新版"权衡的经典案例。

- 目前表示层框架的实际应用中 Spring MVC 的使用率已经超过了 Struts 2

  Spring MVC 超越 Struts 2 是 Java Web 生态演进的必然结果——Spring 生态的完整性和 Spring Boot 的便利性形成了强大的"网络效应"（Network Effect）。开发者一旦选择了 Spring 作为容器框架，选择 Spring MVC 作为表示层框架就成为了最自然的选择（无需额外引入任何第三方依赖，无缝集成）。

---

## Struts 1 的基本原理

1. 导入 Struts 1.x 对应的依赖包（JAR 包）

   导入 JAR 包意味着应用程序声明了对 Struts 1.x API 的编译时依赖（Compile-time Dependency），这是高侵入性框架的标志——应用程序的源码直接引用了框架的类和接口。在 Maven 时代，这一步通过 pom.xml 中的 `<dependency>` 声明来完成，Maven 自动处理依赖的传递性（Transitive Dependency），不再需要手动管理 JAR 文件的版本冲突问题。

2. 在 web.xml 中配置 ActionServlet 接管请求

   ActionServlet 是 Struts 1 的"前端控制器"（Front Controller）——所有匹配特定 URL 模式（通常为 `*.do`）的请求都会被这个 Servlet 拦截和处理。ActionServlet 在初始化时读取 `struts-config.xml` 配置文件，建立 URL 到 Action 的映射表。当请求到达时，它根据 URL 查找对应的 Action 映射，创建（或从缓存中获取）相应的 ActionForm 和 Action 实例，完成参数填充和业务调用。这种"中心化请求处理"模式是所有 MVC 框架的共同特征——用一个入口统一接管请求分发，而非每个功能都创建一个独立的 Servlet。

3. 创建 ActionForm 对象（用于封装表单数据）

   ActionForm 是 Struts 1 中专门用于数据绑定的类，它必须继承 `org.apache.struts.action.ActionForm`。这种强制继承的设计导致了高侵入性——你的数据对象因为继承了框架类而永久地与 Struts 1 绑定。当请求到达时，Struts 1 使用 Java 反射机制自动将请求参数填充到 ActionForm 的对应属性中，省去了手动调用 `request.getParameter()` 的操作。此外，ActionForm 还支持 `validate()` 方法进行表单数据校验，实现服务端校验逻辑的集中管理。

4. 创建 Action 对象（用于处理业务逻辑请求）

   Struts 1 的 Action 必须继承 `org.apache.struts.action.Action` 并重写 `execute()` 方法。这个设计带来了两个问题：（1）Action 与 Servlet API 深度耦合——`execute()` 方法的参数包括 `HttpServletRequest`、`HttpServletResponse`，使得 Action 的单元测试必须依赖 Servlet 容器；（2）Action 默认是单例模式（Singleton），框架只创建一个 Action 实例处理所有请求，这意味着 Action 中不能持有与特定请求相关的实例变量，否则会引发线程安全问题。这种设计虽然节省了内存，但增加了开发者的心智负担。

5. 在 struts-config.xml 中完成配置（Action 映射、Forward 转发规则等）

   `struts-config.xml` 是 Struts 1 的核心配置文件，它定义了 Action 映射（`<action-mappings>`）、全局转发（`<global-forwards>`）、数据源（`<data-sources>`）等信息。每添加一个新的请求功能，开发者需要在这个文件中新增一个 `<action>` 节点。在小规模项目中，这种集中式配置清晰明了；但当项目功能膨胀到数百个 Action 时，该文件会变得极其臃肿，多人协作时频繁产生冲突，成为维护的噩梦。这也是为什么 Struts 2 和 Spring MVC 都转向了"约定优于配置"和注解驱动的方式。

---

## 框架技术的侵入性（Framework Invasiveness）

- **定义（Definition）**：在软件开发过程中，由于使用第三方框架技术而导致项目自身代码发生改变的程度，被称为框架/架构的侵入性

  侵入性是衡量框架设计质量的重要指标之一。这里的"改变"主要指：代码是否必须继承框架特定类、是否必须实现框架特定接口、是否必须使用框架特定的注解配置——简而言之，项目代码对框架 API 的依赖深度。侵入性越高，项目代码与框架的绑定越紧密，框架的替换或升级就越困难。理解侵入性的概念有助于在进行技术选型时做出更理性的判断——选择低侵入性框架意味着保留在未来更换技术方案的"退路"。

- **高侵入性（High Invasiveness）**:

  - 直接继承（Inheritance）或实现（Implementation）第三方框架的类或接口

    继承意味着子类永久地获得了父类的全部行为和状态，这种关系在编译时就已确定，无法在运行时更改。当业务类继承了框架类后，它就失去了继承其他类的能力（Java 的单继承限制），这限制了代码的灵活性和复用性。

  - 项目脱离框架时将无法运行

    高侵入性导致框架从"工具"变成了"基础设施"——项目代码的每一层都深深依赖框架提供的功能，移除框架等于重写整个项目。这在长期维护的项目中是一个重大风险：如果框架停止维护（如 Struts 1.x EOL），或出现严重安全漏洞需要紧急升级，项目的改造成本将极其高昂。

  - 导致项目重构（Refactoring）和单元测试（Unit Testing）效率降低，可维护性下降

    单元测试需要隔离被测试代码的依赖，而高侵入性使得代码与框架运行时强绑定，测试时不得不启动整个框架环境（如 Spring 容器、Servlet 容器），导致测试启动慢、编写复杂。重构（Refactoring）也因为代码中充斥着框架特定 API 而变得困难——一个简单的类名修改可能触发框架配置文件中数十处引用变更。

  - 示例：Struts 1.x 等高侵入性框架

    Struts 1.x 强制要求 Action 继承 `Action`、ActionForm 继承 `ActionForm`，这意味着项目的控制器层和数据封装层代码完全绑定在 Struts 1 的 API 上。

- **低侵入性（Low Invasiveness）**:

  - 通过反射（Reflection）、动态代理（Dynamic Proxy）等语言特性

    反射允许框架在运行时动态获取类的结构信息（方法、字段、注解），而不需要类在编译时实现框架特定的接口。动态代理（Dynamic Proxy）允许框架在运行时生成代理对象，拦截方法调用，实现对目标对象功能的增强（如事务管理、日志记录），而目标对象本身无需知道代理的存在。

  - 结合 IoC（Inversion of Control，控制反转）和 AOP（Aspect-Oriented Programming，面向切面编程）等架构理论

    IoC（控制反转）让框架负责创建和管理对象的生命周期，应用程序代码只需要声明依赖关系，不需要主动创建依赖对象。AOP（面向切面编程）将横切关注点（如事务、日志、安全）从业务代码中分离出来，以"切面"的形式集中管理。两者结合使得应用程序代码可以保持"纯净"——业务类只关注业务逻辑，框架通过非侵入的方式为它们添加企业级服务。

  - 动态调用第三方框架的类和接口，项目脱离框架时依然可以运行

    低侵入性框架的一个标志是：业务代码（Service、DAO、POJO）中不包含任何框架特定的注解或类引用。这些类可以在不依赖任何框架的纯 Java 环境中被编译、测试和运行。框架通过外部配置或注解扫描来发现和管理这些类，而类的内部实现不受框架的约束。

  - 提高可维护性和可扩展性，方便进行项目重构和单元测试等

    低侵入性使得单元测试可以在不启动框架的情况下运行（使用 JUnit + Mockito 即可），这大大缩短了测试的反馈周期——从几十秒下降到毫秒级。重构也变得更加安全——IDE 的自动重构工具（如重命名、提取方法等）可以准确追踪所有引用，不会因为框架配置的字符串引用而产生遗漏。

  - 示例：Spring、MyBatis 等低侵入性框架

    Spring 中的业务 Bean 通常是纯 POJO，不需要继承任何 Spring 类。MyBatis 中的 Mapper 接口不需要实现类，框架在运行时通过动态代理生成接口的代理对象，将方法调用映射到对应的 SQL 语句执行。

- 软件架构设计理论中"高内聚、低耦合"（High Cohesion, Low Coupling）的主要目标也是为了降低侵入性

  "高内聚"（High Cohesion）指的是模块内部各元素之间紧密关联、共同完成一个明确的职责，这增强了模块的独立性和可理解性。"低耦合"（Low Coupling）指的是模块之间的依赖关系尽可能少和弱，这减少了模块间的相互影响。降低侵入性本质上是追求模块与框架之间的"低耦合"——理想的架构中，框架是模块的"服务提供者"而非"存在前提"。这是软件工程中亘古不变的设计原则，在面向对象设计、微服务架构、甚至前端组件化设计中都有体现。

---

## Struts 2 的基本原理

### 核心改进思想：约定优于配置（Convention over Configuration）

- 通过约定减少 XML 配置量，以简化开发过程

  "约定优于配置"（Convention over Configuration，简称 CoC）是 Ruby on Rails 框架最早系统化提出的设计理念，后被 Struts 2 和 Spring Boot 等框架广泛采纳。其核心思想是：框架预设一套"默认约定"（如 Action 类名以 Action 结尾、配置文件默认放在 classpath 根目录），当开发者的代码符合约定时，无需任何配置即可运行；只有需要偏离约定时，才需要显式配置。这极大地减少了配置文件中的冗余信息——原来 80% 的"常规配置"被约定取代，开发者只需关注 20% 的"特殊配置"。从信息论角度理解，约定相当于一种"默认值"机制，它利用"大概率事件"减少显式声明的信息量。

### 开发步骤

1. 导入 Struts 2.x 对应的依赖包

   与 Struts 1.x 类似，项目需要通过 Maven 或手动方式导入 Struts 2 的核心 JAR 包（如 `struts2-core`）。但不同的是，Struts 2 的业务代码（Action 类）不依赖任何 Struts 2 的类，依赖包只是在运行时的控制器层被框架使用。

2. 在 web.xml 中配置 Filter 接管请求（关键变化：Struts 1 用 Servlet 接管，Struts 2 改用 Filter 接管）

   这个变化体现了 Struts 2 对 Servlet 规范更灵活的利用。Servlet（如 Struts 1 的 ActionServlet）只能拦截明确匹配其 URL 模式的请求；而 Filter 是标准的 Servlet Filter 机制，它可以拦截所有请求（如 `/*`），包括对静态资源的请求，也可以在请求到达 Servlet 之前或之后进行预处理和后处理。这个设计决策使得 Struts 2 能够实现更丰富的拦截器链（Interceptor Chain）功能——文件上传、参数绑定、输入校验、国际化等横切关注点都可以以拦截器的形式"串联"在处理流程中，实现比 Struts 1 更优雅的架构。

3. 创建业务领域对象（POJO 类，如 User），仅用于表达数据

   Struts 2 使用纯 POJO 表达数据对象，不需要像 Struts 1 那样继承 ActionForm。这意味着同一个 User 类既可以用于 Web 层的表单数据绑定，也可以用于 Service 层的业务逻辑处理，还可以用于 MyBatis/Hibernate 的 ORM 映射——一个类服务于多个层次，消除了 Struts 1 中"一个表单对应一个 FormBean，一个业务对应一个 POJO"的重复定义问题。

4. 创建 Action 对象——与 Java Web 容器完全解耦（无需继承框架特定类，以 POJO 形式存在）

   这是 Struts 2 相对于 Struts 1 最核心的改进：Action 类是一个纯 POJO，不需要继承任何 Struts 2 的类或实现任何 Struts 2 的接口。Action 与 Servlet API 解耦意味着：可以在不启动 Web 容器的情况下对 Action 进行单元测试（使用 JUnit 直接 new Action 实例并调用其方法即可），这在 Struts 1 中几乎不可能做到。这种设计体现了"可测试性驱动设计"（Testability-Driven Design）的理念——好的架构天然支持测试，不需要为测试额外编写复杂的 Mock 代码。

5. 在 struts.xml 中完成配置

   Struts 2 的配置文件包括 `struts.xml`（核心配置）以及可选的 `struts.properties`（常量配置）。虽然 `struts.xml` 保留了 XML 配置的形式，但得益于 CoC 理念，其中的配置项比 Struts 1 的 `struts-config.xml` 精简得多。此外，Struts 2 从 2.1 版本开始支持"零配置"（Zero Configuration），通过注解（如 `@Action`、`@Result`）直接在 Action 类上声明映射关系，进一步减少了对 XML 的依赖。

---

## Spring MVC 框架基本原理

### 请求处理流程（七步）

1. 请求首先到达前端控制器（Front Controller / DispatcherServlet），委托给具体的控制器处理请求

   DispatcherServlet 是 Spring MVC 的"交通枢纽"——所有请求都必须经过它，由它统一调度后续的处理流程。作为前端控制器（Front Controller），它不负责具体的业务处理，而是扮演"请求分发者"的角色。Spring MVC 默认只有一个 DispatcherServlet 实例，但大型应用可以配置多个 DispatcherServlet 分别处理不同 URL 命名空间的请求，实现初步的负载分离。DispatcherServlet 在初始化时会加载 Spring 的 WebApplicationContext，建立整个 MVC 的运行环境。

2. 前端控制器通过查询处理器映射（Handler Mapping），找到 URL 对应的控制器

   Handler Mapping 本质上是 URL 到 Controller 方法的映射表。Spring MVC 提供多种 HandlerMapping 实现：`RequestMappingHandlerMapping` 负责解析 `@RequestMapping`（及其快捷注解 `@GetMapping`、`@PostMapping` 等）标注的方法；`BeanNameUrlHandlerMapping` 将 Bean 名称与 URL 做映射（较为古老的方式）。Handler Mapping 的结果不是一个具体的响应，而是一个"执行链"（HandlerExecutionChain），其中可以包含多个拦截器（Interceptor），在 Controller 方法执行前后进行预处理和后处理。

3. 控制器处理请求，包括处理数据、调用业务逻辑等

   这一步骤是程序员编写业务代码的位置。Controller 方法通常接收经过类型转换和校验的参数（通过 `@RequestParam`、`@PathVariable`、`@RequestBody` 等注解绑定），调用 Service 层的业务方法，然后将结果封装到 Model 对象中。Spring MVC 的 Controller 默认是单例（Singleton）的，因此不能在 Controller 中持有请求相关的实例变量——这与 Struts 1 相同，但 Spring MVC 通过方法参数注入而非实例变量注入来避免线程安全问题。

4. 控制器将模型数据（打包）和逻辑视图名（Logical View Name）返回给前端控制器

   "逻辑视图名"是一个关键的设计抽象——Controller 返回的是一个字符串（如 `"userList"`），而不是具体的 JSP 文件路径（如 `"/WEB-INF/jsp/userList.jsp"`）。这种解耦使得视图层技术（JSP、Thymeleaf、FreeMarker、甚至返回 JSON 的 REST API）的切换不需要修改 Controller 代码。Model 数据被打包在 `ModelAndView` 对象（或通过 `Model` 参数）中，由后续的视图解析器使用。

5. 视图解析器（View Resolver）将逻辑视图名匹配成具体的视图实现

   View Resolver 将逻辑视图名"翻译"为物理视图路径。最常用的 `InternalResourceViewResolver` 通过配置前缀（prefix，如 `/WEB-INF/views/`）和后缀（suffix，如 `.jsp`）拼接出完整的 JSP 路径。例如，逻辑视图名 `"userList"` 被解析为 `/WEB-INF/views/userList.jsp`。如果有多个 View Resolver，它们按优先级（order）依次尝试解析，直到找到合适的视图。这种"职责链模式"（Chain of Responsibility）的设计使视图解析具有高度的可扩展性——可以随时加入支持 PDF、Excel 等非 HTML 格式的 View Resolver。

6. 视图进行模型数据和视图实现的渲染（Rendering）

   渲染（Rendering）是将模型数据填充到视图模板中并生成最终响应内容的过程。对于 JSP 视图，渲染就是 JSP 引擎解析 JSP 文件、执行其中的 Java 代码和 EL 表达式、将结果写入响应输出流的过程。对于 Thymeleaf 等模板引擎，渲染则是将模板文件解析为 DOM 树，然后将模型数据替换到特定属性位置的纯 HTML 处理过程。对于返回 JSON 的 REST API，渲染是由 `HttpMessageConverter`（如 `MappingJackson2HttpMessageConverter`）完成的，它将 Java 对象序列化为 JSON 字符串写入响应体。

7. 交付模型数据，给出 Web 响应

   最终 HTTP 响应（包含状态码、响应头、响应体）通过 Servlet 容器返回给客户端浏览器。整个流程到此结束。理解这七个步骤可以帮助调试：当页面出现 404 错误时，通常是第 2 步的 Handler Mapping 失败；当出现空指针异常时，可能是第 3 步的数据绑定问题；当页面渲染内容不对时，需要检查第 5 步的视图解析和第 6 步的模型数据传递。

### 开发步骤与关键注解

1. 添加 Maven 依赖：spring-webmvc

   `spring-webmvc` 是 Spring MVC 的核心依赖，它自身又依赖于 `spring-context`、`spring-web` 等 Spring 基础模块。通过 Maven 的依赖传递（Transitive Dependency）机制，只需声明这一个依赖，所有需要的 Spring 相关 JAR 包都会自动下载，避免了手动管理依赖版本和冲突的繁琐。

2. 配置 web.xml（注册 DispatcherServlet）

   `web.xml` 是 Java Web 应用的部署描述符（Deployment Descriptor），在 Servlet 3.0+ 规范中可以被 `WebApplicationInitializer`（纯 Java 配置）替代。DispatcherServlet 在这个文件中被注册为一个普通的 Servlet，但通过 `<load-on-startup>` 配置使其在应用启动时立即初始化（而非懒加载），确保所有映射关系和拦截器在第一个请求到达前就已就绪。

3. 配置 applicationContext.xml（Spring Bean 上下文配置）

   `applicationContext.xml` 是 Spring 容器的配置文件，定义了所有由 Spring 管理的 Bean（Service、DAO、数据源、事务管理器等）。在纯注解时代，`applicationContext.xml` 越来越简化，通常只保留 `<context:component-scan>`（开启注解组件扫描）和 `<tx:annotation-driven>`（开启注解事务管理）等基础配置。Spring Boot 更是彻底去掉了 XML 配置，以 `@SpringBootApplication` 单一注解替代。

4. 编写 Controller 类，使用以下注解:

   - `@Controller`：标注该类为一个 Servlet 控制器

     `@Controller` 是 `@Component` 的派生注解（Stereotype Annotation），被它标注的类会被 Spring 的组件扫描（Component Scan）自动检测并注册为 Spring Bean。`@Controller` 和 `@Component` 在功能上完全相同，但 `@Controller` 传达了更丰富的语义信息——"这是一个 Web 控制器类"——便于开发者理解和工具识别（如 AOP 可以只拦截标注了 `@Controller` 的 Bean）。

   - `@GetMapping`：注解 URL 映射，如 `http://localhost:8080/hello`

     `@GetMapping` 是 `@RequestMapping(method = RequestMethod.GET)` 的快捷注解，用于将 HTTP GET 请求映射到特定的处理方法。类似地，`@PostMapping`、`@PutMapping`、`@DeleteMapping`、`@PatchMapping` 分别对应 POST、PUT、DELETE、PATCH 请求。这种对 HTTP 方法语意的明确化是 RESTful API 设计的基础——同一 URL 路径（如 `/users/1`）可以通过不同的 HTTP 方法实现不同的操作（GET 获取、PUT 更新、DELETE 删除）。

   - `@ResponseBody`：注解方法返回值为直接以字符串内容进行响应

     `@ResponseBody` 告诉 Spring MVC：不要将方法的返回值解释为逻辑视图名，而是将其直接写入 HTTP 响应体（Response Body）。这个注解通常用于返回 JSON 格式数据的 REST API 或返回纯文本的简单接口。当方法上同时标注 `@Controller` 时，`@ResponseBody` 是必要的；如果类上直接标注 `@RestController`（= `@Controller` + `@ResponseBody`），则所有方法默认都拥有 `@ResponseBody` 的行为。

---

## Struts 1 vs. Struts 2 vs. Spring MVC 对比

- **Struts 1**：高侵入性，需继承 Action/ActionForm 类；使用 Servlet 接管请求；在 struts-config.xml 中配置

  Struts 1 的设计思路是"一切显式化"——每个 Action、每个 Form、每个 Forward 转发都必须在 struts-config.xml 中显式配置。这种思路在小型项目中提供了"所见即所得"的全局视图，但项目规模增大后配置文件就成为了瓶颈。高侵入性的根源在于 Struts 1 要求所有组件都继承框架基类，这使得项目代码与框架形成了编译期强耦合，无法进行轻量级单元测试，也无法在框架升级或替换时保持代码稳定。

- **Struts 2**：低侵入性，Action 为 POJO；使用 Filter 接管请求；贯彻"约定优于配置"思想；在 struts.xml 中配置

  Struts 2 的设计思路是"框架适应开发者，而非开发者适应框架"。通过将 Action 设计为 POJO，Struts 2 实现了业务逻辑代码与框架 API 的彻底解耦——开发者编写的是一个普通的 Java 类，框架在运行时通过反射和拦截器机制动态增强它的能力。使用 Filter 而非 Servlet 接管请求，使得 Struts 2 能够在请求处理的各个阶段插入拦截器，实现了比 Struts 1 更灵活的处理管道（Processing Pipeline）。

- **Spring MVC**：低侵入性；基于注解（Annotation）开发（如 @Controller、@GetMapping、@ResponseBody）；以 DispatcherServlet 作为前端控制器；在 applicationContext.xml 中配置

  Spring MVC 的设计思路是"生态整合"——它不是一个孤立的表示层框架，而是 Spring 生态系统的有机组成部分。Controller 和 Service 被同一个 Spring IoC 容器管理，事务、安全等横切关注点通过 Spring AOP 无缝切入，配置文件和依赖管理通过 Spring Boot 自动完成。注解驱动开发大大减少了代码量——一个完整的 CRUD 功能的 Controller 只需要几十行代码，而在 Struts 1 中可能需要数百行配置和代码。

---

## Maven

### 什么是 Maven

- Maven 是一种基于项目对象模型（POM, Project Object Model）的项目管理机制

  POM（Project Object Model）是 Maven 的核心抽象——它将一个软件项目建模为一个结构化对象，包含项目的基本信息（名称、版本、开发者）、依赖关系、构建配置和插件信息。通过这种"项目即对象"的建模方式，Maven 实现了项目管理的标准化——无论项目是 Java、Scala 还是 Kotlin 编写的，无论项目大小如何，它都有一个统一的、可被工具理解的描述方式。这为自动化构建、持续集成（CI）和持续部署（CD）提供了标准化的接口。

- 通过简单的描述信息（配置文件 pom.xml）来管理项目的构建和模块间的依赖

  `pom.xml` 取代了传统 Java 项目中手动的 CLASSPATH 配置和 IDE 项目文件（如 `.classpath`、`.project`）。在 Maven 之前，每个项目的构建配置都依赖于特定的 IDE（Eclipse、NetBeans、IntelliJ IDEA），无法跨环境复用。Maven 通过 `pom.xml` 提供了一个 IDE 无关的项目描述文件——同一个 `pom.xml` 可以被命令行、Eclipse、IntelliJ IDEA 等任何工具解析和执行相同的构建流程。

- 核心功能一：通过配置，合理解决项目内部模块间和外部插件的依赖关系（Dependency Management）

  依赖管理（Dependency Management）消除了"JAR 地狱"（JAR Hell）——传统项目中手动管理数十甚至上百个 JAR 文件及其版本兼容性几乎是不可完成的任务。Maven 通过坐标（Coordinate）唯一标识每个依赖，通过依赖传递（Transitive Dependency）自动解析间接依赖，通过版本仲裁（Version Mediation）处理版本冲突（默认采用"最短路径优先"或"最先声明优先"策略）。这使得一个项目的所有依赖可以在一屏 `pom.xml` 中完全定义，并且可复现、可追溯。

- 核心功能二：通过配置，实现项目的自动化构建和部署运行（Automated Build & Deploy）

  自动化构建（Automated Build）将编译、测试、打包、部署等一系列重复性操作固化为一条命令（如 `mvn clean install`），在任何机器上只要安装了 Maven 就能重现完全相同的构建结果。这种"构建可复现性"（Build Reproducibility）是持续集成的基础——只有构建过程全自动化且结果可复现，才能放心地在每次代码提交后自动触发构建和测试。

### Maven 仓库（Repository）

- 按所在地分为三类:

  - 本地仓库（Local Repository）—— 位于开发者本机

    本地仓库默认位于 `~/.m2/repository/`（Windows 上为 `C:\Users\<用户名>\.m2\repository\`），首次从远程下载的依赖包被缓存在此处。本地仓库的存在使得同一台机器上的多个项目可以共享已下载的依赖，避免了重复下载，也使得离线开发成为可能——只要本地仓库中有所需的依赖，Maven 在不联网的情况下也能正常工作。

  - 中央仓库（Central Repository）—— Maven 官方维护，存放大部分开源项目依赖包

    中央仓库（Maven Central Repository）是默认的远程仓库，当本地仓库中找不到所需的依赖时，Maven 会自动从中央仓库下载。中央仓库包含了几乎所有主流的开源 Java 库，由 Sonatype 公司维护。但中央仓库是公开的，任何上传的包都是永久性的——这意味着组织内部私有的依赖包不应该上传到中央仓库，这正是私服（Private Server）存在的必要性。

  - 远程仓库/私服（Remote Repository / Private Server）—— 组织或公司自行搭建的第三方仓库

    私服（Private Server，如 Nexus、Artifactory）充当内部网络中的"代理仓库"：它将外部中央仓库的依赖缓存到内部网络，减少外网带宽消耗；也将内部开发的私有模块发布到私服供团队共享。私服是企业级 Maven 部署的标配，它解决了三个核心问题：网络效率（只需从外网下载一次）、安全隔离（内部代码不暴露到公网）、版本统一（通过私服控制团队使用的依赖版本，避免"在我的机器上能跑"的问题）。

- 中央仓库地址：https://mvnrepository.com/

  mvnrepository.com 是中央仓库的 Web 界面，开发者可以在上面搜索依赖包、查看所有版本、复制可直接粘贴到 pom.xml 的依赖坐标声明。它极大降低了找到正确依赖版本的门槛。

- Maven 通过 pom.xml 识别依赖，将项目的相关依赖包下载到本地仓库中

  Maven 在构建过程中，首先解析 `pom.xml` 中声明的所有直接依赖，然后递归解析这些直接依赖各自的依赖（传递依赖），构建一个完整的依赖树（Dependency Tree）。对于每一个本地仓库中不存在的依赖，Maven 按照既定的搜索顺序从远程仓库下载。下载完成后，依赖被安装到本地仓库供后续使用。如果依赖解析过程中发现版本冲突，Maven 会根据依赖调解原则自动选择一个版本，同时输出警告信息提醒开发者注意潜在的兼容性问题。

- 如果项目所需要的依赖包中央仓库中没有，可以在 pom.xml 中设置远程仓库

  在 `pom.xml` 中通过 `<repositories>` 标签可以配置额外的远程仓库地址。例如，某些商业库（如 Oracle JDBC 驱动）由于许可限制不在中央仓库中，需要从 Oracle 官方仓库下载；或某些组织内部的私有库需要配置私服地址。Maven 支持配置多个远程仓库，并可以设置是否允许下载快照版本（SNAPSHOT）和发布版本（RELEASE）。

- 有些组织或公司为了依赖包的版本统一和缓解网络问题，会构建自己的第三方仓库（私服），可在 settings.xml 配置文件中配置私服

  `settings.xml`（位于 `~/.m2/settings.xml`）是 Maven 的全局用户配置文件，它适用于本机上所有 Maven 项目。与 `pom.xml`（项目级配置）不同，`settings.xml` 通常用于配置镜像（Mirror）、认证信息（Server Credentials）和本地仓库路径等环境相关的设置。通过在 `settings.xml` 中配置私服的镜像（Mirror），可以使所有对中央仓库的请求都先经过私服代理，实现全局的依赖下载加速和版本控制。

- **依赖下载搜索顺序**：本地仓库 → 私服 → 中央仓库 → 远程仓库

  这个搜索顺序体现了 Maven 的"就近原则"——优先使用最近的缓存，减少网络开销。理解这个顺序对排查依赖相关错误至关重要：如果下载总是失败，首先检查网络连接；如果下载的版本不对，检查本地仓库是否缓存了错误版本（可以用 `mvn clean` 或手动删除本地仓库中对应目录来清除缓存）；如果依赖总是不更新，检查私服是否配置了正确的更新策略。

### POM 核心概念（Project Object Model）

- 每个 Maven 项目都有一个唯一的 pom.xml 文件

  `pom.xml` 是 Maven 项目的"身份证"和"说明书"。对于多模块项目（Multi-Module Project），存在一个父 POM（Parent POM）和多个子模块 POM，父 POM 定义了公共的依赖版本和插件配置，子模块 POM 继承这些配置并声明各自特有的依赖。这种"继承机制"避免了多个模块之间配置的重复声明，体现了 DRY（Don't Repeat Yourself）原则。

- 每个 pom.xml 都有一个唯一的表示自身的坐标（Coordinate），由三部分组成:

  - groupId —— 组织/项目组标识

    groupId 通常使用反写的域名格式（如 `com.alibaba`、`org.springframework`），类似于 Java 的包命名方式。这种约定确保了全球范围内不同组织开发的同名库不会产生坐标冲突——两个 artifactId 相同但 groupId 不同的库在 Maven 看来是完全不同的依赖。groupID 的设计体现了 Maven 对"命名空间"（Namespace）的重视，是解决大规模依赖管理中命名冲突的关键机制。

  - artifactId —— 项目/模块标识

    artifactId 是项目或模块的名称，通常使用小写字母和连字符（如 `spring-core`、`mybatis-spring`）。在一个 groupId 下，每个 artifactId 必须唯一。artifactId 也决定了最终生成的包文件名（如 `mybatis-spring-2.0.6.jar`）。

  - version —— 版本号

    Maven 的版本号支持两种特殊标识：`SNAPSHOT`（快照版）和 `RELEASE`（发布版）。`SNAPSHOT` 版本（如 `1.0-SNAPSHOT`）表示正在开发中、可能随时变化的版本，Maven 会定期检查远程仓库是否有更新的快照并自动下载。`RELEASE` 版本（如 `1.0.0`）表示正式发布的稳定版本，一旦下载到本地仓库就不会再更新（除非手动删除）。

- pom.xml 文件大部分内容是描述项目的依赖:

  - 依赖通过 `<dependencies>` 子节点声明

    `<dependencies>` 是 POM 中最核心的配置区域之一。它的设计体现了"声明式编程"（Declarative Programming）的理念——开发者只需要声明"我需要什么"（What），而不需要关心"如何获取和管理"（How），Maven 自动完成依赖的定位、下载、缓存和类路径配置。

  - 每个 `<dependency>` 表示一种依赖

    一个项目可以声明任意数量的 `<dependency>` 节点，每个节点代表一个外部库的引用。当项目编译或运行时，所有这些依赖（及其传递依赖）的 JAR 包都会被添加到 CLASSPATH 中。

  - 每个依赖也有其所依赖项目的坐标（groupId、artifactId、version 三要素）组成

    依赖的坐标就是目标项目自身的坐标——Maven 通过坐标找到依赖库的 POM 文件和 JAR 包。这种"以自身坐标引用外部坐标"的对称设计使得整个 Maven 生态系统形成一个有向图（Dependency Graph），每个项目既可以是依赖的消费者（Consumer），也可以是依赖的生产者（Producer）。

### Maven 约定目录结构（Convention）

- `target/` —— 存放编译结果（class 文件）

  `target/` 目录是整个构建过程的产物存放地，不仅是 class 文件，还包括测试报告（`target/surefire-reports/`）、打包文件（`target/*.jar` 或 `target/*.war`）等。Maven 的 `clean` 命令就是删除整个 `target/` 目录。这个目录不应该被纳入版本控制（应加入 `.gitignore`），因为其中的所有内容都可以通过 Maven 命令重新生成。

- `out/` —— 存放输出结果

  `out/` 目录主要用于存放 IDE（如 IntelliJ IDEA）自身的编译输出，不一定在所有项目中都存在。它与 `target/` 的区别在于：`target/` 是 Maven 的标准输出目录，出现在所有 Maven 项目中；而 `out/` 是 IDE 特定的输出目录，不影响 Maven 的构建行为。

- `src/` —— 源代码目录，分为项目自身源代码和测试源代码

  将项目自身源代码和测试源代码放在同一个 `src/` 目录的不同子目录中，而非混在一起，是 Maven 最重要的约定之一。这种分离使得构建时可以精确控制哪些代码需要被打包到最终产物中（测试代码不进入最终的 JAR/WAR），也使得工具可以分别计算生产代码和测试代码的覆盖率。

- `src/main/java` —— 项目自身 Java 源代码

  这是开发者的主要工作目录，所有业务逻辑、控制器、数据访问对象的 Java 源码都放在这里及其子目录下。Maven 通过 `mvn compile` 命令编译这个目录下的所有 `.java` 文件。

- `src/main/resources` —— 项目资源文件

  资源文件包括 Spring 配置文件（`applicationContext.xml`）、MyBatis 映射文件（`UserMapper.xml`）、数据库配置文件（`jdbc.properties`）等。它们被复制到 `target/classes/` 目录中与编译后的 class 文件放在一起，因此在运行时可以通过类路径（Classpath）加载。这种设计与 Java 的 `ClassLoader.getResource()` 机制无缝配合。

- `src/test/java` —— 测试用 Java 源代码

  测试代码使用主流的测试框架（如 JUnit、TestNG）编写，通过 `mvn test` 命令编译并执行。测试代码可以访问 `src/main/java` 中的所有 public 类，但在最终打包时被排除在外。

- `src/test/resources` —— 测试用资源文件

  测试资源文件（如用于测试的数据库配置、日志配置）独立于生产资源文件，确保测试环境与生产环境隔离。测试时，`src/test/resources` 中的配置会覆盖 `src/main/resources` 中的同名文件，这允许使用不同的数据库连接信息进行测试而不影响生产配置。

- `web/` —— Web 项目对应的 Web 目录（HTML、CSS、JavaScript 等前端文件）

  `web/` 目录对应传统 Java Web 项目的 Web 根目录（Web Root），存放 JSP 页面、前端静态资源和 `WEB-INF` 配置目录。在 Spring Boot 项目中，这个目录被标准化为 `src/main/resources/static/`（静态资源）和 `src/main/resources/templates/`（模板文件）。

- `pom.xml` —— 位于项目根目录下

  `pom.xml` 在项目根目录的位置是必须遵守的约定——Maven 在构建时从当前目录向上查找 `pom.xml`，如果找不到则构建失败。在多模块项目中，根目录的 `pom.xml` 是父 POM，每个子模块目录下各有一个 `pom.xml`。

### Maven 常用命令

| 命令 | 功能 | 说明 |
|------|------|------|
| `mvn compile` | 编译（Compile） | 将 src/main/java 目录中的 Java 源代码编译成 class 到 target 目录下 |
| `mvn test` | 测试（Test） | 将 src/test/java 目录中的 Java 测试源代码编译成 class 到 target 目录下并运行 |
| `mvn clean` | 清理（Clean） | 删除 target 目录 |
| `mvn package` | 打包（Package） | 生成打包文件，生成 .jar 文件或 .war 文件 |
| `mvn install` | 安装（Install） | 将打包文件上传到本地仓库 |
| `mvn deploy` | 部署/发布（Deploy） | 将打包文件上传到 Web 服务器或私服 |

这些命令之间存在生命周期（Lifecycle）的前后依赖关系：执行后面的命令会自动触发前面阶段的命令。例如，`mvn install` 会依次执行 `validate` → `compile` → `test` → `package` → `install`。这种设计使得开发者可以用一个命令完成整个构建流水线，而不需要记住或手动执行中间的每个步骤。Maven 的内置生命周期分为三个独立体系：`default`（编译、打包、部署）、`clean`（清理）、`site`（生成项目站点文档）。理解生命周期有助于在构建失败时快速定位问题发生在哪个阶段——编译错误发生在 compile 阶段，测试失败发生在 test 阶段，依赖解析失败发生在 validate 阶段。

### Maven 构建与管理项目

- 构建 Maven 项目：可以使用 Maven 新建项目，也可以将已有项目转为 Maven 项目

  新项目可以通过 Maven 的 Archetype 模板机制创建——`mvn archetype:generate` 命令从预定义的模板列表中选择（如 `maven-archetype-webapp` 用于 Web 项目），自动生成标准的目录结构和基础 `pom.xml`。已有项目转为 Maven 项目则需要手动创建 `pom.xml` 并按照"约定目录结构"重新组织源代码和资源文件——虽然需要一些前期投入，但一旦完成，项目的构建、依赖管理和团队协作效率将获得质的提升。

---

## 项目自动化构建

- 主流自动化构建工具（Automation Build Tools）：Maven、Gradle、Ant 等

  Ant 是最早的 Java 构建工具，使用 XML 定义构建任务，极其灵活但需要手动编写所有构建细节，没有内置依赖管理。Maven 引入了约定（Convention）、生命周期（Lifecycle）和依赖管理（Dependency Management），牺牲了部分灵活性换来了标准化和开箱即用。Gradle 基于 Groovy/Kotlin DSL，兼具 Ant 的灵活性和 Maven 的约定性，同时引入了增量构建（Incremental Build）和构建缓存（Build Cache）显著提升了构建性能。三者代表了构建工具从"任务驱动"到"约定驱动"再到"性能驱动"的演进历程。

---

## 本章小结

- 开发架构与框架技术的发展

  本章从软件开发架构的基本概念出发，梳理了框架技术产生的动因——解决 MVC 架构中的"规范约束"和"代码简化"两个核心问题。通过 Servlet 代码中"相同点"与"不同点"的分析，揭示了框架设计的本质：将不可变的流程固化在框架中，将可变的部分暴露给开发者配置。这种"模板方法模式"思想贯穿了后续所有框架技术的讨论。

- 框架技术概览——以表示层框架为例：Struts 1 框架的基本原理；Struts 2 框架的基本原理；Spring MVC 框架的基本原理

  从 Struts 1 到 Struts 2 再到 Spring MVC，表示了表示层框架从"高侵入性、配置驱动"向"低侵入性、注解驱动"的演进方向。Struts 1 强制继承框架类，体现了"框架主导"的设计思维；Struts 2 通过 POJO Action 和拦截器链实现了"框架服务"的思想转变；Spring MVC 通过注解和 IoC 容器整合实现了"框架融入生态"的最高境界。同时"框架侵入性"概念的引入，为评估框架设计质量提供了一个可量化的维度——低侵入性是现代框架设计的普遍追求。

- Maven 的基本原理和作用

  Maven 通过 POM 模型将项目结构标准化，通过仓库体系实现依赖的自动化管理，通过生命周期实现了构建过程的全自动化。这三个核心机制解决了 Java 项目中长期存在的"配置混乱"、"依赖地狱"和"构建不可复现"三大痛点。"约定优于配置"是 Maven 的核心设计哲学，它通过预设合理的默认值来减少显式配置量，这一思想深刻影响了后续的 Spring Boot 等框架。

- 其他自动化构建工具

  Ant、Gradle 等工具与 Maven 共同构成了 Java 生态的构建工具矩阵。它们各有侧重：Ant 强调灵活性和可控性，Maven 强调标准化和约定，Gradle 强调性能和表达力。掌握 Maven 是后续章节学习和实验环节的基础——所有项目依赖管理和构建操作都将通过 Maven 完成。

---

## 客观考点总结 (Exam Objective Points)

以下为本章可能考察的客观知识点：

- **选择题/填空题考点**：
  - 开发架构面向"人"，系统架构面向"机器"（两者的定义和区别）。
  - MVC 三层分别对应的组件：Model（Service + DAO + POJO）、View（JSP）、Controller（Servlet）。
  - Model 层三部分：业务逻辑对象（Service）、数据持久化对象（DAO）、值对象（POJO）。
  - 表示层框架代表：Struts、Spring MVC；持久层框架代表：MyBatis、Hibernate、JPA；容器类框架代表：Spring、EJB。
  - 三类主流技术栈缩写及全称：SSH（Spring + Struts2 + Hibernate）、SSM传统（Spring + Spring MVC + MyBatis）、SSM现代（SpringBoot + Spring MVC + MyBatis）。
  - Struts 1 用 ActionServlet（Servlet）接管请求，Struts 2 用 Filter（如 StrutsPrepareAndExecuteFilter）接管请求。
  - Struts 2 是基于 WebWork 2.3 改良的，本质上和 Struts 1.x 没有关系。
  - Struts 1.x 的 EOL（End of Life）时间是 2013 年 4 月。
  - Spring MVC 的前端控制器是 DispatcherServlet，处理流程共七步。
  - `@Controller` 标注控制器类，`@GetMapping` 映射 GET 请求 URL，`@ResponseBody` 使返回值直接写入响应体。
  - Maven 坐标三要素：groupId、artifactId、version。
  - Maven 仓库三类：本地仓库（Local）、中央仓库（Central）、远程仓库/私服（Remote/Private Server）。
  - 依赖下载搜索顺序：本地仓库 → 私服 → 中央仓库 → 远程仓库。
  - Maven 约定目录：`src/main/java`（源码）、`src/main/resources`（资源）、`src/test/java`（测试源码）、`target/`（编译结果）、`pom.xml`（项目根目录）。
  - Maven 命令：`mvn compile`（编译）、`mvn test`（测试）、`mvn clean`（清理）、`mvn package`（打包）、`mvn install`（安装到本地仓库）、`mvn deploy`（部署/发布）。
  - Maven 中央仓库网站：https://mvnrepository.com/。
  - POM 全称：Project Object Model（项目对象模型）。

- **简答题考点**：
  - 简述 MVC 架构中三种框架（表示层、持久层、容器）的职责及代表框架。
  - 试述 Struts 1 与 Struts 2 的核心区别（接管方式、Action 特性、配置文件、侵入性）。
  - 简述 Spring MVC 的请求处理七步流程。
  - 什么是框架的侵入性？对比高侵入性与低侵入性的特点，并各举一例。
  - 解释"约定优于配置"（Convention over Configuration）的含义及其在 Maven 和 Struts 2 中的体现。
  - Maven 的两大核心功能是什么？简要说明 POM 坐标的构成。
  - 简述 Servlet 程序"相同点"（不可变部分）和"不同点"（可变部分）分别是什么，以及表示层框架如何利用这一分析进行设计。

- **易混淆概念**：
  - **开发架构 vs. 系统架构**：开发架构面向"人"（代码组织、分层、框架），关注开发效率和可维护性；系统架构面向"机器"（缓存、集群、API 设计），关注性能、可用性和可伸缩性。两者不是互斥的，而是同一个软件系统的两个观察维度。
  - **Struts 1 vs. Struts 2**：Struts 2 不是 Struts 1 的升级版，而是 WebWork 的继承者——两者从设计哲学到代码实现几乎没有关系。Struts 1 高侵入性（继承 Action/ActionForm），Struts 2 低侵入性（Action 为 POJO）。
  - **Servlet vs. Filter 接管请求**：Struts 1 使用 Servlet（ActionServlet）接管，只能匹配特定 URL 模式；Struts 2 使用 Filter 接管，可以拦截所有请求，支持更灵活的拦截器链。
  - **POJO vs. JavaBean vs. ActionForm**：POJO 是纯 Java 对象（无框架依赖），JavaBean 是遵循特定命名规则的 POJO（有无参构造 + getter/setter），ActionForm 是 Struts 1 特有的需要继承框架类的表单对象。Struts 2 和 Spring MVC 使用 POJO/JavaBean，Struts 1 使用 ActionForm。
  - **`@Controller` vs. `@RestController`**：`@Controller` 方法的返回值默认解析为逻辑视图名（走 View Resolver）；`@RestController` = `@Controller` + `@ResponseBody`，所有方法返回值默认直接写入响应体（用于 REST API 返回 JSON）。
  - **`pom.xml` vs. `settings.xml`**：`pom.xml` 是项目级配置（定义项目坐标、依赖、插件），位于项目根目录；`settings.xml` 是用户级全局配置（定义本地仓库路径、私服/镜像、认证信息），位于 `~/.m2/` 目录。两者的作用域和用途完全不同。
  - **`mvn install` vs. `mvn deploy`**：`install` 将打包文件上传到本地仓库（本机 `~/.m2/repository/`），供本机其他项目使用；`deploy` 将打包文件上传到远程仓库（私服或公网仓库），供团队其他成员或外部用户使用。
  - **依赖传递（Transitive Dependency）vs. 依赖仲裁（Dependency Mediation）**：依赖传递是指 Maven 自动引入直接依赖所依赖的库；依赖仲裁是指当多个依赖引入同一库的不同版本时，Maven 按"最短路径优先"或"最先声明优先"原则自动选择一个版本。
