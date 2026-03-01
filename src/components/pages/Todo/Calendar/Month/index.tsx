import * as Styles from "@/components/pages/Todo/Calendar/Month/Month.styles";
import { KeyboardEvent, useState, useEffect, useMemo } from "react";
import { useTodosStore } from "@/store/todoStore";
import { formatDateToString } from "@/libs/utils/global";
import { TodoStatus } from "@/@types";

// 오늘의 연,월,일,요일 구하기. day=요일 date=날짜
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const firstDateOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const dayText = ["일", "월", "화", "수", "목", "금", "토"];

interface MonthProps {
  onHeaderChange?: (header: { title: string; onPrev?: () => void; onNext?: () => void }) => void;
}

export const Month = ({ onHeaderChange }: MonthProps) => {
  const [firstDate, setFirstDate] = useState(firstDateOfThisMonth);
  const [clicked, setClicked] = useState(-1);
  const [datesOfMonth, setDatesOfMonth] = useState<Date[]>([]);

  const setSelectedDate = useTodosStore((state) => state.setSelectedDate);
  const setStartEndDate = useTodosStore((state) => state.setStartEndDate);
  const periodTodos = useTodosStore((state) => state.periodTodos);
  const setTodos = useTodosStore((state) => state.setTodos);

  const getMonthDates = (firstDate: Date) => {
    const newDates = [];
    const firstDateOfMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    const lastDateOfMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDateOfMonth.getDay(); ++i) {
      newDates.push(new Date(9999, 11, 31));
    }
    for (let i = 0; i < lastDateOfMonth.getDate(); ++i) {
      newDates.push(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1 + i));
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
        if (todo.status === TodoStatus.COMPLETED) todoDates.push(newDate.getDate());
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
    const newFirstDate = new Date(firstDate.getFullYear(), firstDate.getMonth() - 1, 1);
    setFirstDate(newFirstDate);
    getMonthDates(newFirstDate);
  };

  const handleRightClick = () => {
    const newFirstDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 1);
    setFirstDate(newFirstDate);
    getMonthDates(newFirstDate);
  };

  useEffect(() => {
    onHeaderChange?.({
      title: `${firstDate.getFullYear()}년 ${firstDate.getMonth() + 1}월`,
      onPrev: handleLeftClick,
      onNext: handleRightClick,
    });
  }, [onHeaderChange, firstDate]);

  const handleDateCellClick = (idx: number) => {
    setClicked(idx ?? -1);
    setSelectedDate(formatDateToString(datesOfMonth[idx]));
  };

  const handleDateCellKeyDown = (e: KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDateCellClick(idx);
    }
  };

  return (
    <Styles.MonthStyle role="grid" aria-label="월간 달력">
      <Styles.DayWrap role="row">
        {dayText.map((day, i) => (
          <Styles.Day key={i} role="columnheader">{day}</Styles.Day>
        ))}
      </Styles.DayWrap>
      <Styles.DateCellWrap>
        {datesOfMonth.map((date, i) =>
          date.getFullYear() === 9999 ? (
            <Styles.DateCell key={i} aria-hidden="true"></Styles.DateCell>
          ) : (
            <Styles.DateCell
              key={i}
              onClick={() => handleDateCellClick(i)}
              onKeyDown={(e) => handleDateCellKeyDown(e, i)}
              role="button"
              tabIndex={0}
              aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 선택`}
            >
              <Styles.Cell
                completed={Array.isArray(completedTodosByDay) ? completedTodosByDay[i] : 0}
              />
                            <Styles.Date
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
