import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { logoutUser, openingDrawer } from "../../redux/actions";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import BusinessIcon from "@material-ui/icons/Business";
import SchoolIcon from "@material-ui/icons/School";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  shiftTextLeft: {
    marginLeft: "0px",
  },
  shiftTextRight: {
    marginLeft: drawerWidth,
  },
}));

export default function Appbar({ props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { logout, user, userName, role } = state;
  let history = useHistory();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(openingDrawer(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(openingDrawer(false));
  };
  let check = Object.keys(user).length === 0 && user.constructor === Object;

  if (check) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">
              <Button color="inherit" onClick={() => history.goBack()}>
                <ArrowBackIcon />
              </Button>
            </Typography>
            <Typography variant="h6" noWrap className={classes.title}>
              {userName ? userName : "Dashboard"}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Dashboard", "My Jobs", "Show All Jobs"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => history.push(`${props[index + 3].path}`)}
              >
                {/* {console.log(props)} */}
                <ListItemIcon>
                  {index % 2 === 0 ? <BusinessIcon /> : <SchoolIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}></main>
      </div>
    );
  }
}

// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../../redux/actions";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { Redirect, useHistory } from "react-router-dom";
// import Loader from "../loader";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// function Appbar(props) {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state.auth);
//   const { logout, user } = state;
//   let history = useHistory();
//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   let check = Object.keys(user).length === 0 && user.constructor === Object;
//   const classes = useStyles();
//   if (check) {
//     return <Redirect to="/" />;
//   } else {
//     return (
//       <div className={classes.root}>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" className={classes.title}>
//               <Button color="inherit" onClick={() => history.goBack()}>
//                 <ArrowBackIcon />
//               </Button>
//             </Typography>
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <div>{props.children}</div>
//       </div>
//     );
//   }
// }

// export default Appbar;
