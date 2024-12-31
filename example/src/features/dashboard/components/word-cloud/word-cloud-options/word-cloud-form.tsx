import {
  SpiralType,
  WordData,
} from "@/features/dashboard/types/word-cloud-types";
import { FlexColumn, FlexRow, FlexSpacer } from "@/ui/layout/flexbox";
import { OcrTypography } from "@/ui/typography/ocr-typography";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

// Remove when wrapper component is created
import { OcrAccordion } from "@/ui/components/form/accordion/ocr-accordion";
import { CustomPalettePicker } from "../../palette-picker.tsx/custom-palette-picker";
import { PalettePicker } from "../../palette-picker.tsx/palette-picker";
import { Palette, palettes } from "../../palette-picker.tsx/palettes";
import { Note } from "@/features/dashboard/types/api-types";
import { useDialogs } from "@/ui/dialogs";
import { WordDataHelper } from "@/features/dashboard/util/word-data-helper";

export type WordCloudFormProps = {
  withRotation: boolean;
  setWithRotation: (withRotation: boolean) => void;
  spiralType: SpiralType;
  setSpiralType: (spiralType: SpiralType) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
  backgroundColor: "white" | "black" | "background.main";
  setBackgroundColor: (
    backgroundColor: "white" | "black" | "background.main"
  ) => void;
  wordData: WordData[];
  setWordData: (words: WordData[]) => void;
  selectedNotes: Note[];
};

export const WordCloudForm = (props: WordCloudFormProps) => {
  const {
    withRotation,
    setWithRotation,
    spiralType,
    setSpiralType,
    colors,
    setColors,
    backgroundColor,
    setBackgroundColor,
    wordData,
    setWordData,
    selectedNotes,
  } = props;

  const [palette, setPalette] = useState<Palette>("default");
  const { alert } = useDialogs();

  const [ignoredWords, setIgnoredWords] = useState<WordData[]>([]);

  useEffect(() => {
    if (selectedNotes.length > 0) {
      const words = selectedNotes
        .filter((note) => note.analyses?.length ?? 0 > 0)
        .map((note) => note.analyses?.[0].filteredValue)
        .join(" ");
      setWordData(
        WordDataHelper.countWordsFromString(words, {
          removeAllSpecialCharacters: true,
          capitalize: true,
          ignoreCase: true,
        })
      );
    }
  }, [selectedNotes, setWordData]);

  const handleStyleChange = (e: SelectChangeEvent) => {
    setSpiralType(e.target.value as SpiralType);
  };

  const handleRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWithRotation(e.target.checked);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    wd: WordData
  ) => {
    if (e.target.checked) {
      // remove word from ignored words
      // and add it to word data and maintain order
      setWordData([...wordData, wd]);
      setIgnoredWords(ignoredWords.filter((iw) => iw.text !== wd.text));
    } else {
      // Add word to ignored words
      // and remove it from word data and maintain order
      setIgnoredWords([...ignoredWords, wd]);
      setWordData(wordData.filter((w) => w.text !== wd.text));
    }
  };

  return (
    <FlexColumn padding={2} sx={{ backgroundColor: "background.paper" }}>
      <OcrTypography variant="h4">Options</OcrTypography>
      <Typography variant="subtitle1">
        Customize your word cloud with the options below
      </Typography>

      <OcrAccordion summary="Layout">
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 6 }}>
            <FormControl>
              <InputLabel id="style-label">Spiral</InputLabel>
              <Select
                labelId="style-label"
                id="style"
                value={spiralType}
                label="Style"
                onChange={handleStyleChange}
              >
                <MenuItem value={"archimedean"}>Archimedean</MenuItem>
                <MenuItem value={"rectangular"}>Rectangular</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={withRotation}
                  onChange={handleRotationChange}
                />
              }
              label="With Rotation"
            />
          </Grid>
        </Grid>
      </OcrAccordion>

      <OcrAccordion summary="Color">
        <FlexColumn paddingBottom={4}>
          <OcrTypography variant="h6">Custom Colors</OcrTypography>
          <CustomPalettePicker colors={colors} setColors={setColors} />
        </FlexColumn>

        <FlexColumn paddingBottom={4}>
          <OcrTypography variant="h6">Palettes</OcrTypography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Choose from a selection of color options
          </Typography>
          <PalettePicker
            palette={palette}
            onPaletteChange={(pal) => {
              setPalette(pal);
              setColors(palettes[pal]);
            }}
          />
        </FlexColumn>

        <FlexColumn>
          <OcrTypography variant="h6">Background Color</OcrTypography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Choose the background color for your word cloud
          </Typography>

          <FlexRow spacing={2}>
            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("black")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "black",
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "black" ? "primary.main" : "",
                }}
              />
              Black
            </FlexColumn>

            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("white")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "white" ? "primary.main" : "",
                }}
              />
              White
            </FlexColumn>

            <FlexColumn
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius={1}
                onClick={() => setBackgroundColor("background.main")}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  opacity: 0.25,
                  border: "2px solid transparent",
                  borderColor:
                    backgroundColor === "background.main" ? "primary.main" : "",
                }}
              />
              Transparent
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </OcrAccordion>

      <OcrAccordion summary="Words">
        <FlexColumn paddingBottom={2}>
          <Typography variant="h6">Notes Used</Typography>
          <Typography variant="subtitle1">
            Select the notes in the table above to include them in the word
            cloud
          </Typography>
          <Typography
            variant="subtitle1"
            fontStyle={"italic"}
            sx={{ marginBottom: 2 }}
          >
            Click on the file name to view the analysis
          </Typography>

          <Grid container spacing={1}>
            {selectedNotes.map((note) => (
              <Grid key={note.id} size={2} width={250}>
                <Chip
                  label={note.name}
                  sx={{
                    margin: 1,
                    width: 250,
                    backgroundColor:
                      note.analyses?.length ?? 0 > 0
                        ? "primary.main"
                        : "error.main",
                    color: (theme) =>
                      theme.palette.getContrastText(theme.palette.primary.main),
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    alert(
                      <FlexColumn spacing={2}>
                        <OcrTypography variant="h6">{note.name}</OcrTypography>
                        <Typography variant="body1">
                          {note.analyses?.length ?? 0 > 0
                            ? note.analyses![0].filteredValue
                            : "No analysis found"}
                        </Typography>
                      </FlexColumn>,
                      {
                        title: "Analysis",
                      }
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </FlexColumn>

        <FlexColumn>
          <Typography variant="h6">Word Frequency</Typography>

          <TableContainer sx={{ height: "40vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Word</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wordData
                  .concat(ignoredWords)
                  .sort((a, b) => b.value - a.value)
                  .map((wd, index) => (
                    <TableRow key={index}>
                      <TableCell>{wd.value}</TableCell>
                      <TableCell>
                        <FlexRow>
                          {wd.text}
                          <FlexSpacer />
                          <Checkbox
                            aria-label="Include Word"
                            checked={
                              !ignoredWords.find((iw) => iw.text === wd.text)
                            }
                            onChange={(event) => {
                              handleCheckboxChange(event, wd);
                            }}
                          />
                        </FlexRow>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FlexColumn>
      </OcrAccordion>
    </FlexColumn>
  );
};
