import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const StyledTodo = ({ className = "", ...props }: DivProps) => (
  <div className={["h-auto my-[10px] mx-[2px] flex justify-between", className].join(" ")} {...props} />
);

const TodoWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex-1", className].join(" ")} {...props} />
);

const TodoDiv = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-start", className].join(" ")} {...props} />
);

interface TodoProps { newcheckstatus: string }

const StyledCheckbox = ({ newcheckstatus, className = "", style, ...props }: DivProps & TodoProps) => (
  <div
    className={["flex justify-center items-center w-[22px] h-[22px] mr-2 border-0 rounded-[3px]", className].join(" ")}
    style={{ backgroundColor: newcheckstatus === "completed" ? "#baabb5" : "#e7e8ea", ...(style || {}) }}
    {...props}
  />
);

const Text = ({ newcheckstatus, className = "", style, ...props }: React.HTMLAttributes<HTMLSpanElement> & TodoProps) => (
  <span
    className={["font-[Pretendard] text-[16px] max-w-[240px] break-words", newcheckstatus === "completed" ? "line-through" : "", className].join(" ")}
    style={{ color: newcheckstatus === "unchecked" ? "#000000" : "#ADADAD", ...(style || {}) }}
    {...props}
  />
);

const DropDownWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["w-[19px] h-[22px] flex items-center", className].join(" ")} {...props} />
);

export { StyledTodo, TodoDiv, StyledCheckbox, Text, TodoWrap, DropDownWrap };
