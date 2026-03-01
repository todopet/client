import { RankInfo } from "@/@types";
import { GoldMedal, SilverMedal, BronzeMedal } from "@/modules/icons";
import { Divider } from "@/components/Divider";
import React from "react";

interface RankInfoProps {
  userRankList: RankInfo[];
}

export const RankInfoList = ({ userRankList }: RankInfoProps) => {
  return (
    <div className="px-6" role="table" aria-label="주간 랭킹 표">
      <div className="text-xs font-semibold flex justify-around items-center h-[30px]" role="row">
        <span className="min-w-[3rem] text-center" role="columnheader">순위</span>
        <span className="w-32 text-center" role="columnheader">닉네임</span>
        <span className="min-w-[3rem] text-right" role="columnheader">점수</span>
      </div>
      <Divider key={0} category={() => ""} />
      {userRankList.map((list, index) => (
        <React.Fragment key={`fragment${index}`}>
          <div className="text-base font-semibold flex justify-around items-center h-[45px]" role="row">
            {list.rank <= 3 ? (
              <div className="min-w-[3rem] h-full flex items-center justify-center" role="cell" aria-label={`${list.rank}위`}>
                {list.rank === 1 && <img src={GoldMedal} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
                {list.rank === 2 && <img src={SilverMedal} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
                {list.rank === 3 && <img src={BronzeMedal} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
              </div>
            ) : (
              <span className="min-w-[3rem] text-center h-full flex items-center justify-center" role="cell">
                {list.rank}
              </span>
            )}
            <span className="text-center w-32 h-full flex items-center justify-center" role="cell">
              {list.userInfo?.nickname}
            </span>
            <span className="min-w-[3rem] text-right h-full flex items-center justify-center" role="cell">
              {list.count}
            </span>
          </div>
          <Divider category={() => ""} />
        </React.Fragment>
      ))}
    </div>
  );
};
