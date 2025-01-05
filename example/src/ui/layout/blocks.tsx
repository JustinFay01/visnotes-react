import { Stack, Box } from "@mui/material";
import { WithChildren, WithChildrenAndSx } from "../props";
import { Header } from "./header";

export const LayoutContainer = (props: WithChildren) => {
  const { children } = props;
  return (
    <Stack direction="column" alignItems="stretch" sx={{ minHeight: "100vh" }}>
      {children}
    </Stack>
  );
};

export const Main = ({ children, sx }: WithChildrenAndSx) => (
  <Box component="main" flex="1 1 auto" sx={{ ...sx }}>
    {children}
  </Box>
);

export const BaseLayout = ({ children }: WithChildren) => {
  return (
    <LayoutContainer>
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export const HeaderLayout = ({ children }: WithChildren) => {
  return (
    <BaseLayout>
      <Header />
      {children}
    </BaseLayout>
  );
};
