# 第 4 课: 验证与生命周期

## 目标

学会编写 init.sh 和 clean-state-checklist.md，让 agent 先验证再写代码，结束时留干净状态。

## 概念引入 (5 分钟)

### 问题: 为什么初始化需要单独一个阶段

Agent 开始工作前，环境可能已经损坏：
- 依赖包版本不对
- 测试已经是失败状态
- 配置文件被上一轮改坏了

如果 agent 直接在坏环境上开始写代码，问题会层层叠加。

**Anthropic 的发现**：在长时任务中，agent 经常忽略环境验证，直接开始写代码。解决方案是在 AGENTS.md 中强制要求先跑 init.sh，并且如果 init.sh 失败，先修基础状态再继续。

### init.sh 的设计原则

```bash
# 好的 init.sh:
# 1. 幂等 — 跑多次结果一样
# 2. 自描述 — 每个步骤有输出
# 3. 失败即停止 — set -e 确保任一失败都退出
# 4. 一条命令 — 降低使用门槛
```

### clean-state-checklist 的设计原则

每次会话结束前，仓库必须处于**可重启状态**：

```
好的收尾:                      坏的收尾:
==========                     ==========

- init.sh 能跑通                 - init.sh 已损坏，但 agent 没发现
- 测试通过（或已知失败已记录）   - 测试失败但 agent 说是"小问题"
- 进度日志已更新                 - 进度日志是上上轮的
- 功能清单准确                   - 功能清单有"假 passing"
- 没有未记录的半成品             - 改了 3 个文件都没 commit
- 下一轮不需要人工修复           - 需要手动删临时文件才能跑
```

## 实践环节 (20 分钟)

### 练习 1: 编写 init.sh

在 `workspace-starter/` 中：

1. 创建 `init.sh`
2. 定义这些变量：
   - `INSTALL_CMD` — 依赖安装
   - `VERIFY_CMD` — 测试
   - `TYPE_CHECK_CMD` — 类型检查
   - `LINT_CMD` — 代码检查
   - `START_CMD` — 开发服务器
3. 脚本行为：
   - 打印工作目录
   - 依次跑安装、类型检查、测试、lint
   - 全部通过后提示就绪
4. 给执行权限：`chmod +x init.sh`

### 练习 2: 测试 init.sh

1. 运行 `./init.sh`
2. 如果测试失败，观察 agent 的行为：
   - 它停下来修了吗？
   - 还是继续在坏基础上写代码？
3. 如果 agent 没停下来，在 AGENTS.md 中强化规则

### 练习 3: 编写 clean-state-checklist.md

在 `workspace-starter/` 中：

1. 创建 `clean-state-checklist.md`
2. 列出 6 个检查项（启动路径、验证、进度日志、功能清单、半成品、可恢复）
3. 加上"如果某项未通过"的修复指南
4. 加上"常见遗漏"表

### 练习 4: 验证收尾流程

1. 让 agent 实现一个小功能
2. 功能实现后，让 agent 跑 clean-state-checklist
3. 检查每个检查项是否真的通过
4. 如果发现遗漏，在 AGENTS.md 的收尾流程中强化对应规则

## 小结检查

**问答**:

1. init.sh 的四个设计原则是什么？
2. 为什么 clean-state-checklist 中"没有假 passing"很重要？

答对后进入第 5 课。
