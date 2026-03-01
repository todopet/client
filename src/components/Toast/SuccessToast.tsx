import React from "react";

interface SuccessToastProps {
  message: string;
}

export const SuccessToast = ({ message }: SuccessToastProps) => {
  return (
    <div
      className="fixed top-4 left-1/2 z-50 max-w-[90%] -translate-x-1/2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};
