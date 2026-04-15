# Harness Engineering 最佳实践模板 — 使用手册

> 本手册基于 [learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering) 课程提炼，提供一套可直接迁移到任意项目的 Harness 模板及使用说明。

---

## 目录

1. [什么是 Harness Engineering](#1-什么是-harness-engineering)
2. [为什么需要 Harness](#2-为什么需要-harness)
3. [五子系统模型](#3-五子系统模型)
4. [文件结构一览](#4-文件结构一览)
5. [每个文件详解](#5-每个文件详解)
6. [最小部署路径](#6-最小部署路径)
7. [进阶配置](#7-进阶配置)
8. [常见问题排查](#8-常见问题排查)
9. [Harness 审计方法](#9-harness-审计方法)

---

## 1. 什么是 Harness Engineering

**Harness Engineering = 模型权重之外的一切工程基础设施。**

不是写更好的提示词，而是设计模型运行所在的系统——文件结构、验证命令、状态追踪、会话管理。

> **核心认知**: 同一个模型，没有 harness 时可能 20% 成功率，加上完整 harness 后可以到 80-100%。模型没换，换的是环境。

Anthropic 对照实验：同一 Opus 4.5 模型，同一提示词"做一个 2D 复古游戏编辑器"：
- **无 harness**: 20 分钟 $9，核心功能跑不起来
- **完整 harness** (planner + generator + evaluator 三 agent): 6 小时 $200，游戏可正常游玩

---

## 2. 为什么需要 Harness

没有 harness 时 agent 的典型行为：

```
会话 1: agent 写代码 → 搞坏测试 → 说"做完了" → 你手动修复
会话 2: agent 从头开始 → 没有上次的记忆 → 重新做或做完全不同的东西 → 你再修
结果: 你花的时间比自己做还多
```

有了 harness 之后：

```
会话 1: agent 读指令 → 跑 init → 一次做一个功能 → 验证后才说完成 → 更新进度
会话 2: agent 读进度 → 从上次停下的地方继续 → 你是审查者，不是救火者
结果: agent 干活，你验证结果
```

---

## 3. 五子系统模型

每个 harness 由五个子系统组成：

| 子系统 | 核心文件 | 职责 | 类比 |
|--------|----------|------|------|
| **指令** | AGENTS.md / CLAUDE.md | 告诉 agent 做什么、按什么顺序、开工前读什么 | 菜谱架 |
| **状态** | feature_list.json, claude-progress.md | 跟踪做了什么、正在做、下一步是什么 | 备菜台 |
| **验证** | init.sh, 测试套件 | 只有测试通过才算完成 | 出菜检查口 |
| **范围** | feature_list.json 中的状态规则 | 约束一次只做一个功能 | 份量控制 |
| **生命周期** | init.sh, clean-state-checklist.md | 开工初始化，结束做交接 | 开关门流程 |

五个子系统缺一个，就像厨房少了一个功能区——菜还是能做，但总是别扭。

---

## 4. 文件结构一览

```
your-project/
├── AGENTS.md                  # [指令] 给 Codex / 通用 agent 的操作手册
├── CLAUDE.md                  # [指令] 给 Claude Code 的操作手册（内容与 AGENTS.md 等价）
├── init.sh                    # [验证+生命周期] 一键启动、安装、验证
├── feature_list.json          # [状态+范围] 功能清单，机器可读的状态追踪
├── claude-progress.md         # [状态] 每轮会话进度日志
├── session-handoff.md         # [状态] 较长会话的交接摘要（可选）
├── clean-state-checklist.md   # [生命周期] 收尾检查清单
├── evaluator-rubric.md        # [验证] 评审评分表，评估 agent 产出质量
├── quality-document.md        # [验证] 质量快照，跟踪代码库健康度趋势
├── docs/
│   └── ARCHITECTURE.md        # [指令] 架构文档（按需创建）
└── scripts/
    └── (可选脚本)
```

**最小部署只需要前 4 个文件**（AGENTS.md / CLAUDE.md 二选一 + init.sh + feature_list.json + claude-progress.md）。

---

## 5. 每个文件详解

### 5.1 AGENTS.md / CLAUDE.md

**二选一使用**：Codex / Cursor 用 `AGENTS.md`，Claude Code 用 `CLAUDE.md`。

**核心内容**:

1. **开工流程** — agent 写代码前必须按顺序执行的步骤列表
2. **工作规则** — 行为约束（一次一个功能、验证先行、以文件为准）
3. **完成定义** — 所有条件都满足才算完成的硬性标准
4. **收尾流程** — 结束会话前必须做的事

**关键原则**:
- 保持在 50-100 行左右，不要写太长
- 是"地图"不是"百科全书"，详细内容放到 `docs/` 目录
- 用可执行的规则约束，不要微管实现细节

### 5.2 init.sh

**做什么**: 一条命令完成依赖安装、验证和启动。

**自定义**: 修改文件顶部的变量：
```bash
INSTALL_CMD="npm install"     # 你的安装命令
VERIFY_CMD="npm test"         # 你的测试命令
TYPE_CHECK_CMD="npm run type-check"
LINT_CMD="npm run lint"
START_CMD="npm run dev"       # 你的开发服务器命令
```

**行为**:
1. 打印当前工作目录
2. 安装依赖
3. 跑类型检查
4. 跑测试
5. 跑 linter
6. 全部通过后提示就绪（或自动启动开发服务器）

**使用**: 给执行权限 `chmod +x init.sh`

### 5.3 feature_list.json

**做什么**: 机器可读的功能列表，每个功能有状态、验证步骤和证据。

**字段说明**:

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 短的唯一标识，如 `feat-001` |
| `name` | string | 功能名称 |
| `description` | string | 功能描述 |
| `area` | string | 属于应用的哪个区域 |
| `priority` | int | 优先级，越小越优先 |
| `dependencies` | array | 依赖的其他功能 ID |
| `status` | string | 四种状态之一 |
| `user_visible_behavior` | string | 功能正常时用户能看到什么 |
| `verification` | array | 逐步验证步骤 |
| `evidence` | string | 验证通过的记录（由 agent 填写） |
| `notes` | string | 额外说明 |

**四种状态**:
- `not_started` — 尚未开始
- `in_progress` — 当前正在做（**同一时间只能有一个**）
- `blocked` — 有记录的阻塞问题
- `passing` — 验证通过，证据已记录

### 5.4 claude-progress.md

**做什么**: 每轮会话往里写，每轮新会话先读它。

**必填字段**:
- **当前状态**: 最后更新时间、当前活跃功能
- **已完成**: 哪些功能已验证通过
- **进行中**: 当前功能的详细进度
- **下一步**: 接下来该做什么
- **阻塞项/风险**: 已知问题
- **完成证据**: 测试、类型检查、手动验证的证据
- **给下一轮的备注**: 自由格式笔记

### 5.5 session-handoff.md

**做什么**: 较长会话结束时写，帮助下一轮快速接上。

**写什么**:
- 当前已验证了什么
- 本轮改了什么
- 仍损坏或未验证的内容
- 下一步最佳动作（以及不要动什么）
- 快速命令参考

**使用场景**: 短会话可以不写；会话长了或项目有多个并行区域时很关键。

### 5.6 clean-state-checklist.md

**做什么**: 每次会话结束前逐项检查的清单。

**检查项**:
- [ ] `./init.sh` 能跑通
- [ ] 测试通过或已知失败已记录
- [ ] 进度日志已更新
- [ ] 功能清单准确（没有假 passing）
- [ ] 没有未记录的半成品
- [ ] 下一轮不需要人工修复就能继续

### 5.7 evaluator-rubric.md

**做什么**: 会话结束后评估 agent 产出质量的评分表。

**六个维度** (各 0-2 分):
1. **正确性** — 是否符合需求
2. **验证** — 验证是否真的跑过
3. **范围纪律** — 是否越界
4. **可靠性** — 重启后是否还能跑通
5. **可维护性** — 代码文档是否清晰
6. **交接准备度** — 新会话能否无缝继续

**结论**:
- 10-12 分: Accept — 达标
- 6-9 分: Revise — 需要修补
- 0-5 分: Block — 有根本性问题

**校准**: 需要 3-5 轮校准直到评分与人工判断一致。

### 5.8 quality-document.md

**做什么**: 跟踪代码库本身（不是单次产出）随时间变强还是变弱。

**评分**:
- **产品领域**: 验证状态、Agent 可读性、测试稳定性、关键缺口
- **架构层**: 边界执行、Agent 可读性

**与 evaluator-rubric 的区别**:
- Evaluator rubric: "这轮 agent 做得好不好？"
- Quality document: "这个项目是在变强还是变弱？"

---

## 6. 最小部署路径

### 6.1 今天就能用（5 分钟）

```bash
# 1. 把这 4 个文件复制到你项目根目录
cp AGENTS.md (或 CLAUDE.md) your-project/
cp init.sh your-project/
cp feature_list.json your-project/
cp claude-progress.md your-project/

# 2. 修改 init.sh 中的命令适配你的项目
# 3. 修改 feature_list.json 中的功能列表
# 4. 给 init.sh 执行权限
chmod +x your-project/init.sh
```

### 6.2 渐进式部署

| 阶段 | 增加的文件 | 改善的效果 |
|------|-----------|-----------|
| **阶段 1** | CLAUDE.md + init.sh | agent 知道先验证环境再写代码 |
| **阶段 2** | + feature_list.json | agent 一次做一个功能，不越界 |
| **阶段 3** | + claude-progress.md | 跨会话连续性，不重复做 |
| **阶段 4** | + session-handoff.md | 长会话交接更平滑 |
| **阶段 5** | + clean-state-checklist.md | 每次结束都留干净状态 |
| **阶段 6** | + evaluator-rubric.md | 产出质量可度量 |
| **阶段 7** | + quality-document.md | 代码库健康度趋势可追踪 |

---

## 7. 进阶配置

### 7.1 多 Agent 架构

如果你的 harness 涉及多个 agent（planner + generator + evaluator），为每个 agent 创建独立的指令文件：

```
your-project/
├── AGENTS.md              # 通用入口
├── AGENTS-planner.md      # Planner agent 专用指令
├── AGENTS-generator.md    # Generator agent 专用指令
├── AGENTS-evaluator.md    # Evaluator agent 专用指令
```

### 7.2 文档分层

随着项目变大，`AGENTS.md` 会膨胀。此时拆分到 `docs/` 目录：

```
docs/
├── ARCHITECTURE.md    # 系统架构、组件关系、技术决策
├── PRODUCT.md         # 产品需求、用户故事
├── DESIGN.md          # 设计决策、备选方案对比
├── SECURITY.md        # 安全策略
├── RELIABILITY.md     # 可靠性策略
```

`AGENTS.md` 中只放链接：
```markdown
## 详细文档
- 架构: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- 产品: [docs/PRODUCT.md](docs/PRODUCT.md)
```

### 7.3 记忆持久化

对于跨会话需要记住的项目规则和用户偏好，使用文件式记忆系统：

```
.claude/memory/
├── MEMORY.md           # 索引文件（200 行以内）
├── user_role.md        # 用户角色信息
├── feedback_testing.md # 用户反馈的测试偏好
└── project_goals.md    # 项目目标信息
```

每条记忆两步保存：
1. 写入具体内容的 topic 文件
2. 在 `MEMORY.md` 中追加一行指针

如果进程崩溃，最坏情况是孤立文件——索引仍然一致。

---

## 8. 常见问题排查

| 问题 | 原因 | 修复 |
|------|------|------|
| agent 一次做多个功能 | feature_list.json 的 `in_progress` 规则没写好 | 在 AGENTS.md 中强化规则 + 功能清单中加 `_notes` |
| agent 说"做完了"但没跑验证 | 完成定义不够硬性 | 在 `Definition of Done` 中加入可执行的验证命令 |
| 跨会话丢失上下文 | 没有进度日志 | 添加 `claude-progress.md`，要求每轮结束前更新 |
| agent 偷偷改弱测试 | 没有验证纪律 | 在 AGENTS.md 中加"不要削弱验证"规则 |
| init.sh 失败 agent 继续工作 | 没有"先修基础状态"的规则 | 在 AGENTS.md 的开工流程中强化这条 |
| 功能清单出现"假 passing" | 没有证据要求 | `feature_list.json` 中 `evidence` 字段必填 |

---

## 9. Harness 审计方法

用 **五元组评估法** 定期审计你的 harness 质量：

### 审计步骤

对每个子系统打 1-5 分：

| 分数 | 含义 |
|------|------|
| 5 | 优秀，有文档且始终遵循 |
| 4 | 良好，基本完整，偶有疏漏 |
| 3 | 合格，覆盖基本需求，缺少打磨 |
| 2 | 薄弱，不完整或不一致 |
| 1 | 缺失或起反作用 |

### 诊断矩阵

| 子系统 | 评分 (1-5) | 瓶颈? | 改进计划 |
|--------|-----------|-------|----------|
| 指令 | | | |
| 状态 | | | |
| 验证 | | | |
| 范围 | | | |
| 生命周期 | | | |

**找出最低分的子系统**——那就是瓶颈，集中精力加强它。

### 等模型对照实验

想量化 harness 各组件的价值？逐个移除，看哪个移除后性能下降最多：

1. 选一个有挑战性的真实任务
2. 没有 harness 时跑一次，记录结果
3. 加上最小 harness (AGENTS.md + init.sh + feature_list.json) 跑一次
4. 逐个移除子系统，每次只移除一个
5. 比较成功率、时间、token 用量、返工量

---

## 附录: 核心参考资料

- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Learn Harness Engineering 课程](https://walkinglabs.github.io/learn-harness-engineering/zh/)
