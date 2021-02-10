import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import { RenderRoutes } from "../../routes";
import Button from "@material-ui/core/Button";
import Firebase from "firebase";
import { useHistory, useRouteMatch, Switch, Link } from "react-router-dom";
import { RouteWithSubRoutes } from "../../routes";
import { receiveMyJobs } from "../../redux/actions";
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
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { role, userName } = state;
  return (
    <>
      {/* <Link to="/dashboard/addjob">addjob</Link>
      <Link to="/dashboard/showjob">showjob</Link> */}
      {role === "Company" ? (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push(`/dashboard/addjob`)}
        >
          Add Job
        </Button>
      ) : (
        <div></div>
      )}
      {role === "Student" ? (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => history.push(`/dashboard/studentjob`)}
        >
          Student Jobs
        </Button>
      ) : (
        <div></div>
      )}
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`/dashboard/showjob`)}
      >
        Show All Jobs
      </Button>
    </>
  );
}

export default Dashboard;
