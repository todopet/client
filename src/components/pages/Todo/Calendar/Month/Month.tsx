import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState, useContext, useEffect, useMemo } from "react";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
import axiosRequest from "@/api/index";
import { res, todoCategory } from "@/@types/index";

// 오늘의 연,월,일,요일 구하기. day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

async function getTodos(startDate: string, endDate: string) {
    try {
        const response: res<todoCategory[]> = await axiosRequest.requestAxios<
            res<todoCategory[]>
        >("get", `/todoContents?start=${startDate}&end=${endDate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        alert("데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요.");
        return [];
    }
}

export default function Month() {
    const [firstDate, setFirstDate] = useState(firstDateOfThisMonth);
    const [clicked, setClicked] = useState(-1);
    const [dates, setDates] = useState<Date[]>([]);

    const { updateSelectedDate, updateStartEnd, periodTodos, setPeriodTodos } =
        useContext(TodoContext);

    // 날짜 형식 yyyy-mm-dd 지정 함수
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

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
        setDates(newDates);
        fetchData(newDates, firstDate);
    }

    const fetchData = (newDates: Date[], firstDate: Date) => {
        const start = formatDate(newDates[firstDate.getDay()]);
        const end = formatDate(newDates[newDates.length - 1]);
        updateStartEnd(start, end);
        const todos = getTodos(start, end);
        todos
            .then((value) => {
                setPeriodTodos(value);
            })
            .catch((error) => {
                console.error(error);
                alert(
                    "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            });
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
            Array.from({ length: dates.length }, () => 0)
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
