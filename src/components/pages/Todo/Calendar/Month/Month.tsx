import * as Styles from "./Month.styles";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as RightSvg } from "@/assets/icons/rightButton.svg";
import ArrowButton from "../Button/ArrowButton";
import { useState, FC } from "react";

// 오늘을 기준으로 연,월,일,요일을 구함
// day=요일 dates=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDay();     // 요일 기준으로 몇번째 칸부터 그릴지 결정
const dayText = ["일", "월", "화", "수", "목", "금", "토"];
const firstDateOfMonth = new Date(todayYear, todayMonth, 1);

// interface TitleProps {
//     children?: JSX.Element | JSX.Element[];
// }
interface TitleProps {
    children?: React.ReactNode;
    year: number;
    month: number;
}

export default function Month() {
    const [baseDate, setBaseDate] = useState(firstDateOfMonth);
    const [month, setMonth] = useState(todayMonth + 1);

    // 1일~말일까지의 날짜를 넣을 숫자 배열
    const dates: number[] = [];

    function getDate() {
        const lastDateOfMonth = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            0
        ).getDate();

        for (let i = 1; i <= lastDateOfMonth; ++i) {
            dates.push(i);
        }
        console.log(dates);
    }
    getDate();

    const Title: FC<TitleProps> = (props) => {
        return (
            <>
                {props.year}년 {props.month}월
            </>
        );
    }

    return (
        <Styles.MonthStyle>
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
                <Title
                    year={baseDate.getFullYear()}
                    month={baseDate.getMonth() + 1}
                />
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
            <Styles.DayWrap>
                {dayText.map((day, i) => (
                    <Styles.Day>{day}</Styles.Day>
                ))}
            </Styles.DayWrap>
            <Styles.DateCellWrap>
                {dates.map((dates, i) => (
                    <Styles.DateCell>
                        <Styles.Cell></Styles.Cell>
                        <Styles.Date>{dates}</Styles.Date>
                    </Styles.DateCell>
                ))}
            </Styles.DateCellWrap>
        </Styles.MonthStyle>
    );
}
