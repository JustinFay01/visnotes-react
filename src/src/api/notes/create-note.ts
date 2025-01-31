import { Note } from "@/features/notes/types/api-types";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteKeys } from "./note-key-factory";

type CreateNoteOptions = {
  file: File;
};

export const createNote = async ({
  file,
}: CreateNoteOptions): Promise<Note> => {
  const formData = new FormData();
  formData.append("file", file);
  return (await api.post("notes", formData)).data as Note;
};

export type CreateNoteMutationOptions = {
  config?: MutationConfig<typeof createNote>;
};

export const useCreateNote = (options?: CreateNoteMutationOptions) => {
  const queryClient = useQueryClient();

  const config = options?.config ?? {};

  return useMutation({
    mutationFn: createNote,
    onSettled: (...args) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.all,
      });

      config.onSettled?.(...args);
    },
    ...config,
  });
};
