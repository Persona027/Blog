import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_PDFS = path.resolve(__dirname, '..', 'public', 'pdfs');

interface CopyEntry {
  source: string;
  target: string;
}

const entries: CopyEntry[] = [
  // ========== 计算机网络 (7) ==========
  {
    source: 'd:/myWebsite/Summary - ch1-2026/Summary - ch1-2026.pdf',
    target: 'cn-ch1-intro.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch2_物理层_v2.0-1/Summary - ch2_物理层_v2.0-1.pdf',
    target: 'cn-ch2-physical.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch3_数据链路层_v2.0/Summary - ch3_数据链路层_v2.0.pdf',
    target: 'cn-ch3-datalink.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch3_MAC层-1/Summary - ch3_MAC层-1.pdf',
    target: 'cn-ch3-mac.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch4_网络层-2024/Summary - ch4_网络层-2024.pdf',
    target: 'cn-ch4-network-2024.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch4_网络层-2026/Summary - ch4_网络层-2026.pdf',
    target: 'cn-ch4-network-2026.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - ch6_传输层_2024/Summary - ch6_传输层_2024.pdf',
    target: 'cn-ch6-transport.pdf',
  },

  // ========== 编译原理 (6) ==========
  {
    source: 'd:/myWebsite/Summary - 1-概论/Summary - 1-概论.pdf',
    target: 'compiler-ch1-intro.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - 2-词法分析/Summary - 2-词法分析.pdf',
    target: 'compiler-ch2-lexical.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - 3-语法分析/Summary - 3-语法分析.pdf',
    target: 'compiler-ch3-syntax.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - 4-语义分析/Summary - 4-语义分析.pdf',
    target: 'compiler-ch4-semantic.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - 7-语法制导与中间代码生成/Summary - 7-语法制导与中间代码生成.pdf',
    target: 'compiler-ch7-sdt.pdf',
  },
  {
    source: 'd:/myWebsite/Summary - 8-代码优化/Summary - 8-代码优化.pdf',
    target: 'compiler-ch8-optimization.pdf',
  },

  // ========== 数字电路设计 (6) ==========
  {
    source: 'd:/myWebsite/pdf/Summary - 1 Introduction(1)/Summary - 1 Introduction(1).pdf',
    target: 'dig-circuit-01-intro.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - 2 Computer Organization(1)/Summary - 2 Computer Organization(1).pdf',
    target: 'dig-circuit-02-computer-org.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - 3 DDCAarm_Ch1(1)/Summary - 3 DDCAarm_Ch1(1).pdf',
    target: 'dig-circuit-03-ddca-ch1.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - 4 DDCAarm_Ch2(2)/Summary - 4 DDCAarm_Ch2(2).pdf',
    target: 'dig-circuit-04-ddca-ch2.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - 5 DDCAarm_Ch3(1)/Summary - 5 DDCAarm_Ch3(1).pdf',
    target: 'dig-circuit-05-ddca-ch3.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - 6 DDCAarm_Ch4/Summary - 6 DDCAarm_Ch4.pdf',
    target: 'dig-circuit-06-ddca-ch4.pdf',
  },

  // ========== 软件开发架构总结 (12) ==========
  {
    source: 'd:/myWebsite/pdf/Summary - CH01 开发架构与框架技术概述/Summary - CH01 开发架构与框架技术概述.pdf',
    target: 'sw-arch-summary-01-overview.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH02 Spring IoC原理和实现/Summary - CH02 Spring IoC原理和实现.pdf',
    target: 'sw-arch-summary-02-spring-ioc.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH03 Spring AOP原理和实现/Summary - CH03 Spring AOP原理和实现.pdf',
    target: 'sw-arch-summary-03-spring-aop.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH04 Spring MVC/Summary - CH04 Spring MVC.pdf',
    target: 'sw-arch-summary-04-spring-mvc.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH05 Spring Boot/Summary - CH05 Spring Boot.pdf',
    target: 'sw-arch-summary-05-spring-boot.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH06 ORM框架和MyBatis详解/Summary - CH06 ORM框架和MyBatis详解.pdf',
    target: 'sw-arch-summary-06-mybatis.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH07 Restful API/Summary - CH07 Restful API.pdf',
    target: 'sw-arch-summary-07-restful-api.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH08 前端模块化/Summary - CH08 前端模块化.pdf',
    target: 'sw-arch-summary-08-frontend-modules.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH09 模块化与组件化开发/Summary - CH09 模块化与组件化开发.pdf',
    target: 'sw-arch-summary-09-component-dev.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH10 工程化思维和框架必要性/Summary - CH10 工程化思维和框架必要性.pdf',
    target: 'sw-arch-summary-10-engineering.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH11 React/Summary - CH11 React.pdf',
    target: 'sw-arch-summary-11-react.pdf',
  },
  {
    source: 'd:/myWebsite/pdf/Summary - CH12 Vue/Summary - CH12 Vue.pdf',
    target: 'sw-arch-summary-12-vue.pdf',
  },
];

function main() {
  fs.mkdirSync(PUBLIC_PDFS, { recursive: true });

  let copied = 0;
  let missing = 0;

  for (const entry of entries) {
    const dest = path.join(PUBLIC_PDFS, entry.target);
    if (!fs.existsSync(entry.source)) {
      console.error(`MISSING: ${entry.source}`);
      missing++;
      continue;
    }
    fs.copyFileSync(entry.source, dest);
    console.log(`OK: ${entry.target}`);
    copied++;
  }

  console.log(`\nDone. Copied: ${copied}, Missing: ${missing}`);
}

main();
