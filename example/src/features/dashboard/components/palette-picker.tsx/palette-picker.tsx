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
    <Grid container rowSpacing={1}>
      <Grid size={2} sx={{ minWidth: "120px", maxWidth: "120px" }}>
        <ColorPickerButton
          onCompleted={(color) => setColors([...colors, color.hex])}
        />
      </Grid>
      <AnimatePresence>
        {colors.map((color) => (
          <motion.div
            key={color}
            layout // Enable layout animations so elements will slide to their new position
            animate={{ opacity: 1, scale: 1 }} // Animate to opacity: 1 (visible) and scale: 1 (100% size)
            initial={{ opacity: 0, scale: 0 }} // so it grows from 0 to 1
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0 }} // so it shrinks to 0 and then disappears
          >
            <Grid size={2} sx={{ minWidth: "120px", maxWidth: "120px" }}>
              <ColorChip color={color} onDelete={handleDelete} />
            </Grid>
          </motion.div>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
