import * as Styles from "./Week.styles";
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { FC, useState } from "react";

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
    const dates: Date[] = [];

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
            if (dates.map((date) => date.getDate()).includes(31)) {
                if (dates[6].getDate() !== 31) {
                    specialCaseOfYearEnd = true;
                }
            }
        }
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
            console.log("조건1");
            return 0;
        } else if (isFirstDateIncluded) {
            console.log("조건2");
            return currentSunday.getMonth() + 1;
        } else {
            console.log("조건3");
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
                        <Styles.DateCell>
                            <Styles.Cell></Styles.Cell>
                            <Styles.Date
                                isToday={
                                    date.getFullYear() === todayYear &&
                                    date.getMonth() === todayMonth &&
                                    date.getDate() === today.getDate()
                                }
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

// 아래 getWeekOfData 함수를 이용해서 아래와 같은 경우에 대해서 코드를 작성해주세요.
//
// 해당 Week 컴포넌트 마운트 시점 ( => getWeekOfData( new Date() ) );
// Arrow 버튼 클릭 시 ( => getWeekOfData( new Date(현재 선택된 날짜 기준 + || - 1) ) )
//
// function isInvalidDate(date: Date) {
//     return !date || typeof date !== "object" || !(date instanceof Date);
// };

// function getWeekOfData(date: Date) {
// 매개변수로 Date객체(currentSunday)를 받아옴. getWeekOfDate(currentSunday); 이렇게 호출
//     if (isInvalidDate(date)) return {};
//     const firstDate = // 주의 첫날 객체(일요일)
//         date.getDay() === 0
//             ? date
//             : new Date(
//                 date.getFullYear(),
//                 date.getMonth(),
//                 date.getDate() - date.getDay()
//             );

//     const lastDate = new Date( // 주의 마지막날 객체(토요일)
//         firstDate.getFullYear(),
//         firstDate.getMonth(),
//         firstDate.getDate() + 6
//     );

//     const startDayOfMonth = new Date( // 월의 시작 요일
//         date.getFullYear(),
//         date.getMonth()
//     ).getDay();

//     const weekOfMonth = Math.ceil((date.getDate() + startDayOfMonth) / 7);

//     return {
//         firstDate, // date 기준 일요일
//         lastDate, // date 기준 토요일
//         weekOfMonth // date 기준 주차 수 [1 ~ 6]
//     };
// };
