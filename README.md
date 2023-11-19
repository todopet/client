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

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/d64403ae-998a-485f-95bb-029d94fb20ca/%ED%8E%AB%ED%99%94%EB%A9%B4.png?id=b9a9a354-f77e-4029-a846-5e60ac148268&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=qnkdXpzlN281P6MRchg5iOxUOotXaD8nycSfJuKUYps&downloadName=%ED%8E%AB%ED%99%94%EB%A9%B4.png" width="250px" title="펫 화면"/><br>
- 펫의 상태 정보(포만감, 친밀도, 컨디션, 청결도, 경험치, 레벨 등)를 확인할 수 있다.
- 펫의 4가지 상태(포만감, 친밀도, 컨디션, 청결도)는 1분에 0.05씩 감소한다.
  
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/5549d9bd-6cda-4d40-bb76-dd374335c6c7/%ED%95%98%ED%8A%B8.png?id=7d1b5e02-5551-4836-b78f-c91211df18b6&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=wnoqtppExH34egdfFbsHCUxWcxyT5So4LAf6o1Wv2_o&downloadName=%ED%95%98%ED%8A%B8.png" width="150px" title="감정표현_하트"/>
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/dd558ef0-87e5-4da6-bc58-5d0c3cdd9a67/%E3%85%A0%E3%85%A0.png?id=a8914076-2d2d-4208-98e7-a99d47a0bd44&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=e7YikjbQ9IhoDij0NNW3DBKxldde9xfMWS3igz5wqzU&downloadName=%E3%85%A0%E3%85%A0.png" width="150px" title="감정표현_ㅜㅜ"/>
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/4182be0a-3856-445d-9685-fb60c2c9fd70/%EA%B7%B8%EB%83%A5.png?id=17c4ee89-9679-4895-96c4-c83385a2e482&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=Zq1zlhtgPEdWp8pt823wFxwfhcQo_MuK40egHE1VGfE&downloadName=%EA%B7%B8%EB%83%A5.png" width="150px" title="감정표현_없음"/>

- 펫의 4가지 상태에 따라 펫의 감정표현을 확인할 수 있다.
  
  > - 상태 4가지 모두 80% 이상 : 하트
  > - 상태중 하나라도 30% 이하 : ㅜㅜ
  > - 그 외 : 표현 없음

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/de6a9ba5-c3f2-468c-8b28-74f1b979fe38/%EC%9D%B8%EB%B2%A4%ED%86%A0%EB%A6%AC.png?id=8f773549-e4fa-4d21-a95b-5f31e14f4ffe&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=EGsWKMxqWQ_5bLh0KDe8QCmQjPfzGN2-78t0NWF6UmI&downloadName=%EC%9D%B8%EB%B2%A4%ED%86%A0%EB%A6%AC.png" width="250px" title="인벤토리 화면"/><br>
- 인벤토리에서 보유중인 아이템을 확인하 수 있다.
- 아이템은 5가지 종류가 있고, 종류별로 회복시키는 상태가 다르다.
  
  > - 먹이 : 포만감 회복
  > - 놀이 : 친밀도 회복
  > - 휴식 : 컨디션 회복
  > - 씻기 : 청결도 회복
  > - 히든 : 모든 상태 회복
- 종류별로 상태 회복량이 20, 30, 40인 아이템이 하나씩 있다.

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/a9527506-f7a8-4ff7-9808-8b185cef42fd/%EC%95%84%EC%9D%B4%ED%85%9C_%EC%82%AC%EC%9A%A9.png?id=bc3bdb13-4d5e-4242-93dd-3b336faf7dfb&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=bZ504M8fb62hdtRC4k_EUKuxT9K0cG2E6CyKOKr8oY0&downloadName=%EC%95%84%EC%9D%B4%ED%85%9C+%EC%82%AC%EC%9A%A9.png" width="250px" title="아이템 사용"/>
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/9da3205a-d551-45fb-9140-841de875effd/%EC%95%84%EC%9D%B4%ED%85%9C_%EB%B2%84%EB%A6%AC%EA%B8%B0.png?id=05b833fd-65a5-4adb-977d-219d9b1a7165&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=ghfd3KB90whmviWWf2FxmQrRCPK9e0AtN_GGXVDORdo&downloadName=%EC%95%84%EC%9D%B4%ED%85%9C+%EB%B2%84%EB%A6%AC%EA%B8%B0.png" width="250px" title="아이템 드랍"/><br>

- 아이템 이미지나 설명부분을 클릭하여 아이템을 사용하거나, 휴지통 아이콘을 클릭하여 아이템을 버릴 수 있다.

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
