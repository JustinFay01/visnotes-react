import { styled, Box } from "@mui/material";

export const StyledDropzone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<{ isDragActive: boolean }>(({ theme, isDragActive }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `2px solid ${
    isDragActive ? theme.palette.primary.main : "transparent"
  }`,
  backgroundColor: isDragActive
    ? theme.palette.action.hover
    : theme.palette.background.default,
  transition: "border 0.2s ease-out, background-color 0.2s ease-out",
  borderRadius: theme.shape.borderRadius,
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    borderColor: theme.palette.primary.main,
  },
}));
