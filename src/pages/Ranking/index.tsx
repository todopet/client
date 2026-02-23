import React, { useEffect, useState } from "react";
import { axiosRequest } from "@/api";
import { res, RankInfo } from "@/@types";
import TopThree from "@/components/pages/Ranking/TopThree";
import RankInfoList from "@/components/pages/Ranking/RankInfoList";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { RANKING_CONFIG } from "@/libs/constants";
import { API_ENDPOINTS } from "@/api/endpoints";

const Ranking: React.FC = () => {
    const [userRankList, setUserRankList] = useState<RankInfo[]>([]);
    const [userTopThreeList, setUserTopThreeList] = useState<RankInfo[]>([]);

    const getUserRankList = async (count: number) => {
        try {
            const response: res<RankInfo[]> = await axiosRequest.requestAxios<
                res<RankInfo[]>
            >("get", API_ENDPOINTS.USER.RANK(count), {});
            setUserRankList(response.data);
            setUserTopThreeList(setTopThree(response.data));
        } catch (error) {
            notifyApiError(
                error,
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    };

    const setTopThree = (rankList: RankInfo[]) => {
        return rankList
            .slice(0, RANKING_CONFIG.TOP_THREE_COUNT)
            .sort(
                (a, b) =>
                    RANKING_CONFIG.TOP_THREE_ORDER.indexOf(a.rank) -
                    RANKING_CONFIG.TOP_THREE_ORDER.indexOf(b.rank)
            );
    };

    useEffect(() => {
        getUserRankList(RANKING_CONFIG.INITIAL_FETCH_COUNT);
    }, []);

    return (
        <div>
            <div className="text-center text-[1.3rem] font-bold mt-4 mb-5">
                Top Week's Ranking
            </div>
            <TopThree userTopThreeList={userTopThreeList} />
            <span className="flex justify-end text-[#b1aeae] mb-1 mr-6 text-xs">
                ※ 매주 일요일 초기화
            </span>
            <RankInfoList userRankList={userRankList} />
        </div>
    );
};

export default Ranking;
