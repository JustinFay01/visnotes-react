import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import useWindowDimensions from "@/hooks/use-window-dimensions";

export const DashboardView = () => {
  const windowHook = useWindowDimensions();

  return (
    <FlexColumn spacing={5} alignItems={"center"} justifyContent={"center"}>
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
      >
        <OcrWordCloud
          width={windowHook.width > 800 ? 800 : windowHook.width}
          height={500}
          showControls={true}
        />
      </Box>
    </FlexColumn>
  );
};
