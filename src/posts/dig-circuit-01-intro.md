---
title: 数字电路设计复习：课程导论与背景
date: 2026-05-01
category: 数字电路设计
summary: 数字电路设计课程第一章复习要点：中国芯片产业背景、FPGA介绍、课程目标与考核方式。
cover: /logo.png
---

> 面向对象：数字电路设计课程学习者，DDCA ARM Edition教材复习资料
> 本文基于课堂课件整理，涵盖核心考点、公式、概念和解题技巧。

------------------------------------------------------------------------

## 中国芯片产业背景（pp.2--7）

### 核心概念

- **缺芯少魂**（1999年徐冠华提出）：芯=芯片（Chip），魂=操作系统（OS）[p.2]
- **芯片制造流程**：SiO$_2$（沙子）$\rightarrow$ 多晶硅（Polysilicon）$\rightarrow$ 单晶硅（Monocrystalline Silicon）$\rightarrow$ 晶圆（Wafer）$\rightarrow$ **光刻（Lithography，卡脖子环节）**$\rightarrow$ 离子注入（Ion Implantation）$\rightarrow$ 晶体管（Transistor）$\rightarrow$ 切割封装$\rightarrow$ 芯片 [p.3]
- **汉芯事件**（2003年）：上海交通大学陈进发明"汉芯一号"造假，骗取上亿元科研基金。2006年1月被揭发 [p.4]

### 中美科技战时间线 [p.5]

- 1996年7月：《瓦森纳协定》（Wassenaar Arrangement）-- 西方国家对先进技术出口统一管制
- 2022年8月9日：拜登签署《芯片和科学法案》（CHIPS and Science Act）
- 2023年8月9日：拜登限制对华半导体、量子计算（Quantum Computing）、AI投资
- 2024年12月：将约140家中国企业列入"实体清单"（Entity List），限制半导体设备、芯片设计软件（EDA）、高带宽存储器（HBM）出口

### 产业现状 [pp.6--7]

- 2025年中国集成电路出口2019亿美元，同比增长26.8\% [p.6]
- 十五五规划（2026--2030）：半导体（集成电路）列为十大战略性新兴产业赛道**榜首** [p.7]

## FPGA与实验平台（pp.8--10）

### FPGA（Field Programmable Gate Array，现场可编程门阵列）

- **定义**：由可编程逻辑门和可编程存储器组成，可通过编程设计灵活的数字电路，无需物理硬件设计 [p.8]
- **主要厂商**：AMD（原Xilinx）、Intel（原Altera）、安路科技（上海，2011年成立）[p.8]

### FPGA应用领域 [p.9]

- **通信**：基站信号处理，5G/6G通信系统
- **数据中心**：高效计算加速器
- **AI/深度学习**：训练和推理加速
- 核心优势：定制能力强，灵活性和可靠性高

### 实验工具箱 [p.10]
FPGA核心板、显示屏、LED、数码管（7-Segment Display）、拨码开关（DIP Switch）、插线面板（Breadboard）

## 课程目标与毕业要求（pp.11--13）

### 四个核心目标（Objectives）[p.11]

- 掌握数字设计原理（Digital Design Principles），掌握 Digiblock+ 和 SystemVerilog/Verilog
- 理解 CPU 架构（ARM）和微体系结构（Micro-Architecture）
- 掌握 Xilinx Vivado 进行 FPGA 仿真和实现
- 基于 FPGA 构建简易计算机系统

### 课程目标（CT1--CT3）[p.13]

- **CT1（知识）**：软硬件系统组成、发展历史、电路设计原理、数据表示、体系结构和微体系结构、片上系统（SoC）、外部设备通信协议
- **CT2（能力）**：知识体系构建、对复杂计算机系统进行定性和定量性能分析、利用可编程器件（Programmable Device）将新技术用于系统设计
- **CT3（素养）**：批判性思维（Critical Thinking），完善和丰富设计方案

## 教材与考核（pp.14--18）

### 教材 [p.14]

- **主教材**：*Digital Design and Computer Architecture (ARM Edition)*, Harris S.L. \& Harris D.M., Elsevier, 2016
- **中文版**：《数字设计和计算机体系结构》，陈俊颖译，机械工业出版社，2019

### 参考书 [p.14]

- 《计算机组成原理（第4版）》蒋本珊等，清华大学出版社，2019
- 《计算机组成原理（第3版）》张功萱等，清华大学出版社，2023
- 《计算机原理与设计：Verilog HDL版》李亚民，2011

### 作者简介 [p.15]

- **David Money Harris**：斯坦福大学电气工程博士，曾就职于Intel参与Itanium和Pentium II处理器设计
- **Sarah L. Harris**：斯坦福大学电气工程博士，曾就职于HP、Nvidia、微软研究院（Microsoft Research）

### 考核方式（Assessment）[p.17]

| **项目** | **比例** |
| --- | --- |
| 课堂参与（Class） | 20\% |
| 作业（Homework） | 20\% |
| 实验（Lab） | 20\% |
| 考试（Exam） | 40\% |

**考试占比最高（40\%），需重点复习后续章节的数字设计原理和Verilog编程。**
