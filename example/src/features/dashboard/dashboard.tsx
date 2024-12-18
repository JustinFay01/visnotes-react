import useWindowDimensions from "@/hooks/use-window-dimensions";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";
import { useState } from "react";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import { WordCloudOptions } from "./components/word-cloud/word-cloud-options/word-cloud-options";
import { SpiralType, WordData } from "./types/word-cloud-types";
import { useAnalyzeDocumentMutation } from "@/api/di";
import { WordDataHelper } from "./util/word-data-helper";

export const Dashboard = () => {
  const useAnalyzeDocument = useAnalyzeDocumentMutation();
  const windowHook = useWindowDimensions();

  const [files, setFiles] = useState<File[]>([]);

  const [words, setWords] = useState<WordData[]>([]);
  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  const handleAnalyze = async () => {
    if (files.length === 0) {
      return;
    }

    try {
      const data = await useAnalyzeDocument.mutateAsync({
        file: files[0],
      });

      setWords(WordDataHelper.countWordsFromArray(data));
    } catch (error) {
      console.error(error);
    }
  };

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
          files={files}
          setFiles={setFiles}
          withRotation={withRotation}
          setWithRotation={setWithRotation}
          spiralType={spiralType}
          setSpiralType={setSpiralType}
          onSubmit={handleAnalyze}
        />
      </FlexColumn>
      <OcrWordCloud
        words={words}
        width={windowHook.width > 800 ? 800 : windowHook.width}
        height={500}
        spiralType={spiralType}
        withRotation={withRotation}
      />
    </FlexColumn>
  );
};
