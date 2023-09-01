/*
앞으로 해야할 일

1. 우선 updateSelectedDate를 써서 날짜셀 클릭시에 그 날짜의 todo만 나타나게 한다

2. todoCountForCell의 년, 월, 일을 dates의 년, 월, 일 하고 비교해서
    같은 인덱스에 완료된 투두를 카운트한 숫자가 들어가게 한다.

3. 카운트한 숫자를 기준으로 Cell에 개수별 조건을 걸어서 background-color 스타일을 준다
    0개:    E7E8EA
    1~2개:  E1F9E1
    3~4개:  C5F4C4
    5~6개:  AAEEA8
    7~8개:  56DD53
    9~10개: 24A921
    11개~ : 1B8518
    
4. selectedDate: string 전달해서 todo생성시 타임스탬프 지정되게 해야 함
*/

import React, {
    FC,
    useState,
    useContext,
    useEffect,
    SyntheticEvent,
    MouseEventHandler
} from "react";
import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { CalendarContext } from "../Calendar";

interface TitleProps {
    children?: React.ReactNode;
    year: number;
    month: number;
    weekCount: number;
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
let isFirstDateIncluded = false;
let specialCaseOfYearEnd = false;

export default function Week() {
    const [currentSunday, setCurrentSunday] = useState(lastSunday);
    const [titleData, setTitleData] = useState({
        year: currentSunday.getFullYear(),
        month: currentSunday.getMonth(),
        weekCount: getWeekCount()
    });
    const [clicked, setClicked] = useState(-1);

    // 일주일의 날짜를 넣는 배열
    const dates: Date[] = [];
    const todoCountForCell: number[] = [];

    // Calendar로부터 전달받음
    const { updateDate, periodTodos } = useContext(CalendarContext);

    const getWeekDates = () => {
        for (let i = 0; i < 7; ++i) {
            const d = new Date(
                currentSunday.getFullYear(),
                currentSunday.getMonth(),
                currentSunday.getDate() + i
            );
            dates.push(d);
        }
        isFirstDateIncluded = false;
        specialCaseOfYearEnd = false;

        isFirstDateIncluded = dates.map((date) => date.getDate()).includes(1);
        if (dates[0].getDate() === 1) {
            // 1일이 일요일인 경우의 예외처리
            isFirstDateIncluded = false;
        }

        if (currentSunday.getMonth() === 11) {
            if (dates.map((date, i) => date.getDate()).includes(31)) {
                if (dates[6].getDate() !== 31) {
                    specialCaseOfYearEnd = true;
                }
            }
        }

        const start = dates[0].toISOString();
        const end = dates[6].toISOString();
        updateDate(start, end);

        // const countDates = () => {
        //     const todoDates: Date[] = [];
        //     periodTodos.forEach((category: any) =>
        //         category.todos.forEach((todo: any) => {
        //             const newDate = new Date(todo.createdAt);
        //             todoDates.push(newDate);
        //         })
        //     );

        //     console.log("Week periodTodos: ", todoDates);
        //     console.log("Week todoDates: ", todoDates);
        // };
        // countDates();
    };
    getWeekDates();

    function getWeekCount() {
        const firstDayOfMonth = new Date(
            currentSunday.getFullYear(),
            currentSunday.getMonth(),
            1
        ).getDay();

        const currentDate = currentSunday.getDate();
        const weekCount = Math.ceil((currentDate + firstDayOfMonth) / 7);
        return weekCount;
    }

    const Title: FC<TitleProps> = (props) => {
        return (
            <>
                {props.year}년 {props.month + 1}월 {props.weekCount}주차
            </>
        );
    };

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
                weekCount: isFirstDateIncluded ? 1 : getWeekCount()
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
                weekCount: isFirstDateIncluded ? 1 : getWeekCount()
            });
        }, 0);
    };

    const handleDateCellClick = (idx: number) => {
        setClicked(idx ?? -1);
    };

    return (
        <Styles.WeekStyle>
            <Styles.TitleWrap>
                <ArrowButton onClick={handleLeftClick}>
                    <LeftSvg />
                </ArrowButton>
                <Styles.Title>
                    <Title
                        year={titleData.year}
                        month={titleData.month}
                        weekCount={titleData.weekCount}
                    />
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
                    ))}
                </Styles.DateCellWrap>
            </div>
        </Styles.WeekStyle>
    );
}
