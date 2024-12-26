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

  return { success, error };
};
