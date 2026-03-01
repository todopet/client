import { describe, expect, it } from "vitest";
import {
  addDays,
  formatDate,
  formatDateKST,
  getDayOfWeekName,
  getDaysDiff,
  isDateInRange,
  isSameMonth,
  isToday,
  kstToUTC,
  subtractDays,
  utcToKST,
} from "@/libs/utils/dateUtils";

describe("dateUtils", () => {
  it("formats date as YYYY-MM-DD", () => {
    expect(formatDate("2024-01-15T10:30:00Z")).toBe("2024-01-15");
  });

  it("formats date in KST", () => {
    expect(formatDateKST("2024-01-15T00:00:00.000Z")).toBe("2024-01-15");
  });

  it("checks today based on local current date", () => {
    expect(isToday(new Date())).toBe(true);
  });

  it("compares month correctly", () => {
    expect(isSameMonth("2024-01-01", "2024-01-31")).toBe(true);
    expect(isSameMonth("2024-01-01", "2024-02-01")).toBe(false);
  });

  it("calculates days diff", () => {
    expect(getDaysDiff("2024-01-01", "2024-01-11")).toBe(10);
  });

  it("adds and subtracts days", () => {
    expect(addDays("2024-01-01", 7)).toBe("2024-01-08");
    expect(subtractDays("2024-01-08", 7)).toBe("2024-01-01");
  });

  it("checks if date is in range", () => {
    expect(isDateInRange("2024-01-15", "2024-01-10", "2024-01-20")).toBe(true);
    expect(isDateInRange("2024-01-25", "2024-01-10", "2024-01-20")).toBe(false);
  });

  it("returns korean day name", () => {
    expect(getDayOfWeekName("2024-01-15")).toBe("월");
  });

  it("converts UTC and KST", () => {
    const kst = utcToKST("2024-01-15T00:00:00.000Z");
    expect(kst).toBe("2024-01-15 09:00:00");
    expect(kstToUTC("2024-01-15 09:00:00")).toBe("2024-01-15 00:00:00");
  });
});
