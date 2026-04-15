#!/bin/bash
set -e

# ==========================================
# init.sh — 标准启动与验证脚本
# ==========================================
# 修改顶部三个变量以适配你的项目：
#   INSTALL_CMD  — 依赖安装命令
#   VERIFY_CMD   — 基础验证命令（测试）
#   START_CMD    — 开发服务器启动命令
# ==========================================

INSTALL_CMD="npm install"
VERIFY_CMD="npm test"
TYPE_CHECK_CMD="npm run type-check"
LINT_CMD="npm run lint"
BUILD_CMD="npm run build"
START_CMD="npm run dev"

# 是否自动启动开发服务器（0 = 仅验证, 1 = 验证后启动）
RUN_START_COMMAND=0

echo "========================================"
echo "  Harness Init — $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================"
echo ""

echo "[1/5] Working directory: $(pwd)"
echo ""

echo "[2/5] Installing dependencies..."
$INSTALL_CMD
echo ""

echo "[3/5] Running type check..."
$TYPE_CHECK_CMD
echo ""

echo "[4/5] Running tests..."
$VERIFY_CMD
echo ""

echo "[5/5] Running linter..."
$LINT_CMD
echo ""

echo "========================================"
echo "  All checks passed."
echo "========================================"

if [ "$RUN_START_COMMAND" = "1" ]; then
  echo ""
  echo "Starting development server..."
  $START_CMD
else
  echo ""
  echo "Ready to work. Run '$START_CMD' to start the dev server."
fi
