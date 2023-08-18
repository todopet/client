import styled from "styled-components";

const WeekStyle = styled.div`
    width: 390px;
    height: 130px;
`;

const Day = styled.span`
    margin: 5px 17px;
    font-size: 14px;
    font-family: Pretendard;
`;

const Cell = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 3px;
    background-color: lightgray;
    margin: 4px 12px;
`;

const Date = styled.span`
    margin: 5px 17px;
    font-size: 14px;
    font-family: Pretendard;
`;

const Title = styled.span`
    margin: 4px 18px 4px 26px;
    font-family: Pretendard;
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DayWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`;

const CellWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`;

const DateWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`;

export {
    WeekStyle,
    Day,
    CellWrap,
    Cell,
    Date,
    Title,
    TitleWrap,
    DayWrap,
    DateWrap,
};
