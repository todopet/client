import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import { ReactComponent as DropdownSvg } from "@/assets/images/dropdownButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState } from "react";

const dayText = ["일", "월", "화", "수", "목", "금", "토"];
const date1 = [1, 2, 3, 4, 5, 6, 7];
const date2 = [1, 2, 3, 4, 5, 6, 7];
const date3 = [1, 2, 3, 4, 5, 6, 7];
const date4 = [1, 2, 3, 4, 5, 6, 7];
const date5 = [1, 2, 3, 4, 5, 6, 7];

export default function Month() {
    const today = new Date();
    const [currentDay, setCurrentDay] = useState(today.getDay());

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    const firstDayOfWeek = new Date(currentYear, currentMonth, currentDate - currentDay);

    return (
        <Styles.MonthStyle>
            <ArrowButton>
                <LeftSvg />
            </ArrowButton>
            <Styles.Title>
                {currentYear}년 {currentMonth}월
                <DropdownSvg width="10px" height="10px" />
            </Styles.Title>
            <ArrowButton>
                <RightSvg />
            </ArrowButton>
            <div>
                {dayText.map((day, i) => (
                    <Styles.Day>{day}</Styles.Day>
                ))}
            </div>
            <Styles.CellWrapper>
                {date1.map((day, i) => (
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date1.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
            <Styles.CellWrapper>
                {date2.map((day, i) => (
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date2.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
            <Styles.CellWrapper>
                {date3.map((day, i) => (
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date3.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
            <Styles.CellWrapper>
                {date4.map((day, i) => (
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date4.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
            <Styles.CellWrapper>
                {date5.map((day, i) => (
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date5.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
        </Styles.MonthStyle>
    );
}
