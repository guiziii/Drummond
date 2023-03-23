import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import companyLogo from "@drummond-advisors/shared/assets/companyLogo.webp";
import loginImage from "@drummond-advisors/shared/assets/loginImage.jpg";
import { Validations } from "@drummond-advisors/shared/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextFieldProps,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DButton from "../../components/DButton";
import DTextField from "../../components/DTextField";
import DTypography from "../../components/DTypography";
import Metrics from "../../metrics";
import Footer from "./components/footer";
import Setup from "./config";
import "./styles.css";
import languages from "../../i18n/languages";
import isAuthenticated from "../../auth";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context";
import { SetUserLS } from "../../storage";
import { DTextFieldProps } from "../../components/DTextField/types";
import DSnackbar from "../../components/DSnackbar";

const { Strings, Sizes, Others } = Setup;

const useStyles = makeStyles(() => ({
  Root: {
    backgroundColor: "#F6F7FA",
  },

  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    minHeight: "90vh",
    overflow: "auto",
    [Metrics.MediaQuery.ExtraSmallDevices]: {
      maxWidth: "100vw",
    },
    [Metrics.MediaQuery.SmallDevices]: {
      maxWidth: "100vw",
    },
    [Metrics.MediaQuery.MediumDevices]: {
      maxWidth: "100vw",
    },
    [Metrics.MediaQuery.LargeDevices]: {
      maxWidth: "50vw",
    },
    [Metrics.MediaQuery.ExtraLargeDevices]: {
      maxWidth: "50vw",
    },
  },

  HideBySize: {
    [Metrics.MediaQuery.ExtraSmallDevices]: {
      display: "none",
    },
    [Metrics.MediaQuery.SmallDevices]: {
      display: "none",
    },
    [Metrics.MediaQuery.MediumDevices]: {
      display: "none",
    },
    [Metrics.MediaQuery.LargeDevices]: {
      display: "grid",
    },
    [Metrics.MediaQuery.ExtraLargeDevices]: {
      display: "grid",
    },
  },

  GoogleButton: {
    alignItems: "center",
    padding: "1% 0 1% 0",
  },

  FacebookButton: {
    padding: "1% 0 1% 0",
  },

  TabContainer: {
    width: "100%",
  },

  NotebookImg: {
    width: "100%",
    height: "100%",
  },

  ManImg: {
    height: Sizes.MAN_IMAGE_SIZE,
    width: Sizes.MAN_IMAGE_SIZE,
    marginTop: 15,
  },

  CompanyLogoImg: {
    marginTop: 5,
  },

  Form: {
    marginTop: 1,
    padding: 20,
    width: "90%",
  },

  MissionText: {
    padding: 30,
    textAlign: "center",
  },

  TitleText: {
    padding: 30,
    textAlign: "center",
    fontWeight: "600 !important",
    fontSize: "1.3rem !important",
  },
}));

function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const { t, i18n } = useTranslation();

  if (isAuthenticated()) {
    navigate("/insertForm");
  }

  const [tabValue, setTabValue] = useState(
    i18n.language === languages[0].label ? 0 : 1
  );

  const [ShouldShowPassword, setShouldShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    email: ``,
    password: ``,
  });

  const [successSB, setSuccessSB] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [snackbarProps, setSnackbarProps] = useState({
    color: ``,
    icon: ``,
    title: ``,
    content: ``,
    dateTime: ``,
  });

  const [userDataValidations, setUserDataValidations] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      setisLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )
        .then(userCredential => {
          const user = userCredential.user;
          SetUserLS(user);
          dispatch({ type: `SET_USER`, payload: user });
          navigate("/insertForm");
        })
        .catch(error => {
          const errorCode = error.code;
          const MessageItem = Others.FirebaseErrorCodes.find(
            f => f.code === errorCode
          );

          if (MessageItem) {
            setSnackbarProps({
              color: "secondary",
              icon: "done_all",
              title: "Drummond Advisors",
              content: t(MessageItem.message),
              dateTime: "Agora",
            });

            setSuccessSB(true);
          }
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  };

  const handleSetTabValue = (_: any, newValue: number) => {
    setTabValue(newValue);
    i18n.changeLanguage(languages[newValue].label);
  };

  const Inputs: Array<DTextFieldProps> = [
    {
      key: 1,
      color: "primary",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "email",
      label: t(Strings.EMAIL_ADDRESS_TEXT),
      name: "email",
      autoComplete: "email",
      autoFocus: true,
      onChange: event => {
        setUserData(old => ({ ...old, email: event.target.value }));
      },
      error: userData.email?.length > 0 && !userDataValidations.isEmailValid,
      helperText:
        userData.email?.length > 0 &&
        !userDataValidations.isEmailValid &&
        t(Strings.INVALID_EMAIL_ADDRESS_TEXT),
    },
    {
      key: 2,
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "password",
      label: t(Strings.PASSWORD_TEXT),
      type: !ShouldShowPassword ? "password" : "text",
      id: "password",
      autoComplete: "current-password",
      helperText:
        userData.password.length > 0 &&
        Validations.PASSWORD.getPasswordStrength(userData.password).id < 1 &&
        `Sua senha deve conter ao menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um número.`,
      onChange: event => {
        setUserData(old => ({ ...old, password: event.target.value }));
      },
      InputProps: {
        endAdornment: (
          <InputAdornment position={"end"}>
            <IconButton onClick={() => setShouldShowPassword(old => !old)}>
              {ShouldShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  ];

  useEffect(() => {
    if (userData.email) {
      const isEmailValid = Validations.EMAIL.isValid(userData.email);
      const isPasswordValid = Validations.PASSWORD.getPasswordStrength(
        userData.password
      );

      setUserDataValidations(old => ({
        ...old,
        isEmailValid,
        isPasswordValid: isPasswordValid.id >= 1,
      }));
    }
  }, [userData]);

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      container
      height={"100vh"}
      className={classes.Root}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        px={2}
        py={2}
        className={classes.HideBySize}
      >
        <Card className={classes.CardContainer}>
          <img src={loginImage} className={classes.NotebookImg} />

          <DTypography className={classes.MissionText}>
            {t(Strings.MISSION_TEXT)}
          </DTypography>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={6} px={2} py={2}>
        <Card className={classes.CardContainer}>
          <img src={companyLogo} className={classes.CompanyLogoImg} />

          <DTypography className={classes.TitleText}>
            {t(Strings.SIGN_UP_TEXT)}
          </DTypography>

          <Tabs
            orientation={"horizontal"}
            value={tabValue}
            onChange={handleSetTabValue}
          >
            {languages.map(item => (
              <Tab
                key={item.key}
                icon={<Avatar alt="country" src={item.icon} />}
              />
            ))}
          </Tabs>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className={classes.Form}
          >
            {Inputs.map(item => (
              <DTextField {...item} />
            ))}

            <DButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                !Object.entries(userDataValidations).every(
                  currentValue => currentValue[1]
                )
              }
              sx={{ mt: 2, mb: 2, padding: "1% 0 1% 0" }}
            >
              {t(Strings.SIGN_UP_TEXT)}
            </DButton>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {isLoading && (
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <CircularProgress variant="indeterminate" />
                </Box>
              )}
            </Box>
            <Footer />
          </Box>
        </Card>
      </Grid>
      <DSnackbar
        color={snackbarProps.color}
        icon={snackbarProps.icon}
        title={snackbarProps.title}
        content={snackbarProps.content}
        dateTime={snackbarProps.dateTime}
        open={successSB}
        close={() => setSuccessSB(false)}
        bgWhite={false}
      />
    </Grid>
  );
}

export default SignUp;
