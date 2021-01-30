import { Redirect, Route } from "react-router";
import Signin from "../components/signin";
import Signup from "../components/signup";
import ForgotPassword from "../components/forgotPassword";
import Dashboard from "../components/dashboard";
import AddJob from "../components/AddJob";
import ShowJob from "../components/ShowJob";
import Appbar from "../components/appbar";
export const ROUTES = [
  {
    path: "/signin",
    exact: true,
    key: "SIGNIN",
    private: false,
    component: () => <Signin />,
  },
  {
    path: "/signup",
    exact: true,
    key: "SIGNUP",
    private: false,
    component: () => <Signup />,
  },
  {
    path: "/forgotPassword",
    exact: true,
    key: "FORGOT_PASSWORD",
    private: false,
    component: () => <ForgotPassword />,
  },
  {
    path: "/dashboard",
    exact: true,
    key: "DASHBOARD",
    private: true,
    component: () => {
      // verify auth function if false then return to login page
      return (
        <Appbar>
          <Dashboard />
        </Appbar>
      );
    },
    routes: [
      {
        path: "/dashboard/AddJob",
        exact: true,
        key: "ADDJOB",
        private: true,
        component: () => {
          // verify auth function if false then return to login page
          return (
            <Appbar>
              <AddJob />
            </Appbar>
          );
        },
      },
      {
        path: "/dashboard/ShowJob",
        exact: true,
        key: "SHOWJOB",
        private: true,
        component: () => {
          // verify auth function if false then return to login page
          return (
            <Appbar>
              <ShowJob />
            </Appbar>
          );
        },
      },
    ],
  },
];

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
