import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "../loader";
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

function Appbar(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { logout, user } = state;
  let history = useHistory();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let check = Object.keys(user).length === 0 && user.constructor === Object;
  const classes = useStyles();
  if (check) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Button color="inherit" onClick={() => history.goBack()}>
                <ArrowBackIcon />
              </Button>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div>{props.children}</div>
      </div>
    );
  }
}

export default Appbar;
