import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, useRouteMatch } from "react-router-dom";
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
function CompanyHome() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`dashboard/addjob`)}
      >
        Add Job
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`dashboard/showjob`)}
      >
        Show My Jobs
      </Button>
    </>
  );
}

export default CompanyHome;
