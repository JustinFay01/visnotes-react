import { FlexColumn } from "@/ui/layout/flexbox";
import { Box, Typography } from "@mui/material";
import OcrWordCloud from "./components/word-cloud/word-cloud";
import { useEffect, useState } from "react";

export const DashboardView = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          width={windowDimensions.width}
          height={windowDimensions.height}
          showControls={true}
        />
      </Box>
    </FlexColumn>
  );
};
