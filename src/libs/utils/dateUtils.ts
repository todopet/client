import { dayjs } from "@/libs/utils/dayjs";

const KST_TIMEZONE = "Asia/Seoul";

export const formatDate = (date: Date | string): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDateKST = (date: Date | string): string => {
  return dayjs(date).tz(KST_TIMEZONE).format("YYYY-MM-DD");
};

export const formatDateCustom = (date: Date | string, format = "YYYY-MM-DD"): string => {
  return dayjs(date).format(format);
};

export const getRelativeTime = (date: Date | string): string => {
  return dayjs(date).fromNow();
};

export const isToday = (date: Date | string): boolean => {
  return dayjs(date).isSame(dayjs(), "day");
};

export const isSameMonth = (date1: Date | string, date2: Date | string): boolean => {
  return dayjs(date1).isSame(dayjs(date2), "month");
};

export const getDaysDiff = (start: Date | string, end: Date | string): number => {
  return dayjs(end).diff(dayjs(start), "day");
};

export const addDays = (date: Date | string, days: number): string => {
  return dayjs(date).add(days, "day").format("YYYY-MM-DD");
};

export const subtractDays = (date: Date | string, days: number): string => {
  return dayjs(date).subtract(days, "day").format("YYYY-MM-DD");
};

export const getWeekStart = (date: Date | string): string => {
  return dayjs(date).startOf("week").format("YYYY-MM-DD");
};

export const getWeekEnd = (date: Date | string): string => {
  return dayjs(date).endOf("week").format("YYYY-MM-DD");
};

export const getMonthStart = (date: Date | string): string => {
  return dayjs(date).startOf("month").format("YYYY-MM-DD");
};

export const getMonthEnd = (date: Date | string): string => {
  return dayjs(date).endOf("month").format("YYYY-MM-DD");
};

export const isDateInRange = (
  date: Date | string,
  start: Date | string,
  end: Date | string
): boolean => {
  return dayjs(date).isBetween(dayjs(start), dayjs(end), "day", "[]");
};

export const getNowKST = (): string => {
  return dayjs().tz(KST_TIMEZONE).format("YYYY-MM-DD HH:mm:ss");
};

export const isValidDate = (date: string, format?: string): boolean => {
  if (!format) return dayjs(date).isValid();
  return dayjs(date, format, true).isValid();
};

export const getDayOfWeek = (date: Date | string): number => {
  return dayjs(date).day();
};

export const getDayOfWeekName = (date: Date | string): string => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[dayjs(date).day()];
};

export const utcToKST = (utcDate: string): string => {
  return dayjs.utc(utcDate).tz(KST_TIMEZONE).format("YYYY-MM-DD HH:mm:ss");
};

export const kstToUTC = (kstDate: string): string => {
  return dayjs.tz(kstDate, KST_TIMEZONE).utc().format("YYYY-MM-DD HH:mm:ss");
};
