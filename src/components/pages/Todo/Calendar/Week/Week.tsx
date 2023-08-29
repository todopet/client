import React, { useState, useContext, useEffect } from "react";
import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { TodoContext } from "@/components/pages/Todo/TodoContext";

// 오늘의 연,월,일,요일 구하기. day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDay();
const todayDate = today.getDate();
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

// 오늘을 기준으로 지난 일요일의 날짜 객체를 얻음
// todayDate - todayDay를 하면 일요일의 날짜가 나오는데, 일요일이 0이기 때문. 일요일~토요일 0~6.
const lastSunday = new Date(todayYear, todayMonth, todayDate - todayDay);
let isFirstDateIncluded = false;
let specialCaseOfYearEnd = false;

export default function Week() {
    const [currentSunday, setCurrentSunday] = useState(lastSunday);
    const [titleData, setTitleData] = useState({
        year: currentSunday.getFullYear(),
        month: currentSunday.getMonth(),
        weekCount: calculateWeekCount()
    });
    const [clicked, setClicked] = useState(-1);

    const dates: Date[] = []; // 일주일의 날짜를 넣는 배열
    const completedTodosByDay: number[] = [];
    const { updateSelectedDate, getTodos, periodTodos } =
        useContext(TodoContext);

    // 날짜 형식 yyyy-mm-dd 지정 함수
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getWeekDates = () => {
        for (let i = 0; i < 7; ++i) {
            const d = new Date(
                currentSunday.getFullYear(),
                currentSunday.getMonth(),
                currentSunday.getDate() + i
            );
            dates.push(d);
        }

        // 예외처리를 위한 boolean 변수 2개
        isFirstDateIncluded = false;
        specialCaseOfYearEnd = false;

        // 현재 주에 1일이 포함되었는지 확인
        isFirstDateIncluded = dates.map((date) => date.getDate()).includes(1);
        if (dates[0].getDate() === 1) {
            // 1일이 일요일인 경우의 예외처리
            isFirstDateIncluded = false;
        }

        // 매해 12월에서 1월로 넘어가는 부분의 월&주차 오류 처리
        if (currentSunday.getMonth() === 11) {
            if (dates.map((date, i) => date.getDate()).includes(31)) {
                if (dates[6].getDate() !== 31) {
                    specialCaseOfYearEnd = true;
                }
            }
        }
        console.log("getWeekDates");
    };

    const countDates = () => {
        const todoDates: number[] = [];
        periodTodos?.forEach((category: any) =>
            category.todos.forEach((todo: any) => {
                const newDate = new Date(todo.createdAt);
                if (todo.status === "completed")
                    todoDates.push(newDate.getDay());
            })
        );

        for (let i = 0; i < 7; ++i) {
            let count = 0;
            for (let j = 0; j < todoDates.length; ++j) {
                if (todoDates[j] === i) {
                    ++count;
                }
            }
            completedTodosByDay.push(count);
        }
        console.log("countDates");
    };
    getWeekDates();
    countDates();
    const start = formatDate(dates[0]);
    const end = formatDate(dates[6]);

    useEffect(() => {
        getTodos(start, end);
    }, [currentSunday, completedTodosByDay]);

    function calculateWeekCount() {
        const firstDayOfMonth = new Date(
            currentSunday.getFullYear(),
            currentSunday.getMonth(),
            1
        ).getDay();

        const currentDate = currentSunday.getDate();
        const weekCount = Math.ceil((currentDate + firstDayOfMonth) / 7);
        return weekCount;
    }

    const calculateMonth = () => {
        if (specialCaseOfYearEnd && isFirstDateIncluded) {
            return 0;
        } else if (isFirstDateIncluded) {
            return currentSunday.getMonth() + 1;
        } else {
            return currentSunday.getMonth();
        }
    };

    const handleLeftClick = () => {
        setCurrentSunday(
            new Date(currentSunday.setDate(currentSunday.getDate() - 7))
        );
        setTimeout(() => {
            setTitleData({
                year: specialCaseOfYearEnd
                    ? currentSunday.getFullYear() + 1
                    : currentSunday.getFullYear(),
                month: calculateMonth(),
                weekCount: isFirstDateIncluded ? 1 : calculateWeekCount()
            });
        }, 0);
    };

    const handleRightClick = () => {
        setCurrentSunday(
            new Date(currentSunday.setDate(currentSunday.getDate() + 7))
        );
        setTimeout(() => {
            setTitleData({
                year: specialCaseOfYearEnd
                    ? currentSunday.getFullYear() + 1
                    : currentSunday.getFullYear(),
                month: calculateMonth(),
                weekCount: isFirstDateIncluded ? 1 : calculateWeekCount()
            });
        }, 0);
    };

    const handleDateCellClick = (idx: number) => {
        setClicked(idx ?? -1);
        updateSelectedDate(formatDate(dates[idx]));
    };

    return (
        <Styles.WeekStyle>
            <Styles.TitleWrap>
                <ArrowButton onClick={handleLeftClick}>
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    {titleData.year}년 {titleData.month + 1}월{" "}
                    {titleData.weekCount}주차
                </Styles.Title>
                <ArrowButton onClick={handleRightClick}>
                    <RightSvg />
                </ArrowButton>
            </Styles.TitleWrap>
            <div>
                <Styles.DayWrap>
                    {dayText.map((day, i) => (
                        <Styles.Day key={i}>{day}</Styles.Day>
                    ))}
                </Styles.DayWrap>
                <Styles.DateCellWrap>
                    {dates.map((date, i) => (
                        <Styles.DateCell
                            key={i}
                            onClick={() => handleDateCellClick(i)}
                        >
                            <Styles.Cell completed={completedTodosByDay[i]} />
                            <Styles.Date
                                id={i}
                                isToday={
                                    date.getFullYear() === todayYear &&
                                    date.getMonth() === todayMonth &&
                                    date.getDate() === today.getDate()
                                }
                                isClicked={clicked === i}
                                data-date={date}
                            >
                                {date.getDate()}
                            </Styles.Date>
                        </Styles.DateCell>
                    ))}
                </Styles.DateCellWrap>
            </div>
        </Styles.WeekStyle>
    );
}
