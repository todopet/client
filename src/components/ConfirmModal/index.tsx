import React, { PropsWithChildren } from "react";

interface ConfirmModalProps extends PropsWithChildren {}

export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { children } = props;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.58)] backdrop-blur-sm w-full h-screen left-1/2 -translate-x-1/2">
      <div className="flex flex-col justify-around w-[18.5625rem] h-[10.125rem] text-center text-black bg-white shadow-md rounded-[1.25rem] p-4 px-6">
        {children}
      </div>
    </div>
  );
};
