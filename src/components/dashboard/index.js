import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import { RenderRoutes } from "../../routes";
import Button from "@material-ui/core/Button";
import { useHistory, useRouteMatch, Switch, Link } from "react-router-dom";
import { RouteWithSubRoutes } from "../../routes";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Dashboard({ routes }) {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <>
      {/* <Link to="/dashboard/addjob">addjob</Link>
      <Link to="/dashboard/showjob">showjob</Link> */}
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`/dashboard/addjob`)}
      >
        Add Job
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`/dashboard/showjob`)}
      >
        Show My Jobs
      </Button>
    </>
  );
}

export default Dashboard;
