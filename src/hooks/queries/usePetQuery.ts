import { ApiResponse, MyPet } from "@/@types";
import { axiosRequest } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export const usePetQuery = () => {
  return useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const response = await axiosRequest.requestAxios<ApiResponse<MyPet>>(
        "get",
        API_ENDPOINTS.PET.INFO
      );
      return response.data.pet;
    },
    staleTime: 1000 * 60 * 5,
  });
};
