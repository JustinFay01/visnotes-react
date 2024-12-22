import useWindowDimensions from "@/hooks/use-window-dimensions";
import { FlexColumn } from "@/ui/layout/flexbox";
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import { WordCloudOptions } from "./components/word-cloud/word-cloud-options/word-cloud-options";
import { SpiralType, WordData } from "./types/word-cloud-types";
import { WordDataHelper } from "./util/word-data-helper";
import { totoAfricaLyrics } from "./assets/text-fixture";
import { toast } from "react-toastify";
import { useGetNotes } from "@/api/notes/get-notes";
import { useCreateNote } from "@/api/notes/anaylze-note";
import { Note } from "./types/api-types";
import { Notes } from "./components/notes/notes";

export const Dashboard = () => {
  // Hooks
  const windowHook = useWindowDimensions();
  const notify = (message: string) => toast(message);
  const getNotes = useGetNotes();
  const createNote = useCreateNote();

  const [words, setWords] = useState<WordData[]>(
    WordDataHelper.countWordsFromString(totoAfricaLyrics)
  );

  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  // Options
  const [spiralType, setSpiralType] = useState<SpiralType>("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  // Methods
  useEffect(() => {
    const notes = getNotes.data ?? [];
    console.log("notes");

    setSavedNotes(notes);
  }, [getNotes.data]);

  return (
    <FlexColumn spacing={5}>
      <Notes notes={savedNotes} />

      <FlexColumn paddingX={8} paddingTop={4} spacing={2}>
        <Typography
          variant="h4"
          component={"h1"}
          fontWeight={"bold"}
          gutterBottom
        >
          Wordcloud
        </Typography>

        <WordCloudOptions
          files={filesToUpload}
          setFiles={setFilesToUpload}
          withRotation={withRotation}
          setWithRotation={setWithRotation}
          spiralType={spiralType}
          setSpiralType={setSpiralType}
          onSubmit={async () => {
            console.error("Not yet");
          }}
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
