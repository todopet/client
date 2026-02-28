import { ApiResponse, Category, RankInfo } from "@/@types";
import { axiosRequest } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useRankingQuery = (count: number) => {
  return useQuery({
    queryKey: ["ranking", count],
    queryFn: async () => {
      const response = await axiosRequest.requestAxios<ApiResponse<RankInfo[]>>(
        "get",
        API_ENDPOINTS.USER.RANK(count)
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 2,
    enabled: count > 0,
  });
};

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosRequest.requestAxios<ApiResponse<Category[]>>(
        "get",
        API_ENDPOINTS.CATEGORY.LIST
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 2,
  });
};
