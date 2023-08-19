import styled from "styled-components";

export const Title = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin: 20px 0;
`;

export const TopThree = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    text-align: center;
    font-size: 10px;
    margin: 20px 0;
`;

export const GOLD_COLOR = "#ffd700";
export const SILVER_COLOR = "#c0c0c0";
export const BRONZE_COLOR = "#cd7f32";
export const CircleIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${(props) => props.color || "black"};
    margin: 30px;
`;

export const FirstPlaceIcon = styled(CircleIcon)`
    transform: scale(1.4);
    border-color: ${GOLD_COLOR};
`;

export const RankList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
        margin-bottom: 5px;
        margin-left: 50px;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;

        .rank {
            margin-right: 40px;
            color: #a3a5ab;
        }

        .nickname {
            margin-right: 200px;
        }

        .medal {
            margin-right: 30px;
        }
    }
`;

export const RankingContainer = styled.div`
    margin-bottom: 60px;
`;

export const RankInfoContainer = styled.div`
    position: relative;
    text-align: center;
`;

export const RankNumber = styled.span`
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
`;

export const RankNickname = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
`;
