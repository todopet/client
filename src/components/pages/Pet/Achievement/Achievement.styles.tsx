import React from 'react';
import { gift, gift_bang, empty_gift } from '@/modules/icons';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const AchBox = ({ achDone, className = "", style, ...props }: DivProps & { achDone: boolean }) => (
  <div
    className={["w-[80%] h-[70px] rounded-[10px] flex gap-2 items-center relative border", className].join(" ")}
    style={{ borderColor: achDone ? "#3FB33D" : "#B7B7B7", ...(style || {}) }}
    {...props}
  />
);

const AchStatus = ({ achDone, className = "", style, ...props }: DivProps & { achDone: boolean }) => (
  <div
    className={["w-[10px] h-full rounded-l-[10px]", className].join(" ")}
    style={{ backgroundColor: achDone ? "#9EFFAE" : "#B7B7B7", ...(style || {}) }}
    {...props}
  />
);

const AchInfo = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col gap-[0.1rem] basis-[70%] pl-[10px]", className].join(" ")} {...props} />
);

const AchName = ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) => (
  <p className={["font-bold text-[15px] m-0 mb-[5px]", className].join(" ")} {...props} />
);

const TotalBar = ({ className = "", children, ...props }: DivProps & { children?: React.ReactNode }) => (
  <div className={["w-[95%] h-[12px] rounded-[6px] bg-[#A0A0A0] relative", className].join(" ")} {...props}>
    {children}
  </div>
);

const CurrentBar = ({ totalcount, currentcount, className = "", style, ...props }: DivProps & { totalcount: number; currentcount: number; color?: string }) => {
  const widthPercent = Math.round((currentcount / totalcount) * 100);
  return (
    <div
      className={["h-full rounded-[6px]", className].join(" ")}
      style={{ width: `${widthPercent}%`, ...(style || {}) }}
      {...props}
    />
  );
};

const AchIcon = ({ achDone, isRewarded, className = "", style, ...props }: DivProps & { achDone: boolean; isRewarded: boolean }) => {
  const bg = achDone ? (isRewarded ? empty_gift : gift_bang) : gift;
  const h = achDone ? (isRewarded ? 40 : 55) : 55;
  return (
    <div
      className={["bg-no-repeat w-[50px]", className].join(" ")}
      style={{ backgroundImage: `url(${bg})`, height: `${h}px`, ...(style || {}) }}
      {...props}
    />
  );
};

const AchModalBackdrop = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={["rounded-[9px] bg-[rgba(0,0,0,0.3)]", className].join(" ")}
    style={style}
    {...props}
  />
);

export { AchBox, AchStatus, AchInfo, AchName, TotalBar, CurrentBar, AchIcon, AchModalBackdrop };
