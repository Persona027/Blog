---
title: 数字电路设计复习：DDCA第二章 组合逻辑设计
date: 2026-05-01
category: 数字电路设计
summary: DDCA Chapter 2复习要点：布尔代数、SOP/POS形式、布尔定理T1-T11、卡诺图化简、QM方法、多路选择器/译码器、时序分析。
cover: /logo.png
---

> 面向对象：数字电路设计课程学习者，DDCA ARM Edition教材复习资料<br/>
> 本文基于课堂课件整理，涵盖核心考点、公式、概念和解题技巧。

------------------------------------------------------------------------

## 组合逻辑基础（pp.1--6）

- **组合逻辑**（Combinational Logic）：无记忆，输出仅取决于当前输入 [p.5]
- **时序逻辑**（Sequential Logic）：有记忆，输出取决于过去和当前输入 [p.5]
- 组合电路规则：每个元件都是组合的、每个节点是输入或只连接一个输出、无循环路径 [p.6]

## 布尔方程：SOP与POS形式（pp.7--22）

### 重要定义 [p.8]

- **文字**（Literal）：变量或其补，如$A,\overline{A},B,\overline{B}$
- **蕴含项**（Implicant）：文字的乘积，如$ABC, AC, BC$
- **最小项**（Minterm）：包含所有输入变量的乘积，如$ABC,\overline{A}BC$
- **最大项**（Maxterm）：包含所有输入变量的和，如$(A+B+C)$

### SOP（Sum-of-Products，与或式）[pp.9--13]
将输出为1的行对应的最小项相或。例：$Y=\overline{A}B+A\overline{B}=\Sigma(1,2)$

### POS（Product-of-Sums，或与式）[pp.14--16]
将输出为0的行对应的最大项相与。例：$Y=(A+B)(\overline{A}+\overline{B})=\Pi(0,3)$

**SOP与POS的关系**：$\Sigma(0,2)$的补是$\Sigma(1,3)$，所以$\Sigma(1,3)=\Pi(0,2)$ [p.17]

## 布尔代数：公理与定理（pp.23--63）

### 单变量定理 [pp.27--40]

| **编号** | **定理** | **对偶** | **名称** |
| --- | --- | --- | --- |
| T1 | $B\cdot 1 = B$ | $B+0=B$ | 同一律（Identity） |
| T2 | $B\cdot 0 = 0$ | $B+1=1$ | 零元律（Null Element） |
| T3 | $B\cdot B = B$ | $B+B=B$ | 重叠律（Idempotency） |
| T4 | $\overline{\overline{B}} = B$ | -- | 还原律（Involution） |
| T5 | $B\cdot\overline{B}=0$ | $B+\overline{B}=1$ | 互补律（Complements） |

### 多变量定理 [pp.41--63]   【必记】

| T6 | $B\cdot C = C\cdot B$ | $B+C = C+B$ | 交换律 |
| --- | --- | --- | --- |
| T7 | $(B\cdot C)\cdot D = B\cdot(C\cdot D)$ | $(B+C)+D = B+(C+D)$ | 结合律 |
| T8 | $B(C+D)=BC+BD$ | $B+CD=(B+C)(B+D)$ | 分配律 |
| T9 | $B\cdot(B+C)=B$ | $B+(B\cdot C)=B$ | 吸收律 |
| T10 | $BC+B\overline{C}=B$ | $(B+C)(B+\overline{C})=B$ | 合并律 |
| T11 | $BC+\overline{B}D+CD = BC+\overline{B}D$（一致律，Consensus） | -- | -- |

**对偶性**（Duality）：AND$\leftrightarrow$OR互换，0$\leftrightarrow$1互换 [p.26]

## 布尔方程化简方法（pp.64--92）

### 核心化简技术 [p.67, p.75]

- **分配律**：$B(C+D)=BC+BD$；$B+CD=(B+C)(B+D)$
- **吸收律**：$A+AP=A$
- **合并律**：$PA+P\overline{A}=P$
- **展开**：$P=PA+P\overline{A}$；$A=A+AP$
- **重复**：$A=A+A$
- **化简定理**：$PA+\overline{A}=P+\overline{A}$ [p.69]

### 证明方法 [pp.43--44]

- **完全归纳法**（Perfect Induction）：穷举所有输入组合
- **公理推导法**：使用已证明的公理和定理推导

## 德摩根定理与气泡推动（pp.99--117）

### 德摩根定理（DeMorgan's Theorem）[pp.99--103]
$$

\overline{B_0\cdot B_1\cdot B_2...} = \overline{B_0}+\overline{B_1}+\overline{B_2}...

$$
$$

\overline{B_0+B_1+B_2...} = \overline{B_0}\cdot\overline{B_1}\cdot\overline{B_2}...

$$

### 气泡推动（Bubble Pushing）[pp.110--117]

- 前向推气泡：门体变换（AND$\leftrightarrow$OR），输出端加气泡
- 后向推气泡：门体变换，输入端加气泡
- 目标：气泡在输出端便于晶体管实现，在输入端便于理解

## 可编程逻辑器件PLD（pp.120--121）

- PROM（可编程只读存储器）、PLA（可编程逻辑阵列）：1970年代，熔丝编程
- PAL（可编程阵列逻辑）：AMD改进，与阵列可编程，或阵列固定
- GAL（通用阵列逻辑）：Lattice 1985年，EEPROM工艺，可电擦除重复编程
- EPLD（可擦除PLD）：ALTERA 1980年代中期
- CPLD（复杂PLD）：Lattice 1980年代末，在系统可编程（ISP）
- FPGA：在PAL/GAL/EPLD基础上进一步发展

## X与Z：竞争与浮空（pp.127--130）

- **X（竞争）**：电路试图同时驱动输出为1和0，可能导致功耗过大 [p.127]
- **Z（高阻态）**：浮空/高阻抗状态。三态缓冲器（Tristate Buffer）：$E=1$时$Y=A$，$E=0$时$Y=Z$ [p.128]
- 三态总线应用：多个驱动共享总线，同一时间仅一个活跃 [p.130]

## 卡诺图（Karnaugh Maps）（pp.131--141）  【重点】

### 卡诺图规则 [p.135]

- 每个1必须至少被圈一次
- 每圈跨度必须是2的幂次方（1、2、4）在各方格
- 每圈尽可能大
- 圈可边界环绕
- 无关项（X）仅在有助于化简时圈入

### 卡诺图定义 [p.134]

- **主蕴含项**（Prime Implicant）：卡诺图中最大圈对应的蕴含项

### QM化简法（Quine-McCluskey）[pp.143--146]
适用于多变量（卡诺图不便时），可编程实现。步骤：

- 将逻辑函数表示为最小项之和
- 按包含1的个数分类
- 合并仅一位不同的最小项（该位记为`-'）
- 重复直到不能合并，标记主蕴含项P

## 组合逻辑构建块（pp.147--155）

### 多路选择器（Multiplexer/Mux）[pp.148--152]

- N选1开关，需要$\log_2 N$位选择输入
- 实现方式：SOP逻辑门（$Y=D_0\overline{S}+D_1 S$）或三态门
- 可作查找表（LUT）使用：输入连选择线，数据输入端接常量 [p.150]

### 译码器（Decoder）[pp.153--155]
N输入$2^N$输出，独热码（One-hot）：任意时刻仅一个输出为高。<br/>
例：2:4译码器：$A_1A_0$组合控制$Y_0$--$Y_3$

## 时序（Timing）（pp.156--164）

### 传播延迟与污染延迟 [pp.157--158]

- **传播延迟**（Propagation Delay）$t_{pd}$：输入到输出的最大延迟
- **污染延迟**（Contamination Delay）$t_{cd}$：输入到输出的最小延迟
- 受电容/电阻和光速限制影响

### 关键路径与短路径 [p.159]
$t_{pd} = 2t_{pd\_AND} + t_{pd\_OR}$（最长路径）  $t_{cd} = t_{cd\_AND}$（最短路径）

### 毛刺（Glitch）[pp.160--164]
单个输入变化导致输出多次翻转。修复方法：在卡诺图中添加冗余蕴含项覆盖相邻圈之间的空隙 [p.163]

## 组合电路设计步骤（pp.165--172）

- 需求分析：明确输入输出、列真值表
- 逻辑表达式构建：写表达式、卡诺图/布尔代数化简
- 绘制逻辑电路图：选逻辑门，画电路图
- 电路实现（Digital工具）
- 验证与测试：仿真+实际测试
- 优化与改进：减少延迟/功耗/成本
