import { Stack, StackProps, styled } from "@mui/material";

export const FlexSpacer = styled("div")({ flex: "auto" });

type DirectionlessStackProps = Omit<StackProps, "direction">;
export type FlexColumnProps = DirectionlessStackProps;
export type FlexRowProps = DirectionlessStackProps;

export const FlexRow = (props: FlexRowProps) => {
  const { children, ...other } = props;
  return (
    <Stack direction="row" {...other}>
      {children}
    </Stack>
  );
};

export const FlexColumn = (props: FlexColumnProps) => {
  const { children, ...other } = props;
  return (
    <Stack direction="column" {...other}>
      {children}
    </Stack>
  );
};
