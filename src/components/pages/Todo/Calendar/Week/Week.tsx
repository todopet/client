import * as Styles from './Week.styles';
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/images/rightButton.svg";
import ArrowButton from '../Button/ArrowButton';
import { useState } from 'react';

const dayText = ['일', '월', '화', '수', '목', '금', '토'];
const date = [1, 2, 3, 4, 5, 6, 7];

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;


export default function Week() {
    const [currentDay, setCurrentDay] = useState('');

    return (
        <Styles.WeekStyle>
            <ArrowButton>
                <LeftSvg />
            </ArrowButton>
            <Styles.Title>
                {thisYear}년 {thisMonth}월 N주차
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
                    <Styles.Cell></Styles.Cell>
                ))}
            </Styles.CellWrapper>
            {date.map((date, i) => (
                <Styles.Date>{date}</Styles.Date>
            ))}
        </Styles.WeekStyle>
    );
}