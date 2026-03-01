import { updateIcon } from "@/modules/icons";
import { NickName } from "@/components/pages/MyPage/NickName";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "@/api";
import { ApiResponse, MyUser } from "@/@types";
import { notifyApiError, notifySuccessMessage } from "@/libs/utils/notifyApiError";
import { API_ENDPOINTS } from "@/api/endpoints";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nicknameSchema, type NicknameFormValues } from "@/schemas/user.schema";

interface userinfoType {
  picture: string;
  name: string;
  date: string;
}

export const UserInfo = ({ picture, name, date }: userinfoType) => {
  const [isNicknameModal, setIsNicknameModal] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  });

  const getUserName = async () => {
    try {
      const response: ApiResponse<MyUser> = await axiosRequest.requestAxios<ApiResponse<MyUser>>(
        "get",
        API_ENDPOINTS.USER.PROFILE
      );
      reset({ nickname: response.data.nickname });
    } catch (error) {
      notifyApiError(error, "회원 정보를 가져오는중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const nickname = watch("nickname");
  const helperText = errors.nickname?.message ??
    (nickname.length > 0 ? "올바른 닉네임입니다." : "닉네임을 입력하세요.");
  const isDefaultState = nickname.length === 0;
  const isSuccessState = !errors.nickname && nickname.length > 0;

  const inputColor = () => {
    if (isSuccessState) return "#bff2bd";
    if (isDefaultState) return "#d1d1d1";
    return "#FF5656";
  };

  const textColor = () => {
    if (isSuccessState) return "#5bd756";
    if (isDefaultState) return "#ababab";
    return "#ff1919";
  };

  const handleClick = () => {
    getUserName();
    setIsNicknameModal(true);
  };

  const handleClose = () => {
    setIsNicknameModal(false);
  };

  const handleNicknameChange = async ({ nickname }: NicknameFormValues) => {
    try {
      const response: ApiResponse<MyUser> = await axiosRequest.requestAxios<ApiResponse<MyUser>>(
        "patch",
        API_ENDPOINTS.USER.MY_INFO,
        { nickname: nickname.trim() }
      );
      if (response.data) {
        // 닉네임이 제대로 변경이 되었을 때
        notifySuccessMessage("닉네임이 수정되었습니다!");
      } else {
        // 글자 제한을 통과하지 못해 변경이 되지 않았을때
        return; // 닉네임 변경 버튼 눌러도 반응없음
      }
      navigate(0); // 페이지 새로고침
    } catch (error) {
      notifyApiError(error, "닉네임 변경중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 w-full h-[15%]">
      <div
        className="w-20 h-20 rounded-[15px] bg-center bg-cover shadow"
        style={{ backgroundImage: `url(${picture})` }}
      />
      <div className="flex flex-col h-20 w-1/2">
        <div className="flex justify-end items-center gap-1 h-[55%]">
          <NickName name={name} />
          <div
            className="w-[18px] h-[18px] bg-center bg-cover cursor-pointer hover:opacity-50"
            style={{ backgroundImage: `url(${updateIcon})` }}
            onClick={handleClick}
          />
          {isNicknameModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.58)] backdrop-blur-sm w-full h-screen left-1/2 -translate-x-1/2">
              <div className="w-[80%] h-[190px] rounded-[25px] bg-white mb-[60px] flex flex-col justify-between">
                <p className="font-bold text-[1.1rem] pl-[10%] mb-0">닉네임 변경하기</p>
                <div className="w-full h-1/2 flex flex-col justify-center items-center gap-1">
                  <Controller
                    name="nickname"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="w-[70%] h-[45%] rounded-[20px] mt-2 px-4 text-[16px] outline-none border-2"
                        style={{ borderColor: inputColor() }}
                      />
                    )}
                  />
                  <span
                    className="h-[14px] w-full text-[10.5px] pl-20"
                    style={{ color: textColor(), opacity: textColor() ? 1 : 0 }}
                  >
                    {helperText}
                  </span>
                  <span className="h-[14px] w-full text-[10.5px] pl-20 text-[#ababab]">
                    {nickname.length}/8
                  </span>
                </div>
                <div className="flex justify-end items-center gap-[0.7rem] px-[30px] pb-5">
                  <button
                    className="w-[45px] h-[35px] rounded-[15px] bg-[#aaeea8] text-[#28b666] border-0 cursor-pointer"
                    onClick={handleClose}
                  >
                    취소
                  </button>
                  <button
                    className="w-[100px] h-[35px] rounded-[15px] bg-[#e7e8ea] border-0 cursor-pointer"
                    onClick={() => void handleSubmit(handleNicknameChange)()}
                    disabled={!isValid || isSubmitting}
                  >
                    닉네임 변경
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="my-[10px] h-1/2 flex justify-end pr-1">가입일 : {date}</p>
      </div>
    </div>
  );
};

// interface classType {
//     className: string;
//     onClick(): void;
//     children?: React.ReactNode;
// }

// removed styled-component helper exports
