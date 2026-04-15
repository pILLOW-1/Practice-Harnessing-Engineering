# 第 6 课: 综合项目 — 构建完整 Harness 模板

## 目标

把前 5 课中亲手构建的所有机制整合起来，构建一套完整的、可部署到任意项目的 Harness 模板。

## 概念引入 (5 分钟)

### 把一切串起来

现在你已经拥有了所有子系统：

```
你的 harness 现在应该是这样的:

AGENTS.md (第 2 课)          ← 指令: 做什么、按什么顺序
  ├── 开工流程 (含 init.sh)
  ├── 工作规则 (一次一个功能)
  ├── 完成定义 (可验证的条件)
  └── 收尾流程 (更新文件 + 交接)

feature_list.json (第 3 课)  ← 状态+范围: 功能清单
  ├── feat-001: passing
  ├── feat-002: in_progress
  ├── feat-003: not_started
  └── ...

claude-progress.md (第 3 课) ← 状态: 进度日志
  ├── 当前状态
  ├── 已完成 / 进行中 / 下一步
  └── 给下一轮的备注

init.sh (第 4 课)            ← 验证+生命周期: 启动脚本
clean-state-checklist (第 4) ← 生命周期: 收尾检查

session-handoff.md (第 5 课) ← 状态: 交接摘要
```

### Harness 审计

用五元组评估法给你的 harness 打分：

| 子系统 | 评分 (1-5) | 瓶颈? |
|--------|-----------|-------|
| 指令 | | |
| 状态 | | |
| 验证 | | |
| 范围 | | |
| 生命周期 | | |

## 实践环节 (35 分钟)

### 练习 1: 整合与审查

1. 回顾 `workspace-starter/` 中你编写的所有 harness 文件
2. 逐文件审查：
   - 内容是否完整、清晰？
   - 有没有遗漏的检查项？
   - 规则是否足够"硬性"？
3. 修改和完善

### 练习 2: 完整端到端测试

用一个新任务测试你的完整 harness：

1. 在 `workspace-starter/` 中清空之前的工作成果（保留 harness 文件）
2. 重置 `feature_list.json` 中所有功能为 `not_started`
3. 清空 `claude-progress.md`
4. 给 agent 一个完整的任务描述："构建一个文档管理系统，包括导入、列表、搜索、问答功能"
5. 让 agent 工作 2-3 轮会话（关闭-重开模拟）
6. 用 `evaluator-rubric.md` 评估 agent 的产出质量

### 练习 3: 迁移到 harness-template

1. 将你在 `workspace-starter/` 中构建的最终版 harness 文件，复制到 `harness-template/` 目录
2. 添加通用化注释——把项目中特定的内容（如文档导入功能）替换为可自定义的占位符
3. 确保这套模板可以部署到任意新项目

### 练习 4: 最终 Checklist

确认你的 harness 模板包含：

- [ ] `AGENTS.md` — 指令文件（通用版本）
- [ ] `CLAUDE.md` — Claude Code 专用指令
- [ ] `init.sh` — 启动与验证脚本（带可修改变量）
- [ ] `feature_list.json` — 功能清单模板（带示例功能）
- [ ] `claude-progress.md` — 进度日志模板
- [ ] `session-handoff.md` — 交接摘要模板
- [ ] `clean-state-checklist.md` — 收尾检查清单
- [ ] `evaluator-rubric.md` — 评审评分表
- [ ] `quality-document.md` — 质量快照模板
- [ ] `MANUAL.md` — 使用手册

## 课程总结

### 你学到了什么

1. **Harness = 模型之外的一切基础设施** — 换 harness 不换模型，就能质变
2. **五子系统模型** — 指令、状态、验证、范围、生命周期，缺一不可
3. **渐进式展开** — AGENTS.md 是地图不是百科全书
4. **机器可读的范围边界** — feature_list.json 让 agent 无法忽略规则
5. **持久化状态** — claude-progress.md 让跨会话不丢失上下文
6. **验证先行** — init.sh 确保不在坏基础上上叠新功能
7. **干净收尾** — clean-state-checklist 让下一轮能无缝继续

### 在实际项目中部署

1. 把 `harness-template/` 中的文件复制到你的项目根目录
2. 修改 `init.sh` 中的变量适配你的项目
3. 修改 `feature_list.json` 中的功能列表
4. 开始用你的 agent 工作

### 下一步

- 定期用五元组评估法审计你的 harness 质量
- 随着项目变大，把 AGENTS.md 拆分到 `docs/` 目录
- 随着模型变强，逐个移除 harness 组件做消融实验，看看哪些仍然必要
