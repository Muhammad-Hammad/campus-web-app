import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES, RouteWithSubRoutes } from "../../routes";
function App() {
  return (
    <Switch>
      <Route exact="/">
        <Redirect to="/login" />
      </Route>
      {ROUTES.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
}

export default App;
