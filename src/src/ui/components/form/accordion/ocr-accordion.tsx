import { OcrTypography } from "@/ui/typography/ocr-typography";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export type OcrAccordionProps = {
  summary: string;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Accordion>;

export const OcrAccordion = ({
  summary,
  children,
  ...restProps
}: OcrAccordionProps) => {
  return (
    <Accordion {...restProps}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <OcrTypography variant="h5">{summary}</OcrTypography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
