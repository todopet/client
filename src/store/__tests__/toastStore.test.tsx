import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useToastsStore from "@/store/toastStore";

const ToastComponent = ({ message }: { message: string }) => <div>{message}</div>;

describe("ToastStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastsStore.setState({
      toast: null,
      isShow: false,
      timer: null,
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should show toast when showToast is called", () => {
    act(() => {
      useToastsStore.getState().showToast(ToastComponent, { message: "테스트 토스트" }, 1000);
    });

    const state = useToastsStore.getState();
    expect(state.isShow).toBe(true);
    expect(state.toast).not.toBeNull();
  });

  it("should hide toast after duration", () => {
    act(() => {
      useToastsStore.getState().showToast(ToastComponent, { message: "자동 종료" }, 1000);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const state = useToastsStore.getState();
    expect(state.isShow).toBe(false);
    expect(state.toast).toBeNull();
  });

  it("should close toast immediately when closeToast is called", () => {
    act(() => {
      useToastsStore.getState().showToast(ToastComponent, { message: "즉시 종료" }, 2000);
      useToastsStore.getState().closeToast();
    });

    const state = useToastsStore.getState();
    expect(state.isShow).toBe(false);
    expect(state.toast).toBeNull();
    expect(state.timer).toBeNull();
  });
});
