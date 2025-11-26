import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const ItemWrap = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "box-border w-full h-[132px] p-[18px] flex flex-row relative",
      className,
    ].join(" ")}
    {...props}
  />
);

const ItemInfo = ({ className = "", ...props }: DivProps) => (
  <div className={["flex cursor-pointer hover:opacity-60", className].join(" ")} {...props} />
);

const ItemImage = ({ className = "", ...props }: DivProps) => (
  <div className={["relative", className].join(" ")} {...props} />
);

const ItemDes = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col", className].join(" ")} {...props} />
);

const ItemInfoRow = ({ className = "", ...props }: DivProps) => (
  <div className={["h-1/2 flex flex-row justify-between", className].join(" ")} {...props} />
);

type ItemIconProps = DivProps & { imageurl: string };
const ItemIcon = ({ imageurl, className = "", style, ...props }: ItemIconProps) => (
  <div
    className={[
      "bg-no-repeat bg-center w-[100px] h-[96px] mr-[18px] border-0 bg-transparent",
      className,
    ].join(" ")}
    style={{ backgroundImage: `url(${imageurl})`, ...(style || {}) }}
    {...props}
  />
);

const ItemName = ({ className = "", ...props }: DivProps) => (
  <div className={["text-[20px] text-[#545353] self-end", className].join(" ")} {...props} />
);

const Itemdescription = ({ className = "", ...props }: DivProps) => (
  <div className={["text-[15px] text-[#545353]", className].join(" ")} {...props} />
);

const DiscardBtnStyled = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "flex justify-center items-center absolute w-[50px] h-[50px] right-2 top-[17px]",
      className,
    ].join(" ")}
    {...props}
  />
);

export {
  ItemWrap,
  ItemInfo,
  ItemImage,
  ItemDes,
  ItemInfoRow,
  ItemIcon,
  ItemName,
  Itemdescription,
  DiscardBtnStyled,
};
