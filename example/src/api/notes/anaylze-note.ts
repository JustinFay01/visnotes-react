import { Analysis } from "@/features/dashboard/types/api-types";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const analyzeNote = async (id: string): Promise<Analysis> => {
  return (await api.post(`notes/${id}`)).data as Analysis;
};

export type AnalyzeNoteMutationOptions = {
  config?: MutationConfig<typeof analyzeNote>;
};

export const useAnalyzeNote = (options?: AnalyzeNoteMutationOptions) => {
  const config = options?.config ?? {};

  return useMutation({
    mutationFn: analyzeNote,
    ...config,
  });
};
