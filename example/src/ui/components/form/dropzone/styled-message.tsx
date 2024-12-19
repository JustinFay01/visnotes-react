import { styled, Box } from "@mui/material";

export const StyledMessage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<{ isDragActive: boolean }>(({ theme, isDragActive }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  fontWeight: 700,
  height: 48,
  borderRadius: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "340px",
  position: "absolute",
  left: "50%",
  zIndex: 10,
  transform: `${
    isDragActive
      ? "translateX(-50%) scale(1)"
      : "translateX(-50%) translateY(100px) scale(0.8)"
  }`,
  opacity: isDragActive ? 1 : 0,
  transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
}));
