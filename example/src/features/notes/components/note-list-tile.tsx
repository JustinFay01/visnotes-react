import { Card, Checkbox, Grid2 as Grid } from "@mui/material";
import React from "react";
import { FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import {
  ConversionUnit,
  convertBytes,
} from "@/features/wordcloud/util/file-util";
import { Note } from "../types/api-types";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OcrTypography } from "@/ui/typography/ocr-typography";

type NoteListTileProps = {
  note: Note;
  checked?: boolean;
  onCheck?: (val: boolean) => void;
  unit?: ConversionUnit;
} & React.ComponentProps<typeof Card>;

const imageSx = {
  width: 30,
  height: 30,
  color: "primary.main",
};

const iconMap: { [key: string]: JSX.Element } = {
  "application/pdf": <PictureAsPdfIcon sx={imageSx} />,
  "image/jpeg": <ImageIcon />,
};

export const NoteListTile = ({
  note,
  unit = "MB",
  onCheck,
  checked,
  ...restProps
}: NoteListTileProps) => {
  const [internalChecked, setInternalChecked] = React.useState(
    checked ?? false
  );

  const controlled = checked !== undefined;

  const handleCheck = () => {
    if (!controlled) {
      setInternalChecked(!internalChecked);
    }

    if (onCheck) {
      onCheck(!internalChecked);
    }
  };

  const formatDate = (date: Date): string => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDay();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <Card
      key={note.id}
      sx={{
        border: "none",
      }}
      {...restProps}
    >
      <Grid container spacing={2} alignItems="center">
        <Checkbox
          aria-label="Select Note"
          checked={controlled ? checked : internalChecked}
          onClick={handleCheck}
        />

        <Grid size={3} gap={1.5} sx={{ display: "flex", alignItems: "center" }}>
          {iconMap[note.type] ?? <ArticleIcon />}
          <OcrTypography variant="body2" sx={{ fontWeight: "bold" }}>
            {note.name}
          </OcrTypography>
        </Grid>

        <Grid
          size={2}
          sx={{ display: "flex", alignItems: "center" }}
        >{`${convertBytes(unit, note.size).toPrecision(1)} ${unit}`}</Grid>
        <Grid size={2} sx={{ display: "flex", alignItems: "center" }}>
          {formatDate(new Date(note.createdAt))}
        </Grid>
        <FlexSpacer />
        <MoreVertIcon />
      </Grid>
    </Card>
  );
};
