import styled from "styled-components";

export const Title = styled.div`
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 20px 0;
`;

export const TopThree = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    min-height: 10rem;
`;

export const GOLD_COLOR = "#ffd700";
export const SILVER_COLOR = "#c0c0c0";
export const BRONZE_COLOR = "#cd7f32";
export const CircleIcon = styled.div`
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${(props) => props.color || "black"};
`;

export const FirstPlaceIcon = styled(CircleIcon)`
    transform: scale(1.4);
    border-color: ${GOLD_COLOR};
`;

export const RankList = styled.table`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
`;
export const UserRankInfo = styled.tr`
    /* margin-bottom: 5px; */
    /* margin-left: 50px; */
    /* font-family: Pretendard; */
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    display: flex;
    width: 100vw;
    justify-content: space-around;
    align-items: center;
    height: 45px;
`;

export const Rank = styled.td`
    /* width: 24px; */
    width: auto;
    height: 32px;
    text-align: center;
`;

export const NickName = styled.td`
    text-align: center;
`;

export const Medal = styled.td`
    text-align: center;
`;

export const CompletedTodo = styled.td`
    width: auto;
    /* width: 3rem; */
    /* margin-left: 1rem; */
    text-align: right;
`;

export const RankingContainer = styled.div``;

export const RankInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: auto;
    height: auto;
    justify-content: space-between;
`;

export const RankNumber = styled.span`
    font-size: 18px;
    font-weight: bold;
    /* margin-bottom: 2rem; */
`;

export const RankNickname = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 600;
    /* margin-top: 2rem; */
`;
