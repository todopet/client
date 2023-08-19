import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import { ReactComponent as DropdownSvg } from "@/assets/images/dropdownButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState } from "react";

// 오늘을 기준으로 연,월,일,요일을 구함
// day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDay();     // 요일 기준으로 몇번째 칸부터 그릴지 결정
const dayText = ["일", "월", "화", "수", "목", "금", "토"];
const firstDateOfMonth = new Date(todayYear, todayMonth, 1);

// 1일~말일까지의 날짜를 넣을 숫자 배열
const date: number[] = [];

export default function Month() {
    const [baseDate, setBaseDate] = useState(firstDateOfMonth);

    function getDate() {
        const lastDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
        ).getDate();
        
        for (let i = 1; i <= lastDateOfMonth; ++i) {
            date.push(i);
        }
        console.log(date)
    }
    getDate();

    return (
        <Styles.MonthStyle>
            <ArrowButton>
                <LeftSvg />
            </ArrowButton>
            <Styles.Title>
                {baseDate.getFullYear()}년 {baseDate.getMonth() + 1}월
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
            <Styles.DateCellWrap>
                {date.map((date, i) => (
                    <Styles.DateCell>
                        <Styles.Cell></Styles.Cell>
                        <Styles.Date>{date}</Styles.Date>
                    </Styles.DateCell>
                ))}
            </Styles.DateCellWrap>
        </Styles.MonthStyle>
    );
}
