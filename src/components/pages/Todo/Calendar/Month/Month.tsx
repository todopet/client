import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState, useEffect, useMemo } from "react";
import useTodosStore from "@/store/todo";
import { formatDateToString } from "@/libs/utils/global";

// 오늘의 연,월,일,요일 구하기. day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

export default function Month() {
    const [firstDate, setFirstDate] = useState(firstDateOfThisMonth);
    const [clicked, setClicked] = useState(-1);
    const [datesOfMonth, setDatesOfMonth] = useState<Date[]>([]);

    const { setSelectedDate, setStartEndDate, periodTodos, setTodos } =
        useTodosStore((state) => state);

    function getMonthDates(firstDate: Date) {
        const newDates = [];
        const firstDateOfMonth = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            1
        );
        const lastDateOfMonth = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth() + 1,
            0
        );

        for (let i = 0; i < firstDateOfMonth.getDay(); ++i) {
            newDates.push(new Date(9999, 11, 31));
        }
        for (let i = 0; i < lastDateOfMonth.getDate(); ++i) {
            newDates.push(
                new Date(firstDate.getFullYear(), firstDate.getMonth(), 1 + i)
            );
        }
        setDatesOfMonth(newDates);
        fetchData(newDates, firstDate);
    }

    const fetchData = (newDates: Date[], firstDate: Date) => {
        const start = formatDateToString(newDates[firstDate.getDay()]);
        const end = formatDateToString(newDates[newDates.length - 1]);
        setStartEndDate(start, end);
        setTodos(start, end);
    };

    const completedTodosByDay = useMemo(() => {
        const todoDates: number[] = [];
        periodTodos?.forEach((category: any) =>
            category.todos.forEach((todo: any) => {
                const newDate = new Date(todo.todoDate);
                if (todo.status === "completed")
                    todoDates.push(newDate.getDate());
            })
        );
        return todoDates.reduce(
            (acc, cur) => {
                acc[cur - 1 + firstDate.getDay()] += 1;
                return acc;
            },
            Array.from({ length: datesOfMonth.length }, () => 0)
        );
    }, [periodTodos]);

    useEffect(() => {
        getMonthDates(firstDateOfThisMonth);
    }, []);

    const handleLeftClick = () => {
        const newFirstDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth() - 1,
            1
        );
        setFirstDate(newFirstDate);
        getMonthDates(newFirstDate);
    };

    const handleRightClick = () => {
        const newFirstDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth() + 1,
            1
        );
        setFirstDate(newFirstDate);
        getMonthDates(newFirstDate);
    };

    const handleDateCellClick = (idx: number) => {
        setClicked(idx ?? -1);
        setSelectedDate(formatDateToString(datesOfMonth[idx]));
    };

    return (
        <Styles.MonthStyle>
            <Styles.TitleWrap>
                <ArrowButton onClick={handleLeftClick}>
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    {firstDate.getFullYear()}년 {firstDate.getMonth() + 1}월
                </Styles.Title>
                <ArrowButton onClick={handleRightClick}>
                    <RightSvg />
                </ArrowButton>
            </Styles.TitleWrap>
            <Styles.DayWrap>
                {dayText.map((day, i) => (
                    <Styles.Day key={i}>{day}</Styles.Day>
                ))}
            </Styles.DayWrap>
            <Styles.DateCellWrap>
                {datesOfMonth.map((date, i) =>
                    date.getFullYear() === 9999 ? (
                        <Styles.DateCell key={i}></Styles.DateCell>
                    ) : (
                        <Styles.DateCell
                            key={i}
                            onClick={() => handleDateCellClick(i)}
                        >
                            <Styles.Cell
                                completed={
                                    Array.isArray(completedTodosByDay)
                                        ? completedTodosByDay[i]
                                        : 0
                                }
                            />
                            <Styles.Date
                                id={i}
                                $istoday={
                                    date.getFullYear() === todayYear &&
                                    date.getMonth() === todayMonth &&
                                    date.getDate() === today.getDate()
                                }
                                $isclicked={clicked === i}
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
