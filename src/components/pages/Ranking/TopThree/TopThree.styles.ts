import { styled } from "styled-components";
// import { ReactComponent as King } from "@/assets/icons/owner.svg";
import crown from "@/assets/icons/owner.svg";

export const GOLD_COLOR = "#ffd700";
export const SILVER_COLOR = "#c0c0c0";
export const BRONZE_COLOR = "#cd7f32";

export const TopThreeContainer = styled.div`
    display: flex;
    justify-content: space-around;
    min-height: 11rem;
`;

export const RankInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 25%;
    height: auto;
    align-items: center;
`;

export const RankNumber = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 32px;
`;

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
    position: relative;
`;

export const Crown = styled.div`
    background-image: url(${crown});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 1.5rem;
    height: 1.3rem;
    position: absolute;
    top: -1rem;
`;

export const ProfileImage = styled.img`
    height: inherit;
    width: inherit;
    border-radius: inherit;
`;

export const RankNickname = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-top: 20px;
`;
