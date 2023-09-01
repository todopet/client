import { useState, useContext, useEffect, useMemo } from "react";
import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
import axiosRequest from "@/api/index";
import { res, todoCategory } from "@/@types/index";

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

async function getTodos(startDate: string, endDate: string) {
    try {
        const response: res<todoCategory[]> = await axiosRequest.requestAxios<
            res<todoCategory[]>
        >("get", `/todoContents?start=${startDate}&end=${endDate}`);
        return response.data;
    } catch (error) {
        console.error("get요청 중 에러: ", error);
        return [];
    }
}

export default function Week() {
    const [currentSunday, setCurrentSunday] = useState(new Date(lastSunday));
    const [titleData, setTitleData] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
        weekCount: calculateWeekCount()
    });
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

    const getWeekDates = (sunday: Date | null = null) => {
        setDates([]);
        if (sunday === null) {
            sunday = currentSunday;
        }
        const newDates = [];
        for (let i = 0; i < 7; ++i) {
            const d = new Date(
                sunday.getFullYear(),
                sunday.getMonth(),
                sunday.getDate() + i
            );
            newDates.push(d);
        }
        setDates(newDates);

        // 예외처리를 위한 boolean 변수 2개
        isFirstDateIncluded = false;
        specialCaseOfYearEnd = false;

        // 현재 주에 1일이 포함되었는지 확인
        isFirstDateIncluded = newDates
            .map((date) => date.getDate())
            .includes(1);
        if (newDates[0].getDate() === 1) {
            // 1일이 일요일인 경우의 예외처리
            isFirstDateIncluded = false;
        }

        // 매해 12월에서 1월로 넘어가는 부분의 월&주차 오류 처리
        if (sunday.getMonth() === 11) {
            if (newDates.map((date, i) => date.getDate()).includes(31)) {
                if (newDates[6].getDate() !== 31) {
                    specialCaseOfYearEnd = true;
                }
            }
        }

        fetchData();
    };

    const fetchData = () => {
        const start = formatDate(currentSunday);
        const end = formatDate(
            new Date(
                currentSunday.getFullYear(),
                currentSunday.getMonth(),
                currentSunday.getDate() + 6
            )
        );
        updateStartEnd(start, end);
        const todos = getTodos(start, end);
        todos
            .then((value) => {
                setPeriodTodos(value);
            })
            .catch((error) => {
                console.error("promise chain 내의 에러: ", error);
            });
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
        return todoDates?.reduce(
            (acc, cur) => {
                acc[cur] = acc[cur] + 1;
                return acc;
            },
            Array.from({ length: dates.length }, () => 0)
        );
    }, [periodTodos]);

    useEffect(() => {
        setCurrentSunday(new Date(lastSunday));
        getWeekDates(lastSunday);
    }, []);

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
        const newCurrentSunday = new Date(
            currentSunday.setDate(currentSunday.getDate() - 7)
        );
        setCurrentSunday(newCurrentSunday);
        setTimeout(() => {
            setTitleData({
                year: specialCaseOfYearEnd
                    ? newCurrentSunday.getFullYear() + 1
                    : newCurrentSunday.getFullYear(),
                month: calculateMonth(),
                weekCount: isFirstDateIncluded ? 1 : calculateWeekCount()
            });
        }, 0);
        getWeekDates();
    };

    const handleRightClick = () => {
        const newCurrentSunday = new Date(
            currentSunday.setDate(currentSunday.getDate() + 7)
        );
        setCurrentSunday(newCurrentSunday);
        setTimeout(() => {
            setTitleData({
                year: specialCaseOfYearEnd
                    ? newCurrentSunday.getFullYear() + 1
                    : newCurrentSunday.getFullYear(),
                month: calculateMonth(),
                weekCount: isFirstDateIncluded ? 1 : calculateWeekCount()
            });
        }, 0);
        getWeekDates();
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
                    {titleData.year}년 {titleData.month + 1}월
                    {/* {" "}{titleData.weekCount}주차 */}
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
                    ))}
                </Styles.DateCellWrap>
            </div>
        </Styles.WeekStyle>
    );
}
