import styled from "styled-components";

export const Title = styled.div`
    text-align: center;
    font-size: 24px;
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

export const CircleIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    margin: 30px;
`;

export const FirstPlaceIcon = styled(CircleIcon)`
    transform: scale(1.4);
`;

export const RankList = styled.div``;
