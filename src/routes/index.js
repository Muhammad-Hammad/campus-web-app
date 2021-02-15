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
import StudentJobs from "../components/studentJobs";
export const ROUTES = [
  {
    path: "/",
    exact: true,
    key: "SIGNIN",
    private: false,
    component: Signin,
  },
  {
    path: "/signup",
    exact: true,
    key: "SIGNUP",
    private: false,
    component: Signup,
  },
  {
    path: "/forgotPassword",
    exact: true,
    key: "FORGOT_PASSWORD",
    private: false,
    component: ForgotPassword,
  },
  {
    path: "/dashboard",
    exact: true,
    key: "DASHBOARD",
    private: true,
    component: Dashboard,
  },
  {
    path: "/dashboard/addjob",
    exact: true,
    key: "ADDJOB",
    private: true,
    component:
      // verify auth function if false then return to login page

      // <Appbar>
      AddJob,
    // </Appbar>
  },
  {
    path: "/dashboard/showjob",
    exact: true,
    key: "SHOWJOB",
    private: true,
    component: ShowJob,
    // verify auth function if false then return to login page
  },
  {
    path: "/dashboard/studentjob",
    exact: true,
    key: "STUDENTJOBS",
    private: true,
    component: StudentJobs,
    // verify auth function if false then return to login page
  },
  // {
  //   path: "*",
  //   exact: false,
  //   key: "*",
  //   private: false,
  //   component: () => <Error />,
  // },
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
    <>
      <Route
        path={["/dashboard", "addjob", "showjob"]}
        render={(props) => <Appbar props={routes} />}
      />
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        {/* <Route path="*" component={() => <h1>Not Found!</h1>} /> */}
      </Switch>
    </>
  );
}
