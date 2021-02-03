import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { detectRole } from "../../redux/actions";
import { ROUTES, RouteWithSubRoutes, RenderRoutes } from "../../routes";
import Loader from "../loader";
function App() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { login, signup, user, verify, getData, Jobs } = state;
  // console.log(verify);
  useEffect(() => {
    dispatch(detectRole(user?.uid));
  }, [user]);
  // console.log("user", user);
  // console.log("getData", getData);
  let check = Object.keys(user).length === 0 && user.constructor === Object;
  console.log("job", Jobs);
  return (
    <RenderRoutes routes={ROUTES} />

    // <Switch>
    //   {ROUTES.map((route, i) => {
    //     if (verify.verifying) {
    //       return <Loader size={100} />;
    //     } else {
    //       if (check) {
    //         if (!route.private) {
    //           // console.log({ route });
    //           return <RouteWithSubRoutes key={i} {...route} />;
    //         }
    //       } else if (!check) {
    //         console.log(
    //           route.key,
    //           <RouteWithSubRoutes key={route.key} {...route} />
    //         );
    //         // console.log(<RouteWithSubRoutes key={i} {...route} />);
    //         return <RouteWithSubRoutes key={route.key} {...route} />;
    //       }
    //     }
    //   })}
    // </Switch>
  );
}

export default App;
