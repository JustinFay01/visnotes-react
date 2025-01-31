import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type AnalyzeDocumentOptions = {
  file: File;
};

export const analyzeDocument = async ({
  file,
}: AnalyzeDocumentOptions): Promise<string[]> => {
  const formData = new FormData();
  formData.append("file", file);
  return (await api.post("di", formData)).data as string[];
};

export const useAnalyzeDocumentMutation = () => {
  return useMutation({
    mutationFn: analyzeDocument,
  });
};
