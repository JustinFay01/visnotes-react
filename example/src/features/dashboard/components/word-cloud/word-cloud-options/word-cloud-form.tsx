import { SpiralType } from "@/features/dashboard/types/word-cloud-types";
import { FlexColumn } from "@/ui/layout/flexbox";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

// Remove when wrapper component is created
import { OcrAccordion } from "@/ui/components/form/accordion/ocr-accordion";
import { CustomPalettePicker } from "../../palette-picker.tsx/custom-palette-picker";
import { PalettePicker } from "../../palette-picker.tsx/palette-picker";
import {
  Palette,
  paletteOptions,
  palettes,
} from "../../palette-picker.tsx/palettes";

export type WordCloudFormProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
};

export const WordCloudForm = (props: WordCloudFormProps) => {
  const {
    withRotation,
    setWithRotation,
    spiralType,
    setSpiralType,
    colors,
    setColors,
  } = props;

  const [palette, setPalette] = useState<Palette>("default");

  const handleStyleChange = (e: SelectChangeEvent) => {
    setSpiralType(e.target.value as SpiralType);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWithRotation(e.target.checked);
  };

  return (
    <FlexColumn padding={2} sx={{ backgroundColor: "background.paper" }}>
      <OcrTypography variant="h4">Options</OcrTypography>
      <Typography variant="subtitle1">
        Customize your word cloud with the options below
      </Typography>

      <OcrAccordion summary="Layout">
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 6 }}>
            <FormControl>
              <InputLabel id="style-label">Spiral</InputLabel>
              <Select
                labelId="style-label"
                id="style"
                value={spiralType}
                label="Style"
                onChange={handleStyleChange}
              >
                <MenuItem value={"archimedean"}>Archimedean</MenuItem>
                <MenuItem value={"rectangular"}>Rectangular</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withRotation}
                  onChange={handleRotationChange}
                />
              }
              label="With Rotation"
            />
          </Grid>
        </Grid>
      </OcrAccordion>

      <OcrAccordion summary="Color">
        <FlexColumn paddingBottom={4}>
          <OcrTypography variant="h6">Custom Colors</OcrTypography>
          <CustomPalettePicker colors={colors} setColors={setColors} />
        </FlexColumn>

        <FlexColumn paddingBottom={4}>
          <OcrTypography variant="h6">Palettes</OcrTypography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Choose from a selection of color options
          </Typography>
          <PalettePicker
            palette={palette}
            onPaletteChange={(pal) => {
              setPalette(pal);
              setColors(palettes[pal]);
            }}
          />
        </FlexColumn>
      </OcrAccordion>
    </FlexColumn>
  );
};
