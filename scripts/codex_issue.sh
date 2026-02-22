#!/usr/bin/env bash
set -euo pipefail

# 실행 위치: client/ 디렉토리에서 실행하는 것을 전제로 함
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

PROMPT_MD="$ROOT_DIR/.codex/prompts/issue_from_md.txt"
PROMPT_TEXT="$ROOT_DIR/.codex/prompts/issue_from_text.txt"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Error: '$1' not found"; exit 1; }; }
need codex
need gh
need jq
need python3

usage() {
  cat <<EOF
Usage:
  # 1) md 파일로 이슈 생성 (현재 구조: client/issue-01-*.md)
  ./scripts/codex_issue.sh --file issue-01-auth-state-management.md
  ./scripts/codex_issue.sh --file ./issue-01-auth-state-management.md

  # 2) 직접 설명으로 이슈 생성
  ./scripts/codex_issue.sh "로그인 후 특정 라우트에서 401 처리 필요..."
  ./scripts/codex_issue.sh --text "..."

  # 3) 현재 폴더의 issue-*.md 목록 보기
  ./scripts/codex_issue.sh --list
EOF
}

list_issues() {
  (cd "$ROOT_DIR" && ls -1 issue-*.md 2>/dev/null) || true
}

make_prompt_from_md() {
  local file="$1"
  local filename
  filename="$(basename "$file")"
  local md
  md="$(cat "$file")"

  python3 - << 'PY' "$PROMPT_MD" "$filename" "$md"
import sys
from pathlib import Path

prompt_file = sys.argv[1]
filename = sys.argv[2]
md = sys.argv[3]

tmpl = Path(prompt_file).read_text(encoding="utf-8")
out = tmpl.replace("{{ISSUE_FILENAME}}", filename).replace("{{ISSUE_MD}}", md)
print(out)
PY
}

make_prompt_from_text() {
  local desc="$1"

  python3 - << 'PY' "$PROMPT_TEXT" "$desc"
import sys
from pathlib import Path

prompt_file = sys.argv[1]
desc = sys.argv[2]

tmpl = Path(prompt_file).read_text(encoding="utf-8")
out = tmpl.replace("{{ISSUE_DESCRIPTION}}", desc)
print(out)
PY
}

create_issue_from_json() {
  local json="$1"

  echo "$json" | jq -e . >/dev/null

  local title body labels_csv assignees_csv
  title="$(echo "$json" | jq -r '.title')"
  body="$(echo "$json" | jq -r '.body')"
  labels_csv="$(echo "$json" | jq -r '.labels | join(",")')"
  assignees_csv="$(echo "$json" | jq -r '.assignees | join(",")')"

  local args=(issue create --title "$title" --body "$body")
  [[ -n "$labels_csv" ]] && args+=(--label "$labels_csv")
  [[ -n "$assignees_csv" ]] && args+=(--assignee "$assignees_csv")

  echo "Target repo: $(gh repo view --json nameWithOwner -q .nameWithOwner)"
  gh "${args[@]}"
}

MODE="text"
FILE_PATH=""
TEXT_INPUT=""

# args 파싱
if [[ $# -eq 0 ]]; then
  usage
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --file|-f)
      MODE="file"
      FILE_PATH="${2:-}"
      shift 2
      ;;
    --text|-t)
      MODE="text"
      TEXT_INPUT="${2:-}"
      shift 2
      ;;
    --list|-l)
      list_issues
      exit 0
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      # 기본: 남은 인자를 모두 text로 취급
      MODE="text"
      TEXT_INPUT="${TEXT_INPUT}${TEXT_INPUT:+ }$1"
      shift 1
      ;;
  esac
done

# 실행
if [[ "$MODE" == "file" ]]; then
  if [[ -z "$FILE_PATH" ]]; then
    echo "Error: --file needs a path or filename"
    echo "Available issue files in $ROOT_DIR:"
    list_issues | sed 's/^/  - /'
    exit 1
  fi

  # file 경로 정규화 (상대경로면 client 기준)
  if [[ -f "$FILE_PATH" ]]; then
    abs="$FILE_PATH"
  elif [[ -f "$ROOT_DIR/$FILE_PATH" ]]; then
    abs="$ROOT_DIR/$FILE_PATH"
  else
    echo "Error: file not found: $FILE_PATH"
    echo "Available issue files in $ROOT_DIR:"
    list_issues | sed 's/^/  - /'
    exit 1
  fi

  if [[ ! -f "$PROMPT_MD" ]]; then
    echo "Error: prompt template not found: $PROMPT_MD"
    exit 1
  fi

  PROMPT="$(make_prompt_from_md "$abs")"
  JSON="$(codex exec "$PROMPT")"
  create_issue_from_json "$JSON"
  exit 0
fi

# text mode
if [[ -z "$TEXT_INPUT" ]]; then
  echo "이슈 설명을 입력하세요. (입력 종료: Ctrl+D)"
  TEXT_INPUT="$(cat)"
fi

if [[ -z "$TEXT_INPUT" ]]; then
  echo "Error: empty issue description"
  exit 1
fi

if [[ ! -f "$PROMPT_TEXT" ]]; then
  echo "Error: prompt template not found: $PROMPT_TEXT"
  exit 1
fi

PROMPT="$(make_prompt_from_text "$TEXT_INPUT")"
JSON="$(codex exec "$PROMPT")"
create_issue_from_json "$JSON"