import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import InputMask from "react-input-mask";
import { DTextFieldProps } from "./types";

const DTextField: React.FC<DTextFieldProps> = forwardRef(
  ({ inputMaskText, onChange, value, ...rest }, ref) => {
    if (inputMaskText) {
      return (
        <InputMask mask={inputMaskText} value={value} onChange={onChange}>
          <TextField {...rest} ref={ref} />
        </InputMask>
      );
    }

    return <TextField value={value} onChange={onChange} {...rest} ref={ref} />;
  }
);

export default DTextField;
