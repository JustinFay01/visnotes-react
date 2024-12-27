import { toast, ToastOptions } from "react-toastify";

export const useToast = () => {
  const success = (
    message: string,
    options?: ToastOptions<unknown> | undefined
  ) =>
    toast(message, {
      type: "success",
      ...options,
    });

  const error = (
    message: string,
    options?: ToastOptions<unknown> | undefined
  ) => {
    toast(message, {
      type: "error",
      ...options,
    });
  };

  const promise = (
    promise: Promise<unknown>,
    pendingMessage: string,
    successMessage: string,
    errorMessage: string,
    options?: ToastOptions<unknown> | undefined
  ) => {
    toast.promise(promise, {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage,
      ...options,
    });
  };

  return { success, error, promise };
};
