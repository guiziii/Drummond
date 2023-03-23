import deleteIcon from "@drummond-advisors/shared/assets/delete.png";
import { Colors, Fonts } from "@drummond-advisors/shared/constants";
import { Validations } from "@drummond-advisors/shared/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import moment from "moment";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveAppBar from "../../components/Appbar";
import DButton from "../../components/DButton";
import DSelect from "../../components/DSelect";
import DSnackbar from "../../components/DSnackbar";
import DTextField from "../../components/DTextField";
import { DTextFieldProps } from "../../components/DTextField/types";
import DTypography from "../../components/DTypography";
import { StoreContext } from "../../context";
import Metrics from "../../metrics";
import { HttpStatus } from "../../services/api.service";
import { FormsApi } from "../../services/form";
import { GetOfflineFormLS, SetOfflineFormLS } from "../../storage";
import Setup from "./config";
import "./styles.css";
const { Strings, InitialState } = Setup;

const useStyles = makeStyles(() => ({
  FormTitle: {
    textAlign: "center",
  },

  ImgContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "grid",
    marginTop: 10,
    marginBottom: 10,
  },

  SelectContainer: {
    padding: "1% 0 1% 0",
  },

  CancelButton: {
    color: Colors.Gray,
  },

  CardContent: {
    padding: "0 3% 0 3%",
  },

  List: {
    [Metrics.MediaQuery.ExtraSmallDevices]: {
      minHeight: "30vh",
    },
    [Metrics.MediaQuery.SmallDevices]: {
      minHeight: "30vh",
    },
    [Metrics.MediaQuery.MediumDevices]: {
      minHeight: "30vh",
    },
    [Metrics.MediaQuery.LargeDevices]: {
      minHeight: "90vh",
    },
    [Metrics.MediaQuery.ExtraLargeDevices]: {
      minHeight: "90vh",
    },

    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.2)",
  },

  ModalButtonStyle: {
    backgroundColor: `${Colors.Primary}!important`,
    color: Colors.White,
    width: "45%",
    "&:hover": {
      backgroundColor: Colors.Primary,
      color: Colors.White,
    },
  },

  ModalCancelButtonStyle: {
    backgroundColor: `transparent`,
    color: Colors.White,
    border: `1px solid ${Colors.Secondary} !important`,
    width: "45%",
    "&:hover": {
      backgroundColor: `transparent`,
      color: Colors.White,
    },
  },

  ModalStyle: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    display: "flex",
    width: "100%",

    [Metrics.MediaQuery.ExtraSmallDevices]: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      flexDirection: "column",
      borderRadius: 5,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 0.9,
      maxWidth: "100%",
    },
    [Metrics.MediaQuery.SmallDevices]: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      flexDirection: "column",
      borderRadius: 5,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 0.9,
      maxWidth: "100%",
    },
    [Metrics.MediaQuery.MediumDevices]: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      flexDirection: "column",
      borderRadius: 5,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 0.9,
      maxWidth: "100%",
    },
    [Metrics.MediaQuery.LargeDevices]: {
      minHeight: "90vh",
    },
    [Metrics.MediaQuery.ExtraLargeDevices]: {
      minHeight: "90vh",
    },
  },

  ModalContainer: {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.33,
    marginLeft: 10,
    marginRight: 10,
  },

  ModalContent: {
    padding: "3% 0 0 0",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },

  ModalTitleText: {
    fontFamily: Fonts.Primary,
    fontSize: "1rem",
    color: Colors.Primary,
    fontWeight: "bold",
    width: "100%",
    maxWidth: "80%",
    textAlign: "center",
  },

  ModalImageAndSubtitleContainer: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },

  ModalSeparator: {
    width: "100%",
    backgroundColor: "transparent",
    height: 1,
    margin: "1% 0 1% 0",
  },

  ModalActionsContainer: {
    padding: 10,
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-around",
  },

  ConfirmText: {
    fontFamily: Fonts.Primary,
    fontSize: ".8rem",
    color: Colors.Primary,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  ActionCancelText: {
    fontFamily: Fonts.Primary,
    fontSize: ".9rem",
    color: Colors.Primary,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  ActionConfirmText: {
    fontFamily: Fonts.Primary,
    fontSize: ".9rem",
    color: Colors.White,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
}));

type FormProps = {
  name: string;
  email: string;
  birthDate: string;
  description: string;
  cpf: string;
  selectedCountry?: ICountry;
  selectedState?: IState;
  selectedCity?: ICity;
};

type UpdateFormProps = {
  name: string;
  email: string;
  birthDate: string;
  description: string;
  cpf: string;
  user: string;
  city: string;
  country: string;
  state: string;
  _id: string;
};

function InsertForm() {
  const { state } = useContext(StoreContext);
  const { t } = useTranslation();
  const classes = useStyles();

  const [countryList] = useState<ICountry[]>(InitialState.countryList);
  const [stateList, setStateList] = useState<IState[]>(InitialState.stateList);
  const [cityList, setCityList] = useState<ICity[]>(InitialState.cityList);
  const [formList, setFormList] = useState<any[]>(InitialState.formList);
  const [formData, setFormData] = useState<FormProps>(InitialState.formData);
  const [successSB, setSuccessSB] = useState(InitialState.successSB);

  const [formDataValidations, setFormDataValidations] = useState(
    InitialState.formDataValidations
  );

  const [modalVisibility, setModalVisibility] = useState<boolean>(
    InitialState.modalVisibility
  );

  const [currentOfflineForm, setCurrentOfflineForm] =
    useState<FormProps | null>(InitialState.currentOfflineForm);

  const [offlineFormList, setOfflineFormList] = useState<FormProps[] | null>(
    InitialState.OfflineForm
  );

  const [removeFormId, setRemoveFormId] = useState<string | null>(
    InitialState.removeFormId
  );

  const [snackbarProps, setSnackbarProps] = useState(
    InitialState.snackbarProps
  );

  const [updateForm, setUpdateForm] = useState<UpdateFormProps | null>(
    InitialState.updateForm
  );

  const Inputs: Array<DTextFieldProps> = [
    {
      key: 0,
      color: "primary",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "name",
      label: t(Strings.NAME_TEXT),
      name: "name",
      autoFocus: true,
      value: formData.name,
      onChange: event => {
        setFormData(old => ({ ...old, name: event.target.value }));
      },
    },
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
      value: formData.email,
      onChange: event => {
        setFormData(old => ({ ...old, email: event.target.value }));
      },
    },
    {
      key: 2,
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "cpf",
      label: "CPF",
      id: "cpf",

      inputMaskText: "999.999.999-99",
      value: formData.cpf,
      onChange: event => {
        setFormData(old => ({ ...old, cpf: event.target.value }));
      },
    },
    {
      key: 3,
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "birthDate",
      id: "birthDate",
      label: t(Strings.BIRTHDATE_TEXT),
      InputLabelProps: { shrink: true },
      type: "date",

      value: formData.birthDate,
      variant: "outlined",
      onChange: event => {
        setFormData(old => ({ ...old, birthDate: event.target.value }));
      },
    },
    {
      key: 4,
      margin: "normal",
      required: true,
      fullWidth: true,
      name: "description",
      label: t(Strings.DESCRIPTION_TEXT),
      id: "description",
      value: formData.description,

      onChange: event => {
        setFormData(old => ({ ...old, description: event.target.value }));
      },
    },
  ];

  const mount = async () => {
    getOfflineForms();
    await Promise.all([getAllForms()]);
  };

  const getAllForms = async () => {
    const userId = state?.user?.uid;

    if (userId) {
      const { data } = await FormsApi.GetUserForms(userId);

      if (data) {
        setFormList(data);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = state?.user?.uid;

    if (user) {
      const {
        birthDate,
        cpf,
        description,
        email,
        name,
        selectedCity,
        selectedCountry,
        selectedState,
      } = formData;

      if (selectedCity && selectedCountry && selectedState) {
        const request = {
          birthDate,
          cpf,
          description,
          email,
          name,
          user,
          city: selectedCity?.name,
          country: selectedCountry?.name,
          state: selectedState?.name,
        };

        let responseStatus = null;

        if (!updateForm) {
          const { status } = await FormsApi.InsertUserForm(request);
          responseStatus = status;
        } else {
          const { status } = await FormsApi.UpdateUserForm({
            ...request,
            id: updateForm._id,
          });

          responseStatus = status;
        }

        if (
          responseStatus === HttpStatus.CREATED ||
          responseStatus === HttpStatus.OK
        ) {
          setSnackbarProps({
            color: "secondary",
            icon: "done_all",
            title: "Drummond Advisors",
            content: updateForm
              ? "Formulário atualizado com sucesso!"
              : "Formulário cadastrado com sucesso!",
            dateTime: "Agora",
          });
          setSuccessSB(true);
          cleanFields();
          getAllForms();

          if (updateForm) {
            setUpdateForm(null);
          }

          if (!!currentOfflineForm) {
            setCurrentOfflineForm(null);
            setOfflineFormList(old =>
              old ? old.filter(f => f !== currentOfflineForm) : null
            );
          }
        } else {
          setSnackbarProps({
            color: "secondary",
            icon: "done_all",
            title: "Drummond Advisors",
            content: updateForm
              ? t(Strings.FORM_UPDATE_ERROR)
              : t(Strings.FORM_INSERT_ERROR),
            dateTime: "Agora",
          });
          setSuccessSB(true);
        }
      }
    }
  };

  const removeForm = async () => {
    if (removeFormId) {
      const { data } = await FormsApi.DeleteForm(removeFormId);

      if (data) {
        setRemoveFormId(null);
        getAllForms();
        setModalVisibility(false);
      }
    }
  };

  const getOfflineForms = () => {
    const response = GetOfflineFormLS();

    if (response) {
      setOfflineFormList(response);
    }
  };

  const getCities = (selectedCountry: string, selectedState: string) => {
    const cityList = City.getCitiesOfState(selectedCountry, selectedState);

    setCityList(cityList);

    return cityList;
  };

  const getStates = (selectedCountry: string) => {
    const states = State.getStatesOfCountry(selectedCountry);

    setStateList(states);

    return states;
  };

  const handleDeleteButton = (item: any) => {
    if (item) {
      setRemoveFormId(item._id);
      setModalVisibility(true);
    }
  };

  const handleEditButton = (item: any) => {
    if (item) {
      if (formData !== InitialState.formData && !updateForm) {
        const FormArray =
          offlineFormList?.filter(f => f !== currentOfflineForm) ?? [];

        if (!offlineFormList?.find(f => f === item)) {
          FormArray.push(formData);
          SetOfflineFormLS(FormArray);
          getOfflineForms();
          setCurrentOfflineForm(null);
        }
      }

      setUpdateForm(item);

      const { birthDate, cpf, description, email, name, city, country, state } =
        item;

      const CountriesObject = Country.getAllCountries().find(
        f => f.name === country
      );

      if (CountriesObject) {
        const StateObject = getStates(CountriesObject?.isoCode).find(
          f => f.name === state
        );

        if (StateObject) {
          const CityObject = getCities(
            CountriesObject.isoCode,
            StateObject.isoCode
          ).find(f => f.name === city);

          if (CityObject) {
            setFormData({
              birthDate,
              cpf,
              description,
              email,
              name,
              selectedCountry: CountriesObject,
              selectedState: StateObject,
              selectedCity: CityObject,
            });
          }
        }
      }
    }
  };

  const cleanFields = () => {
    setFormData(InitialState.formData);
  };

  const handleCancelUpdateForm = () => {
    cleanFields();
    setUpdateForm(null);
  };

  const handleEditOfflineForm = (item: any) => {
    if (
      formData !== InitialState.formData &&
      formData !== currentOfflineForm &&
      item !== currentOfflineForm &&
      !updateForm &&
      currentOfflineForm
    ) {
      const FormArray =
        offlineFormList?.filter(f => f !== currentOfflineForm) ?? [];

      FormArray.push(formData);
      SetOfflineFormLS(FormArray);
      getOfflineForms();
    }

    setCurrentOfflineForm(item);
    setFormData(item);
    setUpdateForm(null);
  };

  const handleRemoveOfflineForm = (item: any) => {
    const newValue = offlineFormList?.filter(f => f !== item);

    if (offlineFormList?.find(f => f === currentOfflineForm)) {
      cleanFields();
    }

    if (!!newValue) {
      if (newValue.length > 0) {
        SetOfflineFormLS(newValue);
        setOfflineFormList(newValue);
      } else {
        SetOfflineFormLS(null);
        setOfflineFormList(null);
      }
    }
  };

  useEffect(() => {
    const isoCode = formData.selectedCountry?.isoCode;
    const name = formData.selectedCountry?.name;

    if (isoCode) {
      getStates(isoCode);

      if (!updateForm || updateForm.country !== name) {
        setFormData(old => ({
          ...old,
          selectedState: undefined,
          selectedCity: undefined,
        }));
      }
    }
  }, [formData.selectedCountry]);

  useEffect(() => {
    const countryIsoCode = formData.selectedCountry?.isoCode;
    const stateIsoCode = formData.selectedState?.isoCode;
    const stateName = formData.selectedState?.name;

    if (countryIsoCode && stateIsoCode) {
      getCities(countryIsoCode, stateIsoCode);

      if (!updateForm || updateForm.state !== stateName) {
        setFormData(old => ({
          ...old,
          selectedCity: undefined,
        }));
      }
    }
  }, [formData.selectedState]);

  useEffect(() => {
    let isEmailValid = false;
    let isCPFValid = false;
    let isSelectedValid = false;

    if (formData.email) {
      isEmailValid = Validations.EMAIL.isValid(formData.email);
    }

    if (formData.cpf) {
      isCPFValid = Validations.CPF.isValid(formData.cpf);
    }

    if (
      formData.selectedCountry?.isoCode &&
      formData.selectedState?.isoCode &&
      formData.selectedCity?.name &&
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      moment(formData.birthDate).isValid()
    ) {
      isSelectedValid = true;
    }

    setFormDataValidations({
      isEmailValid,
      isCPFValid,
      isSelectedValid,
    });
  }, [formData]);

  useEffect(() => {
    mount();
  }, []);

  return (
    <Grid container>
      <ResponsiveAppBar />

      <Grid item xs={12} md={4} lg={3} xl={3}>
        <List dense className={classes.List}>
          <Box className={classes.ImgContainer} display="flex">
            <DTypography variant="h6" className={classes.FormTitle}>
              {t(Strings.REGISTERED_FORMS)}
            </DTypography>
          </Box>

          <Divider />

          {formList.map(item => (
            <ListItem
              key={item._id}
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditButton(item)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteButton(item)}
                  >
                    <DeleteIcon color={"primary"} />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={item.name} secondary={item.email} />
            </ListItem>
          ))}
        </List>
      </Grid>

      {offlineFormList && (
        <Grid item xs={12} md={4} lg={3} xl={3}>
          <List dense className={classes.List}>
            <Box className={classes.ImgContainer} display="flex">
              <DTypography variant="h6" className={classes.FormTitle}>
                {t(Strings.UNSAVED_FORMS)}
              </DTypography>
            </Box>

            <Divider />

            {offlineFormList?.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditOfflineForm(item)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveOfflineForm(item)}
                    >
                      <DeleteIcon color={"primary"} />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={item.name} secondary={item.email} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}

      <Grid
        item
        xs={12}
        md={12}
        lg={offlineFormList ? 6 : 9}
        xl={offlineFormList ? 6 : 9}
      >
        <List dense className={classes.List}>
          <Box className={classes.ImgContainer} display="flex">
            <DTypography variant="h6" className={classes.FormTitle}>
              {t(Strings.INSERT_FORM_TITLE)}
            </DTypography>
          </Box>

          <Divider />

          <Box
            component="form"
            onSubmit={handleSubmit}
            className={classes.CardContent}
          >
            <Box component="div" className={classes.SelectContainer}>
              <DSelect
                Array={countryList}
                ItemDisplayName="name"
                ItemValue="isoCode"
                placeholder={
                  formData.selectedCountry?.name ?? t(Strings.SELECT_COUNTRY)
                }
                onChange={item =>
                  setFormData(old => ({
                    ...old,
                    selectedCountry: item.fullItem,
                  }))
                }
              />
            </Box>

            <Box component="div" className={classes.SelectContainer}>
              <DSelect
                Array={stateList}
                ItemDisplayName="name"
                ItemValue="isoCode"
                placeholder={
                  formData.selectedState?.name ?? t(Strings.SELECT_STATE)
                }
                onChange={item =>
                  setFormData(old => ({
                    ...old,
                    selectedState: item.fullItem,
                  }))
                }
              />
            </Box>

            <Box component="div" className={classes.SelectContainer}>
              <DSelect
                Array={cityList}
                ItemDisplayName="name"
                ItemValue="name"
                placeholder={
                  formData.selectedCity?.name ?? t(Strings.SELECT_CITY)
                }
                onChange={item =>
                  setFormData(old => ({
                    ...old,
                    selectedCity: item.fullItem,
                  }))
                }
              />
            </Box>

            {Inputs.map(item => (
              <DTextField {...item} />
            ))}

            <DButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                !Object.entries(formDataValidations).every(
                  currentValue => currentValue[1]
                )
              }
            >
              {updateForm ? t(Strings.UPDATE_TEXT) : t(Strings.INSERT_TEXT)}
            </DButton>

            <Box sx={{ marginTop: 1 }}>
              <DButton
                fullWidth
                variant="contained"
                className={classes.CancelButton}
                sx={{ color: Colors.White }}
                color="secondary"
                disabled={!updateForm}
                onClick={() => handleCancelUpdateForm()}
              >
                {t(Strings.CANCEL_TEXT)}
              </DButton>
            </Box>
          </Box>
        </List>
      </Grid>

      <Modal
        className={classes.ModalStyle}
        open={modalVisibility}
        onClose={() => setModalVisibility(false)}
      >
        <div className={classes.ModalContainer}>
          <div className={classes.ModalContent}>
            <DTypography className={classes.ModalTitleText}>
              {t(Strings.DELETE_MODAL_TITLE)}
            </DTypography>

            <div className={classes.ModalImageAndSubtitleContainer}>
              <img src={deleteIcon} alt="delete" width="20%" />
              <div className={classes.ModalSeparator} />
              <DTypography className={classes.ConfirmText}>
                {t(Strings.DELETE_MODAL_SUBTITLE)}
              </DTypography>
            </div>

            <div className={classes.ModalSeparator} />

            <div className={classes.ModalActionsContainer}>
              <DButton
                className={classes.ModalCancelButtonStyle}
                onClick={() => setModalVisibility(false)}
              >
                <DTypography className={classes.ActionCancelText}>
                  {t(Strings.CANCEL_TEXT)}
                </DTypography>
              </DButton>

              <DButton
                className={classes.ModalButtonStyle}
                onClick={() => removeForm()}
              >
                <DTypography className={classes.ActionConfirmText}>
                  {t(Strings.CONFIRM_TEXT)}
                </DTypography>
              </DButton>
            </div>
          </div>
        </div>
      </Modal>

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

export default InsertForm;
