import { TextField } from "@mui/material";

export type WordCloudTextBoxProps = {
  words: string[];
  setWords: (words: string[]) => void;
};

export const WordCloudTextBox = () => {
  return <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
};
