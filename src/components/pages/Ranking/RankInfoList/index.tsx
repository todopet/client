import { RankInfo } from "@/@types";
import { GoldMedal, SilverMedal, BronzeMedal } from "@/modules/icons";
import { Divider } from "@/components/Divider";
import React from "react";

interface RankInfoProps {
  userRankList: RankInfo[];
}

// interface Medals {
//     [key: number]: () => JSX.Element | number;
// }

const RankInfoList = ({ userRankList }: RankInfoProps) => {
  // const medal: Medals = {
  //     1: () => (
  //         <Rank>
  //             <GoldMedal />
  //         </Rank>
  //     ),
  //     2: () => (
  //         <Rank>
  //             <SilverMedal />
  //         </Rank>
  //     ),
  //     3: () => (
  //         <Rank>
  //             <BronzeMedal />
  //         </Rank>
  //     )
  // };
  return (
    <div className="px-6">
      <Divider key={0} category={() => ""} />
      {userRankList.map((list, index) => (
        <React.Fragment key={`fragment${index}`}>
          <div className="text-base font-semibold flex justify-around items-center h-[45px]">
            {list.rank <= 3 ? (
              <div className="min-w-[3rem] h-full flex items-center justify-center">
                {list.rank === 1 && <img src={GoldMedal} alt="gold" />}
                {list.rank === 2 && <img src={SilverMedal} alt="silver" />}
                {list.rank === 3 && <img src={BronzeMedal} alt="bronze" />}
              </div>
            ) : (
              <span className="min-w-[3rem] text-center h-full flex items-center justify-center">
                {list.rank}
              </span>
            )}
            <span className="text-center w-32 h-full flex items-center justify-center">
              {list.userInfo?.nickname}
            </span>
            <span className="min-w-[3rem] text-right h-full flex items-center justify-center">
              {list.count}
            </span>
          </div>
          <Divider category={() => ""} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RankInfoList;