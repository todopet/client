import {
    TopThreeContainer,
    RankInfoContainer,
    RankNumber,
    CircleIcon,
    FirstPlaceIcon,
    Crown,
    RankNickname,
    ProfileImage,
    GOLD_COLOR,
    SILVER_COLOR,
    BRONZE_COLOR
} from "./TopThree.styles";

import { RankInfo } from "@/@types/index";

interface RankInfoProps {
    userTopThreeList: RankInfo[];
}

const TopThree = ({ userTopThreeList }: RankInfoProps) => {
    return (
        <TopThreeContainer>
            {userTopThreeList.map((list) => {
                let borderColor = "black";
                if (list.rank === 1) {
                    borderColor = GOLD_COLOR;
                } else if (list.rank === 2) {
                    borderColor = SILVER_COLOR;
                } else if (list.rank === 3) {
                    borderColor = BRONZE_COLOR;
                }

                const IconComponent =
                    list.rank === 1 ? FirstPlaceIcon : CircleIcon;
                return (
                    <RankInfoContainer key={list.userInfo._id}>
                        <RankNumber>{list.rank}</RankNumber>
                        <IconComponent color={borderColor}>
                            {list.rank === 1 && <Crown />}
                            <ProfileImage
                                src={list.userInfo.picture}
                                alt={list.userInfo.nickname}
                            />
                        </IconComponent>
                        <RankNickname>{list.userInfo.nickname}</RankNickname>
                    </RankInfoContainer>
                );
            })}
        </TopThreeContainer>
    );
};

export default TopThree;
