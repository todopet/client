import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import React, { useState, FC, useContext, useEffect } from "react";
import { TodoContext } from "@/components/pages/Todo/TodoContext";

interface TitleProps {
    children?: React.ReactNode;
    year: number;
    month: number;
}

// 오늘을 기준으로 연,월,일,요일을 구함
// day=요일 dates=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();
const dayText = ["일", "월", "화", "수", "목", "금", "토"];
const firstDateOfMonth = new Date(todayYear, todayMonth, 1);

export default function Month() {
    const [baseDate, setBaseDate] = useState(firstDateOfMonth);
    const [month, setMonth] = useState(todayMonth + 1);
    const [clicked, setClicked] = useState(-1);

    // 한달의 날짜를 넣는 배열
    const dates: Date[] = [];
    const todoCountForCell: number[] = [];

    // Calendar로부터 전달받음
    const { updateDate, periodTodos } = useContext(TodoContext);

    function getMonthDate() {
        const firstDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            1
        );

        const lastDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
        );
        for (let i = 0; i < firstDateOfMonth.getDay(); ++i) {
            dates.push(new Date(9999, 11, 31));
        }
        for (let i = 0; i < lastDateOfMonth.getDate(); ++i) {
            dates.push(
                new Date(baseDate.getFullYear(), baseDate.getMonth(), 1 + i)
            );
        }

        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const start = formatDate(dates[baseDate.getDay()]);
        const end = formatDate(dates[dates.length - 1]);
        updateDate(start, end);
    }
    getMonthDate();
    // useEffect(() => { getMonthDate() }, [baseDate]);

    const handleDateCellClick = (idx: number) => {
        setClicked(idx ?? -1);
    };

    return (
        <Styles.MonthStyle>
            <Styles.TitleWrap>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(
                                baseDate.getFullYear(),
                                baseDate.getMonth() - 1,
                                1
                            )
                        );
                        setMonth(baseDate.getMonth() + 1);
                    }}
                >
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    {baseDate.getFullYear()}년 {baseDate.getMonth() + 1}월
                </Styles.Title>
                <ArrowButton
                    onClick={() => {
                        setBaseDate(
                            new Date(
                                baseDate.getFullYear(),
                                baseDate.getMonth() + 1,
                                1
                            )
                        );
                        setMonth(baseDate.getMonth() + 1);
                    }}
                >
                    <RightSvg />
                </ArrowButton>
            </Styles.TitleWrap>
            <Styles.DayWrap>
                {dayText.map((day, i) => (
                    <Styles.Day>{day}</Styles.Day>
                ))}
            </Styles.DayWrap>
            <Styles.DateCellWrap>
                {dates.map((date, i) =>
                    date.getFullYear() === 9999 ? (
                        <Styles.DateCell></Styles.DateCell>
                    ) : (
                        <Styles.DateCell onClick={() => handleDateCellClick(i)}>
                            <Styles.Cell />
                            <Styles.Date
                                id={i}
                                isToday={
                                    date.getFullYear() === todayYear &&
                                    date.getMonth() === todayMonth &&
                                    date.getDate() === today.getDate()
                                }
                                isClicked={clicked === i}
                                data-date={date.toISOString()}
                            >
                                {date.getDate()}
                            </Styles.Date>
                        </Styles.DateCell>
                    )
                )}
            </Styles.DateCellWrap>
        </Styles.MonthStyle>
    );
}
