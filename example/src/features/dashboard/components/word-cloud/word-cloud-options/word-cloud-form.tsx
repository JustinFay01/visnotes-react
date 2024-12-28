import { SpiralType } from "@/features/dashboard/types/word-cloud-types";
import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect } from "react";

// Remove when wrapper component is created
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";

export type WordCloudFormProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
  color: IColor;
  setColor: (color: IColor) => void;
};

export const WordCloudForm = (props: WordCloudFormProps) => {
  const {
    withRotation,
    setWithRotation,
    spiralType,
    setSpiralType,
    color,
    setColor,
  } = props;

  const [internalColor, setInternalColor] = useColor(color.hex);

  const debounceColor = useCallback(debounce(setColor, 100), [internalColor]);

  const handleColorChange = (color: IColor) => {
    setInternalColor(color);
    console.log(internalColor);
    debounceColor(color);
  };

  const handleStyleChange = (e: SelectChangeEvent) => {
    setSpiralType(e.target.value as SpiralType);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWithRotation(e.target.checked);
  };

  return (
    <FlexColumn>
      <Typography variant="h6">Options</Typography>
      <Typography variant="subtitle1">
        Customize your word cloud with the options below
      </Typography>

      <FlexRow>
        <FlexSpacer />
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
        <FormControlLabel
          control={
            <Checkbox checked={withRotation} onChange={handleRotationChange} />
          }
          label="With Rotation"
        />
        <ColorPicker color={internalColor} onChange={handleColorChange} />
      </FlexRow>
    </FlexColumn>
  );
};
