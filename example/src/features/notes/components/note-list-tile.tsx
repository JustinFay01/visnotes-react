import { Card } from "@mui/material";
import React from "react";
import { FlexRow } from "@/ui/layout/flexbox";
import {
  ConversionUnit,
  convertBytes,
} from "@/features/wordcloud/util/file-util";
import { Note } from "../types/api-types";

type NoteListTileProps = {
  note: Note;
  unit?: ConversionUnit;
} & React.ComponentProps<typeof Card>;

export const NoteListTile = ({
  note,
  unit = "KB",
  ...restProps
}: NoteListTileProps) => {
  return (
    <Card key={note.id} {...restProps}>
      <FlexRow>
        {note.name}
        {note.createdAt.toString()}
        {convertBytes(unit, note.size)}
      </FlexRow>
    </Card>
  );
};
