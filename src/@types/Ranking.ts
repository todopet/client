export interface Ranking {
    count: number;
    userInfo: UserInfo;
    rank: number;
}

export interface UserInfo {
    _id: string;
    googleId: string;
    nickname: string;
    picture: string;
}
