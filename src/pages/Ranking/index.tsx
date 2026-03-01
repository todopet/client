import React, { useEffect } from "react";
import { RankInfo } from "@/@types";
import { TopThree } from "@/components/pages/Ranking/TopThree";
import { RankInfoList } from "@/components/pages/Ranking/RankInfoList";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { RANKING_CONFIG } from "@/libs/constants";
import { useRankingQuery } from "@/hooks/queries/useUserQuery";
import { SEO } from "@/components/SEO";

const Ranking: React.FC = () => {
  const { data: userRankList = [], error } = useRankingQuery(
    RANKING_CONFIG.INITIAL_FETCH_COUNT
  );

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
    if (error) {
      notifyApiError(error, "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }, [error]);

  return (
    <main aria-label="랭킹 페이지">
      <SEO
        title="랭킹"
        description="주간 랭킹을 확인하고 다른 유저와 함께 성장해보세요."
        url="/rank"
      />
      <h1 className="text-center text-[1.3rem] font-bold mt-4 mb-5">Top Week&apos;s Ranking</h1>
      <section aria-label="상위 3위">
        <TopThree userTopThreeList={setTopThree(userRankList)} />
      </section>
      <span className="flex justify-end text-[#b1aeae] mb-1 mr-6 text-xs" aria-label="랭킹 안내">
        ※ 매주 일요일 초기화
      </span>
      <section aria-label="전체 랭킹 목록">
        <RankInfoList userRankList={userRankList} />
      </section>
    </main>
  );
};

export default Ranking;
