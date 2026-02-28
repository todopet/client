import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastType } from "@/@types";
import { useTodosStore } from "@/store/todoStore";

describe("TodoStore", () => {
  beforeEach(() => {
    useTodosStore.setState({
      selectedDate: "",
      startDate: "",
      endDate: "",
      dateTodos: [],
      periodTodos: [],
      message: {
        type: ToastType.NORMAL,
        reward: null,
        inventoryCount: 0,
      },
      isActiveToast: false,
      timer: null,
    });
  });

  it("should set selected date", () => {
    const { result } = renderHook(() => useTodosStore());

    act(() => {
      result.current.setSelectedDate("2024-01-01");
    });

    expect(result.current.selectedDate).toBe("2024-01-01");
  });

  it("should set start and end date together", () => {
    const { result } = renderHook(() => useTodosStore());

    act(() => {
      result.current.setStartEndDate("2024-01-01", "2024-01-31");
    });

    expect(result.current.startDate).toBe("2024-01-01");
    expect(result.current.endDate).toBe("2024-01-31");
  });
});
