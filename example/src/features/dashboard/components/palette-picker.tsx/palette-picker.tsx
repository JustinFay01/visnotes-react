import { FlexRow } from "@/ui/layout/flexbox";
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
    <FlexRow padding={2} spacing={2}>
      <ColorPickerButton
        onCompleted={(color) => setColors([...colors, color.hex])}
      />
      {colors.map((color, index) => (
        <ColorChip key={index} color={color} onDelete={handleDelete} />
      ))}
    </FlexRow>
  );
};
