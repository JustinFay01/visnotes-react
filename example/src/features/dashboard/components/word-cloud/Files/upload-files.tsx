import { FlexColumn } from "@/ui/layout/flexbox";
import { Card, Box, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React from "react";

const convertBytes = (to: "KB" | "MB" | "GB", bytes: number) => {
  const units = ["B", "KB", "MB", "GB"];
  const index = units.indexOf(to);
  return bytes / Math.pow(1024, index);
};

type FileCardProps = {
  file: File;
  onDelete: (file: File) => void;
} & React.ComponentProps<typeof Card>;

const FileCard = ({ file }: FileCardProps) => {
  return (
    <Card
      key={file.name}
      sx={{
        padding: 2,
        marginBottom: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between", // Evenly spaces child items
      }}
      component={"div"}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InsertDriveFileIcon sx={{ color: "primary.main" }} />
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {file.name}
        </Typography>
        {file.lastModified && (
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
            }}
          >
            {new Date(file.lastModified).toLocaleString()}
          </Typography>
        )}
      </Box>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.8rem",
        }}
      >
        {`${convertBytes("KB", file.size).toFixed(2)} KB`}
      </Typography>
    </Card>
  );
};

type UploadFilesProps = {
  files: File[];
  onDelete?: (files: File[]) => void;
} & React.ComponentProps<typeof FlexColumn>;

export const UploadFiles = ({ files, onDelete }: UploadFilesProps) => {
  const handleDelete = (file: File) => {
    onDelete?.(files.filter((f) => f !== file));
  };

  return (
    <FlexColumn
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {files.map((file) => (
        <FileCard key={file.name} file={file} onDelete={() => handleDelete} />
      ))}
    </FlexColumn>
  );
};
