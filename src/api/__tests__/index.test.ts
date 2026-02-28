import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { axiosRequest } from "@/api";

vi.mock("axios", () => {
  const axiosMock = vi.fn();
  axiosMock.defaults = {
    baseURL: "",
    headers: { post: {} },
    withCredentials: false,
    timeout: 0,
  };
  axiosMock.interceptors = {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  };

  return {
    default: axiosMock,
  };
});

describe("axiosRequest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw error when method is not allowed", async () => {
    await expect(
      axiosRequest.requestAxios("head", "users/1")
    ).rejects.toThrow("허용되지 않은 호출 method입니다.");
  });

  it("should make GET request with params", async () => {
    const mockData = { status: 200, data: { id: 1 } };
    vi.mocked(axios).mockResolvedValue({ data: mockData } as never);

    const result = await axiosRequest.requestAxios<typeof mockData>("get", "users/1", {
      include: "profile",
    });

    expect(result).toEqual(mockData);
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "get",
        url: expect.stringContaining("users/1"),
        params: { include: "profile" },
      })
    );
  });

  it("should make POST request with body", async () => {
    const payload = { nickname: "tester" };
    const mockData = { status: 200, data: payload };
    vi.mocked(axios).mockResolvedValue({ data: mockData } as never);

    await axiosRequest.requestAxios<typeof mockData>("post", "users", payload);

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "post",
        url: expect.stringContaining("users"),
        data: payload,
      })
    );
  });

  it("should rethrow request error", async () => {
    const error = new Error("Network Error");
    vi.mocked(axios).mockRejectedValue(error);

    await expect(
      axiosRequest.requestAxios("get", "users/1")
    ).rejects.toThrow("Network Error");
  });
});
