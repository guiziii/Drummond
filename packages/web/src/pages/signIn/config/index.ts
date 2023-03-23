import { IFirebaseError } from "../../../firebase/interfaces";

const Strings = {
  MISSION_TEXT: `MissionDescription`,
  SIGN_IN_WITH_GOOGLE_TEXT: `SignInWithGoogle`,
  SIGN_IN_WITH_FACEBOOK_TEXT: `SignInWithFacebook`,
  SIGN_IN_TEXT: `SignIn`,
  REMEMBER_ME_TEXT: `RememberMe`,
  EMAIL_ADDRESS_TEXT: `EmailAddress`,
  INVALID_EMAIL_ADDRESS_TEXT: `InvalidEmail`,
  PASSWORD_TEXT: `Password`,
  FORGOT_PASSWORD_TEXT: `ForgotPassword`,
  DONT_HAVE_AN_ACCOUNT_TEXT: `DontHaveAnAccount`,
  WRONG_PASSWORD_TEXT: `WrongPassword`,
};

const Sizes = {
  MAN_IMAGE_SIZE: `8rem`,
};

const Others = {
  FirebaseErrorCodes: [
    {
      code: `auth/wrong-password`,
      message: Strings.WRONG_PASSWORD_TEXT,
    },
    {
      code: `auth/user-not-found`,
      message: Strings.WRONG_PASSWORD_TEXT,
    },
  ] as IFirebaseError[],
};

const Setup = {
  Strings,
  Sizes,
  Others,
};

export default Setup;
