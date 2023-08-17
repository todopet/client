import styled from "styled-components";

const WeekStyle = styled.div`
    width: 390px;
    height: 130px;
`;

const Day = styled.span`
    margin: 5px 13px;
    font-size: 14px;
`;

const CellWrapper = styled.div`
    display: flex;
`;

const Cell = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 3px;
    background-color: lightgray;
    margin: 4px 10px;
`;

const Date = styled.span`
    margin: 5px 17px;
    font-size: 14px;
`;

const Title = styled.span`
    margin: 4px 20px;
`;

export { WeekStyle, Day, CellWrapper, Cell, Date, Title };
