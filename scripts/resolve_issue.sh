#!/usr/bin/env bash
set -euo pipefail

ISSUE_NUMBER="${1:-}"

if [[ -z "$ISSUE_NUMBER" ]]; then
  echo "Usage: resolve-issue <github-issue-number>"
  exit 1
fi

PROMPT="
GitHub Issue #$ISSUE_NUMBER를 end-to-end로 처리해.

필수 절차:
1) 먼저 아래 명령으로 이슈를 확인해:
   gh issue view $ISSUE_NUMBER --comments

2) 이슈를 읽은 뒤, AGENTS.md 규칙에 따라:
   - 작업 계획(변경 범위/접근/검증)을 먼저 작성해
   - type을 (fix/feat/refactor/chore/docs/test) 중에서 선택해
   - 선택 근거를 간단히 적어

3) 브랜치를 생성해:
   {type}/issue-$ISSUE_NUMBER

4) 이슈를 해결하는 코드를 수정해 (범위 최소화)

5) 가능한 경우 다음을 실행해:
   npm run lint
   npm run test
   npm run build

6) Conventional Commits 형식으로 커밋해:
   - 메시지는 반드시 한국어로 작성
   - 형식: {type}: <한국어 요약> (refs #$ISSUE_NUMBER)

7) 브랜치를 push 해

8) PR을 생성해:
   - 제목: {type}: <한국어 요약> (#$ISSUE_NUMBER)
   - 본문: 한국어로 요약/주요 변경점/검증 방법 + Closes #$ISSUE_NUMBER
"

# auto-edit: 파일 수정은 자동, 위험한 명령(git push, gh pr create 등)은 보통 승인 요청이 뜸
codex --approval-mode auto-edit "$PROMPT"