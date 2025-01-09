import { useAnalyzeNote } from "@/api/notes/analyze-note";
import { useCreateNote } from "@/api/notes/create-note";
import { useDeleteNote } from "@/api/notes/delete-note";
import { useGetNotes } from "@/api/notes/get-notes";
import { OcrDropzoneRef } from "@/ui/components/form/dropzone";
import { useToast } from "@/ui/components/toasts/use-toast";
import { useDialogs } from "@/ui/dialogs";
import { FlexColumn } from "@/ui/layout/flexbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, Divider } from "@mui/material";
import React, { useState } from "react";
import { NoteDropzone } from "./components/note-dropzone";
import { NoteHeader } from "./components/note-header";
import { NoteListTile } from "./components/note-list/note-list-tile";
import { Note } from "./types/api-types";
import { EmptyNoteList } from "./components/note-list/empty-note-list";

type NotesProps = React.ComponentProps<typeof Card>;

export const Notes = ({ ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();
  const analyzeNote = useAnalyzeNote();
  const { data: notes } = useGetNotes();

  const { promise } = useToast();
  const { confirm } = useDialogs();

  //@ts-ignore - This will be fixed in the next update
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const dropzoneRef = React.useRef<OcrDropzoneRef>(null);

  const handleAcceptedFiles = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const promises: Promise<Note>[] = [];
    files.forEach(async (f) => {
      console.log("Creating note for file", f.name);
      const prom = createNote.mutateAsync({
        file: f,
      });
      promises.push(prom);
    });

    const moreThanOne = promises.length > 1;

    promise(
      Promise.all(promises),
      `Uploading ${moreThanOne ? `${promises.length} files` : files[0].name}`,
      `Uploaded ${moreThanOne ? `${promises.length} files` : files[0].name}`,
      "One or more files failed to upload"
    );
  };

  const handleDeleteClick = async () => {
    const confirmed = await confirm(
      `Are you sure you want to delete (${selectedNotes.length}) note(s)?`,
      {
        variant: "error",
        icon: (
          <DeleteIcon
            fontSize="inherit"
            sx={{
              color: "error.light",
            }}
          />
        ),
      }
    );

    if (!confirmed) {
      return;
    }

    selectedNotes.forEach(async (note) => {
      const prom = deleteNote.mutateAsync({
        id: note.id,
      });
      promise(
        prom,
        `Deleting ${note.name}`,
        `Deleted ${note.name}`,
        `Failed to delete ${note.name}`
      );
    });
  };

  const handleAnalyzeClick = () => {
    selectedNotes.forEach(async (note) => {
      const prom = analyzeNote.mutateAsync({
        id: note.id,
      });
      promise(
        prom,
        `Analyzing ${note.name}`,
        `Analyzed ${note.name}`,
        `Failed to analyze ${note.name}`
      );
    });
  };

  return (
    <FlexColumn
      spacing={5}
      paddingX={2}
      paddingBottom={10}
      sx={{
        backgroundColor: "background.paper",
        overflowY: "auto",
      }}
    >
      <Box sx={{ display: "none" }} />
      <NoteDropzone
        ref={dropzoneRef}
        handleAcceptedFiles={handleAcceptedFiles}
        handleRejectedFiles={() => {}}
      />
      <Card
        sx={{
          borderRadius: 5,
          backgroundColor: "background.main",

          boxShadow: "none",
        }}
        {...cardProps}
      >
        <FlexColumn spacing={2} sx={{ backgroundColor: "background.main" }}>
          {!notes ? (
            <EmptyNoteList />
          ) : (
            <FlexColumn
              spacing={2}
              sx={{
                marginTop: 2,
                backgroundColor: "background.paper",
                borderRadius: 5,
                padding: 1,
              }}
            >
              <NoteHeader
                onCreate={() => dropzoneRef.current?.open()}
                onDelete={handleDeleteClick}
                onAnalyze={handleAnalyzeClick}
                notesSelected={selectedNotes.length > 0}
              />
              {notes.map((note, index) => (
                <FlexColumn padding={1}>
                  <NoteListTile note={note} />
                  {index < notes.length - 1 && <Divider />}
                </FlexColumn>
              ))}
            </FlexColumn>
          )}
        </FlexColumn>
      </Card>
    </FlexColumn>
  );
};
