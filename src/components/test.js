import {
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockUser,
  getAllCompany,
  getAllJobs,
  getAllStudent,
  verifiedUser,
} from "../redux/actions";
import Loader from "./loader";
import "./admin/style.css";
import JobCard from "./ShowJobs/JobCard";
import Backdrop from "@material-ui/core/Backdrop";
// import React, { useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import PropTypes from "prop-types";
// import { useTheme } from "@material-ui/core/styles";
// import TableFooter from "@material-ui/core/TableFooter";
// import TablePagination from "@material-ui/core/TablePagination";
// import IconButton from "@material-ui/core/IconButton";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import LastPageIcon from "@material-ui/icons/LastPage";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BlockUser,
//   getAllJobs,
//   getAllUsers,
//   verifiedUser,
// } from "../../redux/actions";
// import Loader from "../loader";
// import {
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TableContainer,
//   Typography,
// } from "@material-ui/core";
// import Backdrop from "@material-ui/core/Backdrop";
// import { Modal } from "@material-ui/core";
// import Fade from "@material-ui/core/Fade";
// import JobCard from "../ShowJobs/JobCard";

const FilterModel = {
  items: [{ columnField: "role", operatorValue: "equals", value: "" }],
};
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":focus": {
      outline: "none",
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "none",
      outlineWidth: "0px",
    },
  },
  fade: {
    flexGrow: 1,

    ":focus": {
      outline: "none",
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "none",
      outlineWidth: "0px",
    },
    // backgroundColor: "orange",
  },
  grid: {
    ":focus": {
      outline: "none",
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "none",
      outlineWidth: "0px",
    },
    // backgroundColor: "green",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    "& .super-app-theme--cell": {
      backgroundColor: "rgba(224, 183, 60, 0.55)",
      color: "#1a3e72",
      fontWeight: "600",
    },
    "& .super-app.negative": {
      backgroundColor: "rgba(157, 255, 118, 0.49)",
      color: "#1a3e72",
      fontWeight: "600",
    },
    "& .super-app.positive": {
      backgroundColor: "#d47483",
      color: "#1a3e72",
      fontWeight: "600",
    },
  },
}));
export default function BasicToolbarFilteringGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const rows = [];
  const { AllUsers, GetAllUsers, AllJobs } = state;
  const [filteredJobs, setFjobs] = useState([]);
  const ExistingJobs = AllJobs ? Object.entries(AllJobs) : [];
  const handleBlock = (uid, blocked) => {
    dispatch(BlockUser(uid, blocked));
  };
  const handleVerified = (uid, verified) => {
    dispatch(verifiedUser(uid, verified));
  };

  const handleOpen = (jobs) => {
    setOpen(true);
    let Fjobs = [];

    console.log(jobs);
    ExistingJobs?.filter((val, ind) => {
      if (jobs.includes(val[0])) {
        return Fjobs.push(val[1]);
      }
    });
    console.log("Fjobs", Fjobs);
    setFjobs(Fjobs);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "uid",
      headerName: "UID",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
    },
    {
      field: "password",
      headerName: "Password",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },
    {
      field: "blocked",
      headerName: "Status",
      width: 200,
      cellClassName: (params) => {
        return clsx("super-app", {
          negative: params.value,
          positive: !params.value,
        });
      },
    },
    {
      field: "verified",
      headerName: "Verification",
      width: 200,
      cellClassName: (params) => {
        return clsx("super-app", {
          negative: params.value,
          positive: !params.value,
        });
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 300,
      renderCell: ({ row }) => (
        <>
          {" "}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleBlock(row.uid, row.blocked)}
            // style={{ marginLeft: 16 }}
          >
            block
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleVerified(row.uid, row.verified)}
            style={{ marginLeft: 16 }}
          >
            verify
          </Button>
        </>
      ),
    },
    {
      field: "Jobs",
      headerName: "Jobs",
      width: 100,
      renderCell: ({ row }) => {
        let isJob = row.Jobs ? Object.keys(row.Jobs) : [];
        return (
          <>
            <Button onClick={() => handleOpen(isJob)}>Show</Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              // className={"modal"}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div
                  className={`${classes.fade} border border-transparent focus:outline-none focus:border-transparent ...`}
                >
                  <Grid
                    container
                    spacing={3}
                    item
                    className="border border-transparent focus:outline-none focus:border-transparent  ..."
                  >
                    <Button>X</Button>
                    {/* <Grid item xs={10} sm={12} md={12} lg={12}  className=" border border-transparent focus:outline-none focus:border-transparent bg-gradient-to-r from-green-400 to-blue-500 focus:from-pink-500 focus:to-yellow-500..."> */}
                    {/* <h1 className={classes.modal}>Jobs</h1> */}
                    <Grid
                      container
                      justify="center"
                      spacing={3}
                      className="border border-transparent focus:outline-none focus:border-transparent ..."
                    >
                      {!!filteredJobs.length ? (
                        filteredJobs.map((val, ind) => {
                          let {
                            title,
                            experience,
                            description,
                            userName,
                            uid,
                          } = val;
                          return (
                            <Grid
                              item
                              xs={10}
                              sm={6}
                              md={4}
                              lg={3}
                              alignContent="center"
                              alignItems="center"
                              justify="center"
                            >
                              <JobCard
                                key={uid}
                                title={title}
                                experience={experience}
                                description={description}
                                userName={userName}
                              />
                            </Grid>
                          );
                        })
                      ) : (
                        <Card>
                          <CardContent>
                            <Typography variant="h4">
                              Currently, There are no Jobs associated with this
                              user
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                      {/* </Grid> */}
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            </Modal>
          </>
        );
      },
    },
  ];

  if (GetAllUsers.loading || !AllUsers?.length) {
    return <Loader />;
  } else {
    return (
      <div style={{ height: 500 }} className={classes.root}>
        {!!AllUsers?.length && (
          <DataGrid
            rows={AllUsers}
            columns={columns}
            filterModel={FilterModel}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            // sortModel={[{
            //   field:'id',
            //   sort: 'asc',
            // }]}
          />
        )}
      </div>
    );
  }
}
