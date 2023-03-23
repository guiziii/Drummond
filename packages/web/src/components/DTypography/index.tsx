import { Typography, TypographyProps } from "@mui/material";
import { forwardRef } from "react";

type Props = {
  [rest: string]: any;
} & TypographyProps;

const DTypography: React.FC<Props> = forwardRef(({ ...rest }, ref) => {
  return <Typography {...rest} ref={ref} />;
});

export default DTypography;
