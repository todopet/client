import React from "react";
import {
    StyledRanker,
    RankLabel,
    NicknameText,
    SolvedPlansText
} from "./Ranker.styles";
import Icon from "./Icon";
import Label from "./Label";
import Text from "./Text";

interface RankerProps {
    rank: number;
    nickname: string;
    solvedPlans: number;
}

export default function Ranker({ rank, nickname, solvedPlans }: RankerProps) {
    return (
        <StyledRanker>
            {rank <= 3 && <Icon rank={rank} />}
            <RankLabel>{rank}</RankLabel>
            <NicknameText>{nickname}</NicknameText>
            <SolvedPlansText>{solvedPlans}</SolvedPlansText>
        </StyledRanker>
    );
}
