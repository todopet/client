import { RankInfo } from "@/@types/index";
import { ReactComponent as GoldMedal } from "@/assets/icons/goldmedal.svg";
import { ReactComponent as SilverMedal } from "@/assets/icons/silvermedal.svg";
import { ReactComponent as BronzeMedal } from "@/assets/icons/bronzemedal.svg";
import Divider from "@/components/Divider/Divider";
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
                                {list.rank === 1 && <GoldMedal />}
                                {list.rank === 2 && <SilverMedal />}
                                {list.rank === 3 && <BronzeMedal />}
                            </div>
                        ) : (
                            <span className="min-w-[3rem] text-center h-full flex items-center justify-center">{list.rank}</span>
                        )}
                        <span className="text-center w-32 h-full flex items-center justify-center">{list.userInfo?.nickname}</span>
                        <span className="min-w-[3rem] text-right h-full flex items-center justify-center">{list.count}</span>
                    </div>
                    <Divider category={() => ""} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default RankInfoList;
