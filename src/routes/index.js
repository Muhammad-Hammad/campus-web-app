import { Redirect, Route, Switch } from "react-router";
import Signin from "../components/signin";
import Signup from "../components/signup";
import ForgotPassword from "../components/forgotPassword";
import Dashboard from "../components/dashboard";
import AddJob from "../components/AddJob";
import ShowJob from "../components/ShowJobs";
import Appbar from "../components/appbar";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
export const ROUTES = [
  {
    path: "/",
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
    component: RenderRoutes,
    routes: [
      {
        path: "/dashboard",
        exact: true,
        key: "DASHBOARD_ROOT",
        private: true,
        component: () => {
          // verify auth function if false then return to login page
          return (
            <Appbar>
              <Dashboard />
            </Appbar>
          );
        },
      },
      {
        path: "/dashboard/addjob",
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
        path: "/dashboard/showjob",
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
  {
    path: "*",
    exact: false,
    key: "*",
    private: false,
    component: () => <Error />,
  },
];

export function RouteWithSubRoutes(route) {
  const state = useSelector((state) => state.auth);
  const { verify, login, signup } = state;
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        console.log(
          route.key,
          <RouteWithSubRoutes key={route.key} {...route} />
        );
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
