import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState } from "react";

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDay();
const todayDate = today.getDate();

export default function Week() {
    const dayText = ["일", "월", "화", "수", "목", "금", "토"];

    // 오늘을 기준으로 연,월,일,요일을 구함
    // day=요일 date=날짜

    // 오늘을 기준으로 지난 일요일의 날짜객체를 얻음
    // todayDate - todayDay를 하면 일요일의 날짜가 나오는데, 일요일이 0이기 때문. 일요일~토요일 0~6.
    const lastSunday = new Date(todayYear, todayMonth, todayDate - todayDay);

    // baseDate를 지난 일요일로 설정, 화살표를 누를 때마다 일주일씩 변경되게 할 것
    const [baseDate, setBaseDate] = useState(lastSunday);

    // 몇주차인지 구하는 함수
    function getWeekNumber() {
        const firstDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            1
        ); // 월의 1일의 날짜객체
        const firstDayOfMonth = firstDateOfMonth.getDay(); // 월의 1일의 요일

        let weekCount = 0;
        // 1일이 0 1 2 3(일월화수)이면 1주차부터, 4 5 6 (목금토)이면 0주차부터 카운트
        if (firstDayOfMonth < 4) weekCount = 1;

        let base = lastSunday.getDate();

        while (base > 0) {
            base -= 7;
            ++weekCount;
        }
        return weekCount;
    }

    // 일주일 날짜를 담는 배열 weekDate
    // 버튼을 누를 때마다 baseDate를 변경해서 7개씩 불러옴
    const weekDate: number[] = [];

    // ======================================================================================================================

    function getWeekDate() {
        const lastDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
        ).getDate();

        console.log(
            `기준일: ${baseDate.getMonth() + 1}월 ${baseDate.getDate()}일`
        );
        console.log(`현재 월 마지막 날짜: ${lastDateOfMonth}`);
        console.log("-------------");

        const firstDate = baseDate.getDate();

        for (let i = 0; i < 7; ++i) {
            if (firstDate + i - 1 === lastDateOfMonth) {
                const rest = 7 - weekDate.length;
                for (let i = 1; i <= rest; ++i) {
                    weekDate.push(i);
                }
                break;
            }
            weekDate.push(firstDate + i);
        }
    }
    getWeekDate();

    return (
        <Styles.WeekStyle>
            <Styles.TitleWrap>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(baseDate.setDate(baseDate.getDate() - 7))
                        );
                        getWeekDate();
                    }}
                >
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    {baseDate.getFullYear()}년 {baseDate.getMonth() + 1}월{" "}
                    {getWeekNumber()}주차
                </Styles.Title>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(baseDate.setDate(baseDate.getDate() + 7))
                        );
                        getWeekDate();
                    }}
                >
                    <RightSvg />
                </ArrowButton>
            </Styles.TitleWrap>
            <div>
                <Styles.DayWrap>
                    {dayText.map((day, i) => (
                        <Styles.Day key={i}>{day}</Styles.Day>
                    ))}
                </Styles.DayWrap>
                <Styles.CellWrap>
                    {dayText.map((day, i) => (
                        <Styles.Cell key={i} />
                    ))}
                </Styles.CellWrap>
                <Styles.DateWrap>
                    {weekDate.map((date, i) => (
                        <Styles.Date key={i}>{date}</Styles.Date>
                    ))}
                </Styles.DateWrap>
            </div>
        </Styles.WeekStyle>
    );
}
