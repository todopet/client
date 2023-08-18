import React from "react";
import Ranker from "./Ranker";
import {
    TopThree,
    CircleIcon,
    RankList,
    Title,
    FirstPlaceIcon
} from "./Ranking.styles";

const userList = [
    { id: 1, rank: 1, nickname: "userA", solvedPlans: 100 },
    { id: 2, rank: 2, nickname: "userB", solvedPlans: 80 },
    { id: 3, rank: 3, nickname: "userC", solvedPlans: 70 }
];

// 2, 1, 3 순서로 정렬
const topThreeOrder = [2, 1, 3];
const sortedTopThree = userList
    .slice(0, 3)
    .sort(
        (a, b) => topThreeOrder.indexOf(a.rank) - topThreeOrder.indexOf(b.rank)
    );

export default function Ranking() {
    return (
        <div>
            <Title>Top Ranking</Title>

            <TopThree>
                {sortedTopThree.map((user) => {
                    const IconComponent =
                        user.rank === 1 ? FirstPlaceIcon : CircleIcon;
                    return (
                        <IconComponent key={user.id}>
                            <Ranker {...user} />
                        </IconComponent>
                    );
                })}
            </TopThree>

            <RankList>
                {userList.slice(3).map((user) => (
                    <Ranker {...user} key={user.id} />
                ))}
            </RankList>
        </div>
    );
}
