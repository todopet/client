# Todo Pet : 펫

## 프로젝트 주제

- 목적 : todopet
- 목표
  - todopet
  - todopet
  - todopet

## 페르소나

![페르소나 (2)](https://github.com/are-you-T/client/assets/87935496/3adae08a-34ed-41ea-b7e2-ed64d4e1ba99)
<br />
💡테이머 킴(24세): "작심삼일"

## 기능 구현 리스트

#### (todopet) MBTI 유형별 분석, 통계, 담벼락 등 MBTI 포털 사이트의 핵심 기능을 구현합니다.

<details><summary>1. 피드 페이지</summary>
<img src="https://github.com/todopet/client/assets/51261847/d3e75b33-3eb3-4a81-aac4-48df296c6af9" width="300" />

#### 미니펫 창
- 캐릭터 애니메이션(점프하며 오른쪽으로 이동)을 적용했습니다.
- 펫 레벨에 따라 캐릭터가 변화합니다.
- 토스트 알림
	- 투두를 체크할 때마다 보상에 관련된 알림이 나타났다가 사라집니다.
	- 일반 보상
	- 특별한 보상(히든 아이템)
	- 이미 받은 보상
	- 일일 보상 최대치를 초과한 경우
	- 인벤토리를 모두 채운 순간
	- <img src="https://github.com/todopet/client/assets/51261847/9d0ff67b-bb43-4833-952b-0747cff026ef" width="300" />
 
	- 인벤토리 공간이 없어서 아이템을 받지 못하는 경우
		- 공간이 없을 때 투두를 완료한 경우
		- 피드 페이지 진입 시 알림
		- <img src="https://github.com/todopet/client/assets/51261847/553ae2d1-e3b0-4213-a9d9-51849d05a448" width="300" />
		- <img src="https://github.com/todopet/client/assets/51261847/223823d8-4592-4316-a30d-c76703d86dab" width="300" />

#### 캘린더
- 토글 버튼으로 주간 캘린더 모드, 월간 캘린더 모드를 전환 가능합니다.
- ![image](https://github.com/todopet/client/assets/51261847/9f4345cc-113b-4085-9bef-5d714d4418fd)
- 날짜를 클릭 시 해당 날짜로 이동하며, 그 날의 Todo만 표시합니다.
- 
#### 캘린더

#### 캘린더


</details>

<details><summary>2. 펫 페이지</summary>

![사이드바](https://github.com/are-you-T/client/assets/87935496/51f9686d-5d2f-4a6d-acd3-24f28715e231)

- “테스트 하러가기” 버튼을 클릭하여 테스트 페이지로 이동한다.
- “통계 보러가기” 버튼을 클릭하여 통계 페이지로 이동한다.
- “담벼락 보러가기” 버튼을 클릭하여 담벼락 페이지로 이동한다.
- 하단의 링크를 클릭하여 깃허브 페이지로 이동한다.

</details>

<details><summary>3. 랭킹 페이지</summary>

![메인](https://github.com/are-you-T/client/assets/87935496/67737a45-65f4-4dae-96d3-d122a2695867)

- 상단 햄버거 버튼을 누르면 사이드 바가 표시된다.
- 사이드 바 관련 기능은 1번 참고.
- 테스트 하러 가기 : 버튼을 클릭하면 MBTI 유형 검사 문답이 표시되고, 유저는 검사를 할 수 있다.
- 통계 보러 가기 : 전체 통계 페이지로 이동한다.
- 담벼락 보러 가기 : MBTI 전체 담벼락 페이지로 이동한다.

</details>

<details><summary>4. 마이 페이지</summary>

<img width="100" alt="테스트" src="https://github.com/are-you-T/client/assets/87935496/faf49015-323c-40e1-83e0-a46ec7c4cfbd">

- MBTI 유형 검사 페이지입니다.
- 16개 문항으로 이루어져 있으며, 1문항당 2개의 선택지가 있습니다.
- 선택지(TestCard)
- 프로그레스 바

</details>

<br />

## 데모 사이트

- [https://todopet.vercel.app/](https://todopet.vercel.app/)
<div>

![로고](https://github.com/are-you-T/client/assets/87935496/80e136df-e092-4592-a06f-605e3a2a18ce)

 </div>

## Tech Stack

| FE                        | BE         | Infra     |
| ------------------------- | ---------- | --------- |
| React.js                  | node.js    | Vercel    |
| styled-components         | express.js | CloudType |
| TypeScript                | mongodb    |           |

<br />

## 👪 구성원 역할

<br />

| 담당자 | 업무                            | 비고                                                                                                                                        |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 원종석 | API 개발 </br>공통 코드 개발      | 필요한 API 개발 </br>스키마 및 데이터 타입 정의 </br>API 호출 공통 함수 개발                                                                  |
| 안보란 | MBTI 검사 결과 계산 로직 개발     | 사용자가 선택한 데이터 계산 </br>검사 결과 데이터 전달 </br>통계 데이터 갱신                                                                   |
| 문수민 | 담벼락 글쓰기 컴포넌트 개발        | 사용자가 글을 작성할 수 있는 폼 모달 창 개발 </br>제목, 내용 유효성 검사 </br>MBTI 유형 상태 관리 </br>담벼락 스티커 색상 선택 모달 창 개발       |
| 최태관 | API 개발                         | 검사 결과 데이터 화면에 표시 </br>링크 공유하기 </br>유형별 통계 표시(외부 링크로 접근시에는 보이지 않음)                                        |
| 전재욱 | MBTI 유형별 결과 통계 화면 개발    | 유형별 결과 통계 차트로 표시 </br>문항당 하나의 차트 및 응답을 표시                                                                           |
| 이남경 | MBTI 검사 화면 개발               | 테스트 검사 데이터 스케일링 및 전달                                                                                                         |

<br />

## 스키마 명세서

<details><summary>테스트 스키마</summary>

```
  // 어떤 테스트인지? 사실 테스트는 1개만 만들 것이지만, 나중에 확장성을 위해 만든다.
const TestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});
```

</details>

<details><summary>문항 스키마</summary>

```
// 어떤 테스트에 대한 문항인지. 사실 테스트는 1개만 만들 것이지만, 
// 나중에 확장성을 위해 이렇게 정의한다.
const QuestionSchema = new Schema({
  // 문항 번호
  idx: {
    type: Number,
    required: true,
  },
  // 문항 질문(주제)
  subject: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  answer: {
		type: {
      E: { type: String, required: false },
      I: { type: String, required: false },
      N: { type: String, required: false },
      S: { type: String, required: false },
      T: { type: String, required: false },
      F: { type: String, required: false },
      J: { type: String, required: false },
      P: { type: String, required: false },
    },
    required: true,
  }
  // 어떤 mbti 판별에 대한 문항인지의 타입
  // E, I, N, S, F, T, P, J
  mbtiType: {
    type: String,
    required: true,
  },
  // mbtiType에 대한 답변
  typeAnswer: {
	  type: String,
    required: true
  },
  // 중요도
  proportion: {
		type: Number,
    required: true
  }
});
```

</details>

<details><summary>게시글 스키마 (MBTI 별로 데이터 저장)</summary>

```
const BoardSchema = new Schema({
    // 사용자 uuid (일단 보류.)
    uuid: {
      type: String,
      required: false,
    },
    // mbti 카테고리 (16개의 mbti)
    category: {
      type: String,
      required: true,
    },
    // 게시글 제목
    title: {
      type: String,
      required: true
    },
    // 게시글 내용
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // 공감
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'boards',
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) },
  }
});
```

</details>

<details><summary>통계 스키마 (MBTI 결과에 대해 선택 결과 저장)</summary>

```
const StatisticSchema = new Schema({
  // 특정 mbti 유형
  mbtiType: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  totalResponse: {
    type: Number,
    required: true,
    default: 0,
  },
  mbtiData: [
    {
      idx: {
        type: Number,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      answer: {
        E: { type: String, required: false },
        I: { type: String, required: false },
        N: { type: String, required: false },
        S: { type: String, required: false },
        T: { type: String, required: false },
        F: { type: String, required: false },
        J: { type: String, required: false },
        P: { type: String, required: false },
      },
      selection: {
        E: { type: Number, required: false },
        I: { type: Number, required: false },
        N: { type: Number, required: false },
        S: { type: Number, required: false },
        T: { type: Number, required: false },
        F: { type: Number, required: false },
        J: { type: Number, required: false },
        P: { type: Number, required: false },
      },
    },
  ],
});
```

</details>

<details><summary>MBTI 스키마 (16개 MBTI에 대한 설명, 잘 맞는 MBTI 안 맞는 MBTI)</summary>

```
const MBTISchema = new Schema({
	//
  // 16개 mbti 통계 데이터
  name: {
		  type: String,
      required: true
  },
  // 전체 mbti 비율 통계를 위한 데이터
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  // 해당 mbti에 대한 특징 요약
  summary: {
    type: String,
    required: true,
  },
  // 해당 mbti에 대한 키워드
  tag: {
		type: Array,
    required: true
  },
	content: {
     // 해당 mbti에 대한 설명
     description: {
		     type: String,
         required: true
     }
     // 잘 맞는 mbti
	   good: {
       // 잘 맞는 mbti 유형 1개
		   name: {
					type: String,
          required: true
	     },
       // 이에 대한 설명 (왜 잘맞나요?)
	     description: {
			    type: String,
          required: true
	     }
	  },
	  bad : {
      // 잘 안맞는 mbti 유형 1개
			name: {
				type: String,
        required: true
	    },
      // 이에 대한 설명 (왜 잘 안맞나요?)
	    description: {
				type: String,
        required: true
	    }
	  },
	},
});
```

</details>

## Collaboration Tools

- Notion : 스터디 기간, 사용 기술 스택, 참고 문서, 업무 진행 사항, 회의록
- Gather Town : 음성 채팅방 활용 의견 제시및 문제 해결
- GitHub : Code Repository
- Postman Teams : API 테스트 진행

## 코드 컨벤션

- 변수 : 카멜 케이스(camelCase)
- 변수(스키마) : 파스칼 케이스(PascalCase)
- 함수 : 카멜 케이스(camelCase)
- 상수 : 대문자
- 파일 : 파스칼 케이스(PascalCase)
- 스타일 : 케밥 케이스(kebab-case)

## 커밋 컨벤션

- feat : 새로운 기능 추가
- fix : 오류 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, css 작업
- refactor : 코드 로직 수정 (리팩토링)
- docs : 문서 수정
- test : 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정 (module 추가 시)

## 브랜치 전략

### main - develop - feature/A


---

무단 사용 및 도용, 복제 및 배포를 금합니다.
<br />
Copyright 2023 엘리스 2차 프로젝트 [Todo Tamers]팀. All rights reserved.
