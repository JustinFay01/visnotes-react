import { SpiralType } from "@/features/dashboard/types/word-cloud-types";
import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

export type WordCloudFormProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
};

export const WordCloudForm = (props: WordCloudFormProps) => {
  const { withRotation, setWithRotation, spiralType, setSpiralType } = props;

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
      </FlexRow>
    </FlexColumn>
  );
};
