interface ConfirmFormProps {
  message: string;
  yesMessage?: string;
  noMessage?: string;
  yesCallback: () => void;
  noCallback?: () => void;
  commonCallback?: () => void;
}

export const Confirm = (params: ConfirmFormProps) => {
  const {
    message,
    yesMessage = "예",
    noMessage = "아니오",
    yesCallback,
    noCallback = () => {},
    commonCallback = () => {},
  } = params;

  const callback = async (callbackFn: () => void) => {
    await commonCallback();
    await callbackFn();
  };

  return (
    <div className="flex h-[10.125rem] w-60 flex-col">
      <div className="flex flex-col gap-[1.125rem] px-6 py-[1.125rem]">
        <p className="h-[1.625rem] w-full whitespace-pre-wrap break-words text-center text-[0.8125rem] leading-5 text-[#8D8D8D]">
          {message}
        </p>
      </div>
      <div className="flex justify-end gap-[0.6875rem] px-6 pb-4 pt-1">
        <button
          type="button"
          onClick={() => callback(noCallback)}
          className="h-10 rounded-md bg-gray-100 px-4 text-sm font-medium text-gray-900"
        >
          {noMessage}
        </button>
        <button
          type="button"
          onClick={() => callback(yesCallback)}
          className="h-10 rounded-md bg-black px-4 text-sm font-medium text-white"
        >
          {yesMessage}
        </button>
      </div>
    </div>
  );
};
