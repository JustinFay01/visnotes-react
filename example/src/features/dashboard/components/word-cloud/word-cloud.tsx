import { FlexColumn } from "@/ui/layout/flexbox";
import { totoAfricaLyrics } from "@dashboard/assets/text-fixture";
import { SpiralType, WordData } from "@dashboard/types/word-cloud-types";
import { WordDataHelper } from "@dashboard/util/word-data-helper";
import { Box } from "@mui/material";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";

const colors = ["#143059", "#2F6B9A", "#82a6c2", "#b8d3e2", "#f0f7ff"];

interface OcrWordCloudProps {
  words: WordData[];
  width: number;
  height: number;
  spiralType: SpiralType;
  withRotation: boolean;
}

export default function OcrWordCloud({
  words = WordDataHelper.countWordsFromString(totoAfricaLyrics),
  width,
  height,
  spiralType,
  withRotation,
}: OcrWordCloudProps) {
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  return (
    <FlexColumn
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Wordcloud
          words={words}
          width={width}
          height={height}
          fontSize={fontSizeSetter}
          font={"Impact"}
          spiral={spiralType}
          rotate={withRotation ? WordDataHelper.getRotationDegree : 0}
          random={WordDataHelper.fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor={"middle"}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </Box>
    </FlexColumn>
  );
}
