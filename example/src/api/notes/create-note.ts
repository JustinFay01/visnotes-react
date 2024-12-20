import { Note } from "@/features/dashboard/types/api-types";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

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

export const useCreateNote = (options: CreateNoteMutationOptions) => {
  const config = options.config ?? {};

  return useMutation({
    mutationFn: createNote,
    ...config,
  });
};
