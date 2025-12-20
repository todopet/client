import React from "react";

interface CellProps {
  completed: number;
}

interface DateProps {
  $istoday: boolean;
  $isclicked: boolean;
}

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type SpanProps = React.HTMLAttributes<HTMLSpanElement> & { className?: string };

const WeekStyle = ({ className = "", ...props }: DivProps) => (
  <div className={["w-full ml-[4px]", className].join(" ")} {...props} />
);

const Title = ({ className = "", ...props }: SpanProps) => (
  <span className={["mx-[30px] font-[Pretendard]", className].join(" ")} {...props} />
);

const TitleWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-center items-center", className].join(" ")} {...props} />
);

const DayWrap = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={["grid justify-items-center items-center mt-5 mb-[2px]", className].join(" ")}
    style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", ...(style || {}) }}
    {...props}
  />
);

const Day = ({ className = "", ...props }: SpanProps) => (
  <span className={["text-[14px] font-[Pretendard]", className].join(" ")} {...props} />
);

const DateCellWrap = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={["grid justify-items-center items-center", className].join(" ")}
    style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", ...(style || {}) }}
    {...props}
  />
);

const DateCell = ({ className = "", ...props }: DivProps) => (
  <div className={["grid place-items-center", className].join(" ")} {...props} />
);

const Cell = ({ completed, className = "", style, ...props }: DivProps & CellProps) => {
  let bg = "#ffffff";
  if (completed === 0) bg = "#e9e9e9";
  else if (completed <= 2) bg = "#cff1cf";
  else if (completed <= 4) bg = "#a7eba6";
  else if (completed <= 6) bg = "#70d66a";
  else if (completed <= 8) bg = "#41b13f";
  else if (completed <= 10) bg = "#1d861c";
  else if (completed >= 11) bg = "#046900";
  return (
    <div
      className={["w-[22px] h-[22px] rounded-[3px] my-[10px] mx-[10px] mb-[2px]", className].join(
        " "
      )}
      style={{ backgroundColor: bg, ...(style || {}) }}
      {...props}
    />
  );
};

const Date = ({ $istoday, $isclicked, className = "", style, ...props }: DivProps & DateProps) => (
  <div
    className={[
      "w-5 h-5 rounded-[10px] my-[9px] mx-[10px] mb-[2px] text-[14px] font-[Pretendard] flex justify-center items-center text-center",
      className,
    ].join(" ")}
    style={{
      color: $isclicked ? "white" : $istoday ? "white" : "black",
      backgroundColor: $isclicked ? "#556FE9" : $istoday ? "black" : "",
      ...(style || {}),
    }}
    {...props}
  />
);

export { WeekStyle, Day, DateCell, Cell, Date, Title, TitleWrap, DayWrap, DateCellWrap };
