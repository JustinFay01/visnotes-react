import { Grid2 as Grid } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ColorChip } from "./color-chip";
import { ColorPickerButton } from "./color-picker-button";

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
      <AnimatePresence>
        {colors.map((color, index) => (
          <Grid key={index} size={{ xs: 6, sm: 3, md: 2 }}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <ColorChip color={color} onDelete={handleDelete} />
            </motion.div>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
