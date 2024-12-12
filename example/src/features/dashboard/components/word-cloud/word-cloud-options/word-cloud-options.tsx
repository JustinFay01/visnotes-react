import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { SpiralType } from "@dashboard/types/word-cloud-types";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent } from "react";
import { WordCloudUpload } from "./word-cloud-upload";
import { WordCloudOptionsHeader } from "./word-cloud-options-header";

type WordCloudOptionsProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
};
export const WordCloudOptions = (props: WordCloudOptionsProps) => {
  const { withRotation, setWithRotation, spiralType, setSpiralType } = props;

  const handleStyleChange = (e: SelectChangeEvent) => {
    setSpiralType(e.target.value as SpiralType);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWithRotation(e.target.checked);
  };

  return (
    <FlexColumn>
      <WordCloudOptionsHeader type="image" />
      <FlexRow>
        <WordCloudUpload />
        <FormGroup>
          <FormControl fullWidth>
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
          <FlexSpacer />
          <FormControlLabel
            control={
              <Checkbox
                checked={withRotation}
                onChange={handleRotationChange}
              />
            }
            label="With Rotation"
          />
        </FormGroup>
      </FlexRow>
    </FlexColumn>
  );
};
