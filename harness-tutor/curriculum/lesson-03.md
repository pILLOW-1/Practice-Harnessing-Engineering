# 第 3 课: 状态与范围

## 目标

学会编写 feature_list.json 和 claude-progress.md，让 agent 记住进度、不越界。

## 概念引入 (5 分钟)

### 问题: Agent 为什么多做或少做

**多做（越界）**：agent 实现当前功能时，顺手改了其他功能。因为它没有明确的边界意识。

**少做（未完成）**：agent 实现了核心逻辑但跳过了边缘情况，然后说"做完了"。因为没有显式的完成定义。

**遗忘**：上一轮做了 A 和 B，下一轮忘了从哪开始，要么从头做，要么做了完全不同的东西。

### 功能清单作为范围边界

`feature_list.json` 的核心价值：**机器可读的范围边界，agent 无法忽略。**

```json
{
  "features": [
    {
      "id": "feat-001",
      "name": "文档导入",
      "status": "passing",
      "evidence": "tests pass on 2026-04-15"
    },
    {
      "id": "feat-002",
      "name": "文档列表",
      "status": "in_progress"
    }
  ]
}
```

**硬性规则**：任何时候只能有一个功能处于 `in_progress` 状态。

### 四种状态

| 状态 | 含义 |
|------|------|
| `not_started` | 还没开始 |
| `in_progress` | 当前正在做（同一时间只能有一个） |
| `blocked` | 有记录的阻塞问题 |
| `passing` | 验证通过，证据已记录 |

### 进度日志作为状态持久化

`claude-progress.md` 的价值：**把进度持久化到磁盘，下次会话从停下的地方继续。**

关键字段：
- 当前活跃功能
- 已完成列表
- 进行中详情
- 下一步
- 阻塞项/风险
- 完成证据
- 给下一轮的备注

## 实践环节 (25 分钟)

### 练习 1: 编写 feature_list.json

在 `workspace-starter/` 中：

1. 创建 `feature_list.json`
2. 定义 4-5 个功能，覆盖一个完整产品流程：
   - feat-001: 文档导入
   - feat-002: 文档列表
   - feat-003: AI 问答
   - feat-004: 索引与持久化
3. 为每个功能填写：id, name, description, area, priority, dependencies, status, user_visible_behavior, verification, evidence, notes

### 练习 2: 编写 claude-progress.md

在 `workspace-starter/` 中：

1. 创建 `claude-progress.md`
2. 模拟一轮会话后的状态，填写所有字段
3. 确保"下一步"足够具体，让另一轮能无缝继续

### 练习 3: 模拟多会话

1. 启动 Claude Code，给任务："完成 feat-002 文档列表"
2. 要求 agent 更新 `feature_list.json` 和 `claude-progress.md`
3. 关闭 Claude Code（模拟会话结束）
4. 重新打开，给同样的项目
5. 观察 agent 是否先读了 `claude-progress.md`
6. 检查 agent 是否只选了 feat-002（不是其他功能）

## 小结检查

**问答**:

1. 为什么 `feature_list.json` 中同时只能有一个 `in_progress`？
2. `claude-progress.md` 和 `feature_list.json` 各自回答什么问题？

答对后进入第 4 课。
