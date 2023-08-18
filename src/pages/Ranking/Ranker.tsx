import React from "react";
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
        <div className="ranker">
            {rank <= 3 && <Icon rank={rank} />}
            <Label>{rank}</Label>
            <Text>{nickname}</Text>
            <Text>{solvedPlans}</Text>
        </div>
    );
}
