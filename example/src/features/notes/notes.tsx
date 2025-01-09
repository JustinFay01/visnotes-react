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
import { OcrTypography } from "@/ui/typography/ocr-typography";

type NotesProps = React.ComponentProps<typeof Card>;

const concatNoteNames = (notes: Note[]) => {
  return notes.map((note) => note.name).join(", ");
};

export const Notes = ({ ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();
  const analyzeNote = useAnalyzeNote();
  const { data: notes } = useGetNotes();

  const { promise, error, success } = useToast();
  const { confirm } = useDialogs();

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
      <FlexColumn spacing={2}>
        <Box>
          Are you sure you want to delete the following files?
          {selectedNotes.map((note) => (
            <Box key={note.id}>- {note.name}</Box>
          ))}
        </Box>
        <OcrTypography sx={{ fontWeight: "bold" }}>
          This action cannot be undone.
        </OcrTypography>
      </FlexColumn>,
      {
        variant: "error",
        title: "Delete Notes",
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

    const successFullNotes: Note[] = [];
    const failedNotes: Note[] = [];

    // Use Promise.all to handle all delete operations simultaneously
    await Promise.all(
      selectedNotes.map((note) =>
        deleteNote
          .mutateAsync({ id: note.id })
          .then(() => successFullNotes.push(note))
          .catch(() => {
            console.error(`Failed to delete ${note.name}`);
            error(`Failed to delete ${note.name}`);
            failedNotes.push(note);
          })
      )
    );

    // Update state only once after all operations
    setSelectedNotes((prev) =>
      prev.filter((note) => !successFullNotes.some((n) => n.id === note.id))
    );

    if (successFullNotes.length > 0) {
      success(
        <OcrTypography sx={{ textOverflow: "ellipsis" }}>
          Deleted {concatNoteNames(successFullNotes)}
        </OcrTypography>
      );
    }
  };

  const handleAnalyzeClick = () => {
    const successFullNotes: Note[] = [];
    selectedNotes.forEach((note) => {
      analyzeNote
        .mutateAsync({
          id: note.id,
        })
        .catch((e) => {
          console.error(e);
          error(`Failed to analyze ${note.name}`);
        })
        .finally(() => {
          successFullNotes.push(note);
        });
    });

    if (successFullNotes.length === 0) {
      return;
    }

    success(
      <OcrTypography>
        Analyzed {concatNoteNames(successFullNotes)}
      </OcrTypography>
    );
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
                onCheck={() => {
                  if (selectedNotes.length === notes.length) {
                    setSelectedNotes([]);
                  } else {
                    setSelectedNotes(notes);
                  }
                }}
                checked={!!selectedNotes.length}
              />
              {notes.map((note, index) => (
                <FlexColumn padding={1}>
                  <NoteListTile
                    note={note}
                    checked={selectedNotes.includes(note)}
                    onCheck={(val) => {
                      if (val) {
                        setSelectedNotes([...selectedNotes, note]);
                      } else {
                        setSelectedNotes(
                          selectedNotes.filter((n) => n.id !== note.id)
                        );
                      }
                    }}
                  />
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
