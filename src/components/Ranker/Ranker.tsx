import { Icon } from "./Icon";

interface RankerProps {
    rank: number;
    nickname: string;
    solvedPlans: number;
}

export const Ranker = ({
  rank, nickname, solvedPlans
}: RankerProps) => {
  return (
    <div className="my-[50px] flex items-center justify-center text-black text-[18px] font-semibold">
      {rank <= 3 && <Icon rank={rank} />}
      <span className="mr-10">{rank}</span>
      <span className="mr-[200px]">{nickname}</span>
      <span>{solvedPlans}</span>
    </div>
  );
}