import { FlexColumn } from "@/ui/layout/flexbox";
import { Card } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useRef } from "react";
import { Note } from "../../types/api-types";
import { convertBytes } from "../../util/file-util";
import { NoteHeader } from "./note-header";
import { useCreateNote } from "@/api/notes/create-note";
import { toast } from "react-toastify";
import { useToast } from "@/ui/components/toasts/use-toast";
import { OcrDropzone, OcrDropzoneRef } from "@/ui/components/form/dropzone";

type NotesProps = {
  notes?: Note[];
  setNotes?: (notes: Note[]) => void;
} & React.ComponentProps<typeof Card>;

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
  },

  {
    field: "size",
    headerName: "Size (KB)",
    align: "right",
    valueFormatter: (val) => `${convertBytes("KB", val).toPrecision(5)} KB`,
  },
];

export const Notes = ({ notes, ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const dropZoneRef = useRef<OcrDropzoneRef>(null);
  const { success, error } = useToast();

  const handleCreateClick = () => {
    dropZoneRef.current?.open();
  };

  const handleDeleteClick = () => {
    error("Deleting Note");
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
        <OcrDropzone ref={dropZoneRef}>
          <DataGrid
            columns={columns}
            rows={notes?.map((n) => {
              return {
                ...n,
                analyzed: n.analyses?.length ?? 0 > 0 ? true : false,
              };
            })}
            checkboxSelection
            disableRowSelectionOnClick
            autoPageSize
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
