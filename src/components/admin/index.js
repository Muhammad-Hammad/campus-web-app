import { makeStyles, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BlockUser, getAllCompany, getAllJobs, getAllStudent, getAllUsers } from "../../redux/actions";
import AdminTable from "./AdminTable";
import Test from "../test";

function AdminPanel() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { user, drawer } = state;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      marginLeft: drawer ? "250px" : "0px",
      transition: "0.3s ease",
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllJobs());
  }, [user]);
  return (
    <div className={`${classes.root}`}>
      <Paper className={`${classes.paper} container mx-auto`}>
       <Test />
        {/* <AdminTable /> */}
      </Paper>
    </div>
  );
}

export default AdminPanel;
