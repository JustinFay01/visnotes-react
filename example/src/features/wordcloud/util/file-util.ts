export type ConversionUnit = "KB" | "MB" | "GB";

export const convertBytes = (to: ConversionUnit, bytes: number) => {
  const units = ["B", "KB", "MB", "GB"];
  const index = units.indexOf(to);
  return bytes / Math.pow(1024, index);
};
