# 练习 4: 编写 init.sh 和 clean-state-checklist.md

## 背景

现在让 agent 在开工前验证环境，结束时留干净状态。

## 任务 1: 编写 init.sh

在 `workspace-starter/` 中创建 `init.sh`：

```bash
#!/bin/bash
set -e

# ==========================================
# 修改这些变量适配你的项目
# ==========================================
INSTALL_CMD="npm install"
VERIFY_CMD="npm test"
TYPE_CHECK_CMD="npm run type-check"
LINT_CMD="npm run lint"
START_CMD="npm run dev"
RUN_START_COMMAND=0  # 1 = 验证后自动启动

echo "=== Harness Init ==="
echo "Working directory: $(pwd)"

$INSTALL_CMD
echo "Dependencies installed."

$TYPE_CHECK_CMD
echo "Type check passed."

$VERIFY_CMD
echo "Tests passed."

$LINT_CMD
echo "Lint passed."

echo "All checks passed!"

if [ "$RUN_START_COMMAND" = "1" ]; then
  $START_CMD
fi
```

然后：`chmod +x init.sh`

## 任务 2: 测试 init.sh

1. 运行 `./init.sh`
2. 观察输出：
   - 是否按顺序执行了所有步骤？
   - 如果某一步失败，脚本是否停止？
   - 错误信息是否清晰？
3. 修改 `AGENTS.md`，在开工流程中加入：
   ```
   X. 运行 ./init.sh，如果失败先修基础状态再继续
   ```

## 任务 3: 编写 clean-state-checklist.md

在 `workspace-starter/` 中创建 `clean-state-checklist.md`：

```markdown
# 收尾检查清单

## 检查项

- [ ] 启动路径可用
- [ ] 验证能跑
- [ ] 进度日志已更新
- [ ] 功能清单准确
- [ ] 没有半成品
- [ ] 可恢复

## 如果某项未通过

停下来修好它，或详细记录问题。
```

## 任务 4: 验证收尾流程

1. 让 agent 实现一个小功能
2. 结束时让 agent 跑 clean-state-checklist
3. 检查 agent 是否更新了所有 harness 文件
4. 关闭会话，重新打开
5. 运行 `./init.sh`，确认能一次跑通
