const COMPANY_LOCAL_STORAGE = "Drummond";

export const USER_KEY = `@${COMPANY_LOCAL_STORAGE}USER-OBJ`;
export const OFFLINE_FORM_KEY = `@${COMPANY_LOCAL_STORAGE}FORM-OBJ`;

export function SetUserLS(Value: any) {
  localStorage.setItem(USER_KEY, JSON.stringify(Value));
}

export function GetUserLS() {
  try {
    const value = localStorage.getItem(USER_KEY);

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {}
}

export const RemoveUserLS = () => {
  localStorage.removeItem(USER_KEY);
};

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
