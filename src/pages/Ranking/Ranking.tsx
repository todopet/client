import React, { useEffect, useState } from "react";
import axiosRequest from "@/api/index";
import { Title, RankingContainer } from "./Ranking.styles";
import { res, RankInfo } from "@/@types/index";
import TopThree from "@/components/pages/Ranking/TopThree/TopThree";
import RankInfoList from "@/components/pages/Ranking/RankInfoList/RankInfoList";

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
            <TopThree userTopThreeList={userTopThreeList}></TopThree>
            <RankInfoList userRankList={userRankList}></RankInfoList>
        </RankingContainer>
    );
};

export default Ranking;
