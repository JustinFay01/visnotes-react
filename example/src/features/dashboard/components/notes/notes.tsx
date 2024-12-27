import { useCreateNote } from "@/api/notes/create-note";
import { OcrDropzone, OcrDropzoneRef } from "@/ui/components/form/dropzone";
import { useToast } from "@/ui/components/toasts/use-toast";
import { useDialogs } from "@/ui/dialogs";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Card } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import { Note } from "../../types/api-types";
import { convertBytes } from "../../util/file-util";
import { NoteHeader } from "./note-header";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef<GridRowsProp[number]>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    description: "MIME type of the file",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    valueFormatter: (val) => `${new Date(val).toLocaleDateString()}`,
  },
  {
    field: "analyzed",
    headerName: "Analyzed",
    valueFormatter: (val) => (val ? "yes" : "no"),
  },
  {
    field: "size",
    headerName: "Size (KB)",
    align: "right",
    valueFormatter: (val) => `${convertBytes("KB", val).toPrecision(5)} KB`,
  },
];

type NotesProps = {
  notes?: Note[];
  setNotes?: (notes: Note[]) => void;
} & React.ComponentProps<typeof Card>;

type NoteRowElement = {
  analyzed: boolean;
} & Note;

const mapToNoteRow = (note: Note): NoteRowElement => {
  return {
    ...note,
    analyzed: note.analyses?.length ?? 0 > 0 ? true : false,
  };
};

const mapToNoteRows = (notes: Note[]): NoteRowElement[] => {
  return notes.map(mapToNoteRow);
};

export const Notes = ({ notes, ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const dropZoneRef = useRef<OcrDropzoneRef>(null);

  const { success, error } = useToast();
  const { confirm } = useDialogs();

  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const handleCreateClick = () => {
    dropZoneRef.current?.open();
  };

  const handleAcceptedFiles = (files: File[]) => {
    files.forEach(async (f) => {
      console.log("Creating note for file", f.name);
      try {
        await createNote.mutateAsync({
          file: f,
        });
        success(`${f.name} uploaded successfully`);
      } catch (e) {
        error(`Error uploading ${f.name}`);
        console.error(e);
      }
    });
  };

  const handleDeleteClick = async () => {
    const confirmed = await confirm("Are you sure?", {
      variant: "error",
      icon: (
        <DeleteIcon
          fontSize="inherit"
          sx={{
            color: "error.light",
          }}
        />
      ),
    });

    if (confirmed) error("Cannot delete notes yet...");
  };

  const handleAnalyzeClick = () => {
    success("Analyzing Note");
  };

  return (
    <Card {...cardProps}>
      <FlexColumn
        padding={2}
        spacing={2}
        sx={{
          marginBottom: 3,
        }}
      >
        <NoteHeader
          onCreate={handleCreateClick}
          onDelete={handleDeleteClick}
          onAnalyze={handleAnalyzeClick}
        />
        <OcrDropzone
          ref={dropZoneRef}
          handleAcceptedFiles={handleAcceptedFiles}
        >
          <DataGrid
            columns={columns}
            rows={mapToNoteRows(notes ?? [])}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(selectedNoteRowId) => {
              console.log(selectedNoteRowId);
            }}
            sx={{
              bgcolor: "background.paper", // Ensures background matches theme
              color: "text.primary",
              "& .MuiDataGrid-cell": {
                color: "text.primary",
              },
            }}
          />
        </OcrDropzone>
      </FlexColumn>
    </Card>
  );
};
