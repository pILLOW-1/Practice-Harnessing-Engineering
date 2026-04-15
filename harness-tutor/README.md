# Harness Engineering 交互式教学课程

> 本课程以 Claude Code 为教学平台，通过 6 课渐进式实践，让你亲手构建一套生产级 Harness 模板。

---

## 课程概览

| 课次 | 主题 | 预计时间 | 实践产出 |
|------|------|----------|----------|
| 1 | 什么是 Harness | 20 min | 体验弱/强 harness 的效果差异 |
| 2 | 指令子系统 | 25 min | 编写 AGENTS.md |
| 3 | 状态与范围 | 30 min | 编写 feature_list.json + claude-progress.md |
| 4 | 验证与生命周期 | 25 min | 编写 init.sh + clean-state-checklist.md |
| 5 | 会话连续性 | 30 min | 编写 session-handoff.md + 多会话演练 |
| 6 | 综合项目 | 40 min | 构建完整的 harness 模板 |

**总时长**: 约 3 小时

## 怎么使用

1. 在当前目录（`harness-tutor/`）中打开 Claude Code
2. 对 Claude 说："开始学习 Harness Engineering"
3. Claude 会先问几个破冰问题了解你的背景
4. 然后逐课推进，每课都有讲解和动手实践
5. 6 课完成后，你就拥有了一套完整的 harness 模板

## 环境要求

- Claude Code CLI（已安装并可用）
- Node.js 环境（用于运行 workspace-starter 中的示例项目）
- Git（用于查看提交历史）

## 课程文件结构

```
harness-tutor/
├── CLAUDE.md              # 导师行为指令（Claude Code 读取此文件进入教学模式）
├── README.md              # 本文件
├── curriculum/            # 6 课的详细讲义
│   ├── lesson-01.md       # 什么是 Harness
│   ├── lesson-02.md       # 指令子系统
│   ├── lesson-03.md       # 状态与范围
│   ├── lesson-04.md       # 验证与生命周期
│   ├── lesson-05.md       # 会话连续性
│   └── lesson-06.md       # 综合项目
├── exercises/             # 每课的练习题
│   ├── exercise-01.md
│   ├── exercise-02.md
│   ├── exercise-03.md
│   ├── exercise-04.md
│   ├── exercise-05.md
│   └── exercise-06.md
└── workspace-starter/     # 练习用的项目骨架
    ├── package.json
    ├── src/               # 示例代码
    └── (你在这里编写 harness 文件)
```

## 学习路径

```
第 1 课: 什么是 Harness
  |
  v
第 2 课: 指令子系统          ← 你编写第一版 AGENTS.md
  |
  v
第 3 课: 状态与范围          ← 你添加 feature_list.json + progress.md
  |
  v
第 4 课: 验证与生命周期      ← 你编写 init.sh + clean-state-checklist
  |
  v
第 5 课: 会话连续性          ← 你添加 session-handoff + 多会话演练
  |
  v
第 6 课: 综合项目            ← 你整合所有文件，构建完整 harness 模板
  |
  v
最终产出: 一套可以部署到任意项目的 harness
```

## 核心参考资料

- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Learn Harness Engineering 课程](https://walkinglabs.github.io/learn-harness-engineering/zh/)
