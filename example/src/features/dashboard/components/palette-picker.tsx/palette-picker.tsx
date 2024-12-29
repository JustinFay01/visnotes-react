import { FlexColumn } from "@/ui/layout/flexbox";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import "react-color-palette/css";
import { ColorPickerButton } from "./color-picker-button";

export type PalettePickerProps = {
  color: IColor;
  setColor: (color: IColor) => void;
};
export const PalettePicker = () => {
  //   const [internalColor, setInternalColor] = useColor("#121212");
  //   const debounceColor = useCallback(debounce(setColor, 100), [internalColor]);
  return (
    <FlexColumn padding={2}>
      <ColorPickerButton />
    </FlexColumn>
  );
};
