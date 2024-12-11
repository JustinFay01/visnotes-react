import { FlexColumn } from "@/ui/layout/flexbox";
import { Typography } from "@mui/material";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { Text } from "@visx/text";

export const DashboardView = () => {
  const words = [{ text: "test", value: 100 }];
  const colors = ["#143059", "#2F6B9A", "#82a6c2"];

  return (
    <FlexColumn spacing={5}>
      <Typography
        variant="h4"
        component={"h1"}
        fontWeight={"bold"}
        gutterBottom
        paddingX={8}
        paddingTop={4}
      >
        Wordcloud
      </Typography>
      <Wordcloud
        words={words}
        height={1000}
        fontSize={100}
        font={"Impact"}
        padding={2}
        width={0}
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
    </FlexColumn>
  );
};
