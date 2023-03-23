import { Colors } from "@drummond-advisors/shared/constants";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Primary,
      dark: Colors.Primary,
    },
    secondary: {
      main: Colors.Secondary,
    },
    error: {
      main: Colors.Red,
    },
    info: {
      main: Colors.White,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "montserrat",
    },
    h6: {
      fontFamily: "montserrat",
      fontSize: "1.3rem",
      fontWeight: "500",
    },
  },
});

export default theme;
