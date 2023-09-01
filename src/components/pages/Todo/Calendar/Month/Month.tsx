import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
import axiosRequest from "@/api/index";
import { res, todoCategory } from "@/@types/index";

// 오늘의 연,월,일,요일 구하기. day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDateofThisMonth = new Date(
    firstDateOfThisMonth.getFullYear(),
    firstDateOfThisMonth.getMonth() + 1,
    0
);
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

async function getTodos(startDate: string, endDate: string) {
    try {
        const response: res<todoCategory[]> = await axiosRequest.requestAxios<
            res<todoCategory[]>
        >("get", `/todoContents?start=${startDate}&end=${endDate}`);
        return response.data;
        // console.log("response.data: ", response.data);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default function Month() {
    const [firstDate, setFirstDate] = useState(firstDateOfThisMonth);
    const [clicked, setClicked] = useState(-1);
    // const [dates, setDates] = useState<Date[]>([]);
    // const [completedTodos, setCompletedTodos] = useState<number[]>([]);
    // const [periodTodos, setPeriodTodos] = useState<todoCategory[]>([]);
    let dates: Date[] = [];
    let completedTodos: number[] = [];

    const { updateSelectedDate, updateStartEnd, periodTodos, setPeriodTodos } =
        useContext(TodoContext);

    // 날짜 형식 yyyy-mm-dd 지정 함수
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    function getMonthDates() {
        dates = [];
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
            dates.push(new Date(9999, 11, 31));
        }
        for (let i = 0; i < lastDateOfMonth.getDate(); ++i) {
            dates.push(
                new Date(firstDate.getFullYear(), firstDate.getMonth(), 1 + i)
            );
        }
        fetchData();
    }

    const fetchData = () => {
        const start = formatDate(dates[firstDate.getDay()]);
        const end = formatDate(dates[dates.length - 1]);
        updateStartEnd(start, end);
        // console.log(`fetchData 기간: ${start} ~ ${end}`);
        const todos = getTodos(start, end);
        todos
            .then((value) => {
                setPeriodTodos(value);
                // console.log("fetchData periodTodos: ", periodTodos); 
                console.log("fetchData value: ", value);
            })
            .catch((error) => {
                console.error("promise chain 내의 에러: ", error);
            })
    };

    const completedTodosByDay = useMemo(() => {
        const todoDates: number[] = [];
        periodTodos?.forEach((category: any) =>
            category.todos.forEach((todo: any) => {
                const newDate = new Date(todo.createdAt);
                if (todo.status === "completed")
                    todoDates.push(newDate.getDay());
            })
        );
        console.log("***todoDates: ", todoDates);
        return todoDates.reduce(
            // acc는 누적값, cur는 현재값.
            (acc, cur) => {
                acc[cur] = acc[cur] + 1;
                return acc;
            },
            Array.from({ length: dates.length }, () => 0)
        ).splice(1, dates.length - 1);
    }, [periodTodos]);

    console.log("***dates.length: ", dates.length);
    console.log("***completedTodosByDay: ", completedTodosByDay);

    useEffect(() => {
        getMonthDates();
    }, []);


    const handleLeftClick = () => {
        const newFirstDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth() - 1,
            1
        );
        setFirstDate(newFirstDate);
        getMonthDates();
    };

    const handleRightClick = () => {
        const newFirstDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth() + 1,
            1
        );
        setFirstDate(newFirstDate);
        getMonthDates();
    };

    const handleDateCellClick = (idx: number) => {
        setClicked(idx ?? -1);
        updateSelectedDate(formatDate(dates[idx]));
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
                {dates.map((date, i) =>
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

    // const countDates = (_periodTodos: todoCategory[]) => {
    //     completedTodos = [];
    //     const todoDates: number[] = [];
    //     periodTodos?.forEach((category: any) =>
    //         category.todos.forEach((todo: any) => {
    //             const newDate = new Date(todo.createdAt);
    //             if (todo.status === "completed")
    //                 todoDates.push(newDate.getDate());
    //         })
    //     );

    //     for (let i = 0; i < dates.length; ++i) {
    //         let count = 0;
    //         for (let j = 0; j < todoDates.length; ++j) {
    //             if (todoDates[j] === i + 1) {
    //                 ++count;
    //             }
    //         }
    //         completedTodos.push(count);
    //     }
    // };