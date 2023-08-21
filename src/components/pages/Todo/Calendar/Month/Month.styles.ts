import styled from "styled-components";

interface DateProps {
    isToday: boolean;
}

const MonthStyle = styled.div`
    width: 390px;
`;

const DayWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`;

const Day = styled.span`
    margin: 5px 13px;
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
    margin: 16px 10px 2px 10px;
`;

const Date = styled.div<DateProps>`
    width: 18px;
    height: 18px;
    border-radius: 9px;
    margin: 4px 10px 2px 10px;
    font-size: 14px;
    font-family: Pretendard;
    color: ${(props) => (props.isToday ? "white" : "black")};
    background-color: ${(props) => (props.isToday ? "black" : "")};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
