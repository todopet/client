import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { FC, useState } from "react";

interface TitleProps {
    children?: React.ReactNode;
    year: number;
    month: number;
    weekNumber: any;
}

// 오늘을 기준으로 연,월,일,요일을 구함
// day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDay();
const todayDate = today.getDate();
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

// 오늘을 기준으로 지난 일요일의 날짜객체를 얻음
// todayDate - todayDay를 하면 일요일의 날짜가 나오는데, 일요일이 0이기 때문. 일요일~토요일 0~6.
const lastSunday = new Date(todayYear, todayMonth, todayDate - todayDay);

export default function Week() {
    // baseDate를 지난 일요일로 설정, 화살표를 누를 때마다 일주일씩 변경되게 할 것
    const [baseDate, setBaseDate] = useState(lastSunday);
    const [month, setMonth] = useState(todayMonth + 1);
    const [weekNumber, setWeekNumber] = useState(getWeekNumber());

    const date: number[] = [];

    function getWeekDate() {
        console.log("현재 월: ", baseDate.getMonth() + 1);
        const lastDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
        ).getDate();

        const firstDate = baseDate.getDate();

        for (let i = 0; i < 7; ++i) {
            if (firstDate + i - 1 === lastDateOfMonth) {
                const rest = 7 - date.length;
                for (let i = 1; i <= rest; ++i) {
                    date.push(i);
                }
                break;
            }
            date.push(firstDate + i);
        }
        console.log(date);
    }
    getWeekDate();

    function getWeekNumber() {
        const firstDayOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            1
        ).getDay();

        const currentDate = baseDate.getDate(); // 20
        let weekCount = Math.ceil((currentDate + firstDayOfMonth) / 7); // 올림
        return weekCount;
    }


    // function isInvalidDate(date: Date) {
    //     return !date || typeof date !== "object" || !(date instanceof Date);
    // };

    // function getWeekOfData(date: Date) {
    //     if (isInvalidDate(date)) return {};
    //     const firstDate =
    //         date.getDay() === 0
    //             ? date
    //             : new Date(
    //                 date.getFullYear(),
    //                 date.getMonth(),
    //                 date.getDate() - date.getDay()
    //             );

    //     const lastDate = new Date(
    //         firstDate.getFullYear(),
    //         firstDate.getMonth(),
    //         firstDate.getDate() + 6
    //     );

    //     const startDayOfMonth = new Date(
    //         date.getFullYear(),
    //         date.getMonth()
    //     ).getDay();

    //     const weekOfMonth: any = Math.ceil((date.getDate() + startDayOfMonth) / 7);

    //     return {
    //         firstDate, // date 기준 일요일
    //         lastDate, // date 기준 토요일
    //         weekOfMonth // date 기준 주차 수 [1 ~ 6]
    //     };
    // };

    const Title: FC<TitleProps> = (props) => {
        return (
            <>
                {props.year}년 {props.month}월 {props.weekNumber}주차
            </>
        );
    }

    return (
        <Styles.WeekStyle>
            <Styles.TitleWrap>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(baseDate.setDate(baseDate.getDate() - 7))
                        );
                        // const { weekOfMonth } = getWeekOfData(baseDate);
                        setMonth(baseDate.getMonth());
                        setWeekNumber(getWeekNumber());
                    }}
                >
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    <Title
                        year={baseDate.getFullYear()}
                        month={month}
                        weekNumber={weekNumber}
                    />
                </Styles.Title>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(baseDate.setDate(baseDate.getDate() + 7))
                        );
                        // const { weekOfMonth } = getWeekOfData(baseDate);
                        setMonth(baseDate.getMonth() + 1);
                        setWeekNumber(getWeekNumber());
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
                    {date.map((date, i) => (
                        <Styles.Date key={i}>{date}</Styles.Date>
                    ))}
                </Styles.DateWrap>
            </div>
        </Styles.WeekStyle>
    );
}
