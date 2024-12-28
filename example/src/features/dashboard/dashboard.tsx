import { useGetNotes } from "@/api/notes/get-notes";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useColor } from "react-color-palette";
import { totoAfricaLyrics } from "./assets/text-fixture";
import { Notes } from "./components/notes/notes";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import { WordCloudOptions } from "./components/word-cloud/word-cloud-options/word-cloud-options";
import { SpiralType, WordData } from "./types/word-cloud-types";
import { WordDataHelper } from "./util/word-data-helper";

export const Dashboard = () => {
  // Hooks
  const windowHook = useWindowDimensions();
  const getNotes = useGetNotes();

  const [words, setWords] = useState<WordData[]>(
    WordDataHelper.countWordsFromString(totoAfricaLyrics)
  );

  const [color, setColor] = useColor("#561ecb");

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

        <WordCloudOptions
          withRotation={withRotation}
          setWithRotation={setWithRotation}
          spiralType={spiralType}
          setSpiralType={setSpiralType}
          color={color}
          setColor={setColor}
        />
      </FlexColumn>
      <OcrWordCloud
        words={words}
        width={windowHook.width > 800 ? 800 : windowHook.width}
        height={500}
        spiralType={spiralType}
        withRotation={withRotation}
        colors={[color.hex]}
      />
    </FlexColumn>
  );
};
