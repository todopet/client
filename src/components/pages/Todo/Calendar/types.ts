export const CalendarMode = {
  WEEK: "week",
  MONTH: "month",
} as const;

export type CalendarMode = (typeof CalendarMode)[keyof typeof CalendarMode];

export interface CalendarHeader {
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export interface CalendarProps {
  defaultMode?: CalendarMode;
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}
