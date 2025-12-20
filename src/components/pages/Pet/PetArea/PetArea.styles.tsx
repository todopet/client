import React from "react";
import { FooterButton, MainModalBackdrop } from "@/components/pages/Pet/PetArea";
import joyEmotion from "@/assets/images/joyEmotion.png.png";
import sadEmotion from "@/assets/images/sadEmotion.png.png";
import { petRoom, exclamationMark, levelStar } from "@/modules/icons";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const MainArea = ({
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLElement> & { className?: string }) => (
  <main
    className={[
      "h-full min-h-[700px] w-full bg-no-repeat bg-cover bg-center flex flex-col relative",
      className,
    ].join(" ")}
    style={{ backgroundImage: `url(${petRoom})`, ...(style || {}) }}
    {...props}
  />
);

const PetImg = ({
  level,
  width,
  height,
  left,
  bottom,
  className = "",
  style,
  ...props
}: DivProps & {
  level: number | null;
  width: number;
  height: number;
  left: number;
  bottom: number;
}) => (
  <div
    className={["bg-no-repeat bg-center bg-contain absolute", className].join(" ")}
    style={{
      backgroundImage: `url(/petImages/pet-${level}.gif)`,
      width: `${width}%`,
      height: `${height}%`,
      left: `${left}%`,
      bottom: `${bottom}%`,
      ...(style || {}),
    }}
    {...props}
  />
);

const EmotionImg = ({
  status,
  width,
  height,
  top,
  left,
  className = "",
  style,
  ...props
}: DivProps & { status: string; width: number; height: number; top: number; left: number }) => (
  <div
    className={["bg-no-repeat bg-center bg-contain absolute", className].join(" ")}
    style={{
      backgroundImage: `url(${status === "joy" ? joyEmotion : status === "sad" ? sadEmotion : ""})`,
      width: `${width}%`,
      height: `${height}%`,
      top: `${top}%`,
      left: `${left}%`,
      ...(style || {}),
    }}
    {...props}
  />
);

const MainHeader = ({ className = "", ...props }: DivProps) => (
  <div
    className={["flex justify-between mt-[10px] w-full h-[22%]", className].join(" ")}
    {...props}
  />
);

const StatusInfo = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col w-1/2 ml-[1.5%] h-full", className].join(" ")} {...props} />
);

const LevelInfo = ({ className = "", ...props }: DivProps) => (
  <div className={["mt-[5px] mr-[20px]", className].join(" ")} {...props} />
);

const PetLevelNameArea = ({ className = "", ...props }: DivProps) => (
  <div
    className={["flex justify-center items-center mt-[15px] h-[20%] w-full", className].join(" ")}
    {...props}
  />
);

const StarWrapper = ({ className = "", ...props }: DivProps) => (
  <div className={["w-[15px] h-[27px] relative bg-white", className].join(" ")} {...props} />
);

const LevelStar = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={[
      "bg-no-repeat bg-center bg-contain w-[40px] h-[35px] flex justify-center items-center right-0 -top-1 absolute",
      className,
    ].join(" ")}
    style={{ backgroundImage: `url(${levelStar})`, ...(style || {}) }}
    {...props}
  />
);

const Level = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) => (
  <p
    className={["text-[1.3rem] font-bold text-white pt-[10%] m-0", className].join(" ")}
    {...props}
  />
);

const PetNameBox = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "bg-white rounded-[0_8px_8px_0] w-[60%] h-[27px] flex justify-center items-center m-[0_-21px_0_-9px]",
      className,
    ].join(" ")}
    {...props}
  />
);

const PetName = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { className?: string }) => (
  <p
    className={["text-[1rem] font-bold m-0 h-[27px] leading-[27px]", className].join(" ")}
    {...props}
  />
);

const MainBody = ({ className = "", ...props }: DivProps) => (
  <div className={["w-full h-[58%]", className].join(" ")} {...props} />
);

const MainFooter = ({ className = "", ...props }: DivProps) => (
  <div
    className={["flex justify-end items-center w-full h-[20%]", className].join(" ")}
    {...props}
  />
);

const MainFooterButton = ({
  className = "",
  ...props
}: React.ComponentProps<typeof FooterButton>) => (
  <FooterButton
    className={["cursor-pointer mr-[6%] hover:brightness-110", className].join(" ")}
    {...props}
  />
);

const InventoryFullImg = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={[
      "bg-no-repeat bg-center bg-cover bg-white rounded-full absolute w-[1.7rem] h-[1.7rem]",
      className,
    ].join(" ")}
    style={{
      backgroundImage: `url(${exclamationMark})`,
      bottom: "11.6%",
      right: "5.5%",
      ...(style || {}),
    }}
    {...props}
  />
);

const AchModalBackdrop = MainModalBackdrop;

const AchModal = ({ on, className = "", style, ...props }: DivProps & { on: boolean }) => (
  <div
    className={[
      "absolute bottom-0 left-0 w-full rounded-t-[30px] bg-white flex flex-col z-[1] transition-all duration-500 gap-2",
      className,
    ].join(" ")}
    style={{ height: on ? "85%" : "0%", ...(style || {}) }}
    {...props}
  />
);

const AchModalTitle = ({ className = "", ...props }: DivProps) => (
  <div
    className={["p-0 flex justify-center items-center h-[10%] m-0", className].join(" ")}
    {...props}
  />
);

const AchArea = ({ className = "", ...props }: DivProps) => (
  <div className={["w-full h-[90%] overflow-y-auto", className].join(" ")} {...props} />
);

const AchWrapper = ({ className = "", ...props }: DivProps) => (
  <div
    className={["flex flex-col justify-center items-center gap-4", className].join(" ")}
    {...props}
  />
);

export {
  MainArea,
  PetImg,
  EmotionImg,
  MainHeader,
  StatusInfo,
  LevelInfo,
  PetLevelNameArea,
  LevelStar,
  Level,
  StarWrapper,
  PetNameBox,
  PetName,
  MainBody,
  MainFooter,
  MainFooterButton,
  InventoryFullImg,
  AchModalBackdrop,
  AchModal,
  AchModalTitle,
  AchArea,
  AchWrapper,
};
