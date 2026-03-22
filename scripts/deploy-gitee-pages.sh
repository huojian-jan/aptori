#!/usr/bin/env bash
# 本地构建前端，将 frontend/dist 强制推送到远程分支 gitee-pages（供 Gitee Pages 使用）。
# 依赖：本机已对 gitee.com 配置好 SSH 或 HTTPS 凭据（与平时 git push 相同）。
#
# 用法（在仓库根目录）：
#   ./scripts/deploy-gitee-pages.sh
# 指定远程（可选）：
#   DEPLOY_REMOTE='git@gitee.com:yasenrk/aptori.git' ./scripts/deploy-gitee-pages.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo "==> 安装依赖并构建…"
npm ci
npm run build

REMOTE="${DEPLOY_REMOTE:-}"
if [[ -z "$REMOTE" ]]; then
  REMOTE="$(git -C "$ROOT" remote get-url origin 2>/dev/null || true)"
fi
if [[ -z "$REMOTE" ]]; then
  echo "未找到远程地址。请设置：export DEPLOY_REMOTE='git@gitee.com:用户名/仓库.git'" >&2
  exit 1
fi

echo "==> 推送到分支 gitee-pages（远程: $REMOTE）…"
cd "$ROOT/frontend/dist"
rm -rf .git
git init
git config user.email "deploy@local"
git config user.name "local deploy"
git add -A
git commit -m "chore(pages): deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git branch -M gitee-pages
git push --force "$REMOTE" gitee-pages

echo "==> 完成。请在 Gitee「服务 → Gitee Pages」中将部署分支设为 gitee-pages（若尚未设置）。"
