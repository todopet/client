# Todo Pet : 할 일을 완료하며, 펫과 함께 성장하세요!

## 프로젝트 주제

- 목적 : 평범한 Todo App에 동기부여가 될 만한 컨텐츠를 제공하여 일정관리 및 완료를 더 재밌게 할 수 있도록 해보자!
- 목표
  - What? 카테고리 별로 계획을 세워 지켜나가는 Todo List 서비스
  - How? 계획 해결에 따른 보상을 얻어 나만의 펫을 성장시키는 서비스
  - Why? 펫을 키우겠다는 동기부여가 있어, 다른 Todo App과 차별화된 경험을 제공!

## 페르소나

<img src="https://github.com/todopet/client/assets/63568239/f2ede7ec-f1f9-4133-a359-6cf2edae606c" width="250" />

<br />
💡 테이머 킴(23세): "계획을 잘 세워서 지키고 싶은데, 투두리스트를 꾸준히 쓰기 어려워!"

## 기능 구현 리스트

#### Todo를 해결하여 날짜 별로 진행도를 확인하고, 펫을 키우며 다른 사람의 해결 정보를 확인할 수 있는 서비스를 기능 구현합니다.

<details><summary>1. 피드 페이지</summary>
<img src="https://github.com/todopet/client/assets/51261847/d3e75b33-3eb3-4a81-aac4-48df296c6af9" width="250" />

#### 미니펫 창
- 캐릭터 애니메이션(점프하며 오른쪽으로 이동) 적용
- 펫 레벨에 따라 캐릭터 변화
- 토스트 알림: 투두를 체크할 때마다 보상에 관련된 알림이 나타났다가 사라진다.
	- 일반 보상
	- 특별한 보상(히든 아이템)
	- 이미 받은 보상
	- 일일 보상 최대치를 초과한 경우
	- 인벤토리를 모두 채운 순간
	- <img src="https://github.com/todopet/client/assets/51261847/9d0ff67b-bb43-4833-952b-0747cff026ef" width="250" />
	- 인벤토리 공간이 없어서 아이템을 받지 못하는 경우
		- 공간이 없을 때 투두를 완료한 경우
		- 피드 페이지 진입 시 알림
		- <img src="https://github.com/todopet/client/assets/51261847/553ae2d1-e3b0-4213-a9d9-51849d05a448" width="250" />
		- <img src="https://github.com/todopet/client/assets/51261847/223823d8-4592-4316-a30d-c76703d86dab" width="250" />



#### 캘린더
- 토글 버튼으로 주간 캘린더 모드, 월간 캘린더 모드를 전환 가능
- ![image](https://github.com/todopet/client/assets/51261847/9f4345cc-113b-4085-9bef-5d714d4418fd)
- 날짜를 클릭 시 해당 날짜로 이동하며, 그 날의 Todo만 표시
- 각 날짜의 완료한 Todo개수를 색깔로 나타내며, 개수가 많을 수록 색이 진해진다
- <img src="https://github.com/todopet/client/assets/51261847/fbf7278b-47f0-44c3-ada3-9745fd834f58" width="250" />
- 오늘 날짜는 검정 동그라미, 선택한 날짜는 파란색 동그라미로 나타낸다.
- 날짜를 선택할 경우 선택한 날짜에 해당하는 Todo만 표시된다.
- <img src="https://github.com/todopet/client/assets/51261847/90d13f3c-a721-4e73-898f-4a5ba4155910" width="250" />


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

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/d64403ae-998a-485f-95bb-029d94fb20ca/%ED%8E%AB%ED%99%94%EB%A9%B4.png?id=b9a9a354-f77e-4029-a846-5e60ac148268&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=qnkdXpzlN281P6MRchg5iOxUOotXaD8nycSfJuKUYps&downloadName=%ED%8E%AB%ED%99%94%EB%A9%B4.png" width="250px" title="펫 화면"/><br>
- 펫의 상태 정보(포만감, 친밀도, 컨디션, 청결도, 경험치, 레벨 등)를 확인할 수 있다.
- 펫의 4가지 상태(포만감, 친밀도, 컨디션, 청결도)는 1분에 0.05씩 감소한다.

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/5549d9bd-6cda-4d40-bb76-dd374335c6c7/%ED%95%98%ED%8A%B8.png?id=7d1b5e02-5551-4836-b78f-c91211df18b6&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=wnoqtppExH34egdfFbsHCUxWcxyT5So4LAf6o1Wv2_o&downloadName=%ED%95%98%ED%8A%B8.png" width="150" height="200" title="감정표현_하트"/>
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/dd558ef0-87e5-4da6-bc58-5d0c3cdd9a67/%E3%85%A0%E3%85%A0.png?id=a8914076-2d2d-4208-98e7-a99d47a0bd44&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=e7YikjbQ9IhoDij0NNW3DBKxldde9xfMWS3igz5wqzU&downloadName=%E3%85%A0%E3%85%A0.png" width="150" height="200" title="감정표현_ㅜㅜ"/>
<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/4182be0a-3856-445d-9685-fb60c2c9fd70/%EA%B7%B8%EB%83%A5.png?id=17c4ee89-9679-4895-96c4-c83385a2e482&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=Zq1zlhtgPEdWp8pt823wFxwfhcQo_MuK40egHE1VGfE&downloadName=%EA%B7%B8%EB%83%A5.png" width="150" height="200" title="감정표현_없음"/>

- 펫의 4가지 상태에 따라 펫의 감정표현을 확인할 수 있다.

  > - 상태 4가지 모두 80% 이상 : 하트
  > - 상태중 하나라도 30% 이하 : ㅜㅜ
  > - 그 외 : 표현 없음

<img src="https://file.notion.so/f/f/87775b30-7ef6-4a3d-8786-09b3ec722695/de6a9ba5-c3f2-468c-8b28-74f1b979fe38/%EC%9D%B8%EB%B2%A4%ED%86%A0%EB%A6%AC.png?id=8f773549-e4fa-4d21-a95b-5f31e14f4ffe&table=block&spaceId=87775b30-7ef6-4a3d-8786-09b3ec722695&expirationTimestamp=1700467200000&signature=EGsWKMxqWQ_5bLh0KDe8QCmQjPfzGN2-78t0NWF6UmI&downloadName=%EC%9D%B8%EB%B2%A4%ED%86%A0%EB%A6%AC.png" width="250px" title="인벤토리 화면"/><br>
- 인벤토리에서 보유중인 아이템을 확인할 수 있다.
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

<img width="250" alt="랭킹페이지" src="https://github.com/todopet/client/assets/63568239/be7192eb-c97a-4456-beab-c31781a524f3">

- 랭킹 조회
  - 주간 별로 투두를 해결한 순서대로 랭킹을 부여한다.
  - 주간 투두 해결 1위, 2위, 3위 유저는 명예의 전당에 올라 프로필 사진 또한 표시한다.
    - <img width="250" alt="주간랭킹" src="https://github.com/todopet/client/assets/63568239/9dbe3913-967d-4837-8b91-0cc3bad76d61">
  - 하단 영역에는 주간 투두 해결을 많이 진행한 상위 n명에 대하여 닉네임과 해결 횟수를 표시한다.
    - 주간 투두 해결 1위, 2위, 3위 유저는 순위 대신 메달을 표시하고, 나머지 유저들은 순위를 표시한다.
  - 주간 투두 해결 횟수가 같은 유저에 대한 랭킹 표시는 최근에 투두를 해결한 유저에 대하여 우선 순위를 부여한다.

</details>


<details><summary>4. 마이 페이지</summary>

<img width="250" alt="테스트" src="https://github.com/todopet/client/assets/125293472/987b4952-068c-49c8-a09e-3f1aaad34dc7">
<img width="250" alt="테스트" src="https://github.com/todopet/client/assets/125293472/64d91823-4145-44b7-8d2f-7ce8245512b3">

- 프로필 사진 : 구글 계정의 프로필 사진이 표시된다.
- 닉네임 : 구글 계정의 닉네임이 표시된다.
	- 닉네임 수정 버튼 : 닉네임 수정을 위한 모달이 나타난다.
- 가입일 : 가입일자를 표시한다.
- 카드
	- 펫 카드 : 가입 일로부터 서비스를 이용한 시간을 날짜로 표시한다.
	- todo 달성 날짜 카드 : todo 달성한 날짜를 표시한다.
	- todo 완료 카드 :  완료한 todo 개수를 표시한다.
<img width="250" alt="로그아웃" src="https://github.com/todopet/client/assets/125293472/b21b6a82-5329-48ee-ac10-58d76a56bb41">
<img width="250" alt="테스트" src="https://github.com/todopet/client/assets/125293472/d80fc85a-f5f3-435b-8bb9-dbc5e1eb30f9">

- 로그아웃 버튼 : 로그아웃 확인 모달이 나타나고, 실행 시 로그인 페이지로 이동한다.
- 회원 탈퇴 버튼 : 회원 탈퇴 확인 모달이 나타난다.

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
| 안보란 | 캘린더 컴포넌트 개발 </br> 투두 페이지에 연동     | 주간/월간 전환 및 투두 해결 수에 따른 실시간 색상 표시 </br>투두 컴포넌트와 연결                                                      |
| 문수민 | 투두(피드) 페이지 개발             |  투두 CRUD </br>투두 해결에 따른 알림 토스트 창 표시 </br>캘린더 컴포넌트와 연결                                                          |
| 최태관 | API 개발 </br> 소셜 로그인        | 아이템 사용에 따른 펫 상태 업데이트 로직 개발 </br> 보상 지급 로직 개발 </br> 구글 소셜 로그인                                                                  |
| 전재욱 | 펫 관리 페이지 및 인벤토리 컴포넌트 개발     | 펫 페이지에 캐릭터 및 상태 표시 </br> 아이템 사용 로직 적용 </br> 인벤토리 아이템 관리                                                                                     |
| 이남경 | 목표 페이지 개발, PPT 제작              | 투두 목표 관리 CRUD 페이지 개발 </br> 발표 PPT 자료 제작                                                                                     |

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
