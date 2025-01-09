import {
  ConversionUnit,
  convertBytes,
} from "@/features/wordcloud/util/file-util";
import { FlexSpacer } from "@/ui/layout/flexbox";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Card, Checkbox, Grid2 as Grid } from "@mui/material";
import React from "react";
import { Note } from "../../types/api-types";
import { gridSpacing, gridSx } from "../../util/note-list-grid-size";

type NoteListTileProps = {
  note: Note;
  checked: boolean;
  onCheck: (val: boolean) => void;
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
  const formatDate = (date: Date): string => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDay();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <Card
      key={note.id}
      sx={{ border: "none", boxShadow: "none" }}
      {...restProps}
    >
      <Grid container spacing={gridSpacing[0]} sx={gridSx}>
        <Checkbox
          aria-label="Select Note"
          checked={checked}
          onClick={() => onCheck(!checked)}
        />

        <Grid size={gridSpacing[1]} gap={1.5} sx={gridSx}>
          {iconMap[note.type] ?? <ArticleIcon />}
          <OcrTypography variant="body2" sx={{ fontWeight: "bold" }}>
            {note.name}
          </OcrTypography>
        </Grid>

        <Grid size={gridSpacing[2]} sx={gridSx}>{`${convertBytes(
          unit,
          note.size
        ).toPrecision(1)} ${unit}`}</Grid>
        <Grid size={gridSpacing[3]} sx={gridSx}>
          {formatDate(new Date(note.createdAt))}
        </Grid>
        <FlexSpacer />
        <MoreVertIcon />
      </Grid>
    </Card>
  );
};
