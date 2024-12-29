import { FlexRow } from "@/ui/layout/flexbox";
import { ColorChip } from "./color-chip";
import { ColorPickerButton } from "./color-picker-button";
import { Grid2 as Grid } from "@mui/material";

export type PalettePickerProps = {
  colors: string[];
  setColors: (colors: string[]) => void;
};
export const PalettePicker = ({ colors, setColors }: PalettePickerProps) => {
  const handleDelete = (color: string) => {
    const newColors = colors.filter((c) => c !== color);
    setColors(newColors);
  };

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 6, sm: 3, md: 2 }}>
        <ColorPickerButton
          onCompleted={(color) => setColors([...colors, color.hex])}
        />
      </Grid>
      {colors.map((color, index) => (
        <Grid key={index} size={{ xs: 6, sm: 3, md: 2 }}>
          <ColorChip color={color} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  );
};
