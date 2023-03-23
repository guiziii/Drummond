import Box from "@mui/material/Box";
import DTypography from "../../../../components/DTypography";
import makeStyles from "@mui/styles/makeStyles";
import Colors from "@drummond-advisors/shared/constants/colors";

const DIVIDER_SIZE = 0.5;

const useStyles = makeStyles(() => ({
  BoxContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "1% 0 1% 0",
  },
  FirstSeparator: {
    flex: 1,
    display: "flex",
    height: DIVIDER_SIZE,
    backgroundColor: Colors.Gray,
    margin: "0 1% 0 0",
  },
  SecondSeparator: {
    flex: 1,
    display: "flex",
    height: DIVIDER_SIZE,
    backgroundColor: Colors.Gray,
    margin: "0 0 0 1%",
  },
}));

const Divider: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component={"div"} className={classes.BoxContainer}>
      <Box component={"div"} className={classes.FirstSeparator} />
      <DTypography>or</DTypography>
      <Box component={"div"} className={classes.SecondSeparator} />
    </Box>
  );
};

export default Divider;
