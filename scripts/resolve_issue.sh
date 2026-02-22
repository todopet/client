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

# ✅ 원래 위치 저장 (브랜치면 브랜치, 아니면 커밋 해시)
ORIGINAL_REF="$(git symbolic-ref --quiet --short HEAD || true)"
if [[ -z "$ORIGINAL_REF" ]]; then
  ORIGINAL_REF="$(git rev-parse HEAD)"
  ORIGINAL_IS_DETACHED="1"
else
  ORIGINAL_IS_DETACHED="0"
fi

restore_branch() {
  # Codex가 남긴 변경사항이 있으면 강제로 checkout하지 않고 안내만
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️ 작업 종료 시점에 미커밋 변경사항이 남아 있어 자동 복귀를 생략합니다."
    echo "   아래로 확인 후 수동 복귀하세요:"
    echo "   - git status"
    echo "   - git stash -u (원하면)"
    echo "   - git checkout $ORIGINAL_REF"
    return 0
  fi

  if [[ "$ORIGINAL_IS_DETACHED" == "1" ]]; then
    git checkout "$ORIGINAL_REF" >/dev/null 2>&1 || true
    echo "✅ 원래 커밋으로 복귀: $ORIGINAL_REF"
    return 0
  fi

  # 원래 브랜치로 복귀
  if git show-ref --verify --quiet "refs/heads/$ORIGINAL_REF"; then
    git checkout "$ORIGINAL_REF" >/dev/null 2>&1 || true
    echo "✅ 원래 브랜치로 복귀: $ORIGINAL_REF"
    # 원하시면 여기서 자동 pull도 가능 (팀 정책에 따라)
    # git pull --ff-only || true
  else
    echo "⚠️ 원래 브랜치($ORIGINAL_REF)를 찾을 수 없어 복귀를 생략합니다."
  fi
}

# ✅ 어떤 경우든(변경 없음/PR 없음/에러) 스크립트 종료 시 복귀
trap restore_branch EXIT

PROMPT="
GitHub Issue #$ISSUE_NUMBER를 end-to-end로 처리해.

필수:
1) gh issue view $ISSUE_NUMBER --comments 로 이슈를 확인해.

2) AGENTS.md 규칙에 따라:
   - 작업 계획(변경 범위/접근/검증)을 먼저 작성
   - type을 (fix/feat/refactor/chore/docs/test) 중에서 선택하고 근거를 적기
   - 브랜치 {type}/issue-$ISSUE_NUMBER 생성

3) 구현 후 가능한 경우:
   npm run lint
   npm run test
   npm run build

4) 변경사항이 있다면:
   - Conventional Commits 형식으로 한국어 커밋:
     {type}: <한국어 요약> (refs #$ISSUE_NUMBER)
   - push
   - PR 생성:
     제목: {type}: <한국어 요약> (#$ISSUE_NUMBER)
     본문: 작업 개요/주요 변경/목적/검증 방법 + Closes #$ISSUE_NUMBER

5) 만약 변경사항이 '없다면':
   - PR/커밋/푸시는 하지 말고
   - 왜 변경이 불필요했는지(혹은 이미 해결됨/재현 불가 등) 간단히 요약해.
"

# auto-edit: 파일 수정은 자동, git push/PR 생성은 보통 승인 받게 운영 가능
codex --approval-mode auto-edit "$PROMPT"