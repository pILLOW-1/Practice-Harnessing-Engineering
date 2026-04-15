# 练习 5: 编写 session-handoff.md 并进行多会话演练)

## 背景
学习跨会话连续性——让 agent 关掉再打开还能接着干。

## 任务 1: 编写 session-handoff.md

在 `workspace-starter/` 中创建 `session-handoff.md`：

```markdown
# 会话交接摘要

## 当前已验证
哪些功能确认能用，跑过什么验证。

## 本轮改动
改了什么代码或基础设施。

## 仍损坏或未验证
已知问题和风险区。

## 下一步最佳动作
1. ...
2. ...

**不要动**: xxx

## 快速命令
| 用途 | 命令 |
|------|------|
| 启动 | ./init.sh |
| 验证 | npm test |
```

## 任务 2: 完整多会话演练


这是一个 3 轮会话的连续演练：

### 第 1 轮

1. 打开 Claude Code，任务："完成当前 in_progress 的功能"
2. 让 agent 按正常流程工作
3. 结束时更新：
   - `feature_list.json`
   - `claude-progress.md`
   - `session-handoff.md`

### 第 2 轮

1. **关闭 Claude Code**（模拟会话结束）
2. 重新打开
3. **不给任何额外提示词**——让 agent 只读 harness 文件自己决定
4. 观察：
   - [ ] agent 是否先读了 claude-progress.md？
   - [ ] agent 是否正确选择了下一个未完成功能？
   - [ ] agent 没有重复做已 passing 的功能？
5. 结束时更新所有 harness 文件

### 第 3 轮

1. 再关闭，再打开
2. 重复第 2 轮的观察
3. 检查 `claude-progress.md` 的会话记录是否越来越完整

## 任务 3: 评估

完成 3 轮后回答：

1. 哪一轮 agent 没有正确读取 harness 文件？为什么？
2. 如果 agent 在第 2 轮选了错误的功能，是 harness 的哪个文件有问题？怎么修？
3. `session-handoff.md` 是否在第 3 轮仍然有用？什么时候最有用？
