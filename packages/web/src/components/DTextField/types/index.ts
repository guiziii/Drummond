import { TextFieldProps } from "@mui/material";

export type DTextFieldProps = {
  inputShouldBeMasked?: boolean;
  value?: string;
  inputMaskText?: string | Array<string | RegExp>;
  [rest: string]: any;
} & TextFieldProps;
