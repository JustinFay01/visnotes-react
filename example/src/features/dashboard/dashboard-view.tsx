import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import useWindowDimensions from "@/hooks/use-window-dimensions";

export const DashboardView = () => {
  const windowHook = useWindowDimensions();

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
        padding={20}
      >
        <OcrWordCloud
          width={windowHook.width / 1.5}
          height={windowHook.height / 1.5}
          showControls={true}
        />
      </Box>
    </FlexColumn>
  );
};
