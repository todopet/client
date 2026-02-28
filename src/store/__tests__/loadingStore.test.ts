import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLoadingStore } from "@/store/loadingStore";

describe("LoadingStore", () => {
  beforeEach(() => {
    useLoadingStore.getState().resetLoading();
  });

  it("should increase loading count and set isLoading true", () => {
    act(() => {
      useLoadingStore.getState().startLoading();
    });

    const state = useLoadingStore.getState();
    expect(state.loadingCount).toBe(1);
    expect(state.isLoading).toBe(true);
  });

  it("should not decrease loading count below zero", () => {
    act(() => {
      useLoadingStore.getState().stopLoading();
    });

    const state = useLoadingStore.getState();
    expect(state.loadingCount).toBe(0);
    expect(state.isLoading).toBe(false);
  });

  it("should reset loading state", () => {
    act(() => {
      useLoadingStore.getState().startLoading();
      useLoadingStore.getState().startLoading();
      useLoadingStore.getState().resetLoading();
    });

    const state = useLoadingStore.getState();
    expect(state.loadingCount).toBe(0);
    expect(state.isLoading).toBe(false);
  });
});
