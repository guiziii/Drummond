import { Box } from "@mui/material";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import DTypography from "../DTypography";
import { Colors, Fonts } from "@drummond-advisors/shared/constants";

function DSnackbar({
  color,
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite,
  open,
  ...rest
}: {
  color: string;
  icon: string;
  title: string;
  dateTime: string;
  content: string;
  close: () => void;
  bgWhite: boolean;
  open: boolean;
}) {
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "white";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
    dividerColor = false;
  } else {
    titleColor = color;
    dateTimeColor = color;
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      {...rest}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={close}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <Box
        bgcolor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        borderRadius=""
        p={1}
        sx={{
          backgroundColor: () => Colors.White,
          borderRadius: 2,
          border: `0.1px solid ${Colors.Primary}`,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color={"primary"}
          p={1.5}
        >
          <Box display="flex" alignItems="center" lineHeight={0}>
            <DTypography
              variant="button"
              fontWeight="medium"
              color={"primary"}
              textGradient={bgWhite}
            >
              {title}
            </DTypography>
          </Box>
          <Box display="flex" alignItems="center" lineHeight={0}>
            <DTypography variant="caption" color={"primary"}>
              {dateTime}
            </DTypography>
            <Icon
              sx={{
                color: () => Colors.Black,
                fontWeight: ({ typography: { fontWeightBold } }) =>
                  fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </Box>
        </Box>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <Box
          p={1.5}
          sx={{
            fontSize: ".9rem",
            fontFamily: Fonts.Primary,
            color: Colors.Primary,
          }}
        >
          {content}
        </Box>
      </Box>
    </Snackbar>
  );
}

export default DSnackbar;
