# TodoPet 클라이언트 개선 진행상황

> 시작일: 2026-02-14
> 최종 업데이트: 2026-02-14 15:50

---

## 📊 전체 진행률

```
Phase 0 (긴급 수정)        ████████████████████ 100% ✅ 완료
Phase 1 (기반 인프라)      ████████████████████ 100% ✅ 완료
Phase 2 (타입 안전성)      ████████████████████ 100% ✅ 완료
Phase 3 (상태 관리)        ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 4 (컴포넌트)         ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 5 (UI/UX)            ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 6 (코드 정리)        ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 7 (성능 최적화)      ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 8 (테스트)           ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기
Phase 9 (문서화)           ░░░░░░░░░░░░░░░░░░░░   0% ⏳ 대기

전체 진행률: 33.3% (3/9 단계 완료)
```

---

## ✅ 완료된 작업

### Phase 0: 긴급 버그 수정 (2026-02-14)

**소요 시간:** 30분

#### 수정 내용

1. **이미지 파일 경로 오류 수정** ✅
   - 파일: `src/assets/images/`
   - 문제: `.png.png` 이중 확장자
   - 해결: 파일명 정규화 및 import 경로 수정
   ```bash
   joyEmotion.png.png → joyEmotion.png
   sadEmotion.png.png → sadEmotion.png
   ```

2. **인증 실패 처리 로직 복원** ✅
   - 파일: `src/App.tsx`
   - 문제: 주석 처리된 인증 실패 로직
   - 해결: 로직 복원 + useCallback 최적화
   ```typescript
   // Before: 주석 처리됨
   // setIsAuth(false);
   // navigate("/");

   // After: 정상 동작
   if (response.data.status === 200) {
     setIsAuth(true);
   } else {
     setIsAuth(false);
     navigate("/");
   }
   ```

3. **라우팅 중복 경로 제거** ✅
   - 파일: `src/routers/index.tsx`
   - 문제: `/` 경로가 routeLogin과 routePaths에 중복
   - 해결: routePaths에서 제거

**커밋:** `fix: Phase 0 긴급 버그 수정` (8c69f50)

---

### Phase 1: 기반 인프라 구축 (2026-02-14)

**소요 시간:** 1시간

#### 생성된 파일

1. **`src/api/endpoints.ts`** - API 엔드포인트 상수화 ✅
   ```typescript
   export const API_ENDPOINTS = {
     AUTH: { CHECK: 'users/auth', LOGIN: 'login', ... },
     USER: { INFO: 'users', RANK: (count) => `users/rank/${count}` },
     TODO: { CONTENTS: 'todoContents', ... },
     // ... 전체 API 경로 중앙 관리
   };
   ```
   - 타입 안전한 API 호출
   - 오타 방지
   - 유지보수 용이

2. **`src/api/errorHandler.ts`** - 전역 에러 핸들러 ✅
   ```typescript
   export const handleApiError = (error, customMessage?) => {
     // HTTP 상태 코드별 에러 메시지
     // 401 자동 리다이렉트
     // 네트워크/타임아웃 감지
   };
   ```
   - 상태 코드별 에러 메시지 정의
   - 타입 가드 함수 제공
   - 일관된 에러 처리

3. **`src/store/loadingStore.ts`** - 로딩 상태 관리 ✅
   ```typescript
   export const useLoadingStore = create<LoadingState>((set) => ({
     isLoading: false,
     loadingCount: 0,  // 카운터 방식
     startLoading: () => ...,
     stopLoading: () => ...,
   }));
   ```
   - 다중 API 요청 처리
   - Axios 인터셉터와 자동 연동

4. **`src/libs/utils/cn.ts`** - 클래스네임 병합 유틸리티 ✅
   ```typescript
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```
   - Tailwind 충돌 해결
   - 조건부 클래스 지원

#### 수정된 파일

5. **`src/api/index.ts`** - Axios 인터셉터 구현 ✅
   ```typescript
   // 요청 인터셉터
   axios.interceptors.request.use((config) => {
     useLoadingStore.getState().startLoading();
     if (config.data instanceof FormData) {
       config.headers["Content-Type"] = "multipart/form-data";
     }
     return config;
   });

   // 응답 인터셉터
   axios.interceptors.response.use(
     (response) => {
       useLoadingStore.getState().stopLoading();
       return response;
     },
     (error) => {
       useLoadingStore.getState().stopLoading();
       if (error.response?.status === 401) {
         console.warn('[Auth Error] 인증이 만료되었습니다.');
       }
       return Promise.reject(error);
     }
   );
   ```

#### 추가된 의존성

```json
{
  "clsx": "^2.x.x",
  "tailwind-merge": "^2.x.x"
}
```

**커밋:** `feat: Phase 1 기반 인프라 구축` (d6fdfb0)

---

### Phase 2: 타입 안전성 강화 (2026-02-14)

**소요 시간:** 1시간

#### 생성된 파일

1. **`src/@types/enums.ts`** - 프로젝트 Enum 정의 ✅
   ```typescript
   export enum TodoStatus {
     UNCHECKED = 'unchecked',
     COMPLETED = 'completed',
     REVERTED = 'reverted',
   }

   export enum PetEmotion {
     JOY = 'joy',
     SAD = 'sad',
     NORMAL = 'normal',
   }

   export enum PetLevel { LEVEL_0 = 0, ..., LEVEL_5 = 5 }
   export enum PetStatusType { HUNGER, AFFECTION, CONDITION, CLEANLINESS }
   export enum ToastType { SPECIAL, NORMAL, RECEIVED, ALL_RECEIVED, FULL }
   export enum UserStatus { ACTIVE, INACTIVE }
   ```

#### 수정된 타입 파일 (11개)

모든 타입을 PascalCase로 통일하고 하위 호환성 유지:

| 이전 타입 | 새 타입 | 파일 |
|----------|---------|------|
| `user` | `User` | user.ts ✅ |
| `myUser` | `MyUser` | user.ts ✅ |
| `category` | `Category` | category.ts ✅ |
| `todoCategory` | `TodoCategory` | category.ts ✅ |
| `todo` | `Todo` | todo.ts ✅ |
| `myPet` | `MyPet` | myPet.ts ✅ |
| `myItems` | `MyItems` | myItems.ts ✅ |
| `dumpItemRes` | `DumpItemRes` | dumpItemRes.ts ✅ |
| `useItemRes` | `UseItemRes` | useItemRes.ts ✅ |
| `itemsCount` | `ItemsCount` | itemsCount.ts ✅ |
| `userInfo` | `UserInfo` | ranking.ts ✅ |

#### 타입 개선 사항

1. **느슨한 타입 수정** ✅
   ```typescript
   // Before
   interface user {
     inventory: string[];  // 불명확
     status: string;       // 느슨함
   }

   // After
   interface User {
     inventory: InventoryItem[];  // 명확한 구조
     status: UserStatus;          // Enum 사용
   }

   interface InventoryItem {
     itemId: string;
     quantity: number;
   }
   ```

2. **API 응답 타입 개선** ✅
   ```typescript
   // Before
   interface res<D> {
     status: number;
     error: string | null;
     data: D;
   }

   // After
   export interface ApiResponse<T> {
     status: number;
     error: string | null;
     data: T;
   }

   export type ApiSuccessResponse<T> = ApiResponse<T> & {
     error: null;
   };

   export interface ApiErrorResponse {
     status: number;
     error: string;
     message?: string;
   }

   // 하위 호환성
   /** @deprecated Use ApiResponse instead */
   export type res<D> = ApiResponse<D>;
   ```

3. **하위 호환성 전략** ✅
   ```typescript
   // 모든 파일에 적용
   /** @deprecated Use User instead */
   export type user = User;
   ```
   - 기존 코드 그대로 동작
   - IDE에서 deprecated 경고 표시
   - 점진적 마이그레이션 가능

**커밋:** `refactor: Phase 2 타입 안전성 강화` (cc009fb)

---

## 🧪 검증 결과

### TypeScript 타입 체크 ✅

```bash
$ npm run typecheck
PM 3:28:13 - Found 0 errors. Watching for file changes.
```

**결과:** 에러 0개 - 완벽 통과!

### 프로덕션 빌드 ✅

```bash
$ npm run build
✓ built in 1.08s
```

**번들 크기:**
- 총 크기: 2.9MB
- 메인 JS: 251KB (gzip: 85KB)
- CSS: 25KB (gzip: 6KB)

**번들 분석:**
- 코드 스플리팅: 14개 청크
- 압축률: ~66% (gzip)

---

## 📁 생성된 문서

1. **`PROJECT_IMPROVEMENTS.md`** - 전체 개선 가이드
   - 11개 섹션, 37개 세부 항목
   - 파일별 상세 개선 체크리스트
   - 우선순위별 작업 로드맵

2. **`COMMIT_CONVENTION.md`** - 커밋 컨벤션
   - 12가지 Type 정의
   - 실전 예시 포함
   - 템플릿 제공

3. **`BUILD_REPORT.md`** - 빌드 및 성능 리포트
   - 번들 크기 분석
   - 성능 메트릭
   - 최적화 권장사항

4. **`PROGRESS.md`** (이 파일) - 진행상황 요약

---

## 🎯 다음 단계: Phase 3

### Phase 3: 상태 관리 리팩토링 (예상 2-3일)

#### 작업 목록

1. **인증 상태 전역화** ⏳
   - 새 파일: `src/store/authStore.ts`
   - 현재: App.tsx에서 로컬 상태로 관리
   - 개선: Zustand 전역 스토어로 이동
   ```typescript
   interface AuthState {
     isAuth: boolean;
     isLoading: boolean;
     user: User | null;
     checkAuth: () => Promise<void>;
     logout: () => Promise<void>;
   }
   ```

2. **TodoStore 최적화** ⏳
   - 파일: `src/store/todoStore.tsx`
   - 문제: Store 간 직접 호출 (안티패턴)
   ```typescript
   // 현재 (잘못된 패턴)
   setStatus: async (...) => {
     const { closeToast, showToast } = useToastsStore.getState();
     closeToast();
     // ...
   }

   // 개선 (컴포넌트에서 조합)
   const { setStatus } = useTodosStore();
   const { showToast, closeToast } = useToastsStore();

   const handleStatusChange = async () => {
     closeToast();
     await setStatus(...);
     showToast(...);
   };
   ```
   - 중복 `set()` 호출 병합
   - Selector 최적화

3. **ToastStore 개선** ⏳
   - 파일: `src/store/toastStore.tsx`
   - `any` 타입 제거
   ```typescript
   // Before
   showToast: (Component: any, props: {}) => void;

   // After
   showToast: <P extends object>(
     Component: React.ComponentType<P>,
     props: P
   ) => void;
   ```
   - 타이머 정리 로직 개선

#### 예상 결과

- ✅ Store 간 결합도 감소
- ✅ 타입 안전성 향상
- ✅ 인증 상태 전역 접근 가능
- ✅ 코드 재사용성 향상

---

## 📅 전체 로드맵

### Week 1 (현재 진행 중) ✅

- [x] Phase 0: 긴급 수정 (완료)
- [x] Phase 1: 기반 인프라 구축 (완료)
- [x] Phase 2: 타입 안전성 강화 (완료)
- [ ] Phase 3: 상태 관리 리팩토링 (다음)

### Week 2

- [ ] Phase 4: 컴포넌트 리팩토링
  - PetArea 컴포넌트 분리 (389줄 → 3개 파일)
  - Todo 컴포넌트 개선 (변수명 오타 수정)
  - 레이아웃 컴포넌트 추출
  - Protected Route 구현

- [ ] Phase 5: UI/UX 개선
  - Toast 시스템 개선 (alert → toast)
  - 로딩 상태 통합
  - 에러 바운더리 구현
  - 스타일링 방식 통일

### Week 3

- [ ] Phase 6: 코드 정리
  - 주석 처리된 코드 제거
  - 사용하지 않는 컴포넌트 제거
  - console.log/error 정리
  - Import 정리

- [ ] Phase 7: 성능 최적화
  - Zustand selector 최적화
  - 메모이제이션 적용
  - 이미지 최적화 (pet_room.svg 473KB)
  - 번들 크기 분석

### Week 4+

- [ ] Phase 8: 테스트 (선택)
  - Vitest + React Testing Library 설정
  - 핵심 로직 단위 테스트
  - 주요 컴포넌트 통합 테스트

- [ ] Phase 9: 문서화 (선택)
  - 컴포넌트 Props 문서화
  - README 업데이트
  - 환경 변수 문서화

---

## 🔧 선택적 개선 사항

### React Query 도입 (고려 중)

**현재 문제:**
- 모든 컴포넌트에서 개별 데이터 페칭
- 캐싱 없음
- 로딩/에러 상태 중복 관리

**도입 시 장점:**
- 자동 캐싱 및 리페칭
- 중복 API 호출 제거
- 낙관적 업데이트 지원

**예상 코드:**
```typescript
// src/hooks/queries/usePetQuery.ts
export const usePetQuery = () => {
  return useQuery({
    queryKey: ['pet'],
    queryFn: async () => {
      const response = await axiosRequest.requestAxios("get", "myPets");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 사용
const { data: petData, isLoading } = usePetQuery();
```

**결정:** Phase 3 완료 후 검토

---

## 📊 통계

### 코드 변경 통계

```
Phase 0-2 총 변경:
- 생성된 파일: 8개
- 수정된 파일: 15개
- 추가된 라인: ~800줄
- 삭제된 라인: ~150줄
- 커밋: 3개
```

### 타입 안전성 개선

```
Before Phase 2:
- 소문자 인터페이스: 11개
- any 타입: 3곳
- object 타입: 5곳
- 문자열 리터럴: 다수

After Phase 2:
- PascalCase 인터페이스: 11개 ✅
- any 타입: 1곳 (ToastStore - Phase 3에서 수정 예정)
- object 타입: 0곳 ✅
- Enum 사용: 6개 ✅
```

---

## 🚨 알려진 이슈

### 현재 남아있는 문제

1. **ToastStore any 타입** - Phase 3에서 수정 예정
   ```typescript
   showToast: (Component: any, props: {}) => void;
   ```

2. **이미지 최적화 필요** - Phase 7에서 처리 예정
   - `pet_room.svg`: 473KB (압축 후 151KB)
   - 메달 SVG들: 각 40KB+

3. **테스트 환경 미구성** - Phase 8에서 추가 예정

4. **변수명 오타** - Phase 4에서 수정 예정
   ```typescript
   const [isEditing, setIsEditig] = useState(); // setIsEditig → setIsEditing
   ```

---

## 💡 배운 점 및 인사이트

### 기술적 인사이트

1. **타입 별칭을 활용한 점진적 마이그레이션**
   - 대규모 타입 변경 시 `@deprecated` 별칭으로 하위 호환성 유지
   - 빌드 에러 없이 점진적 개선 가능

2. **Axios 인터셉터의 강력함**
   - 전역 로딩 상태를 자동으로 관리
   - FormData Content-Type 자동 설정
   - 인증 에러 자동 감지

3. **Zustand의 단순함**
   - Redux보다 훨씬 적은 보일러플레이트
   - TypeScript와 완벽한 통합
   - 카운터 패턴으로 다중 요청 처리

### 프로세스 인사이트

1. **작은 단위로 커밋**
   - Phase별 명확한 커밋 메시지
   - 롤백이 쉬움
   - 히스토리 추적 용이

2. **문서화의 중요성**
   - 작업 전 계획 수립 (PROJECT_IMPROVEMENTS.md)
   - 진행 중 기록 (PROGRESS.md)
   - 완료 후 검증 (BUILD_REPORT.md)

---

## 📞 문의 및 이슈

현재 진행 중인 개선 작업에 대한 질문이나 제안사항이 있으시면:
- GitHub Issues에 등록
- 또는 팀 미팅에서 논의

---

## 📝 다음 작업 시작 방법

### Phase 3를 시작하려면:

1. **현재 브랜치 확인**
   ```bash
   git status
   git log --oneline -5
   ```

2. **새 브랜치 생성 (선택)**
   ```bash
   git checkout -b refactor/phase-3-state-management
   ```

3. **authStore 생성부터 시작**
   ```bash
   # 파일 생성
   touch src/store/authStore.ts

   # 또는 작업 계속
   # Phase 3 시작을 요청하세요
   ```

---

**마지막 업데이트:** 2026-02-14 15:50
**다음 작업:** Phase 3 - 상태 관리 리팩토링
**예상 완료:** 2026-02-15 (1-2일 소요)
