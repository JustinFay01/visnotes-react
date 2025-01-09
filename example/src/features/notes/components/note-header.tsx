import { FlexColumn, FlexSpacer } from "@/ui/layout/flexbox";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { gridSpacing, gridSx } from "../util/note-list-grid-size";
import AddIcon from "@mui/icons-material/Add";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import DeleteIcon from "@mui/icons-material/Delete";

type NoteHeaderProps = {
  onCreate: () => void;
  onDelete: () => void;
  onAnalyze: () => void;
  checked: boolean;
  onCheck: (val: boolean) => void;
  notesSelected: boolean;
};

export const NoteHeader = ({
  onCreate,
  onDelete,
  onAnalyze,
  checked,
  onCheck,
  notesSelected,
}: NoteHeaderProps) => {
  const textSx = {
    color: "text.secondary",
    fontWeight: "bold",
  };

  const SearchBar = () => {
    return (
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-note-search">Search notes...</InputLabel>
        <OutlinedInput
          id="outlined-note-search"
          type={"text"}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search notes..."
        />
      </FormControl>
    );
  };

  return (
    <FlexColumn
      paddingTop={4}
      spacing={2}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        justifyContent: "center",
        borderRadius: 3,
        padding: 1,
      }}
    >
      <Stack spacing={2} paddingTop={2} direction={{ sm: "column", md: "row" }}>
        <SearchBar />
        <FlexSpacer />
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Create
        </Button>
        <Button
          variant="contained"
          startIcon={<TroubleshootIcon />}
          onClick={onAnalyze}
          disabled={!notesSelected}
        >
          Analyze
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          disabled={!notesSelected}
        >
          Delete
        </Button>
      </Stack>
      <Divider variant="middle" />
      <Grid container spacing={gridSpacing[0]} sx={gridSx}>
        <Checkbox
          aria-label="Select Note"
          checked={checked}
          onClick={() => onCheck(!checked)}
        />

        <Grid size={gridSpacing[1]} gap={1.5} sx={gridSx}>
          <OcrTypography variant="body2" sx={textSx}>
            File name
          </OcrTypography>
        </Grid>

        <Grid size={gridSpacing[2]} sx={gridSx}>
          <Typography variant="body2" sx={textSx}>
            File Size
          </Typography>
        </Grid>
        <Grid size={gridSpacing[3]} sx={gridSx}>
          <Typography variant="body2" sx={textSx}>
            Last Uploaded
          </Typography>
        </Grid>
        <FlexSpacer />
      </Grid>
    </FlexColumn>
  );
};
