import React, { useEffect, useState } from "react";
import axiosRequest from "@/api/index";
import Ranker from "@/components/Ranker/Ranker";
import {
    TopThree,
    CircleIcon,
    RankList,
    Title,
    FirstPlaceIcon,
    RankingContainer,
    GOLD_COLOR,
    SILVER_COLOR,
    BRONZE_COLOR,
    RankInfoContainer,
    UserRankInfo,
    Rank,
    NickName,
    Medal,
    CompletedTodo,
    RankNumber,
    RankNickname
} from "./Ranking.styles";
import { res, ranking, userInfo } from "@/@types/index";
import Divider from "@/components/Divider/Divider";
import { ReactComponent as GoldMedal } from "@/assets/icons/goldmedal.svg";
import { ReactComponent as SilverMedal } from "@/assets/icons/silvermedal.svg";
import { ReactComponent as BronzeMedal } from "@/assets/icons/bronzemedal.svg";

interface User {
    id: number;
    rank: number;
    nickname: string;
    solvedPlans: number;
    imageUrl?: string;
}

interface UserProfile {
    id: string;
    nickname: string;
    imageUrl: string;
}

interface GoogleUser {
    getBasicProfile: () => {
        getId: () => string;
        getName: () => string;
        getImageUrl: () => string;
    };
}

interface DividerProps {
    category?: string;
}

const userList: User[] = [
    { id: 1, rank: 1, nickname: "user A", solvedPlans: 100 },
    { id: 2, rank: 2, nickname: "user B", solvedPlans: 80 },
    { id: 3, rank: 3, nickname: "user C", solvedPlans: 70 },
    { id: 4, rank: 4, nickname: "user D", solvedPlans: 60 },
    { id: 5, rank: 5, nickname: "user E", solvedPlans: 50 },
    { id: 6, rank: 6, nickname: "user F", solvedPlans: 40 },
    { id: 7, rank: 7, nickname: "user G", solvedPlans: 30 },
    { id: 8, rank: 8, nickname: "user H", solvedPlans: 20 },
    { id: 9, rank: 9, nickname: "user I", solvedPlans: 10 },
    { id: 10, rank: 10, nickname: "user J", solvedPlans: 5 }
];

const Ranking: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const topThreeOrder = [2, 1, 3];
    const sortedTopThree = userList
        .slice(0, 3)
        .sort(
            (a, b) =>
                topThreeOrder.indexOf(a.rank) - topThreeOrder.indexOf(b.rank)
        );
    const [userRankList, setUserRankList] = useState<ranking[]>([]);
    const [userTopThreeList, setUserTopThreeList] = useState<ranking[]>([]);

    const getUserRankList = async () => {
        try {
            const response: res<ranking[]> = await axiosRequest.requestAxios<
                res<ranking[]>
            >("get", "/users/rank", {});
            setUserRankList(response.data);
            setUserTopThreeList(setTopThree(userRankList));
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    };

    const setTopThree = (rankList: ranking[]) => {
        return rankList
            .slice(0, 3)
            .sort(
                (a, b) =>
                    topThreeOrder.indexOf(a.rank) -
                    topThreeOrder.indexOf(b.rank)
            );
    };

    useEffect(() => {
        getUserRankList();
    }, []);

    // function onSignIn(googleUser: GoogleUser) {
    //     const profile = googleUser.getBasicProfile();
    //     const userData: UserProfile = {
    //         id: profile.getId(),
    //         nickname: profile.getName(),
    //         imageUrl: profile.getImageUrl()
    //     };
    //     setUserProfile(userData);
    // }

    return (
        <RankingContainer>
            <Title>Top Ranking</Title>
            <TopThree>
                {userTopThreeList.map((list) => {
                    let borderColor = "black";
                    if (list.rank === 1) {
                        borderColor = GOLD_COLOR;
                    } else if (list.rank === 2) {
                        borderColor = SILVER_COLOR;
                    } else if (list.rank === 3) {
                        borderColor = BRONZE_COLOR;
                    }

                    const IconComponent =
                        list.rank === 1 ? FirstPlaceIcon : CircleIcon;
                    return (
                        <RankInfoContainer key={list.userInfo._id}>
                            <RankNumber>{list.rank}</RankNumber>
                            <IconComponent color={borderColor}>
                                <img
                                    src={list.userInfo.picture}
                                    alt={list.userInfo.nickname}
                                />
                            </IconComponent>
                            <RankNickname>
                                {list.userInfo.nickname}
                            </RankNickname>
                        </RankInfoContainer>
                    );
                })}
            </TopThree>

            <RankList>
                <UserRankInfo>
                    <Rank>순위</Rank>
                    <NickName>이름</NickName>
                    <CompletedTodo>횟수</CompletedTodo>
                </UserRankInfo>
                {userRankList.map((list, index) => (
                    <UserRankInfo key={list.userInfo._id}>
                        {list.rank === 1 ? (
                            <Rank>
                                <GoldMedal />
                            </Rank>
                        ) : list.rank === 2 ? (
                            <Rank>
                                <SilverMedal />
                            </Rank>
                        ) : list.rank === 3 ? (
                            <Rank>
                                <BronzeMedal />
                            </Rank>
                        ) : (
                            <Rank>{list.rank}</Rank>
                        )}
                        <NickName>{list.userInfo.nickname}</NickName>
                        <CompletedTodo>{list.count}</CompletedTodo>
                    </UserRankInfo>
                ))}
            </RankList>
        </RankingContainer>
    );
};

export default Ranking;
