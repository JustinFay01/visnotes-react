import { Note } from "@/features/notes/types/api-types";
import { api } from "@/lib/axios";
import { noteKeys } from "./note-key-factory";
import { useQuery } from "@tanstack/react-query";

export const getNote = async (id: string): Promise<Note> => {
  return (await api.get(`notes/${id}`)).data as Note;
};

export type GetNoteOptions = {
  id: string;
};

export const getNoteQueryOptions = (id: string) => {
  return {
    queryKey: noteKeys.single(id),
    queryFn: () => getNote(id),
  };
};

export const useGetNote = (id: string) => {
  return useQuery({
    ...getNoteQueryOptions(id),
  });
};
