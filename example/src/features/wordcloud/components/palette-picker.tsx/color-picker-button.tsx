import { lightThemeColors } from "@/lib/theme";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";
import { useState } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
// @ts-expect-error does not have a default export but is a valid import
import "react-color-palette/css";
import { getTextColor } from "../../util/color-util";

type ColorPickerButtonProps = {
  onCompleted?: (color: IColor) => void;
} & Omit<React.ComponentProps<typeof Button>, "children">;

export const ColorPickerButton = ({
  onCompleted,
  ...rest
}: ColorPickerButtonProps) => {
  const [buttonColor, setButtonColor] = useColor(lightThemeColors.grey);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [textColor, setTextColor] = useState<string>("");

  const handleSetColor = (color: IColor) => {
    setButtonColor(color);
    setTextColor(getTextColor(color.hex));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);

  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        startIcon={<AddIcon style={{ color: textColor }} />}
        sx={{
          backgroundColor: buttonColor.hex,
          color: textColor,
        }}
        {...rest}
      >
        Add Color
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ColorPicker
          color={buttonColor}
          onChange={handleSetColor}
          onChangeComplete={onCompleted}
        />
      </Popover>
    </>
  );
};
