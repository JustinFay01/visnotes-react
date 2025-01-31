import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { getTextColor } from "../../util/color-util";

type ColorChipProps = {
  color: string;
  onDelete: (color: string) => void;
};

export const ColorChip = ({ color, onDelete }: ColorChipProps) => {
  const [textColor, setTextColor] = useState<string>("");
  const handleDelete = () => {
    onDelete(color);
  };

  useEffect(() => {
    setTextColor(getTextColor(color));
  }, [color]);

  return (
    <Chip
      label={color}
      onDelete={handleDelete}
      sx={{
        backgroundColor: color,
        color: textColor,
      }}
    />
  );
};
