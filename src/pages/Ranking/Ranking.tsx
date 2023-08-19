import React, { useState } from "react";
import Ranker from "./Ranker";
import {
    TopThree,
    CircleIcon,
    RankList,
    Title,
    FirstPlaceIcon,
    RankingContainer,
    GOLD_COLOR,
    SILVER_COLOR,
    BRONZE_COLOR,
    RankInfoContainer,
    RankNumber,
    RankNickname
} from "./Ranking.styles";
import Divider from "@/components/Divider/Divider";
import { ReactComponent as GoldMedal } from "@/assets/images/goldmedal.svg";
import { ReactComponent as SilverMedal } from "@/assets/images/silvermedal.svg";
import { ReactComponent as BronzeMedal } from "@/assets/images/bronzemedal.svg";

interface User {
    id: number;
    rank: number;
    nickname: string;
    solvedPlans: number;
    imageUrl?: string;
}

interface UserProfile {
    id: string;
    nickname: string;
    imageUrl: string;
}

interface GoogleUser {
    getBasicProfile: () => {
        getId: () => string;
        getName: () => string;
        getImageUrl: () => string;
    };
}

interface DividerProps {
    category?: string;
}

const userList: User[] = [
    { id: 1, rank: 1, nickname: "user A", solvedPlans: 100 },
    { id: 2, rank: 2, nickname: "user B", solvedPlans: 80 },
    { id: 3, rank: 3, nickname: "user C", solvedPlans: 70 },
    { id: 4, rank: 4, nickname: "user D", solvedPlans: 60 },
    { id: 5, rank: 5, nickname: "user E", solvedPlans: 50 },
    { id: 6, rank: 6, nickname: "user F", solvedPlans: 40 },
    { id: 7, rank: 7, nickname: "user G", solvedPlans: 30 },
    { id: 8, rank: 8, nickname: "user H", solvedPlans: 20 },
    { id: 9, rank: 9, nickname: "user I", solvedPlans: 10 },
    { id: 10, rank: 10, nickname: "user J", solvedPlans: 5 }
];

const Ranking: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const topThreeOrder = [2, 1, 3];
    const sortedTopThree = userList
        .slice(0, 3)
        .sort(
            (a, b) =>
                topThreeOrder.indexOf(a.rank) - topThreeOrder.indexOf(b.rank)
        );

    function onSignIn(googleUser: GoogleUser) {
        const profile = googleUser.getBasicProfile();
        const userData: UserProfile = {
            id: profile.getId(),
            nickname: profile.getName(),
            imageUrl: profile.getImageUrl()
        };
        setUserProfile(userData);
    }

    return (
        <RankingContainer>
            <Title>Top Ranking</Title>
            <TopThree>
                {sortedTopThree.map((user) => {
                    let borderColor = "black";
                    if (user.rank === 1) {
                        borderColor = GOLD_COLOR;
                    } else if (user.rank === 2) {
                        borderColor = SILVER_COLOR;
                    } else if (user.rank === 3) {
                        borderColor = BRONZE_COLOR;
                    }

                    const IconComponent =
                        user.rank === 1 ? FirstPlaceIcon : CircleIcon;
                    return (
                        <RankInfoContainer key={user.id}>
                            <RankNumber>{user.rank}</RankNumber>
                            <IconComponent color={borderColor}>
                                <img
                                    src={userProfile?.imageUrl}
                                    alt={userProfile?.nickname}
                                />
                            </IconComponent>
                            <RankNickname>{user.nickname}</RankNickname>
                        </RankInfoContainer>
                    );
                })}
            </TopThree>

            <RankList>
                {userList.map((user, index) => (
                    <div key={user.id}>
                        {user.rank === 1 ? (
                            <GoldMedal className="medal" />
                        ) : user.rank === 2 ? (
                            <SilverMedal className="medal" />
                        ) : user.rank === 3 ? (
                            <BronzeMedal className="medal" />
                        ) : (
                            <span className="rank">{user.rank}</span>
                        )}
                        <span className="nickname">{user.nickname}</span>
                        <span>{user.solvedPlans}</span>
                    </div>
                ))}
            </RankList>
        </RankingContainer>
    );
};

export default Ranking;
