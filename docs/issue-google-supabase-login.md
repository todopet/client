 # [Auth] 구글 소셜 로그인 재연동 (Supabase)

 ## 배경/목표
 - 로그인 페이지에서 "구글 계정으로 로그인" 버튼 클릭 시 Supabase OAuth를 통해 로그인 흐름을 수행합니다.
 - 인증 성공 시 사용자 계정 정보를 세션에 저장하고, 계정 정보(세션)가 존재하면 `/todo` 페이지로 이동합니다.

 ## 범위
 - 화면: `src/pages/Login/Login.tsx` (구글 로그인 버튼/핸들러, 세션 체크 후 리다이렉트)
 - 인증 클라이언트: `src/lib/supabaseClient.ts` (또는 동등한 초기화 파일) 생성/확인
 - 라우팅/가드: 로그인 상태에 따른 `/login` ↔ `/todo` 네비게이션 로직
 - 환경변수/설정: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 및 Supabase 대시보드의 Google Provider/Redirect URL 설정

 ## 작업 항목
 - [ ] Supabase 설정
   - [ ] Supabase 대시보드에서 Google Provider 활성화 및 Client ID/Secret 입력
   - [ ] Redirect URL 등록: 로컬(`http://localhost:5173/auth/callback`), 프로덕션 도메인
   - [ ] 환경변수 추가: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (Vite 형식)
 - [ ] 클라이언트 초기화
   - [ ] 패키지 확인/설치: `@supabase/supabase-js`
   - [ ] `src/lib/supabaseClient.ts`에서 `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)` 초기화
 - [ ] 로그인 플로우 구현
   - [ ] `src/pages/Login/Login.tsx`에 구글 로그인 버튼 핸들러 추가
   - [ ] `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '<APP_ORIGIN>/auth/callback' } })`
   - [ ] 콜백 처리: `/auth/callback` 라우트에서 OAuth 코드 교환(`exchangeCodeForSession`) 또는 세션 로드 처리
 - [ ] 세션/리다이렉트
   - [ ] 앱 시작 시 `supabase.auth.getSession()`로 세션 조회, 상태 관리(컨텍스트/전역 상태)
   - [ ] 로그인 페이지 마운트 시 세션 존재하면 `/todo`로 이동
   - [ ] `/todo` 접근 시 세션 없으면 `/login`으로 이동(가드)
 - [ ] 로그아웃(선택)
   - [ ] `supabase.auth.signOut()` 및 후처리(캐시 초기화, `/login` 이동)

 ## 구현 가이드(요약)
 - 환경변수
   - `.env`: `VITE_SUPABASE_URL=...`, `VITE_SUPABASE_ANON_KEY=...`
   - 사용: `import.meta.env.VITE_SUPABASE_URL`, `import.meta.env.VITE_SUPABASE_ANON_KEY`
 - 로그인 버튼 예시 (핸들러)
   - `await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth/callback' } })`
 - 콜백 라우트 처리
   - URL에 `code`가 포함된 경우 `supabase.auth.exchangeCodeForSession({ code })` 수행 후 홈/`/todo`로 이동
   - 세션 저장은 Supabase가 기본적으로 로컬 스토리지에 지속(persist) 처리함
 - 세션 확인/가드
   - `const { data: { session } } = await supabase.auth.getSession()`
   - 세션 존재 시 `/todo`, 미존재 시 `/login`

 ## 체크리스트
 - [ ] Google Provider 활성화, Redirect URL(개발/운영) 등록 완료
 - [ ] 환경변수 추가 및 빌드/런타임에서 주입 확인
 - [ ] `supabaseClient` 초기화 파일 생성 및 앱 전역에서 참조
 - [ ] `Login.tsx` 구글 로그인 버튼/핸들러 구현
 - [ ] `/auth/callback` 라우트에서 세션 교환/로딩 처리
 - [ ] 세션 기반 리다이렉트: 로그인 페이지 → `/todo`, 가드: `/todo` → `/login`

 ## 수용 기준
 - [ ] 로그인 페이지에서 구글 버튼 클릭 시 OAuth 동의 화면으로 이동
 - [ ] 동의 후 앱으로 복귀 시 세션이 생성되어 유지됨(새로고침 후에도 유지)
 - [ ] 세션이 존재할 경우 `/login` 접근 시 자동으로 `/todo`로 리다이렉트됨
 - [ ] 세션이 없을 경우 `/todo` 접근 시 `/login`으로 리다이렉트됨
 - [ ] 최소 한 곳에서 사용자 식별 정보(예: 이메일) 확인 가능(디버그/헤더/프로필 등)

 ## 테스트 시나리오
 - [ ] 로컬에서 `npm run dev` 실행 후 구글 로그인 → `/auth/callback` → `/todo` 이동 확인
 - [ ] 새로고침 후에도 세션 유지 및 `/todo` 접근 가능
 - [ ] 로그아웃 후 `/todo` 접근 시 `/login`으로 이동
 - [ ] 환경변수 누락/오류 시 에러 핸들링 메시지 노출

 ## 리스크/유의사항
 - Redirect URL 미일치/누락 시 OAuth 에러 발생
 - 팝업 차단/3rd-party 쿠키 정책으로 인해 로그인 실패 가능성
 - 다중 탭 세션 동기화 이슈(필요 시 `onAuthStateChange` 구독으로 보완)

 ## 참고 자료
 - Supabase Auth (JS v2): https://supabase.com/docs/guides/auth
 - OAuth with Google: https://supabase.com/docs/guides/auth/social-login/auth-google
 - React + Supabase 예제: https://supabase.com/docs/guides/getting-started/tutorials/with-react

 ## 라벨 제안
 - `auth`, `feature`, `frontend`, `supabase`

