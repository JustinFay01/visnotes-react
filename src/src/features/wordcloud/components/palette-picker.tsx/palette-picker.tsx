import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Palette, paletteOptions, palettes } from "./palettes";
import { FlexRow } from "@/ui/layout/flexbox";

type PalettePickerProps = {
  palette: Palette;
  onPaletteChange?: (palette: Palette) => void;
};

export const PalettePicker = ({
  palette,
  onPaletteChange,
}: PalettePickerProps) => {
  return (
    <FormControl>
      <InputLabel id="palette-label">Palette</InputLabel>
      <Select
        labelId="palette-label"
        id="palette"
        value={palette}
        label="Palette"
        onChange={(e) => onPaletteChange?.(e.target.value as Palette)}
      >
        {paletteOptions.map((palette) => (
          <MenuItem key={palette} value={palette}>
            <FlexRow alignItems="center">
              <Typography
                sx={{
                  marginRight: "10px",
                  fontWeight: palette === "default" ? "bold" : "normal",
                }}
              >
                {palette}
              </Typography>
              {palettes[palette].map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color,
                    marginRight: "5px",
                  }}
                />
              ))}
            </FlexRow>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
