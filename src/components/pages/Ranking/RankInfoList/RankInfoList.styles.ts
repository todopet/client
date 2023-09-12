import { styled } from "styled-components";
import goldMedal from "@/assets/icons/goldmedal.svg";
import silverMedal from "@/assets/icons/silvermedal.svg";
import bronzeMedal from "@/assets/icons/bronzemedal.svg";

export const RankList = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    padding: 0 24px;
`;
export const UserRankInfo = styled.div`
    /* margin-bottom: 5px; */
    /* margin-left: 50px; */
    /* font-family: Pretendard; */
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    display: flex;
    /* min-width: 5rem; */
    justify-content: space-around;
    align-items: center;
    height: 45px;
`;

export const Rank = styled.span`
    /* width: 24px; */
    width: auto;
    min-width: 3rem;
    text-align: center;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MedalImgWrapper = styled.div`
    width: auto;
    min-width: 3rem;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MedalImg = styled.div<{ ranking: number }>`
    background-image: url(${(props) =>
        props.ranking === 1
            ? goldMedal
            : props.ranking === 2
            ? silverMedal
            : bronzeMedal});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 1.5rem;
    height: 2rem;
    margin-top: 0.35rem;
`;

export const NickName = styled.span`
    text-align: center;
    width: 8rem;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Medal = styled.span`
    text-align: center;
`;

export const CompletedTodo = styled.span`
    width: auto;
    min-width: 3rem;
    text-align: right;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RankingContainer = styled.div``;
