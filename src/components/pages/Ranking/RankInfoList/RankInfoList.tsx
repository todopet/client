import { RankInfo } from "@/@types/index";
import {
    RankList,
    UserRankInfo,
    Rank,
    NickName,
    CompletedTodo
} from "./RankInfoList.styles";
import { ReactComponent as GoldMedal } from "@/assets/icons/goldmedal.svg";
import { ReactComponent as SilverMedal } from "@/assets/icons/silvermedal.svg";
import { ReactComponent as BronzeMedal } from "@/assets/icons/bronzemedal.svg";

interface RankInfoProps {
    userRankList: RankInfo[];
}

const RankInfoList = ({ userRankList }: RankInfoProps) => {
    return (
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
    );
};

export default RankInfoList;
