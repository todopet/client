#!/usr/bin/env bash
set -euo pipefail

ISSUE_NUMBER="${1:-}"
if [[ -z "$ISSUE_NUMBER" ]]; then
  echo "Usage: resolve-issue <github-issue-number>"
  exit 1
fi

need() { command -v "$1" >/dev/null 2>&1 || { echo "Error: '$1' not found"; exit 1; }; }
need codex
need gh
need git
need jq
need python3

# 원래 브랜치 저장 (항상 복귀)
ORIGINAL_REF="$(git symbolic-ref --quiet --short HEAD || true)"
ORIGINAL_IS_DETACHED="0"
if [[ -z "$ORIGINAL_REF" ]]; then
  ORIGINAL_REF="$(git rev-parse HEAD)"
  ORIGINAL_IS_DETACHED="1"
fi

restore_branch() {
  # 미커밋 변경사항이 있으면 강제 복귀 위험 -> 안내만
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️ 미커밋 변경사항이 남아 자동 복귀를 생략합니다. (git status 확인)"
    return 0
  fi

  if [[ "$ORIGINAL_IS_DETACHED" == "1" ]]; then
    git checkout "$ORIGINAL_REF" >/dev/null 2>&1 || true
    echo "✅ 원래 커밋으로 복귀: $ORIGINAL_REF"
    return 0
  fi

  git checkout "$ORIGINAL_REF" >/dev/null 2>&1 || true
  echo "✅ 원래 브랜치로 복귀: $ORIGINAL_REF"
}

trap restore_branch EXIT

# 1) Codex에게 "이슈 해결 + 커밋까지" 수행시키되,
#    PR 생성은 절대 하지 말라고 강제 (스크립트가 생성함)
PROMPT="
GitHub Issue #$ISSUE_NUMBER를 해결해.

규칙:
- 반드시 먼저: gh issue view $ISSUE_NUMBER --comments
- AGENTS.md 규칙을 따른다.
- type(fix/feat/refactor/chore/docs/test)를 선택하고 근거를 남긴다.
- 브랜치: {type}/issue-$ISSUE_NUMBER 생성
- 필요한 코드 변경을 수행하고 커밋까지 만든다.
- 커밋 메시지는 한국어로 Conventional Commits:
  {type}: <한국어 요약> (refs #$ISSUE_NUMBER)

중요:
- 절대 PR을 생성하지 마.
- 절대 gh pr create / gh pr submit / gh pr merge 등을 실행하지 마.
- push는 해도 되지만, 가능하면 push까지 수행해.
- 변경사항이 없으면: 커밋/푸시 없이 '왜 변경이 없었는지'를 한 문단으로 요약해.

마지막 출력:
- 아래 JSON 한 개만 출력해(설명 금지).
{
  \"type\": \"fix|feat|refactor|chore|docs|test\",
  \"branch\": \"{type}/issue-$ISSUE_NUMBER\",
  \"title\": \"{type}: <한국어 PR 제목> (#$ISSUE_NUMBER)\",
  \"body\": \"<한국어 PR 본문(템플릿 포함) + 마지막 줄에 Closes #$ISSUE_NUMBER>\",
  \"hasChanges\": true|false
}

PR 본문 템플릿(한국어):
### 📝 작업 개요
- ...

### 🔧 주요 변경 사항
- ...

### 🎯 변경 목적
- ...

### 🧪 검증 방법
- ...

### 📌 참고 사항
- ...

Closes #$ISSUE_NUMBER
"

JSON="$(codex --approval-mode auto-edit "$PROMPT")"

# 2) JSON 검증/파싱
echo "$JSON" | jq -e . >/dev/null

TYPE="$(echo "$JSON" | jq -r '.type')"
BRANCH="$(echo "$JSON" | jq -r '.branch')"
PR_TITLE="$(echo "$JSON" | jq -r '.title')"
PR_BODY="$(echo "$JSON" | jq -r '.body')"
HAS_CHANGES="$(echo "$JSON" | jq -r '.hasChanges')"

# 3) 변경이 없으면 PR 생성하지 않음
if [[ "$HAS_CHANGES" != "true" ]]; then
  echo "ℹ️ 변경사항 없음(hasChanges=false). PR 생성 생략."
  echo "$PR_BODY"
  exit 0
fi

# 4) 현재 브랜치 확인 (Codex가 브랜치 이동을 안 했을 수도 있어서 보정)
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "$BRANCH" ]]; then
  # 브랜치가 존재하면 checkout, 없으면 실패
  if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
    git checkout "$BRANCH"
  fi
fi

# 5) push (원격 없거나 이미 push했으면 넘어감)
git push -u origin "$BRANCH" >/dev/null 2>&1 || true

# 6) 스크립트가 PR 생성 (제목/본문 강제)
echo "🚀 Creating PR with title/body (forced by script)"
gh pr create --title "$PR_TITLE" --body "$PR_BODY"