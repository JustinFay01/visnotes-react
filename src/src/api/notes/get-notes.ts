import { Note } from "@/features/notes/types/api-types";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { noteKeys } from "./note-key-factory";

export const getNotes = async (): Promise<Note[]> => {
  return (await api.get("notes")).data as Note[];
};

export const useGetNotes = () => {
  return useQuery({
    queryKey: noteKeys.all,
    queryFn: getNotes,
  });
};
