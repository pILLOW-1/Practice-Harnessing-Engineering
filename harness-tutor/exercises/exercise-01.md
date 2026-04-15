# 练习 1: 体验弱 Harness vs 强 Harness

## 背景

你将用两种方式完成同一个任务，对比效果差异。

## 环境准备

1. 进入 `harness-tutor/workspace-starter/` 目录
2. 确认项目骨架存在（package.json + src/）

## 第一轮: 弱 Harness

**操作**:

在 Claude Code 中输入以下提示词（不要加任何其他文件）：

```
在这个项目中实现一个文档导入功能，支持 TXT 和 PDF 格式。
用户应该能点击按钮选择文件，导入后文件出现在列表中。
```

**观察记录**:

回答以下问题：

1. Agent 的第一个动作是什么？
   - [ ] 检查项目结构
   - [ ] 安装依赖
   - [ ] 直接开始写代码
   - [ ] 其他: ________

2. Agent 是否跑过任何测试或验证？
   - [ ] 是，跑了测试
   - [ ] 没有，直接说完成了
   - [ ] 跑了测试但失败了，继续工作

3. Agent 是否遵循了项目已有的代码风格？
   - [ ] 是
   - [ ] 否，它引入了新的模式或包

4. 最终结果如何？
   - [ ] 功能可用，测试通过
   - [ ] 部分实现，有未完成的代码
   - [ ] 搞坏了现有代码
   - [ ] 完全偏离了任务

## 第二轮: 最小 Harness

**操作**:

1. 回到 `workspace-starter/`，重置代码到初始状态
2. 添加以下文件：

`CLAUDE.md`:
```markdown
# CLAUDE.md

## 开工流程
1. pwd 确认当前目录
2. 运行 ./init.sh
3. 读取 package.json 了解项目结构

## 规则
- 一次只做一个功能
- 写完代码后跑测试验证
- 测试失败时停下来修
```

`init.sh`:
```bash
#!/bin/bash
set -e
echo "Installing dependencies..."
npm install
echo "Running tests..."
npm test || echo "No tests found, skipping verification"
echo "Ready to work."
```

3. `chmod +x init.sh`
4. 用同样的任务提示词再试一次

**对比记录**:

| 指标 | 第一轮(弱) | 第二轮(强) |
|------|-----------|-----------|
| Agent 的第一个动作 | | |
| 是否跑验证 | | |
| 代码风格一致性 | | |
| 最终结果 | | |

## 反思

1. 两轮最大的差异在哪里？
2. 最小 harness 还有哪些不足？
3. 你觉得接下来需要解决什么问题？
