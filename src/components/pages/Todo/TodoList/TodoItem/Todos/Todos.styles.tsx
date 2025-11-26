import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const TodosWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col", className].join(" ")} {...props} />
);

export { TodosWrap };
