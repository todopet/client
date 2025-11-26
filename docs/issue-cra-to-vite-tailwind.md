 # [Migration] CRA → Vite 전환 및 Tailwind CSS 도입
 
 ## 배경/목표
 - CRA 기반 클라이언트를 Vite로 마이그레이션하고 Tailwind CSS를 기본 스타일 체계로 도입합니다.
 - 목표: 개발 서버 성능 개선, 번들 속도 향상, 유틸리티 퍼스트 스타일링으로 일관성/생산성 향상.
 
 ## 범위
 - 디렉터리: `client`
 - 대상: 빌드/개발 스크립트, 환경변수, 정적 리소스, 전역 스타일, CI 빌드 파이프라인
 
 ## 체크리스트: Vite 마이그레이션
 - [ ] 현재 상태 파악: TypeScript 여부, `src`/`public` 구조, `.env*` 키, alias, 테스트 러너(Jest), PWA/Service Worker 사용 여부
 - [ ] Vite 설치: `npm i -D vite @vitejs/plugin-react`
 - [ ] 설정 추가/정리: `vite.config.ts`에 React 플러그인/경로 alias 반영
 - [ ] 진입점 정리: 루트 `index.html`와 `src/main.(tsx|jsx)`에서 마운트 확인 및 수정
 - [ ] 스크립트 교체: `package.json`에 `dev`, `build`, `preview` 추가; `react-scripts` 계열 제거
 - [ ] 환경변수 전환: CRA의 `REACT_APP_` → Vite의 `VITE_`, 사용처를 `import.meta.env`로 수정
 - [ ] 정적 리소스: `public` 자산 경로 동작 점검(`favicon`, `manifest` 등)
 - [ ] PWA/서비스워커 사용 시 Vite 대응(불필요하면 명시적 제거)
 
 ## 체크리스트: Tailwind CSS 세팅
 - [ ] 설치: `npm i -D tailwindcss postcss autoprefixer` 후 `npx tailwindcss init -p`
 - [ ] `tailwind.config.js` 구성: `content`에 `./index.html`, `./src/**/*.{js,ts,jsx,tsx}` 추가, `darkMode: 'class'` 여부 결정
 - [ ] 전역 스타일: `src/index.css`(또는 글로벌 CSS)에 아래 지시자 추가
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
 - [ ] 엔트리 연결: 글로벌 CSS를 `src/main.(tsx|jsx)`에서 임포트
 - [ ] 동작 확인: 화면에 Tailwind 유틸리티 클래스 적용 여부 수동 검증
 - [ ] 선택: `prettier-plugin-tailwindcss` 도입 여부 결정 및 설정(선택)
 
 ## 테스트/품질 보완(선택)
 - [ ] Jest 유지 또는 Vitest 전환 검토(테스트 실행/커버리지 확인)
 - [ ] ESLint/TS 설정에 Vite 환경 반영
 - [ ] 경로 alias(`tsconfig.json`/`jsconfig.json`)와 `vite.config.ts` 동기화
 
 ## CI/CD 업데이트
 - [ ] 빌드 커맨드 교체: `npm run build`가 Vite 빌드를 수행하도록 변경
 - [ ] 배포 산출물: 정적 호스팅 경로를 `dist` 기준으로 변경
 - [ ] 캐시 키/노드 버전 등 파이프라인 점검 및 업데이트
 
 ## 수행 가이드(요약)
 - Vite 설치: `npm i -D vite @vitejs/plugin-react`
 - 스크립트: `dev: "vite"`, `build: "vite build"`, `preview: "vite preview"`
 - 환경변수: 예) `REACT_APP_API_URL` → `VITE_API_URL`, 사용처는 `import.meta.env.VITE_API_URL`
 - Tailwind 설치/초기화: `npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
 - 전역 CSS에 Tailwind 지시자 추가 후 엔트리에서 임포트
 
 ## 수용 기준
 - [ ] `npm run dev` 실행 시 HMR 동작 및 첫 화면 정상 노출
 - [ ] Tailwind 유틸리티 클래스 적용 확인(예: 색상/간격/레이아웃)
 - [ ] `npm run build` 성공 및 `npm run preview`에서 `dist` 프리뷰 정상 작동
 - [ ] 기존 환경변수 기능이 `VITE_` 접두사로 전환되어 동일하게 동작
 - [ ] `README`에 개발/빌드/미리보기 사용법과 Tailwind 가이드 간단 반영
 
 ## 리스크/롤백
 - 리스크: 환경변수 접두사 누락, CRA 전용 코드(서비스워커, `reportWebVitals`) 잔존, 경로 alias 불일치
 - 롤백: 마이그레이션 전 `client` 브랜치/태그 보존, PR 단위로 변경 머지
 
 ## 참고 자료
 - Vite + React 가이드: https://vitejs.dev/guide/
 - Vite 환경변수: https://vitejs.dev/guide/env-and-mode.html
 - Tailwind + Vite: https://tailwindcss.com/docs/guides/vite
 
 ## 라벨 제안
 - `migration`, `frontend`, `build`, `tech-debt`
