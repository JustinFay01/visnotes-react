import { Analysis } from "@/features/dashboard/types/api-types";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteKeys } from "./note-key-factory";

type AnalyzeNoteOptions = {
  id: string;
};

export const analyzeNote = async ({
  id,
}: AnalyzeNoteOptions): Promise<Analysis> => {
  return (await api.post(`notes/${id}/analyses`)).data as Analysis;
};

export type AnalyzeNoteMutationOptions = {
  config?: MutationConfig<typeof analyzeNote>;
};

export const useAnalyzeNote = (options?: AnalyzeNoteMutationOptions) => {
  const queryClient = useQueryClient();

  const config = options?.config ?? {};

  return useMutation({
    mutationFn: analyzeNote,
    onSettled: (...args) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      config.onSettled?.(...args);
    },
    ...config,
  });
};
