---
title: 软件开发架构复习：ORM框架和MyBatis详解
date: 2026-05-07
category: 软件开发架构总结
summary: 第六章复习要点：ORM概念、MyBatis配置、Mapper映射、动态SQL、与Spring集成。
cover: /logo.png
---

> 面向对象：软件开发架构课程学习者，基于课堂课件整理<br/>
> 本文涵盖核心考点、概念和最佳实践。

------------------------------------------------------------------------

% ======================================================================
## ORM 框架概述
% ======================================================================

### 什么是 ORM（Object-Relation Mapping，对象关系映射） [p.4]

    - **持久化 (Persistence)**：把瞬态数据（如内存中的对象）保存到可永久保存的存储设备（磁盘文件、数据库等）中 [p.4]
    - **持久化目标的三类** [p.4]：
    
        - 无结构文本文件：通过 I/O 技术读写文件
        - 结构化的文本文件：通过 SDK 提供的 API 读写文件
        - 关系型数据库：通过数据库驱动技术（如 JDBC）读写 DBMS
    
    - **ORM 定义**：完成瞬态的对象数据到持久的关系型数据映射的机制，简称 ORM [p.4]

### 为什么需要 ORM 框架？ [p.5]

    - **痛点**：Java 应用中，数据库表结构与 Java 对象结构不一致，开发者需编写大量重复的 JDBC 代码（执行 SQL、设置参数、处理结果集、管理连接），繁琐且易出错 [p.5]
    - **ORM 的四大目标** [p.5]：
    
        - 简化 JDBC 操作：封装重复的连接管理和异常处理逻辑，提供更友好的 API
        - 提高生产力：将关系数据以对象的形式表示，便于开发者理解与操作
        - 跨数据库移植性：通过方言 (Dialect) 抽象提供一定程度的数据库无关性
        - 提供高级功能：缓存、延迟加载 (Lazy Loading)、事务管理、批量操作等
    

### 回顾 JDBC API 编程  [p.6, p.9--11]

    - JDBC (Java Database Connectivity) 是 Java 标准库提供的 API，用于执行 SQL 语句并处理结果集 [p.6]
    - **核心接口**：Driver、Connection、Statement、PreparedStatement、ResultSet [p.6]
    - **JDBC 编程痛点** [p.6]：
    
        - 大量样板代码 (Boilerplate Code)：获取连接、创建 PreparedStatement、设置参数、遍历 ResultSet、释放资源
        - 代码冗长，容易出错
        - 忘记释放资源可能导致连接泄漏 (Connection Leak)
    
    - **传统 JDBC 编程流程**（以 userinfo 表为例）[p.9--11]：
    
        - DBUtil 工具类：封装 getConnection()、closeConnection()、closeStatement()、closePreparedStatement()、closeResultSet() [p.9]
        - INSERT 操作：获取连接 $\rightarrow$ 预编译 SQL $\rightarrow$ setXxx() 设置参数 $\rightarrow$ executeUpdate() $\rightarrow$ 关闭资源 [p.10]
        - SELECT 操作：获取连接 $\rightarrow$ 执行查询 $\rightarrow$ while 循环遍历 ResultSet $\rightarrow$ 手动逐字段 setter 映射到 Java 对象 $\rightarrow$ 关闭资源 [p.11]
    

### ORM 的实现方式（四种层次） [p.7]

    - **裸 JDBC**：最底层，完全手动控制，代码量大且易出错 [p.7]
    - **简化的 JDBC**：如 Spring JDBC Template，封装连接管理和异常处理 [p.7]
    - **半自动 ORM 框架**：如 MyBatis，开发者编写 SQL，框架负责参数/结果映射 [p.7]
    - **全自动 ORM 框架**：如 Hibernate、Spring Data JPA，框架自动生成 SQL [p.7]

% ======================================================================
## Spring JDBC 模板 (JdbcTemplate)
% ======================================================================

### JdbcTemplate 简介  [p.13--14]

    - JdbcTemplate 是 Spring 框架在 JDBC 层提供的中心委托类 (Central Delegate Class) [p.13]
    - **核心能力** [p.13]：
    
        - 封装典型的 JDBC 流程：获取连接、创建语句、执行 SQL、遍历 ResultSet、处理异常、关闭资源
        - 让开发者只需专注于 SQL 和结果映射
        - **回调接口 (Callback Interfaces)**：PreparedStatementCreator（SQL 创建）、ResultSetExtractor（结果提取）、RowMapper（行映射）
        - **统一异常处理**：将 SQLException 转换为 Spring 的 DataAccessException 层次结构（非受检异常）
        - **线程安全 (Thread-safe)**：配置完成后可在多线程场景安全共享
        - **日志记录**：所有 SQL 操作在 DEBUG 级别记录，便于排查问题
    
    - 架构角色：在程序员代码与 JDBC API 之间提供统一的模板方法，在保留代码灵活性的基础上尽量减少持久化代码 [p.14]

### 使用步骤  [p.15--16]

    - 引入依赖（spring-boot-starter-jdbc + 数据库驱动）[p.15]
    - 配置数据源 (DataSource) [p.15]
    - 注入 JdbcTemplate 对象，直接调用 API：query()、queryForObject()、queryForList()、update()、batchUpdate() 等 [p.16]

### JdbcTemplate 的优缺点  [p.17]

    - **优点**：简单、轻量，适用于小型项目、简单查询、对 SQL 有完全控制需求的场景 [p.17]
    - **缺点** [p.17]：
    
        - SQL 仍需手动编写，且在 Java 代码中拼写（无 XML/注解分离，维护不便）
        - 结果映射需要手动指定 RowMapper（字段多时代码量大）
        - 没有缓存机制
        - 关联查询复杂时，映射麻烦
    
    - **适用边界**：当查询复杂、需要动态拼接语句或关联关系映射时，需要更高级的 ORM 框架 [p.17]

% ======================================================================
## MyBatis 框架
% ======================================================================

### MyBatis 简介与历史  [p.19--20]

    - 原名 iBatis，由 Clinton Begin 于 2002 年发布 [p.19]
    - 2010 年项目被贡献给 Google Code，改名为 MyBatis [p.19]
    - 官网：\url{https://mybatis.org/mybatis-3/} [p.20]
    - **定位**：一款优秀的持久层框架 (Persistence Framework)，支持自定义 SQL、存储过程 (Stored Procedure) 以及高级映射 (Advanced Mapping) [p.19]
    - 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作 [p.19]
    - 可通过简单的 XML 或注解 (Annotation) 来配置和映射原始类型、接口和 Java POJO (Plain Old Java Objects) 为数据库中的记录 [p.19]

### MyBatis 核心特点  [p.22]

    - **(1) 自定义 SQL**：开发者编写完整的 SQL 语句，框架不会生成或修改 SQL，保证精确控制 [p.22]
    - **(2) 参数映射与结果映射**：将参数对象的属性映射为预编译语句参数（`\#\{\`} 占位符），根据配置将结果行映射为 Java 对象 [p.22]
    - **(3) 动态 SQL**：提供 `<if>`、`<choose>`、`<when>`、`<otherwise>`、`<foreach>`、`<where>`、`<set>`、`<trim>` 等标签在 XML 中拼接条件，避免 Java 代码中字符串拼接 [p.22]
    - **(4) 映射文件简洁**：一个 Mapper XML 文件包含 `<select>`、`<insert>`、`<update>`、`<delete>` 基本元素以及 `<resultMap>` 定义 [p.22]
    - **(5) 缓存机制** [p.22]：
    
        - 一级缓存 (Local Cache)：SqlSession 级别，默认开启，同一 SqlSession 内相同查询走缓存
        - 二级缓存 (Second-level Cache)：Mapper 级别，可选开启，跨 SqlSession 共享，支持自定义缓存实现（如 Ehcache、Redis）
    
    - **(6) 插件机制 (Plugin/Interceptor)**：允许编写拦截器在语句执行前后插入逻辑（基于动态代理 + 责任链模式），典型应用：分页插件、性能分析、SQL 阻断 [p.22]
    - **(7) 与 Spring 集成良好**：通过 MyBatis-Spring Boot Starter，自动扫描 Mapper 接口并创建代理对象，与 Spring 事务管理完美结合 [p.22]

### MyBatis 基本使用流程  [p.23--26]

[label=**Step \arabic*.**, leftmargin=*]
    - **引入依赖**：mybatis-spring-boot-starter + 数据库驱动 [p.23]
    - **配置框架**：application.yml / application.properties 中配置数据源、Mapper 扫描路径等 [p.23]
    - **创建实体类 (Entity / POJO)**：属性与数据库表字段对应 [p.24]
    - **创建 Mapper 接口**：定义数据访问方法（接口 + 方法签名），无需实现类 [p.24]
    - **编写 Mapper XML 映射文件** [p.25]：
    
        - `<mapper namespace="...">`：namespace 对应 Mapper 接口全限定名
        - SQL 元素：`<select>`、`<insert>`、`<update>`、`<delete>`
        - id 对应接口方法名，parameterType 指定入参类型，resultType / resultMap 指定返回值类型
        - `\#\{\`} 占位符用于预编译参数绑定，防止 SQL 注入
    
    - **在 Service 层注入并使用 Mapper**：通过 `@Autowired` 注入 Mapper 接口代理对象 [p.26]

### 动态 SQL 详解  [p.22, p.27]

    - **目的**：根据条件动态拼接 SQL，避免 Java 代码中大量 if-else 字符串拼接 [p.22, p.27]
    - **常用动态 SQL 标签**：
    
        - `<if test="...">`：条件判断，根据布尔表达式决定是否包含片段
        - `<choose>` / `<when>` / `<otherwise>`：多条件选择，类似 Java switch-case
        - `<foreach collection="..." item="..." open="(" close=")" separator=",">`：遍历集合，常用于 IN 查询
        - `<where>`：自动处理 WHERE 子句前缀，智能去除多余的 AND/OR
        - `<set>`：动态 UPDATE 中的 SET 子句，智能去除尾部逗号
        - `<trim prefix="" suffix="" prefixOverrides="" suffixOverrides="">`：灵活的前缀/后缀处理
    

### MyBatis 缓存机制 (补充细节)  [p.22]

    - **一级缓存 (SqlSession 级别)**：默认开启，作用范围是同一个 SqlSession，执行相同的 SELECT 语句时直接从缓存返回，执行 INSERT/UPDATE/DELETE 后缓存自动清空
    - **二级缓存 (Mapper 级别)**：需在 Mapper XML 中配置 `<cache/>` 标签开启，跨 SqlSession 共享，可集成第三方缓存（Ehcache、Redis、Hazelcast 等）
    - 缓存执行顺序：二级缓存 $\rightarrow$ 一级缓存 $\rightarrow$ 数据库查询

### MyBatis 插件机制 (实现原理)  [p.22]

    - 基于 Java 动态代理和责任链 (Chain of Responsibility) 模式实现
    - 可拦截的对象和方法：Executor (update, query, commit, rollback)、StatementHandler (prepare, parameterize, batch, update, query)、ParameterHandler (getParameterObject, setParameters)、ResultSetHandler (handleResultSets, handleOutputParameters)
    - 典型应用：分页插件 (PageHelper)、性能监控、SQL 日志、读写分离

% ======================================================================
## Hibernate 框架
% ======================================================================

### Hibernate 简介  [p.29]

    - Hibernate 是 Java 生态中**全自动 ORM 解决方案**，提供自然且类型安全的方式访问关系数据 [p.29]
    - 能快速编写复杂查询和处理结果，也可以轻松将内存中修改同步到数据库 [p.29]
    - 遵循事务的 ACID 属性，提供调优性能的能力 [p.29]
    - 与 Jakarta Persistence (JPA) 兼容，可在支持 JPA 的任何环境中使用 [p.29]
    - 官网：\url{https://hibernate.org/} [p.31]

### JPA 规范 (Java Persistence API)  [p.30]

    - JPA 是 Java EE 的众多规范之一，即 ORM 规范，规定了对象持久化的 API 标准 [p.30]
    - JPA 本身不提供实现，只提供规范接口；广义上 JDBC、JdbcTemplate、MyBatis、Hibernate 都可以认为是 JPA 的实现 [p.30]
    - **JPA 规范的三大组成部分** [p.30]：
    
        - ORM 映射元数据 (Mapping Metadata)：包括 XML 和注解 (Annotation) 两种配置方式
        - 用于 Java 调用的 API 接口：EntityManager、EntityTransaction、Query 等
        - 面向对象的查询语言 JPQL (Java Persistence Query Language)：类似 SQL 但面向实体对象
    

### Hibernate 核心特点  [p.32]

    - **(1) 完全的 ORM 能力**：支持基于注解或 XML 定义实体与表的映射，支持继承、多态、关联关系（多对一 @ManyToOne、一对多 @OneToMany、多对多 @ManyToMany）等复杂模型 [p.32]
    - **(2) 查询语言 HQL (Hibernate Query Language)**：面向对象的查询语言，支持大部分 ANSI SQL 功能，在编译时对查询进行类型检查 [p.32]
    - **(3) 缓存机制**：内置灵活的一级缓存 (Session 级别) 和二级缓存 (SessionFactory 级别)，可自定义缓存提供者（Ehcache、Infinispan 等）[p.32]
    - **(4) 延迟加载与级联操作** [p.32]：
    
        - 延迟加载 (Lazy Loading)：实体关联可以按需加载，避免一次拉取所有关联对象（N+1 问题需注意）
        - 级联操作 (Cascade)：级联持久化 (CascadeType.PERSIST)、级联合并 (MERGE)、级联删除 (REMOVE) 等，方便维护对象关系
    
    - **(5) JPA 标准支持**：Hibernate 是 JPA 规范的实现之一，代码与 EclipseLink 等 JPA 实现兼容；可使用 Spring Data JPA 等更高层抽象 [p.32]
    - **(6) 性能与扩展性**：提供可调节的 SQL 生成（dialect）、批量更新 (Batch Processing)、二级缓存等优化功能，适用于高并发和复杂查询场景 [p.32]

### Hibernate 持久化对象的三种状态  [p.33]

    - **(1) 瞬时/临时状态 (Transient)** [p.33]：
    
        - 由 new 操作符创建，且尚未与 Hibernate Session 关联的对象
        - 不会被持久化到数据库，也不会被赋予持久化标识 (Identifier / Primary Key)
        - 若在程序中没有引用，会被垃圾回收器 (GC) 销毁
        - 使用 Hibernate Session（如 session.save()）可将其变为持久状态，Hibernate 自动执行必要的 INSERT SQL
    

    - **(2) 持久化状态 (Persistent)** [p.33]：
    
        - 持久实例可能刚被保存 (save/persist) 或刚被加载 (get/load)，存在于相关联的 Session 作用范围内
        - Hibernate 会**自动检测 (Dirty Checking)**处于持久状态的对象的任何改动（通过快照比对），在事务提交 (flush) 时将对象数据与数据库同步
        - 开发者**不需要手动执行 UPDATE** 语句
        - 从持久状态变为瞬时状态（如 session.delete()）同样也不需要手动执行 DELETE
    

    - **(3) 脱管/游离状态 (Detached)** [p.33]：
    
        - 与持久对象关联的 Session 被关闭 (session.close()) 后，对象变为脱管状态
        - 对脱管对象的引用依然有效，对象可继续被修改
        - 脱管对象如果重新关联到某个新的 Session 上（如 session.update() / session.merge()），会再次转变为持久状态，脱管期间的改动将被持久化到数据库
    

 **状态转换总结：** Transient  ->  Detached  ->  Persistent}

% ======================================================================
## Spring Data JPA
% ======================================================================

### Spring Data JPA 简介  [p.37]

    - Spring Data JPA 是 Spring 提供的一套简化 JPA 开发的框架 [p.37]
    - **核心理念**：按照约定（Convention over Configuration），通过方法命名规则 (Method Naming Convention) 设计 DAO 层接口，自动生成查询实现，无需编写 SQL [p.37]
    - 除 CRUD 之外，还提供分页 (Pagination)、排序 (Sorting)、复杂查询 (Specification / @Query) 等功能 [p.37]

### 使用步骤  [p.38--39]

    - **Step 1 — 引入依赖**：spring-boot-starter-data-jpa + 数据库驱动 [p.38]
    - **Step 2 — 创建实体类**：使用 JPA 注解配置映射 [p.38]：
    
        - `@Entity`：标识实体类
        - `@Table(name = "...")`：指定数据库表名
        - `@Id`：标识主键
        - `@GeneratedValue(strategy = GenerationType.IDENTITY)`：主键生成策略
        - `@Column(name = "...")`：指定列名及约束
    
    - **Step 3 — 创建 Repository 接口** [p.39]：
    
        - 继承 JpaRepository<T, ID> 或 CrudRepository<T, ID>，无需实现类
        - 通过方法命名规则自动生成查询：`findByName(String name)`、`findByAgeGreaterThan(int age)`、`findByNameLike(String pattern)` 等
        - 支持 `@Query` 注解编写自定义 JPQL 或原生 SQL
    
    - **Step 4 — 在 Service 中使用**：注入 Repository 接口，直接调用方法 [p.39]

% ======================================================================
## MyBatis 生态插件与 MyBatis-Plus
% ======================================================================

### MyBatis ``三剑客'' (Three Musketeers)  [p.41]

    - 围绕 MyBatis 基础功能，由第三方设计和开发的常用工具、插件组合 [p.41]：
    - **(1) MyBatis-generator**（自动代码生成工具）[p.42]：
    
        - 基于 MyBatis 框架的自动代码生成工具
        - 主要功能：根据数据库表结构自动生成 Java Bean (实体类)、Mapper 接口和 Mapper XML 映射文件
        - 只需少量配置（数据库连接、生成策略、输出路径等）即可运行
    
    - **(2) MyBatis Plugin**：IDE 插件（如 IntelliJ IDEA 的 Free MyBatis Plugin），辅助开发，提供 Mapper 接口与 XML 之间跳转、SQL 语法高亮等功能 [p.41]
    - **(3) MyBatis 分页 PageHelper** [p.43]：
    
        - 分页功能是查询大数据量表时的必备功能，一方面减少数据库查询压力，另一方面降低客户端数据加载量
        - 原 MyBatis 中手动实现分页（LIMIT + OFFSET）较为繁琐
        - PageHelper 是通用分页插件，支持多种数据库（MySQL、Oracle、PostgreSQL 等），通过 `PageHelper.startPage(pageNum, pageSize)` 一行代码即可实现物理分页，极少配置
    

### MyBatis-Plus (MyBatis 增强工具)  [p.44--48]

    - 官网：\url{https://baomidou.com/} [p.44]
    - 目前非常流行的基于 MyBatis 的增强工具，荣获``2019 年开源中国最受欢迎开发工具类软件 TOP 1'' [p.44]
    - **设计目标**：简化开发、提高效率 [p.44]
    - **实现原理**：大部分基于 AOP (Aspect-Oriented Programming)，无侵入、损耗小，直接面向对象操作 [p.44]
    - **核心特性** [p.44]：
    
        - 功能十分强大，基本囊括``三剑客''全部功能（代码生成、分页等）
        - 提供 Lambda 表达式风格的查询构造（LambdaQueryWrapper），类型安全
        - 支持 ActiveRecord 模式（实体类继承 Model<T>，直接调用 CRUD 方法）
        - 内置主键生成策略（雪花算法 Snowflake、UUID 等）
        - 自动填充功能（如创建时间、更新时间自动设置）
        - 逻辑删除、乐观锁、多租户等企业级功能
    

### MyBatis-Plus 框架结构  [p.45]

    - 在 MyBatis 基础之上进行增强，核心是对 BaseMapper 的封装
    - 提供内置通用 CRUD 方法（insert、deleteById、updateById、selectById、selectList 等），无需编写 XML 即可完成基础操作
    - 条件构造器 Wrapper 体系：AbstractWrapper $\rightarrow$ QueryWrapper / UpdateWrapper $\rightarrow$ LambdaQueryWrapper / LambdaUpdateWrapper

### MyBatis-Plus 使用步骤  [p.46--48]

[label=**Step \arabic*.**, leftmargin=*]
    - **引入依赖**：mybatis-plus-boot-starter 替代 mybatis-spring-boot-starter [p.46]
    - **配置框架**：与 MyBatis 配置类似，替换为 MyBatis-Plus 专有配置项 [p.46]
    - **创建实体类** [p.47]：
    
        - `@TableName("table\_name")`：指定对应的数据库表名
        - `@TableId(type = IdType.ASSIGN\_ID)`：指定主键及生成策略（默认雪花算法）
        - `@TableField("column\_name")`：指定属性与数据库列名的映射
        - `@TableLogic`：逻辑删除字段
    
    - **创建 Mapper 接口**：继承 `BaseMapper<T>` 即可获得内置通用 CRUD 方法，无需编写 XML [p.47]
    - **使用条件构造器 Wrapper 进行复杂查询** [p.48]：
    
        - QueryWrapper<T>：构建查询条件，方法链式调用：eq()、ne()、gt()、ge()、lt()、le()、like()、in()、between()、orderByAsc()、orderByDesc()、groupBy() 等
        - LambdaQueryWrapper<T>：Lambda 表达式形式，类型安全，避免字段名硬编码字符串
        - UpdateWrapper<T>：构建更新条件
    

% ======================================================================
## ORM 框架对比与选型
% ======================================================================

### JDBC 到 ORM 的演进路径  [p.6--48]

    - **原生 JDBC** [p.6, p.9--11]：最底层，完全手动控制，代码量大，易出错，连接管理繁琐
    - **Spring JdbcTemplate** [p.13--17]：简化 JDBC，封装连接和异常处理，但仍需手动编写 SQL 和 RowMapper，无缓存
    - **MyBatis** [p.19--27]：半自动 ORM，自定义 SQL + XML/注解映射，灵活性强，需要精细控制 SQL 的场景首选
    - **Hibernate** [p.29--34]：全自动 ORM，完全的对象-关系映射，适合标准 CRUD 和复杂对象模型
    - **Spring Data JPA** [p.37--39]：基于 JPA 规范，按方法命名约定自动生成查询，代码量最少
    - **MyBatis-Plus** [p.44--48]：MyBatis 增强，通用 CRUD + 条件构造器 + 代码生成，开发效率最高

### 选型讨论  [p.49]

    - **到底应不应该使用 ORM 框架？** 取决于项目规模、团队能力、性能要求 [p.49]：
    
        - 小型项目或简单查询：JdbcTemplate 足够，避免过度设计
        - 中大型项目：ORM 框架显著提升开发效率和代码可维护性
    
    - **如何选择具体框架？** [p.49]：
    
        - 需要对 SQL 有完全控制、查询复杂多变：**MyBatis / MyBatis-Plus**
        - 标准 CRUD 为主、追求开发速度：**Spring Data JPA**
        - 复杂对象模型（继承、多态、多表关联）：**Hibernate / JPA**
        - 需要兼具 MyBatis 灵活性和开发效率：**MyBatis-Plus**（推荐）
    

% ======================================================================
## 框架核心对比速查表
% ======================================================================


| |p{3.5cm}|p{3.5cm}|p{3.5cm}

**特性** | **Spring JdbcTemplate** | **MyBatis** | **Hibernate / JPA** |
| --- | --- | --- | --- |
| 

**特性** | **Spring JdbcTemplate** | **MyBatis** | **Hibernate / JPA** |
| 

ORM 级别 | 简化 JDBC（非 ORM） | 半自动 ORM | 全自动 ORM |
| SQL 控制 | 完全手动，Java 代码拼写 | 手写 SQL，XML/注解分离 | 框架自动生成 (HQL/JPQL) |
| 参数/结果映射 | 手动 RowMapper | \#\{\} 占位符 + resultMap | 自动，基于注解/XMl |
| 动态 SQL | 无原生支持 | 标签化动态 SQL (<if>, <foreach>) | Criteria API / JPQL |
| 缓存 | 无 | 一级 + 可选二级缓存 | 一级 + 二级缓存 |
| 关联映射 | 手动逐字段组装 | resultMap configuration | 自动，级联操作支持 |
| 延迟加载 | 不支持 | 支持（association/collection） | 支持（FetchType.LAZY） |
| 学习曲线 | 低 | 中等 | 较高（需理解 Session/JPA） |
| 适用场景 | 小型项目、简单查询 | SQL 控制需求高、复杂查询 | 标准 CRUD、复杂对象模型 |
| 代表产品 | Spring JdbcTemplate | MyBatis-Plus 增强 | Spring Data JPA 高层抽象 |

% ======================================================================
## 本章小结
% ======================================================================

本章系统地介绍了 ORM 框架的概念、发展历程及主流实现方式 [p.3, p.50]：

    - **ORM 框架概述** [p.4--7]：持久化概念、JDBC 编程痛点回顾、ORM 定义与四种实现层次
    - **Spring JDBC 模板** [p.13--17]：简化 JDBC 操作的核心委托类，适用于简单场景，局限是无缓存、手动 RowMapper
    - **MyBatis 框架** [p.19--27]：半自动 ORM，核心特点含自定义 SQL、动态 SQL、参数/结果映射、两级缓存、插件机制、Spring 集成
    - **Hibernate 框架** [p.29--34]：全自动 ORM，HQL 查询语言，持久化对象三状态（Transient / Persistent / Detached），级联与延迟加载
    - **Spring Data JPA** [p.37--39]：基于 JPA 规范的高层抽象，按方法命名约定自动生成查询，分页与排序内置
    - **MyBatis 插件生态** [p.41--48]：三剑客（generator / Plugin / PageHelper）+ MyBatis-Plus（BaseMapper / Wrapper / Lambda / ActiveRecord）
    - **选型建议** [p.49]：SQL 控制力优先选 MyBatis；开发效率优先选 JPA/MyBatis-Plus；全自动选 Hibernate；简单场景选 JdbcTemplate
