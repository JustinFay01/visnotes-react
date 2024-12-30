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
        {colors.map((color, index) => (
          <Grid
            key={index}
            size={2}
            sx={{ minWidth: "120px", maxWidth: "120px" }}
          >
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
