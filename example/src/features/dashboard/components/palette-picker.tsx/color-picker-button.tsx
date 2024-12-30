import { lightThemeColors } from "@/lib/theme";
import AddIcon from "@mui/icons-material/Add";
import { Box, Chip, Popover } from "@mui/material";
import { useState } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import { getTextColor } from "../../util/color-util";
import "react-color-palette/css";

type ColorPickerButtonProps = {
  onCompleted?: (color: IColor) => void;
};

export const ColorPickerButton = ({ onCompleted }: ColorPickerButtonProps) => {
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
      <Chip
        aria-describedby={id}
        onClick={handleClick}
        icon={<AddIcon style={{ color: textColor }} />}
        label="Add Color"
        sx={{
          backgroundColor: buttonColor.hex,
          color: textColor,
        }}
      />
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
