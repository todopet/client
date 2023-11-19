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
- 캐릭터 애니메이션(점프하며 오른쪽으로 이동) 적용
- 펫 레벨에 따라 캐릭터 변화
- 토스트 알림: 투두를 체크할 때마다 보상에 관련된 알림이 나타났다가 사라진다
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
- 토글 버튼으로 주간 캘린더 모드, 월간 캘린더 모드를 전환 가능
- ![image](https://github.com/todopet/client/assets/51261847/9f4345cc-113b-4085-9bef-5d714d4418fd)
- 날짜를 클릭 시 해당 날짜로 이동하며, 그 날의 Todo만 표시
- 각 날짜의 완료한 Todo개수를 색깔로 나타내며, 개수가 많을 수록 색이 진해진다
- <img src="https://github.com/todopet/client/assets/51261847/fbf7278b-47f0-44c3-ada3-9745fd834f58" width="300" />
- 오늘 날짜는 검정 동그라미, 선택한 날짜는 파란색 동그라미로 나타낸다.
- 날짜를 선택할 경우 선택한 날짜에 해당하는 Todo만 표시된다.
- <img src="https://github.com/todopet/client/assets/51261847/90d13f3c-a721-4e73-898f-4a5ba4155910" width="300" />
  
  
#### Todo List
- 카테고리별 투두 생성
  - 투두 카테고리 버튼을 클릭하면 투두를 작성할 수 있는 폼이 나타난다
  - <img src="https://github.com/todopet/client/assets/51261847/a2625225-8981-495e-9ff4-5b04783d64dc" width="100" />

- 투두 생성 폼
  - 할 일을 입력하고 enter를 누르면 투두 리스트에 등록되고 새로운 폼이 아래에 나타난다
  - 할 일을 입력하고 폼 이외의 영역을 클릭하면 투두 리스트에 등록된다
  - <img src="https://github.com/todopet/client/assets/51261847/50780f4f-34eb-4a94-89b4-561086408f3a" width="250" />

- 투두 삭제/수정
  - 투두를 삭제하거나 수정할 수 있는 버튼이며, 클릭 시 삭제/수정 드롭다운이 나온다
  - <img src="https://github.com/todopet/client/assets/51261847/f525c7bd-0fc3-425a-bd2d-c2cb3f743c65" width="30" />

<br/>
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
| 원종석 | API 개발 </br> 공통 코드 개발 </br> 랭킹 페이지 개발      | 투두, 보상 처리 API 개발 </br> 스키마 및 데이터 타입 정의 </br> API 호출 공통 함수 개발 </br> 랭킹 페이지 개발             |
| 안보란 | 캘린더 컴포넌트 개발 </br> 투두 페이지에 연동     | 주/월 선택 및 투두 해결 수에 따른 실시간 색상 표시 </br>투두 컴포넌트와 연결                                                      |
| 문수민 | 투두(피드) 페이지 개발             |  </br>투두 CRUD </br>투두 해결에 따른 알림 토스트 창 표시 </br>캘린더 컴포넌트와 연결                                                          |
| 최태관 | API 개발 </br> 소셜 로그인        | 아이템 사용에 따른 펫 상태 업데이트, 보상 지급 로직 개발 </br> 구글 소셜 로그인                                                                  |
| 전재욱 | 펫 관리 페이지 및 인벤토리 컴포넌트 개발     | 아이템 사용 로직 적용 </br> 인벤토리 아이템 관리                                                                                     |
| 이남경 | 목표 페이지 개발, PPT 제작              | 투두 목표 관리 CRUD 페이지 개발, 발표 PPT 자료 제작                                                                                     |

<br />

## 스키마 명세서

<details><summary>인벤토리 스키마</summary>

```
const inventorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        items: [
            {
                item: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);
```

</details>

<details><summary>아이템 스키마</summary>

```
const itemSchema = new Schema(
    {
        // 아이템 이름
        name: {
            type: String,
            required: true
        },
        // 아이템 설명
        description: {
            type: String,
            required: true
        },
        // 아이템 이미지
        image: {
            type: String,
            required: true
        },
        // 아이템 적용 상태 (포만감, 컨디션, 청결도, 친밀도)
        status: {
            type: Array,
            required: true
        },
        // 아이템 효과 (얼만큼 회복)
        effect: {
            type: Number,
            required: true
        },
        // 아이템 사용시 경험치 증가량
        experience: {
            type: Number,
            required: true
        },
        // 획득 확률
        probability: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>펫 정보 스키마</summary>

```
const petSchema = new Schema(
    {
        petName: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            default: 0
        },
        // 경험치
        experience: {
            type: Number,
            default: 0
        },
        // 포만감
        hunger: {
            type: Number,
            default: 100
        },
        // 친밀도
        affection: {
            type: Number,
            default: 100
        },
        // 청결도
        cleanliness: {
            type: Number,
            default: 100
        },
        // 컨디션
        condition: {
            type: Number,
            default: 100
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>todo 카테고리(목표) 스키마</summary>

```
const todoCategorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true
        },
        ended: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>todo 내용 스키마</summary>

```
const todoContentSchema = new Schema(
    {
        categoryId: {
            type: String,
            required: true
        },
        todo: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['unchecked', 'reverted', 'completed'],
            default: 'unchecked'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>사용자 스키마</summary>

```
const userSchema = new Schema(
    {
        googleId: {
            type: String,
            unique: true,
            required: true
        },
        nickname: {
            type: String,
            required: true
        },
        membershipStatus: {
            type: String,
            enum: ['active', 'withdrawn', 'suspended'],
            default: 'active',
            required: true
        },
        picture: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>마이펫 스키마</summary>

```
const myPetSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        pets: [
            {
                pet: petSchema
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);
```

</details>

<details><summary>히스토리 스키마</summary>

```
const historySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        // 업적 id 또는 todo id가 될 수 있다.
        contentId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
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
