import styled from "styled-components";

interface CellProps {
    completed: number;
}

interface DateProps {
    $istoday: boolean;
    $isclicked: boolean;
    id: number;
}

const WeekStyle = styled.div`
    width: 380px;
    margin-left: 4px;
`;

const Title = styled.span`
    margin: 0px 30px 0px 30px;
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
    margin-top: 20px;
    margin-bottom: 2px;
`;

const Day = styled.span`
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

const Cell = styled.div<CellProps>`
    width: 22px;
    height: 22px;
    border-radius: 3px;
    margin: 10px 10px 2px 10px;
    background-color: ${(props) =>
        props.completed === 0
            ? "#e9e9e9"
            : props.completed <= 2
            ? "#cff1cf"
            : props.completed <= 4
            ? "#a7eba6"
            : props.completed <= 6
            ? "#70d66a"
            : props.completed <= 8
            ? "#41b13f"
            : props.completed <= 10
            ? "#1d861c"
            : props.completed >= 11
            ? "#046900"
            : "white"};
`;

const Date = styled.div<DateProps>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: 9px 10px 2px 10px;
    font-size: 14px;
    font-family: Pretendard;
    color: ${(props) =>
        props.$isclicked ? "white" : props.$istoday ? "white" : "black"};
    background-color: ${(props) =>
        props.$isclicked ? "#556FE9" : props.$istoday ? "black" : ""};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export {
    WeekStyle,
    Day,
    DateCell,
    Cell,
    Date,
    Title,
    TitleWrap,
    DayWrap,
    DateCellWrap,
};
