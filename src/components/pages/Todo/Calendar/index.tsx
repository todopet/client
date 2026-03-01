import { FC, useCallback, useState } from "react";
import { Week } from "@/components/pages/Todo/Calendar/Week";
import { Month } from "@/components/pages/Todo/Calendar/Month";
import { ToggleButton } from "@/components/ToggleButton";
import { ArrowButton } from "@/components/pages/Todo/Calendar/Button/ArrowButton";
import { LeftArrowIcon, RightArrowIcon } from "@/modules/icons";
import { CalendarMode, type CalendarHeader, type CalendarProps } from "@/components/pages/Todo/Calendar/types";

interface CalendarBodyProps {
  mode?: CalendarMode;
  onHeaderChange?: (header: CalendarHeader) => void;
}

const CalendarBody: FC<CalendarBodyProps> = ({ mode, onHeaderChange }) => {
  return (
    <>
      {mode === CalendarMode.WEEK && <Week onHeaderChange={onHeaderChange} />}
      {mode === CalendarMode.MONTH && <Month onHeaderChange={onHeaderChange} />}
    </>
  );
};

export const Calendar: FC<CalendarProps> = (props) => {
  const { defaultMode = CalendarMode.WEEK } = props;
  const [mode, setMode] = useState<CalendarMode>(defaultMode);
  const [header, setHeader] = useState<CalendarHeader>({ title: "" });

  const handleToggle = useCallback(
    (isToggled: boolean) =>
      setMode(isToggled ? CalendarMode.MONTH : CalendarMode.WEEK), // newToggle이 isToggled로 들어옴
    []
  );

  const handleHeaderChange = useCallback((nextHeader: CalendarHeader) => {
    setHeader(nextHeader);
  }, []);

  return (
    <section className="pt-4" aria-label="캘린더">
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-1 items-center justify-center">
          <ArrowButton onClick={() => header.onPrev?.()} aria-label="이전 기간 보기">
            <img src={LeftArrowIcon} alt="" aria-hidden="true" />
          </ArrowButton>
          <span className="mx-[30px] font-[Pretendard]">{header.title}</span>
          <ArrowButton onClick={() => header.onNext?.()} aria-label="다음 기간 보기">
            <img src={RightArrowIcon} alt="" aria-hidden="true" />
          </ArrowButton>
        </div>
        <ToggleButton
          defaultChecked={defaultMode === CalendarMode.MONTH}
          onToggle={handleToggle}
          ariaLabel="주간/월간 달력 전환"
        />
      </div>
      <CalendarBody mode={mode} onHeaderChange={handleHeaderChange} />
    </section>
  );
};
