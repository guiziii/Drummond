import { Button, ButtonProps } from "@mui/material";
import { forwardRef } from "react";

type Props = {
  className?: string;
  [rest: string]: any;
} & ButtonProps;

const DButton: React.FC<Props> = forwardRef(({ className, ...rest }, ref) => {
  return <Button className={className} {...rest} ref={ref} />;
});

export default DButton;
