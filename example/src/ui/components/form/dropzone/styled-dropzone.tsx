import { styled, Box } from "@mui/material";

export const StyledDropzone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<{ isDragActive: boolean }>(({ theme, isDragActive }) => ({
  position: "relative",
  overflow: "hidden",
  height: "100%",
  width: "100%",
  border: `2px solid ${
    isDragActive ? theme.palette.primary.main : "transparent"
  }`,
  backgroundColor: isDragActive
    ? theme.palette.action.hover
    : theme.palette.background.default,
  transition: "border 0.2s ease-out, background-color 0.2s ease-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    borderColor: theme.palette.primary.main,
  },
}));
