/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps, Theme } from "@mui/material/styles";
import { JSXElementConstructor } from "react";
export type GetProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = React.ComponentProps<T>;
export type WithChildren<T = {}> = React.PropsWithChildren<T>;
// export type ElementalChild = React.ReactElement
// export type WithElementalChild<T = {}> = T & { children?: ElementalChild }
export type SupportsItemSx<P extends string = "itemSx"> = {
  [prop in P]?: SxProps<Theme>;
};
export type SupportsSx = { sx?: SxProps<Theme>; className?: string };

export type WithSx<T = {}> = T & SupportsSx;
export type WithChildrenAndSx<T = {}> = WithChildren<WithSx<T>>;
