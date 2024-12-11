import { SpiralType } from "@dashboard/types/word-cloud-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type WordCloudOptionsProps = {
  style: SpiralType;
  setStyle: (style: SpiralType) => void;
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
};
export const WordCloudOptions = ({
  style,
  setStyle,
  ...props
}: WordCloudOptionsProps) => {
  const handleStyleChange = (e: SelectChangeEvent) => {
    setStyle(e.target.value as SpiralType);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="style-label">Age</InputLabel>
      <Select
        labelId="style-label"
        id="style"
        value={style}
        label="Style"
        onChange={handleStyleChange}
      >
        <MenuItem value={"archimedean"}>Archimedean</MenuItem>
        <MenuItem value={"rectangular"}>Rectangular</MenuItem>
      </Select>
    </FormControl>
  );
};
