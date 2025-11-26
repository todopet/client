import { updateIcon } from "@/modules/icons";
import NickName from "../NickName/NickName";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "@/api";
import { res, myUser } from "@/@types/index";

interface userinfoType {
    picture: string;
    name: string;
    date: string;
}

export function UserInfo({ picture, name, date }: userinfoType) {
    const [isNicknameModal, setIsNicknameModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const getUserName = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("get", "users/user");
            setNickname(response.data.nickname);
        } catch (error) {
            alert(
                "회원 정보를 가져오는중 에러가 발생했습니다. 다시 시도해 주세요."
            );
            console.log("Error fetching pet data: ", error);
        }
    };

    useEffect(() => {
        // 상태가 변경될 때마다 실행되는 코드
        const hasWhitespace = /\s/.test(nickname);

        if (hasWhitespace) {
            setError("공백은 포함될수 없습니다.");
            return;
        }
        if (nickname.length > 8) {
            setError("닉네임은 8글자 이하여야 합니다.");
            return;
        }
        if (nickname.length > 0) {
            setError("올바른 닉네임입니다.");
        } else {
            setError("닉네임을 입력하세요.");
        }
    }, [nickname]);

    const inputColor = () => {
        if (error === "올바른 닉네임입니다.") return "#bff2bd";
        if (error === "닉네임을 입력하세요.") return "#d1d1d1";
        return "#FF5656";
    };

    const textColor = () => {
        if (error === "올바른 닉네임입니다.") return "#5bd756";
        if (error === "닉네임을 입력하세요.") return "#ababab";
        return "#ff1919";
    };

    const handleClick = () => {
        getUserName();
        setIsNicknameModal(true);
    };

    const handleClose = () => {
        setIsNicknameModal(false);
    };

    const handleNicknameChange = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("patch", "users/myInfo", { nickname });
            if (response.data) {
                // 닉네임이 제대로 변경이 되었을 때
                alert("닉네임이 수정되었습니다!");
            } else {
                // 글자 제한을 통과하지 못해 변경이 되지 않았을때
                return; // 닉네임 변경 버튼 눌러도 반응없음
            }
            navigate(0); // 페이지 새로고침
        } catch (error) {
            alert("닉네임 변경중 에러가 발생했습니다. 다시 시도해 주세요.");
            console.log("Error fetching pet data: ", error);
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
                        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.58)] backdrop-blur-sm w-[390px] h-screen left-1/2 -translate-x-1/2">
                            <div className="w-[80%] h-[190px] rounded-[25px] bg-white mb-[60px] flex flex-col justify-between">
                                <p className="font-bold text-[1.1rem] pl-[10%] mb-0">닉네임 변경하기</p>
                                <div className="w-full h-1/2 flex flex-col justify-center items-center gap-1">
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                                        className="w-[70%] h-[45%] rounded-[20px] mt-2 px-4 text-[16px] outline-none border-2"
                                        style={{ borderColor: inputColor() }}
                                    />
                                    <span className="h-[14px] w-full text-[10.5px] pl-20" style={{ color: textColor(), opacity: textColor() ? 1 : 0 }}>
                                        {error}
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
                                        onClick={handleNicknameChange}
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
}

interface classType {
    className: string;
    onClick(): void;
    children?: React.ReactNode;
}

// removed styled-component helper exports
