import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteKeys } from "./note-key-factory";

type DeleteNoteOptions = {
  id: string;
};

export const deleteNote = async ({ id }: DeleteNoteOptions): Promise<void> => {
  await api.delete(`notes/${id}`);
};

export type DeleteNoteMutationOptions = {
  config?: MutationConfig<typeof deleteNote>;
};

export const useDeleteNote = (options?: DeleteNoteMutationOptions) => {
  const queryClient = useQueryClient();

  const config = options?.config ?? {};

  return useMutation({
    mutationFn: deleteNote,
    onSettled: (...args) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      config.onSettled?.(...args);
    },
    ...config,
  });
};
