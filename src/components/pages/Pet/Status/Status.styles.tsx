import React from 'react';
import { TotalBar, CurrentBar } from '../Achievement/Achievement.styles';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const StatusArea = ({ className = "", ...props }: DivProps) => (
  <div className={["h-[25%] flex gap-[0.4rem] items-center justify-center", className].join(" ")} {...props} />
);

const BarName = ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) => (
  <p className={["text-[100%] font-bold text-black h-auto flex items-center justify-center m-[0_3%_2%_2%]", className].join(" ")} {...props} />
);

const ExpTotalBar = ({ className = "", style, ...props }: DivProps) => (
  <TotalBar
    className={["w-[60%] h-[65%] bg-white rounded-[20px] overflow-hidden", className].join(" ")}
    style={style}
    {...props}
  />
);

const ExpCurrentBar = ({ className = "", style, ...props }: DivProps) => (
  <CurrentBar className={["rounded-[20px_0_0_20px]", className].join(" ")} style={style} {...props} />
);

export { BarName, StatusArea, ExpTotalBar, ExpCurrentBar };
