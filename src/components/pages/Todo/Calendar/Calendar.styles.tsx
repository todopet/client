import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const CalendarStyles = ({ className = "", ...props }: DivProps) => (
  <div className={className} {...props} />
);

export { CalendarStyles };
