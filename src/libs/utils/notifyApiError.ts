import { handleApiError } from "@/api/errorHandler";
import { ErrorToast } from "@/components/Toast/ErrorToast";
import { SuccessToast } from "@/components/Toast/SuccessToast";
import useToastsStore from "@/store/toastStore";

export const notifyApiError = (error: unknown, customMessage?: string) => {
  const message = handleApiError(error, customMessage);
  useToastsStore.getState().showToast(ErrorToast, { message });
};

export const notifyErrorMessage = (message: string) => {
  useToastsStore.getState().showToast(ErrorToast, { message });
};

export const notifySuccessMessage = (message: string) => {
  useToastsStore.getState().showToast(SuccessToast, { message });
};
