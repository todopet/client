import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const TodoItemStyles = ({ className = "", ...props }: DivProps) => (
  <div className={["my-10 mx-[25px]", className].join(" ")} {...props} />
);

export { TodoItemStyles };
