import { RankInfo } from "@/@types/index";
import {
    RankList,
    UserRankInfo,
    Rank,
    MedalImgWrapper,
    MedalImg,
    NickName,
    CompletedTodo
} from "./RankInfoList.styles";
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
        <RankList>
            <Divider key={0} category={() => ""}></Divider>
            {userRankList.map((list, index) => (
                <React.Fragment key={`fragment${index}`}>
                    <UserRankInfo>
                        {list.rank <= 3 ? (
                            // <>{medal[list.rank]()}</>
                            <MedalImgWrapper><MedalImg ranking={list.rank} /></MedalImgWrapper>
                        ) : (
                            <Rank>{list.rank}</Rank>
                        )}
                        <NickName>{list.userInfo?.nickname}</NickName>
                        <CompletedTodo>{list.count}</CompletedTodo>
                    </UserRankInfo>
                    <Divider category={() => ""}></Divider>
                </React.Fragment>
            ))}
        </RankList>
    );
};

export default RankInfoList;
