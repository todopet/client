import React from "react";

interface ErrorToastProps {
  message: string;
}

export const ErrorToast = ({ message }: ErrorToastProps) => {
  return (
    <div
      className="fixed top-4 left-1/2 z-50 max-w-[90%] -translate-x-1/2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};
