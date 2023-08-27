import styled from "styled-components";

interface DateProps {
    isToday: boolean;
    isClicked: boolean;
    id: number;
}

const MonthStyle = styled.div`
    width: 390px;
`;

const DayWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    margin-top: 20px;
`;

const Day = styled.span`
    margin: 0px 13px;
    font-size: 14px;
    font-family: Pretendard;
`;

const DateCellWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`;

const DateCell = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
`;

const Cell = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 3px;
    background-color: lightgray;
    margin: 10px 10px 2px 10px;
`;

const Date = styled.div<DateProps>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: 9px 10px 2px 10px;
    font-size: 14px;
    font-family: Pretendard;
    color: ${(props) =>
        props.isClicked ? "white" : props.isToday ? "white" : "black"};
    background-color: ${(props) =>
        props.isClicked ? "#556FE9" : props.isToday ? "black" : ""};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Title = styled.span`
    margin: 6px 24px 4px 26px;
    font-family: Pretendard;
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 28px;
`;

export {
    MonthStyle,
    Day,
    DateCellWrap,
    DayWrap,
    DateCell,
    Cell,
    Date,
    Title,
    TitleWrap
};
