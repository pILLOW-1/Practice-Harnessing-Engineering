# 练习 6: 综合项目 — 构建完整 Harness 模板

## 背景
把前 5 课构建的所有机制整合起来，创建可部署的 harness 模板。

## 任务 1: 整合审查

1. 回顾 `workspace-starter/` 中你编写的所有 harness 文件：
   - AGENTS.md
   - CLAUDE.md
   - init.sh
   - feature_list.json
   - claude-progress.md
   - clean-state-checklist.md
   - session-handoff.md

2. 逐文件审查：
   - [ ] 内容完整、清晰？
   - [ ] 规则足够"硬性"？
   - [ ] 可迁移到其他项目？

3. 修改完善

## 任务 2: 端到端测试

用一个完整任务测试你的 harness：

1. 清空 `workspace-starter/` 中的工作成果（保留 harness 文件）
2. 重置 `feature_list.json` 所有功能为 `not_started`
3. 清空 `claude-progress.md`
4. 任务："实现一个文档管理系统的完整功能链"
5. 让 agent 工作 2-3 轮（关闭-重开模拟多会话）
6. 用 `evaluator-rubric.md` 评分

## 任务 3: 迁移到 harness-template

1. 将 `workspace-starter/` 的最终版 harness 文件复制到 `harness-template/`
2. 添加通用化注释——把特定内容替换为 `<!-- CUSTOMIZE: xxx -->`
3. 确保可以在任意新项目直接使用

## 任务 4: 最终检查清单

确认 harness 模板包含：

- [ ] AGENTS.md — 通用版本
- [ ] CLAUDE.md — Claude Code 专用
- [ ] init.sh — 带可修改变量
- [ ] feature_list.json — 带示例功能
- [ ] claude-progress.md — 模板
- [ ] session-handoff.md — 模板
- [ ] clean-state-checklist.md — 完整版
- [ ] evaluator-rubric.md — 完整版
- [ ] quality-document.md — 模板
- [ ] MANUAL.md — 使用手册

## 任务 5: 在真实项目部署

选择你正在做的一个真实项目：

1. 把 harness-template/ 中的文件复制到该项目根目录
2. 修改 init.sh 中的命令适配项目
3. 修改 feature_list.json 中的功能列表
4. 开始用你的 agent 工作
5. 对比：有 harness 前后，agent 的表现差异

恭喜你完成 Harness Engineering 课程！
