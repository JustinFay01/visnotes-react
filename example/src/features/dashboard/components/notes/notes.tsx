import { FlexColumn } from "@/ui/layout/flexbox";
import { Card } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import { Note } from "../../types/api-types";
import { convertBytes } from "../../util/file-util";
import { NoteHeader } from "./note-header";
import { useCreateNote } from "@/api/notes/create-note";
import { toast } from "react-toastify";
import { useToast } from "@/ui/components/toasts/use-toast";

type NotesProps = {
  notes?: Note[];
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
    field: "size",
    headerName: "Size (KB)",
    valueFormatter: (val) => `${convertBytes("KB", val).toPrecision(5)} KB`,
  },
  {
    field: "analyzed",
    headerName: "Analyzed",
  },
];

export const Notes = ({ notes, ...cardProps }: NotesProps) => {
  const createNote = useCreateNote();
  const { success, error } = useToast();

  const handleCreateClick = () => {
    success("Creating Note");
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
        <DataGrid
          columns={columns}
          rows={notes?.map((n) => {
            return {
              ...n,
              analyzed: n.analyses?.length ?? 0 > 0 ? "yes" : "no",
            };
          })}
          checkboxSelection
          disableRowSelectionOnClick
          autosizeOnMount
          autoPageSize
          sx={{
            bgcolor: "background.paper", // Ensures background matches theme
            color: "text.primary",
            "& .MuiDataGrid-cell": {
              color: "text.primary",
            },
          }}
        />
      </FlexColumn>
    </Card>
  );
};
