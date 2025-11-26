import React from 'react';
import { TotalBar, CurrentBar } from '../Achievement/Achievement.styles';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const ExpTotalBar = ({ className = "", style, ...props }: DivProps) => (
  <TotalBar className={["w-full h-[10px] bg-[#E3E3E3] rounded-none", className].join(" ")} style={style} {...props} />
);

const ExpCurrentBar = ({ className = "", style, ...props }: DivProps) => (
  <CurrentBar className={["rounded-none", className].join(" ")} style={style} {...props} />
);

export { ExpTotalBar, ExpCurrentBar };
