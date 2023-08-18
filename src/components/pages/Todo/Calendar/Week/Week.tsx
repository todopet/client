import * as Styles from './Week.styles';
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import ArrowButton from '../Button/ArrowButton';
import { useState } from 'react';

export default function Week() {
    const dayText = ["일", "월", "화", "수", "목", "금", "토"];

    // 오늘을 기준으로 연,월,일,요일 가져옴
    // day=요일 date=날짜
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDay();
    const todayDate = today.getDate();

    // 오늘을 기준으로 지난 일요일의 날짜 객체를 얻음
    // todayDate - todayDay를 하면 일요일의 날짜가 나오는데, 일요일이 0이기 때문. 일요일~토요일 0~6.
    const lastSunday = new Date(todayYear, todayMonth, todayDate - todayDay);

    // baseDate를 지난 일요일로 설정, 화살표를 누를 때마다 일주일씩 변경되게 할 것
    const [baseDate, setBaseDate] = useState(lastSunday);
    const [firstDate, setFirstDate] = useState(baseDate.getDate());
    //const [firstDayOfMonth]

    // 일주일 날짜를 담는 배열 weekDate
    // 버튼을 누를 때마다 baseDate를 변경해서 7개씩 불러옴
    const weekDate: number[] = [];

    function getWeekDate(firstDate: number) {
        for (let i = 0; i < 7; ++i) {
            weekDate.push(firstDate + i);
        }
    }
    getWeekDate(firstDate);

// 1일이 월1화2수3목4 --> 1주차
// 1일이 금5토6일0 --> 전월 마지막 주차
// weekDate 배열 내에 있는 숫자가 1인 경우.
// N주차를 계산하려면 결국 월의 1일도 알아내야 함...

    return (
        <Styles.WeekStyle>
            <ArrowButton>
                <LeftSvg />
            </ArrowButton>
            <Styles.Title>
                {baseDate.getFullYear()}년 {baseDate.getMonth() + 1}월 N주차
            </Styles.Title>
            <ArrowButton>
                <RightSvg />
            </ArrowButton>
            <div>
                {dayText.map((day, i) => (
                    <Styles.Day>{day}</Styles.Day>
                ))}
            </div>
            <Styles.CellWrapper>
                {dayText.map((day, i) => (
                    <Styles.Cell />
                ))}
            </Styles.CellWrapper>
            {weekDate.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
        </Styles.WeekStyle>
    );
}