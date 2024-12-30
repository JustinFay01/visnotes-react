import { useGetNotes } from "@/api/notes/get-notes";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { totoAfricaLyrics } from "./assets/text-fixture";
import { Notes } from "./components/notes/notes";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import { WordCloudForm } from "./components/word-cloud/word-cloud-options/word-cloud-form";
import { SpiralType, WordData } from "./types/word-cloud-types";
import { WordDataHelper } from "./util/word-data-helper";
import { palettes } from "./components/palette-picker.tsx/palettes";

export const Dashboard = () => {
  // Hooks
  const windowHook = useWindowDimensions();
  const getNotes = useGetNotes();

  const [words, setWords] = useState<WordData[]>(
    WordDataHelper.countWordsFromString(totoAfricaLyrics)
  );

  const [colors, setColors] = useState<string[]>(palettes.default);
  const [backgroundColor, setBackgroundColor] = useState<
    "white" | "black" | "background.main"
  >("background.main");

  // Options
  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  return (
    <FlexColumn spacing={5}>
      <FlexColumn paddingX={8} paddingTop={4} spacing={2}>
        <Typography
          variant="h4"
          component={"h1"}
          fontWeight={"bold"}
          gutterBottom
        >
          Wordcloud
        </Typography>
        <Notes notes={getNotes.data} />

        <WordCloudForm
          withRotation={withRotation}
          setWithRotation={setWithRotation}
          spiralType={spiralType}
          setSpiralType={setSpiralType}
          colors={colors}
          setColors={setColors}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
      </FlexColumn>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: 4,
        }}
      >
        <OcrWordCloud
          words={words}
          width={windowHook.width > 800 ? 800 : windowHook.width}
          height={500}
          spiralType={spiralType}
          withRotation={withRotation}
          colors={colors}
        />
      </Box>
    </FlexColumn>
  );
};
