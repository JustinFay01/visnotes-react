import { FlexColumn, FlexRow } from "@/ui/layout/flexbox";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Grid2 as Grid } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ColorChip } from "./color-chip";
import { ColorPickerButton } from "./color-picker-button";
import { palettes } from "./palettes";

export type CustomPalettePickerProps = {
  colors: string[];
  setColors: (colors: string[]) => void;
};
export const CustomPalettePicker = ({
  colors,
  setColors,
}: CustomPalettePickerProps) => {
  const handleDelete = (color: string) => {
    const newColors = colors.filter((c) => c !== color);
    setColors(newColors);
  };

  return (
    <FlexColumn>
      <FlexRow spacing={2} sx={{ marginBottom: "8px" }}>
        <ColorPickerButton
          onCompleted={(color) => setColors([...colors, color.hex])}
        />
        <Button
          color="error"
          onClick={() => setColors(palettes.default)}
          startIcon={<ClearIcon />}
          variant="outlined"
          sx={{
            width: "125px",
          }}
        >
          Reset
        </Button>
      </FlexRow>
      <Grid container rowSpacing={1}>
        <AnimatePresence>
          {colors.map((color) => (
            <motion.div
              key={color}
              layout // Enable layout animations so elements will slide to their new position
              animate={{ opacity: 1, scale: 1 }} // Animate to opacity: 1 (visible) and scale: 1 (100% size)
              initial={{ opacity: 0, scale: 0 }} // so it grows from 0 to 1
              transition={{ duration: 0.05 }}
              exit={{ opacity: 0, scale: 0 }} // so it shrinks to 0 and then disappears
            >
              <Grid size={2} sx={{ minWidth: "120px", maxWidth: "120px" }}>
                <ColorChip color={color} onDelete={handleDelete} />
              </Grid>
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>
    </FlexColumn>
  );
};
