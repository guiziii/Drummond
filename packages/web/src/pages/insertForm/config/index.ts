import { Country } from "country-state-city";

const Strings = {
  MISSION_TEXT: `MissionDescription`,
  SIGN_IN_WITH_GOOGLE_TEXT: `SignInWithGoogle`,
  SIGN_IN_WITH_FACEBOOK_TEXT: `SignInWithFacebook`,
  SIGN_IN_TEXT: `SignIn`,
  INSERT_TEXT: `Insert`,
  UPDATE_TEXT: `Update`,
  CANCEL_TEXT: `Cancel`,
  CONFIRM_TEXT: `Confirm`,
  DESCRIPTION_TEXT: `Description`,
  REMEMBER_ME_TEXT: `RememberMe`,
  EMAIL_ADDRESS_TEXT: `EmailAddress`,
  INVALID_EMAIL_ADDRESS_TEXT: `InvalidEmail`,
  PASSWORD_TEXT: `Password`,
  NAME_TEXT: `Name`,
  BIRTHDATE_TEXT: `BirthDate`,
  FORGOT_PASSWORD_TEXT: `ForgotPassword`,
  DONT_HAVE_AN_ACCOUNT_TEXT: `DontHaveAnAccount`,
  WRONG_PASSWORD_TEXT: `WrongPassword`,
  FORM_UPDATE_ERROR: "FormUpdateError",
  FORM_INSERT_ERROR: "FormInsertError",
  INSERT_FORM_TITLE: "InsertFormTitle",
  UNSAVED_FORMS: "UnsavedForms",
  REGISTERED_FORMS: "RegisteredForms",
  DELETE_MODAL_TITLE: "DeleteModalTitle",
  DELETE_MODAL_SUBTITLE: "DeleteModalSubTitle",
  SELECT_COUNTRY: "SelectCountry",
  SELECT_CITY: "SelectCity",
  SELECT_STATE: "SelectState",
};

const InitialState = {
  formData: {
    name: "",
    email: "",
    birthDate: "",
    description: "",
    cpf: "",
  },
  formDataValidations: {
    isEmailValid: false,
    isCPFValid: false,
    isSelectedValid: false,
  },
  snackbarProps: {
    color: ``,
    icon: ``,
    title: ``,
    content: ``,
    dateTime: ``,
  },
  countryList: Country.getAllCountries(),
  stateList: [],
  cityList: [],
  formList: [],
  modalVisibility: false,
  OfflineForm: null,
  removeFormId: null,
  successSB: false,
  updateForm: null,
  currentOfflineForm: null,
};

const Sizes = {
  MAN_IMAGE_SIZE: `8rem`,
};

interface IFirebaseError {
  code: string;
  message: string;
}

const Others = {
  FirebaseErrorCodes: [
    {
      code: `auth/wrong-password`,
      message: Strings.WRONG_PASSWORD_TEXT,
    },
  ] as IFirebaseError[],
};

const Setup = {
  Strings,
  Sizes,
  Others,
  InitialState,
};

export default Setup;
