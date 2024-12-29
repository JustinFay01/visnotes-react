import { lightThemeColors } from "@/lib/theme";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";
import { useState } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import { getTextColor } from "../../util/color-util";

type ColorPickerButtonProps = {
  onCompleted?: (color: IColor) => void;
};

export const ColorPickerButton = ({ onCompleted }: ColorPickerButtonProps) => {
  const [buttonColor, setButtonColor] = useColor(lightThemeColors.grey);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

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
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: buttonColor.hex,
          color: getTextColor(buttonColor.hex),
        }}
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
          onChange={setButtonColor}
          onChangeComplete={onCompleted}
        />
      </Popover>
    </>
  );
};
