#!/bin/bash
# create-harness.sh - 快速创建 harness 文件

echo "Creating harness files..."

cp AGENTS.md "$1/" 2>/dev/null || echo "AGENTS.md not found in template"
cp CLAUDE.md "$1/" 2>/dev/null || echo "CLAUDE.md not found in template"
cp init.sh "$1/" 2>/dev/null || echo "init.sh not found in template"
cp feature_list.json "$1/" 2>/dev/null || echo "feature_list.json not found in template"
cp claude-progress.md "$1/" 2>/dev/null || echo "claude-progress.md not found in template"
cp clean-state-checklist.md "$1/" 2>/dev/null || echo "clean-state-checklist.md not found in template"
cp session-handoff.md "$1/" 2>/dev/null || echo "session-handoff.md not found in template"

echo "Harness files created in $1"
echo "Next steps:"
echo "1. Customize init.sh for your project"
echo "2. Update feature_list.json with your features"
echo "3. Add project-specific rules to AGENTS.md"
