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
    <div className="my-[50px] flex items-center justify-center text-black text-[18px] font-semibold">
      {rank <= 3 && <Icon rank={rank} />}
      <span className="mr-10">{rank}</span>
      <span className="mr-[200px]">{nickname}</span>
      <span>{solvedPlans}</span>
    </div>
  );
}
