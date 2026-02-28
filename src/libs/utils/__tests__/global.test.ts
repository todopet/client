import { describe, expect, it } from "vitest";
import { formatDateToString, setKoreaTime } from "@/libs/utils/global";

describe("Date Utils", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15T10:30:00");
    const formatted = formatDateToString(date);

    expect(formatted).toBe("2024-01-15");
  });

  it("should convert UTC date to Korea time string", () => {
    const date = new Date("2024-01-15T00:00:00.000Z");
    const koreaTime = setKoreaTime(date);

    expect(koreaTime).toBe("2024-01-15");
  });
});
