# 练习 3: 编写 feature_list.json 和 claude-progress.md

## 背景

指令系统让 agent 知道"怎么做"。现在让 agent 知道"做什么"和"已经做了什么"。

## 任务 1: 编写 feature_list.json

在 `workspace-starter/` 中创建 `feature_list.json`，包含至少 4 个功能：

```json
{
  "features": [
    {
      "id": "feat-001",
      "name": "文档导入",
      "description": "...",
      "area": "import",
      "priority": 1,
      "dependencies": [],
      "status": "passing",
      "user_visible_behavior": "...",
      "verification": ["..."],
      "evidence": "",
      "notes": ""
    }
  ]
}
```

要求：
- 每个功能都有唯一的 id
- 优先级用数字表示（越小越优先）
- dependencies 描述功能间的依赖关系
- 至少有一个 `passing`、一个 `in_progress`、一个 `not_started`

## 任务 2: 编写 claude-progress.md

在 `workspace-starter/` 中创建 `claude-progress.md`，模拟一轮会话后的状态：

```markdown
# 会话进度日志

## 当前状态
**最后更新:** YYYY-MM-DD
**当前活跃功能:** feat-XXX - ...

## 已完成
- [x] ...

## 进行中
- [ ] ...

## 下一步
1. ...

## 阻塞项 / 风险
- ...

## 完成证据
...

## 给下一轮的备注
...
```

## 验证: 模拟多会话

1. 打开 Claude Code，任务："完成当前 in_progress 的功能"
2. 观察 agent 是否：
   - 正确读取了 feature_list.json 和 claude-progress.md
   - 只选了 in_progress 的功能
   - 没有选 already passing 的功能
3. 结束时让 agent 更新两个文件
4. 关闭再打开 Claude Code，重复步骤 1-3
