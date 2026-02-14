export interface UserInfo {
    _id: string;
    googleId: string;
    nickname: string;
    picture: string;
}

export interface RankInfo {
    count: number;
    userInfo: UserInfo;
    rank: number;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use UserInfo instead */
export type userInfo = UserInfo;
