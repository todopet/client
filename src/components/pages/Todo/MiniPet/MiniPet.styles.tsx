import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const MiniPetWrap = ({ className = "", ...props }: DivProps) => (
  <div
    className={["w-[390px] h-[80px] bg-white z-[5] relative flex flex-col justify-end overflow-x-hidden", className].join(" ")}
    {...props}
  />
);

const MyPet = ({ petLevel, width, height, className = "", style, ...props }: DivProps & { petLevel: number | null; width: number; height: number }) => (
  <div
    className={["bg-no-repeat bg-center bg-contain", className].join(" ")}
    style={{
      backgroundImage: `url(/petImages/pet-${petLevel}.png)`,
      width: `${width}px`,
      height: `${height}px`,
      animation: `miniPetJump 0.6s alternate infinite`,
      ...(style || {}),
    }}
    {...props}
  />
);

const MyPetWrap = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={["absolute z-[1] bottom-[5px]", className].join(" ")}
    style={{ animation: `miniPetMove 10s linear infinite`, ...(style || {}) }}
    {...props}
  />
);

const Bg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} className={["w-[390px] h-[50px]", props.className || ""].join(" ")} alt="miniPetBackground" />
);

export { MiniPetWrap, Bg, MyPet, MyPetWrap };