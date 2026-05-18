export interface PdfPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  cover?: string;
  pdfUrl: string;
}

export const pdfPosts: PdfPostMeta[] = [
  // ========== 计算机网络 (7) ==========
  {
    slug: 'cn-ch1-intro',
    title: '计算机网络 Ch1 — 网络概述 考点总结',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第一章网络概述考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch1-intro.pdf',
  },
  {
    slug: 'cn-ch2-physical',
    title: '计算机网络 Ch2 — 物理层 考点总结',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第二章物理层考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch2-physical.pdf',
  },
  {
    slug: 'cn-ch3-datalink',
    title: '计算机网络 Ch3 — 数据链路层 考点总结',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第三章数据链路层考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch3-datalink.pdf',
  },
  {
    slug: 'cn-ch3-mac',
    title: '计算机网络 Ch3 — MAC层 考点总结',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络MAC子层考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch3-mac.pdf',
  },
  {
    slug: 'cn-ch4-network-2024',
    title: '计算机网络 Ch4 — 网络层 考点总结 (2024版)',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第四章网络层2024版考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch4-network-2024.pdf',
  },
  {
    slug: 'cn-ch4-network-2026',
    title: '计算机网络 Ch4 — 网络层 考点总结 (2026版)',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第四章网络层2026版考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch4-network-2026.pdf',
  },
  {
    slug: 'cn-ch6-transport',
    title: '计算机网络 Ch6 — 传输层 考点总结',
    date: '2026-05-09',
    category: '计算机网络',
    summary: '计算机网络第六章传输层考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/cn-ch6-transport.pdf',
  },

  // ========== 编译原理 (6) ==========
  {
    slug: 'compiler-ch1-intro',
    title: '编译原理 Ch1 — 概论 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第一章概论考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch1-intro.pdf',
  },
  {
    slug: 'compiler-ch2-lexical',
    title: '编译原理 Ch2 — 词法分析 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第二章词法分析考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch2-lexical.pdf',
  },
  {
    slug: 'compiler-ch3-syntax',
    title: '编译原理 Ch3 — 语法分析 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第三章语法分析考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch3-syntax.pdf',
  },
  {
    slug: 'compiler-ch4-semantic',
    title: '编译原理 Ch4 — 语义分析 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第四章语义分析考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch4-semantic.pdf',
  },
  {
    slug: 'compiler-ch7-sdt',
    title: '编译原理 Ch7 — 语法制导与中间代码生成 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第七章语法制导与中间代码生成考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch7-sdt.pdf',
  },
  {
    slug: 'compiler-ch8-optimization',
    title: '编译原理 Ch8 — 代码优化 考点总结',
    date: '2026-05-12',
    category: '编译原理',
    summary: '编译原理第八章代码优化考点总结',
    cover: '/logo.png',
    pdfUrl: '/pdfs/compiler-ch8-optimization.pdf',
  },

  // ========== 数字电路设计 (6) ==========
  {
    slug: 'dig-circuit-01-intro',
    title: '数字电路设计复习：课程导论与背景',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: '数字电路设计课程第一章复习要点：中国芯片产业背景、FPGA介绍、课程目标与考核方式。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-01-intro.pdf',
  },
  {
    slug: 'dig-circuit-02-computer-org',
    title: '数字电路设计复习：计算机组成概述',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: '计算机组成概述复习要点：计算发展历程、冯诺依曼结构、ARM体系结构、性能指标与评价方法。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-02-computer-org.pdf',
  },
  {
    slug: 'dig-circuit-03-ddca-ch1',
    title: '数字电路设计复习：DDCA第一章 数字设计基础',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: 'DDCA Chapter 1复习要点：数字抽象、数制系统、二进制运算、补码、逻辑门、CMOS晶体管、功耗分析。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-03-ddca-ch1.pdf',
  },
  {
    slug: 'dig-circuit-04-ddca-ch2',
    title: '数字电路设计复习：DDCA第二章 组合逻辑设计',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: 'DDCA Chapter 2复习要点：布尔代数、SOP/POS形式、布尔定理T1-T11、卡诺图化简、QM方法、多路选择器/译码器、时序分析。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-04-ddca-ch2.pdf',
  },
  {
    slug: 'dig-circuit-05-ddca-ch3',
    title: '数字电路设计复习：DDCA第三章 时序逻辑设计',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: 'DDCA Chapter 3复习要点：锁存器与触发器、同步逻辑设计、有限状态机FSM、时序约束与亚稳态、并行性与流水线。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-05-ddca-ch3.pdf',
  },
  {
    slug: 'dig-circuit-06-ddca-ch4',
    title: '数字电路设计复习：DDCA第四章 硬件描述语言HDL',
    date: '2026-05-01',
    category: '数字电路设计',
    summary: 'DDCA Chapter 4复习要点：SystemVerilog/Verilog基础、组合与时序逻辑HDL描述、结构建模、FSM实现、参数化模块、测试平台。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/dig-circuit-06-ddca-ch4.pdf',
  },

  // ========== 软件开发架构总结 (12) ==========
  {
    slug: 'sw-arch-summary-01-overview',
    title: '软件开发架构复习：开发架构与框架技术概述',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第一章复习要点：软件开发架构概念、框架技术概述、企业级开发架构设计原则。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-01-overview.pdf',
  },
  {
    slug: 'sw-arch-summary-02-spring-ioc',
    title: '软件开发架构复习：Spring IoC原理和实现',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第二章复习要点：IoC容器原理、依赖注入方式、Bean生命周期、Spring IoC实现机制。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-02-spring-ioc.pdf',
  },
  {
    slug: 'sw-arch-summary-03-spring-aop',
    title: '软件开发架构复习：Spring AOP原理和实现',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第三章复习要点：AOP概念、切面/通知/切入点定义、Spring AOP实现原理与代理机制。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-03-spring-aop.pdf',
  },
  {
    slug: 'sw-arch-summary-04-spring-mvc',
    title: '软件开发架构复习：Spring MVC',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第四章复习要点：MVC设计模式、DispatcherServlet、控制器/视图解析器、REST集成。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-04-spring-mvc.pdf',
  },
  {
    slug: 'sw-arch-summary-05-spring-boot',
    title: '软件开发架构复习：Spring Boot',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第五章复习要点：自动配置原理、起步依赖、内嵌服务器、Actuator监控、Spring Boot最佳实践。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-05-spring-boot.pdf',
  },
  {
    slug: 'sw-arch-summary-06-mybatis',
    title: '软件开发架构复习：ORM框架和MyBatis详解',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第六章复习要点：ORM概念、MyBatis配置、Mapper映射、动态SQL、与Spring集成。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-06-mybatis.pdf',
  },
  {
    slug: 'sw-arch-summary-07-restful-api',
    title: '软件开发架构复习：Restful API设计与实现',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第七章复习要点：REST架构风格、HTTP方法/状态码、API版本管理、安全认证、文档规范。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-07-restful-api.pdf',
  },
  {
    slug: 'sw-arch-summary-08-frontend-modules',
    title: '软件开发架构复习：前端模块化开发',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第八章复习要点：模块化概念、CommonJS/AMD/ES6 Module、打包工具、依赖管理。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-08-frontend-modules.pdf',
  },
  {
    slug: 'sw-arch-summary-09-component-dev',
    title: '软件开发架构复习：模块化与组件化开发',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第九章复习要点：组件化设计原则、组件通信、状态管理、组件复用与测试。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-09-component-dev.pdf',
  },
  {
    slug: 'sw-arch-summary-10-engineering',
    title: '软件开发架构复习：工程化思维和框架必要性',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第十章复习要点：软件工程化思维、框架选型原则、开发效率与维护性平衡。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-10-engineering.pdf',
  },
  {
    slug: 'sw-arch-summary-11-react',
    title: '软件开发架构复习：React框架核心',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第十一章复习要点：JSX语法、组件/Hooks、虚拟DOM、状态提升、React Router。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-11-react.pdf',
  },
  {
    slug: 'sw-arch-summary-12-vue',
    title: '软件开发架构复习：Vue框架核心',
    date: '2026-05-07',
    category: '软件开发架构总结',
    summary: '第十二章复习要点：模板语法、响应式原理、Composition API、Vue Router/Pinia。',
    cover: '/logo.png',
    pdfUrl: '/pdfs/sw-arch-summary-12-vue.pdf',
  },
];

export const pdfPostsBySlug: Record<string, PdfPostMeta> = Object.fromEntries(
  pdfPosts.map((p) => [p.slug, p])
);

export function isPdfPost(slug: string): boolean {
  return slug in pdfPostsBySlug;
}

export function getPdfPost(slug: string): PdfPostMeta | undefined {
  return pdfPostsBySlug[slug];
}
