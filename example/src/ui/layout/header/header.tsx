import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" fontWeight={"bold"}>
          OCR
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
