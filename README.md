# Practice-Harnessing-Engineering

学习与实践 Harness Engineering（驾驭工程）——通过系统化的基础设施设计，让 AI 编程 Agent 从不可靠变得可靠。

## 什么是 Harness Engineering

**Harness Engineering = 模型权重之外的一切工程基础设施。**

不是写更好的提示词，而是设计 Agent 运行所在的系统——文件结构、验证命令、状态追踪、会话管理。同一个模型，没有 harness 时可能只有 20% 成功率，加上完整 harness 后可以到 80-100%。

## 项目结构

```
├── harness-template/          # 可直接迁移的生产级 Harness 模板
│   ├── CLAUDE.md              # Claude Code 操作手册（固定工作循环 + 规则 + 完成门槛）
│   ├── AGENTS.md              # Codex / Cursor 等通用 Agent 操作手册
│   ├── init.sh                # 一键启动、安装、验证脚本
│   ├── feature_list.json      # 机器可读的功能状态追踪器
│   ├── claude-progress.md     # 每轮会话进度日志
│   ├── session-handoff.md     # 跨会话交接摘要
│   ├── clean-state-checklist.md # 收尾检查清单
│   ├── evaluator-rubric.md    # Agent 产出质量评分表
│   ├── quality-document.md    # 代码库健康度趋势追踪
│   ├── MANUAL.md              # 模板使用手册（详细说明每个文件的作用）
│   ├── docs/
│   │   └── ARCHITECTURE.md    # 架构文档模板
│   └── scripts/
│       └── create-harness.sh  # Harness 创建脚本
│
└── harness-tutor/             # 交互式教学课程（6 课渐进式实践）
    ├── CLAUDE.md              # 导师行为指令（Claude Code 进入教学模式）
    ├── README.md              # 课程概览与使用说明
    ├── curriculum/            # 6 课详细讲义
    │   ├── lesson-01.md       # 什么是 Harness
    │   ├── lesson-02.md       # 指令子系统
    │   ├── lesson-03.md       # 状态与范围
    │   ├── lesson-04.md       # 验证与生命周期
    │   ├── lesson-05.md       # 会话连续性
    │   └── lesson-06.md       # 综合项目
    ├── exercises/             # 每课练习题
    │   ├── exercise-01.md ~ exercise-06.md
    └── workspace-starter/     # 练习用的项目骨架（Node.js + TypeScript + Vitest）
        ├── package.json
        ├── vitest.config.ts
        ├── tsconfig.json
        └── src/               # 示例代码与测试文件
```

## 两大模块

### harness-template — 生产级模板

一套完整的 Harness 文件模板，可直接复制到任何项目中使用。基于 [Learn Harness Engineering](https://walkinglabs.github.io/learn-harness-engineering/zh/) 课程提炼，包含五子系统：

| 子系统 | 核心文件 | 职责 |
|--------|----------|------|
| **指令** | CLAUDE.md / AGENTS.md | 告诉 Agent 做什么、按什么顺序 |
| **状态** | feature_list.json, claude-progress.md | 跟踪做了什么、正在做、下一步 |
| **验证** | init.sh, evaluator-rubric.md | 只有测试通过才算完成 |
| **范围** | feature_list.json 状态规则 | 约束一次只做一个功能 |
| **生命周期** | init.sh, clean-state-checklist.md | 开工初始化，结束做交接 |

**最小部署**只需 4 个文件：CLAUDE.md + init.sh + feature_list.json + claude-progress.md。

详见 [MANUAL.md](harness-template/MANUAL.md)。

### harness-tutor — 交互式课程

以 Claude Code 为教学平台的 6 课渐进式实践课程：

| 课次 | 主题 | 实践产出 |
|------|------|----------|
| 1 | 什么是 Harness | 体验弱/强 harness 的效果差异 |
| 2 | 指令子系统 | 编写 AGENTS.md |
| 3 | 状态与范围 | 编写 feature_list.json + progress.md |
| 4 | 验证与生命周期 | 编写 init.sh + clean-state-checklist |
| 5 | 会话连续性 | 编写 session-handoff + 多会话演练 |
| 6 | 综合项目 | 构建完整的 harness 模板 |

使用方式：在 `harness-tutor/` 目录中打开 Claude Code，说"开始学习 Harness Engineering"。

详见 [harness-tutor/README.md](harness-tutor/README.md)。

## 快速开始

### 使用模板

```bash
# 复制模板到你的项目
cp harness-template/CLAUDE.md your-project/
cp harness-template/init.sh your-project/
cp harness-template/feature_list.json your-project/
cp harness-template/claude-progress.md your-project/

# 修改 init.sh 中的命令适配你的项目
# 修改 feature_list.json 中的功能列表
chmod +x your-project/init.sh
```

### 学习课程

```bash
cd harness-tutor
# 安装练习项目依赖
cd workspace-starter && npm install && cd ..
# 在此目录中打开 Claude Code，说"开始学习 Harness Engineering"
```

## 核心参考资料

- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Learn Harness Engineering 课程](https://walkinglabs.github.io/learn-harness-engineering/zh/)