import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, logoutUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import { RenderRoutes } from "../../routes";
import Button from "@material-ui/core/Button";
import Firebase from "firebase";
import { useHistory, useRouteMatch, Switch, Link } from "react-router-dom";
import { RouteWithSubRoutes } from "../../routes";
import { receiveMyJobs } from "../../redux/actions";
import Loader from "../loader";
import { Box } from "@material-ui/core";
import AdminPanel from "../admin";
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
  const { role, userName, user } = state;

  useEffect(() => {
    if (role === "Admin") {
      dispatch(getAllUsers());
    }
  }, [user]);
  if (!role) {
    return <Loader size={300} />;
  } else if (role === "Admin") {
    return <AdminPanel />;
  } else {
    return (
      <>
        {/* <Link to="/dashboard/addjob">addjob</Link>
      <Link to="/dashboard/showjob">showjob</Link> */}
        <Box display="flex" justifyContent="center" m={1} p={1}>
          {role === "Company" ? (
            <Box p={1}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => history.push(`/dashboard/addjob`)}
              >
                Add Job
              </Button>
            </Box>
          ) : (
            <div></div>
          )}
          {role === "Student" ? (
            <Box p={1}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => history.push(`/dashboard/studentjob`)}
              >
                Student Jobs
              </Button>
            </Box>
          ) : (
            <div></div>
          )}
          <Box p={1}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => history.push(`/dashboard/showjob`)}
            >
              Show {role === "Student" ? "All" : role === "Company" ? "My" : ""}{" "}
              Jobs
            </Button>
          </Box>
        </Box>
      </>
    );
  }
}

export default Dashboard;
