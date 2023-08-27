import React, { useEffect, useState } from "react";
import axiosRequest from "@/api/index";
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
    RankNickname,
    ProfileImage
} from "./Ranking.styles";
import { res, RankInfo, userInfo } from "@/@types/index";
import { ReactComponent as GoldMedal } from "@/assets/icons/goldmedal.svg";
import { ReactComponent as SilverMedal } from "@/assets/icons/silvermedal.svg";
import { ReactComponent as BronzeMedal } from "@/assets/icons/bronzemedal.svg";

const Ranking: React.FC = () => {
    const topThreeOrder = [2, 1, 3];

    const [userRankList, setUserRankList] = useState<RankInfo[]>([]);
    const [userTopThreeList, setUserTopThreeList] = useState<RankInfo[]>([]);

    const getUserRankList = async () => {
        try {
            const response: res<RankInfo[]> = await axiosRequest.requestAxios<
                res<RankInfo[]>
            >("get", "/users/rank", {});
            setUserRankList(response.data);
            setUserTopThreeList(setTopThree(response.data));
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    };

    const setTopThree = (rankList: RankInfo[]) => {
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

    return (
        <RankingContainer>
            <Title>Top Week's Ranking</Title>
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
                                <ProfileImage
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
                    <NickName>닉네임</NickName>
                    <CompletedTodo>달성</CompletedTodo>
                </UserRankInfo>
                {userRankList.map((list) => (
                    <UserRankInfo key={list.userInfo?._id}>
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
