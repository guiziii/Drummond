const COMPANY_LOCAL_STORAGE = "Drummond";

const LOCAL_STORAGE_KEYS = {
  USER_KEY: `@${COMPANY_LOCAL_STORAGE}USER-OBJ`,
  OFFLINE_FORM_KEY: `@${COMPANY_LOCAL_STORAGE}FORM-OBJ`,
};

export const USER_KEY = `@${COMPANY_LOCAL_STORAGE}USER-OBJ`;
export const OFFLINE_FORM_KEY = `@${COMPANY_LOCAL_STORAGE}FORM-OBJ`;

const Actions = {
  GET: 0,
  SET: 1,
  REMOVE: 3,
};

export async function HandleLocalStorage(Action = 1, Key = ``, Value = null) {
  switch (Action) {
    case Actions.SET:
      if (Value) {
        localStorage.setItem(Key, JSON.stringify(Value));
      }
      break;
    case Actions.REMOVE:
      localStorage.removeItem(Key);
      break;

    default:
      const value = localStorage.getItem(Key);

      if (value !== null) {
        return JSON.parse(value);
      }
      break;
  }
}

const localStorageForm = {
  User: {
    SetUserLS(Value: any) {
      HandleLocalStorage(Actions.SET, LOCAL_STORAGE_KEYS.USER_KEY, Value);
    },
    GetUserLS() {
      HandleLocalStorage(Actions.GET, LOCAL_STORAGE_KEYS.USER_KEY);
    },
    RemoveUserLS() {
      HandleLocalStorage(Actions.REMOVE, LOCAL_STORAGE_KEYS.USER_KEY);
    },
  },
  OfflineForms: {
    SetOfflineFormLS(Value: any) {
      HandleLocalStorage(
        Actions.SET,
        LOCAL_STORAGE_KEYS.OFFLINE_FORM_KEY,
        Value
      );
    },
    GetOfflineFormLS() {
      HandleLocalStorage(Actions.GET, LOCAL_STORAGE_KEYS.OFFLINE_FORM_KEY);
    },
    RemoveOfflineFormLS() {
      HandleLocalStorage(Actions.REMOVE, LOCAL_STORAGE_KEYS.OFFLINE_FORM_KEY);
    },
  },
};

export function GetUserLS() {
  try {
    const value = localStorage.getItem(USER_KEY);

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {}
}

export function SetOfflineFormLS(Value: any) {
  localStorage.setItem(OFFLINE_FORM_KEY, JSON.stringify(Value));
}

export function GetOfflineFormLS() {
  try {
    const value = localStorage.getItem(OFFLINE_FORM_KEY);

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {}
}

export const RemoveOfflineFormLS = () => {
  localStorage.removeItem(OFFLINE_FORM_KEY);
};

export default localStorageForm;
