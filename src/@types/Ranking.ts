export interface Ranking {
    count: number;
    userInfo: userInfo;
    rank: number;
}

export interface userInfo {
    _id: string;
    googleId: string;
    nickname: string;
    picture: string;
}
