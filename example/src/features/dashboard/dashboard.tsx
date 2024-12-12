import { FlexColumn, FlexRow } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { useState } from "react";
import { WordCloudOptions } from "./components/word-cloud/word-cloud-options/word-cloud-options";
import { SpiralType } from "./types/word-cloud-types";

export const Dashboard = () => {
  const windowHook = useWindowDimensions();

  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);
  const [inputType, setInputType] = useState<"text" | "image">("text");

  return (
    <FlexColumn spacing={5}>
      <FlexColumn paddingX={8} paddingTop={4}>
        <Typography
          variant="h4"
          component={"h1"}
          fontWeight={"bold"}
          gutterBottom
        >
          Wordcloud
        </Typography>
        <WordCloudOptions
          withRotation={withRotation}
          setWithRotation={setWithRotation}
          spiralType={spiralType}
          setSpiralType={setSpiralType}
          inputType={inputType}
        />
      </FlexColumn>
      <OcrWordCloud
        width={windowHook.width > 800 ? 800 : windowHook.width}
        height={500}
        spiralType={spiralType}
        withRotation={withRotation}
      />
    </FlexColumn>
  );
};
