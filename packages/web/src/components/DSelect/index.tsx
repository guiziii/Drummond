import { forwardRef } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import { GroupBase } from "./types";
import { Colors, Fonts } from "@drummond-advisors/shared/constants";
import FormControl from "@mui/material/FormControl";

const style: StylesConfig = {
  control: (base: any) => ({
    ...base,
    borderColor: Colors.Primary,
    boxShadow: `none`,
    display: "flex",
    flex: 1,
    fontFamily: Fonts.Primary,

    border: `0px solid ${Colors.Primary}`,

    "&:focus": {
      border: `0px solid ${Colors.Primary}`,
    },
    "&:hover": {
      border: `0px solid ${Colors.Primary}`,
    },
  }),

  input: (styles: any) => ({
    ...styles,
    fontSize: "16px",
  }),

  placeholder: (styles: any) => ({
    ...styles,
  }),

  option: (styles: any, { isSelected }) => ({
    ...styles,
    fontFamily: Fonts.Primary,
    color: Colors.Black,
    backgroundColor: Colors.White,

    "&:hover": {
      backgroundColor: Colors.Primary,
      color: Colors.White,
      height: "100%",
    },
    zIndex: 9,
  }),
  menu: (provided, state) => {
    return {
      ...provided,
      zIndex: 9999,
    };
  },
  menuPortal: (base: any) => ({ ...base, zIndex: 9999, position: "relative" }),
};

const DSelect: React.FC<GroupBase> = forwardRef(
  ({ Array, ItemValue, ItemDisplayName, ...rest }, ref) => {
    return (
      <FormControl
        variant="filled"
        sx={{ boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)", width: "100%" }}
      >
        <ReactSelect
          {...rest}
          styles={style}
          defaultValue={ItemValue}
          value={ItemValue}
          options={Array.map((item: any) => ({
            value: item[`${ItemValue}`],
            label: item[`${ItemDisplayName}`],
            fullItem: item,
          }))}
        />
      </FormControl>
    );
  }
);

export default DSelect;
