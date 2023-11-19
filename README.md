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

<details><summary>1. 피드 페이지 </summary>

![헤더](https://github.com/are-you-T/client/assets/87935496/54f36f44-67a9-490a-be68-4a663a8a76f2)

- 로고를 클릭하여 메인 페이지로 이동한다.
- 햄버거 버튼을 클릭하여 사이드 바를 표시한다.
- 하단의 깃허브 아이콘을 클릭하여 깃허브 페이지로 이동한다.
- 하단의 공유 아이콘을 클릭하여 화면의 링크를 복사한다.

</details>

<details><summary>2. 펫 페이지</summary>

![사이드바](https://github.com/are-you-T/client/assets/87935496/51f9686d-5d2f-4a6d-acd3-24f28715e231)

- “테스트 하러가기” 버튼을 클릭하여 테스트 페이지로 이동한다.
- “통계 보러가기” 버튼을 클릭하여 통계 페이지로 이동한다.
- “담벼락 보러가기” 버튼을 클릭하여 담벼락 페이지로 이동한다.
- 하단의 링크를 클릭하여 깃허브 페이지로 이동한다.

</details>

<details><summary>3. 랭킹 페이지</summary>

![랭킹페이지](https://github.com/todopet/client/assets/63568239/be7192eb-c97a-4456-beab-c31781a524f3)
- 랭킹 조회
  - 주간 별로 투두를 해결한 순서대로 랭킹을 부여한다.
  - 주간 투두 해결 1위, 2위, 3위 유저는 명예의 전당에 올라 프로필 사진 또한 표시한다.
    - ![주간랭킹](https://github.com/todopet/client/assets/63568239/9dbe3913-967d-4837-8b91-0cc3bad76d61)
  - 하단 영역에는 주간 투두 해결을 많이 진행한 상위 n명에 대하여 닉네임과 해결 횟수를 표시한다.
    - 주간 투두 해결 1위, 2위, 3위 유저는 순위 대신 메달을 표시하고, 나머지 유저들은 순위를 표시한다.
  - 주간 투두 해결 횟수가 같은 유저에 대한 랭킹 표시는 최근에 투두를 해결한 유저에 대하여 우선 순위를 부여한다.

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

![로고](https://github.com/todopet/client/assets/63568239/15ba9d33-15df-49ff-a522-4116a3632254)

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
- Gather Town : 음성 채팅방 활용 의견 제시 및 문제 해결, 화면 공유
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
