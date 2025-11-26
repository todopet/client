import { heart, calendar, check } from "@/modules/icons";

interface activityInfo {
    activityType: string;
    data: string;
}

export default function Activity({ activityType, data }: activityInfo) {
  const color = activityType === "heart" ? "#FCF5FF" : activityType === "calendar" ? "#F6FFF7" : "#F3FDFF";
  const icon = activityType === "heart" ? heart : activityType === "calendar" ? calendar : check;
  const text = activityType === "heart"
    ? `펫과 함께한지 ${data}일 됐어요!`
    : activityType === "calendar"
    ? `지금까지 ${data}일 동안 todo를 달성했어요!`
    : `지금까지 ${data}개의 todo를 완료했어요!`;
  return (
    <div className="w-full">
      <div
        className="flex justify-start items-center gap-[0.7rem] w-full h-[90px] rounded-[15px]"
        style={{ backgroundColor: color }}
      >
        <div
          className="bg-no-repeat bg-center bg-contain w-[23px] h-[23px] ml-[7%]"
          style={{ backgroundImage: `url(${icon})` }}
        />
        <div className="text-black text-[0.9rem] mb-[2px]">{text}</div>
      </div>
    </div>
  );
}
