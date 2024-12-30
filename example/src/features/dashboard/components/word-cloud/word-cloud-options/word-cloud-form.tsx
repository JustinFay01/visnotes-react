import { SpiralType } from "@/features/dashboard/types/word-cloud-types";
import { FlexColumn, FlexRow } from "@/ui/layout/flexbox";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import {
  Box,
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
import { Palette, palettes } from "../../palette-picker.tsx/palettes";

export type WordCloudFormProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
  backgroundColor: "white" | "black" | "background.main";
  setBackgroundColor: (
    backgroundColor: "white" | "black" | "background.main"
  ) => void;
};

export const WordCloudForm = (props: WordCloudFormProps) => {
  const {
    withRotation,
    setWithRotation,
    spiralType,
    setSpiralType,
    colors,
    setColors,
    backgroundColor,
    setBackgroundColor,
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

        <FlexColumn>
          <OcrTypography variant="h6">Background Color</OcrTypography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Choose the background color for your word cloud
          </Typography>

          <FlexRow spacing={2}>
            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("black")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "black",
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "black" ? "primary.main" : "",
                }}
              />
              Black
            </FlexColumn>

            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("white")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "white" ? "primary.main" : "",
                }}
              />
              White
            </FlexColumn>

            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("background.main")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  opacity: 0.25,
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "background.main" ? "primary.main" : "",
                }}
              />
              Transparent
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </OcrAccordion>
    </FlexColumn>
  );
};
