import React, { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "@/components/ConfirmModal";
import {
    InputContainer,
    StyledInput,
    Text,
    ActionButtonWrap,
    ActionButton,
    ModalText,
    ModalButtonWrap,
    ModalButton,
    SpanText
} from "@/components/pages/Category/CategoryContent/CategoryContentPost/CategoryContentPost.styles";
import { axiosRequest } from "@/api";
import { category, res } from "@/@types";
import { notifyApiError, notifySuccessMessage } from "@/libs/utils/notifyApiError";

interface CategoryPostProps {
    subject: string;
    onTextSend: (text: string) => void;
    id: string | null;
}

interface ConfirmContentProps {
    message: React.ReactNode;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({
    message,
    onCancel,
    onConfirm
}) => {
    return (
        <>
            <ModalText>{message}</ModalText>
            <ModalButtonWrap>
                <ModalButton onClick={onCancel}>
                    <Text>취소</Text>
                </ModalButton>
                <ModalButton onClick={onConfirm}>
                    <Text>확인</Text>
                </ModalButton>
            </ModalButtonWrap>
        </>
    );
};

export const CategoryContentPost: React.FC<CategoryPostProps> = ({
    subject,
    onTextSend,
    id
}) => {
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");

    const getCategory = async () => {
        if (id) {
            try {
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("get", `todoCategories/${id}`);
                setInputValue(response.data.category);
                onTextSend(response.data.category);
            } catch (error) {
                notifyApiError(
                    error,
                    "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
                );
            }
        }
    };
    const handleOpenEndModal = () => {
        setIsEndModalOpen(true);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEndModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmEndModal = async () => {
        handleCloseModal();
        if (id) {
            try {
                // PATCH 요청으로 목표를 종료
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("patch", `todoCategories/endCategory/${id}`);
                if (!response.error) {
                    notifySuccessMessage("목표가 종료되었습니다.");
                    navigate("/category/list");
                } else {
                    throw new Error("목표 종료를 실패했습니다.");
                }
            } catch (error) {
                notifyApiError(error, "목표를 종료하지 못했습니다. 다시 시도해 주세요.");
            }
        }
    };

    const handleConfirmDeleteModal = async () => {
        handleCloseModal();
        if (id) {
            try {
                // PATCH 요청으로 목표를 종료
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("delete", `todoCategories/${id}`);
                if (!response.error) {
                    notifySuccessMessage("목표가 삭제되었습니다.");
                    navigate("/category/list");
                } else {
                    throw new Error("목표 삭제를 실패했습니다.");
                }
            } catch (error) {
                notifyApiError(error, "목표를 삭제하지 못했습니다. 다시 시도해 주세요.");
            }
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onTextSend(e.target.value);
    };

    const SettingButton = (subject: string) => {
        return (
            subject === "수정" && (
                <>
                    <ActionButtonWrap>
                        <ActionButton variant="exit" onClick={handleOpenEndModal}>
                            종료하기
                        </ActionButton>
                        <ActionButton
                            variant="delete"
                            onClick={handleOpenDeleteModal}
                        >
                            삭제
                        </ActionButton>
                    </ActionButtonWrap>
                    {isEndModalOpen && (
                        <ConfirmModal>
                            <ConfirmContent
                                message={
                                    <>
                                        <SpanText isred={"false"}>
                                            목표를 종료하시겠습니까?
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            기존의 할 일 목록은 유지되지만,
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            새로운 입력은 제한됩니다.
                                        </SpanText>
                                    </>
                                }
                                onConfirm={handleConfirmEndModal}
                                onCancel={handleCloseModal}
                            />
                        </ConfirmModal>
                    )}
                    {isDeleteModalOpen && (
                        <ConfirmModal>
                            <ConfirmContent
                                message={
                                    <>
                                        <SpanText isred={"false"}>
                                            목표를 삭제하시겠습니까?
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            기존의 할 일 목록이 모두 삭제됩니다.
                                        </SpanText>
                                    </>
                                }
                                onConfirm={handleConfirmDeleteModal}
                                onCancel={handleCloseModal}
                            />
                        </ConfirmModal>
                    )}
                </>
            )
        );
    };

    return (
        <>
            <InputContainer>
                <StyledInput
                    type="text"
                    value={inputValue}
                    onChange={handleInput}
                    placeholder="목표를 입력하세요!"
                    autoFocus
                />
            </InputContainer>
            {SettingButton(subject)}
        </>
    );
};
