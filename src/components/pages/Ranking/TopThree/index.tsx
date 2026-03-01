import { crown } from "@/modules/icons";
export const GOLD_COLOR = "#ffd700";
export const SILVER_COLOR = "#c0c0c0";
export const BRONZE_COLOR = "#cd7f32";

import { RankInfo } from "@/@types/index";

interface RankInfoProps {
    userTopThreeList: RankInfo[];
}

export const TopThree = ({ userTopThreeList }: RankInfoProps) => {
  return (
    <ol className="flex justify-around min-h-[11rem] list-none p-0 m-0">
      {userTopThreeList.map((list) => {
        let borderColor = "black";
        if (list.rank === 1) borderColor = GOLD_COLOR;
        else if (list.rank === 2) borderColor = SILVER_COLOR;
        else if (list.rank === 3) borderColor = BRONZE_COLOR;

        const isFirst = list.rank === 1;
        return (
          <li
            key={list.userInfo._id}
            className="flex flex-col text-center w-1/3 h-auto items-center"
            aria-label={`${list.rank}위 ${list.userInfo.nickname}`}
          >
            <span className="text-[18px] font-bold mb-8">{list.rank}</span>
            <div
              className={[
                "w-[3.6rem] h-[3.6rem] rounded-full flex items-center justify-center border-2 relative",
                isFirst ? "scale-[1.4]" : "",
              ].join(" ")}
              style={{ borderColor }}
            >
              {isFirst && (
                <div
                  className="bg-no-repeat bg-center bg-cover w-6 h-5 absolute -top-4"
                  style={{ backgroundImage: `url(${crown})` }}
                  aria-hidden="true"
                />
              )}
              <img
                src={list.userInfo.picture}
                alt={list.userInfo.nickname}
                className="w-full h-full rounded-full"
              />
            </div>
            <span className="block text-[14px] font-semibold mt-5">{list.userInfo.nickname}</span>
          </li>
        );
      })}
    </ol>
  );
};
