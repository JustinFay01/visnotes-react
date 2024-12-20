import { Analysis } from "@/features/dashboard/types/api-types";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const analyzeNote = async (id: string): Promise<Analysis> => {
  return (await api.post(`notes/${id}`)).data as Analysis;
};

export type CreateNoteMutationOptions = {
  config?: MutationConfig<typeof analyzeNote>;
};

export const useCreateNote = (options: CreateNoteMutationOptions) => {
  const config = options.config ?? {};

  return useMutation({
    mutationFn: analyzeNote,
    ...config,
  });
};
