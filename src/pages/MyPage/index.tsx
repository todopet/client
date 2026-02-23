import React from "react";
import { UserInfo } from "@/components/pages/MyPage/UserInfo";
import { Activity } from "@/components/pages/MyPage/Activity";
import { res, myUser } from "@/@types";
import { axiosRequest } from "@/api";
import { formatDateToString } from "@/libs/utils/global";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/libs/hooks/useModal";
import { Confirm } from "@/components/Confirm";
import { notifyApiError, notifySuccessMessage } from "@/libs/utils/notifyApiError";

interface ConfirmContentProps {
  message: React.ReactNode;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <>
      <div className="flex h-[3.8125rem] flex-col justify-center shrink-0 text-black text-center text-[0.875rem] font-normal whitespace-pre-wrap">
        {message}
      </div>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={onCancel}
          className="w-[7.07894rem] h-8 shrink-0 rounded-[0.5rem] bg-[#e7e8ea] border-0"
        >
          <p className="text-[15px] m-0">취소</p>
        </button>
        <button
          onClick={onConfirm}
          className="w-[7.07894rem] h-8 shrink-0 rounded-[0.5rem] bg-[#e7e8ea] border-0"
        >
          <p className="text-[15px] m-0">확인</p>
        </button>
      </div>
    </>
  );
};

const MyPage = () => {
  const { openModal, closeModal } = useModal();

  const [userInfo, setUserInfo] = useState<myUser>({
    _id: "",
    nickname: "",
    picture: "",
    createdAt: new Date(),
    withPetDate: 0,
    todoCount: 0,
    historyCount: 0,
  });

  const handleConfirmLogout = async () => {
    try {
      const response = await axiosRequest.requestAxios<res<{}>>("post", "logout");
      console.log(response);
      if (response.status === 200) {
        notifySuccessMessage("로그아웃 처리되었습니다.");
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      notifyApiError(error, "로그아웃에 실패하였습니다 :(");
    }
  };
  const handleConfirmWithdraw = async () => {
    try {
      const response = await axiosRequest.requestAxios<res<{}>>("post", "withdraw");
      if (response.status === 200) {
        notifySuccessMessage("회원 탈퇴 처리되었습니다.");
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      notifyApiError(error, "회원 탈퇴 처리 실패");
    }
  };

  const getUserInfo = async () => {
    try {
      const response: res<myUser> = await axiosRequest.requestAxios<res<myUser>>(
        "get",
        "users",
        {}
      );
      setUserInfo(response.data);
    } catch (error) {
      notifyApiError(error, "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const openWithdrawModal = () => {
    openModal(
      <ConfirmContent
        message={
          <>
            <span className="mb-[5px] text-black">
              {userInfo.nickname}님의 펫이 기다리고 있어요!
            </span>
            <span className="mb-[5px] text-red-500">회원 탈퇴시 해당 계정으로</span>
            <span className="mb-[5px] text-red-500">영원히 서비스를 이용할 수 없어요 😥</span>
            <span className="mb-[5px] text-black">그래도 탈퇴하시겠어요?</span>
          </>
        }
        onConfirm={async () => {
          closeModal();
          await handleConfirmWithdraw();
        }}
        onCancel={closeModal}
      />,
      null,
      "회원탈퇴 안내",
      {
        isNotTitle: true,
        size: 297,
      }
    );
  };

  const navigate = useNavigate();
  return (
    <div className="w-full h-full min-h-[700px] relative flex flex-col gap-8 justify-center items-center">
      <UserInfo
        picture={userInfo.picture}
        name={userInfo.nickname}
        date={formatDateToString(userInfo.createdAt)}
      ></UserInfo>
      <div className="flex flex-col w-[85%] h-1/2 justify-center gap-8">
        <Activity activityType="heart" data={userInfo.withPetDate.toString()}></Activity>
        <Activity activityType="calendar" data={userInfo.historyCount.toString()}></Activity>
        <Activity activityType="check" data={userInfo.todoCount.toString()}></Activity>
      </div>
      <div className="flex justify-center items-center gap-4 w-[85%] mt-[30px]">
        <button
          className="w-1/2 h-12 rounded-[10px] text-[16px] font-medium"
          style={{ backgroundColor: "#F5F5F5" }}
          onClick={() => {
            openModal(
              <Confirm
                message="로그아웃 하시겠습니까?"
                yesCallback={handleConfirmLogout}
                commonCallback={closeModal}
              />,
              null,
              "로그아웃 안내"
            );
          }}
        >
          로그아웃
        </button>
        <button
          className="w-1/2 h-12 rounded-[10px] text-[16px] font-medium"
          style={{ backgroundColor: "#F5F5F5" }}
          onClick={openWithdrawModal}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
