import React, { Dispatch } from "react";
import { GetUserLS } from "../storage";

export type ActionType = {
  type: "SET_USER" | "SET_THEME";
  payload: object | string | number | null;
};

export type UserType = {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: true;
  isAnonymous: false;
  lastLoginAt: string;
  stsTokenManager: object;
  uid: string;
};

type StateType = {
  user: UserType | null;
  settings: object;
};

interface StoreContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const initialState = {
  user: GetUserLS(),
  settings: {
    theme: "light",
  },
};

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME":
      return {
        ...state,
        settings: { ...state.settings, theme: action.payload },
      };
    default:
      return state;
  }
};

export const StoreContext = React.createContext<StoreContextType>({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
