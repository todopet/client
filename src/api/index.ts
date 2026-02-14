import axios from "axios";
import { useLoadingStore } from "@/store/loadingStore";

const allowMethod: string[] = ["get", "post", "put", "patch", "delete"];

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

// 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    // 로딩 시작
    useLoadingStore.getState().startLoading();

    // FormData인 경우 Content-Type 자동 설정
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    // 로딩 종료
    useLoadingStore.getState().stopLoading();
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axios.interceptors.response.use(
  (response) => {
    // 로딩 종료
    useLoadingStore.getState().stopLoading();
    return response;
  },
  (error) => {
    // 로딩 종료
    useLoadingStore.getState().stopLoading();

    // 401 인증 에러 처리
    if (error.response?.status === 401) {
      // 로그인 페이지로 리다이렉트 (인터셉터에서는 경고만 출력)
      console.warn('[Auth Error] 인증이 만료되었습니다.');
    }

    return Promise.reject(error);
  }
);

// 정의된 함수 시그니처에 맞게 인터페이스 생성
interface AxiosRequest {
  requestAxios: <T>(method: string, url: string, data?: {}, headers?: {}) => Promise<T>;
}

export const axiosRequest: AxiosRequest = {
  /**
   * 작성자명   : 원종석
   * 작성일자   : 2023.08.02.(수)
   * 작성내용   : axios로 요청 보내기
   * 수정일자   : none
   * 수정내용   : none
   * @param method 어떤 형식의 method를 보내는지 설정 (get, post, put, patch, delete)
   * @param url 호출 url 작성. path param은 url에 같이 정의해준다.
   * @param data request body에 해당하는 사항. post, put 시 추가/수정할 객체를 지정해주면 된다. get은 빈 객체를 보낸다.
   */
  requestAxios: async <T>(method: string, url: string, data = {}, headers = {}) => {
    // 이상한 method 넣으면 실행 못하게 미리 에러 처리 한다.
    if (!allowMethod.includes(method.toLowerCase()))
      throw new Error("허용되지 않은 호출 method입니다.");
    try {
      const response = await axios({
        method,
        url: `${axios.defaults.baseURL}${url}`,
        data,
        headers, // 아이템, 인벤토리 호출할때만 넣기. 주요 기능에만 제한하는 것은 어떨지
      });

      return response.data as T;
    } catch (error) {
      // 에러는 인터셉터에서 처리되므로 그대로 throw
      throw error;
    }
  },
};