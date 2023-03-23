import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import isAuthenticated from "../auth";
import { StoreProvider } from "../context";
import { InsertForm, SignIn, SignUp } from "../pages";
import theme from "../theme/defaultTheme";

interface IRoute {
  key: number;
  path: string;
  element: JSX.Element;
}

function RouteCheckAuth({ children }: { children: JSX.Element }) {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/" />;
  }

  return children;
}

const AllRoutes = [
  {
    key: 1,
    path: "/",
    element: <SignIn />,
  },
  {
    key: 2,
    path: "signUp/*",
    element: <SignUp />,
  },
  {
    key: 3,
    path: "insertForm/*",
    element: (
      <RouteCheckAuth>
        <InsertForm />
      </RouteCheckAuth>
    ),
  },
] as IRoute[];

export default function RouteConfig() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {AllRoutes.map(item => (
              <Route {...item} />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}
