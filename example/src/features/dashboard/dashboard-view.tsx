import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import OcrWordCloud from "./components/word-cloud";

export const DashboardView = () => {
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
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingX={8}
        paddingY={4}
      >
        <OcrWordCloud width={800} height={800} showControls={true} />
      </Box>
    </FlexColumn>
  );
};
