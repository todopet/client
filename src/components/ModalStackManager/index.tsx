import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "@/libs/hooks/useModal";

type ModalProps = {
  component: React.ReactNode; // 모달로 사용될 컴포넌트
  parameter: unknown; // 전달할 파라미터
  opened: boolean; // 모달이 열려있는지 여부
  title: string | React.ReactNode; // 모달의 타이틀
  onClose: (result?: unknown) => void; // 모달이 닫힐 때 실행할 콜백 함수
  options?: {
    size?: string | number; // 모달의 크기
    isTitleCentered?: boolean; // 타이틀을 중앙 정렬할지 여부
    closeOnClickOutside?: boolean; // 모달 외부 클릭 시 닫힐지 여부
    isNotTitle?: boolean; // 타이틀을 표시하지 않을지 여부
    isCloseButton?: boolean; // 닫기 버튼을 표시할지 여부
  };
};

// Context and hook are defined in ./context to satisfy react-refresh rule

const sizeMap: Record<string, string> = {
  xs: "320px",
  sm: "380px",
  md: "440px",
  lg: "620px",
  xl: "780px",
};

const getSizeValue = (size?: string | number) => {
  if (typeof size === "number") return `${size}px`;
  if (typeof size === "string") return sizeMap[size] ?? size;
  return "auto";
};

export const ModalStackManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalProps[]>([]);

  const hasModal = modalStack.length > 0;
  const topIndex = modalStack.length - 1;
  const topModal = modalStack[topIndex];
  const portalTarget = useMemo(() => (typeof document === "undefined" ? null : document.body), []);

  const openModal = (
    component: React.ReactNode,
    parameter: unknown,
    title: string | React.ReactNode,
    options?: {
      size?: string | number;
      isTitleCentered?: boolean;
      closeOnClickOutside?: boolean;
      isNotTitle?: boolean;
      isCloseButton?: boolean;
    }
  ): Promise<unknown> => {
    return new Promise<unknown>((resolve) => {
      const modalProps = {
        component,
        parameter,
        onClose: resolve,
        title,
        opened: true,
        options,
      };
      setModalStack((prevStack) => [...prevStack, modalProps]);
    });
  };

  const closeModal = useCallback((result?: unknown) => {
    setModalStack((prevStack) => {
      const currentModal = prevStack[prevStack.length - 1];
      currentModal?.onClose?.(result);

      return prevStack.slice(0, -1);
    });
  }, []);

  useEffect(() => {
    if (!hasModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [hasModal]);

  useEffect(() => {
    if (!hasModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const shouldClose = topModal?.options?.closeOnClickOutside ?? true;
        if (shouldClose) closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasModal, topModal, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {portalTarget &&
        modalStack.map((modalProps, index) => {
          const zIndex = 2000 + index * 2;
          const sizeValue = getSizeValue(modalProps.options?.size);
          const closeOnClickOutside = modalProps.options?.closeOnClickOutside ?? true;

          return createPortal(
            <div
              key={index}
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 flex items-center justify-center p-4"
              style={{ zIndex }}
            >
              <div
                aria-hidden="true"
                onClick={() => {
                  if (closeOnClickOutside) closeModal();
                }}
                className="absolute inset-0 bg-black/45"
              />
              <div
                className="relative max-h-[90vh] w-auto max-w-[90vw] overflow-auto rounded-xl bg-white text-gray-900 shadow-[0_24px_48px_rgba(0,0,0,0.2)]"
                style={{ zIndex: zIndex + 1, width: sizeValue }}
              >
                {!modalProps.options?.isNotTitle && (
                  <div className="flex w-full items-center gap-3 border-b border-gray-200 px-4 py-[1.125rem]">
                    <div
                      className={`flex-1 text-xl font-semibold text-gray-900 ${
                        modalProps.options?.isTitleCentered ? "text-center" : "text-left"
                      }`}
                    >
                      {modalProps.title}
                    </div>
                    {!modalProps.options?.isCloseButton && (
                      <button
                        type="button"
                        onClick={() => closeModal()}
                        aria-label="Close modal"
                        className="text-xl leading-none text-gray-500 transition-colors hover:text-gray-700"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                )}
                <div className="p-4">{modalProps.component}</div>
              </div>
            </div>,
            portalTarget,
            `modal-${index}`
          );
        })}
    </ModalContext.Provider>
  );
};
