import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockUser,
  getAllJobs,
  getAllUsers,
  verifiedUser,
} from "../../redux/actions";
import Loader from "../loader";
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Modal } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import JobCard from "../ShowJobs/JobCard";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
export default function AdminTable() {
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { AllUsers, user, GetAllUsers, AllJobs } = state;
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllJobs());
  }, [user]);
  const [SarayUsers] = AllUsers ? AllUsers : [];
  const handleBlock = (uid, blocked) => {
    dispatch(BlockUser(uid, blocked));
  };
  const handleVerified = (uid, verified) => {
    dispatch(verifiedUser(uid, verified));
  };
  const [SaariJobs] = AllJobs;
  const Joby = SaariJobs ? Object.entries(SaariJobs) : [];
  const [open, setOpen] = useState(false);
  const [filteredJobs, setFjobs] = useState([]);

  const handleOpen = (jobs) => {
    setOpen(true);
    let Fjobs = [];
    Joby.filter((val, ind) => {
      if (jobs.includes(val[0])) {
        return Fjobs.push(val[1]);
      }
    });
    setFjobs(Fjobs);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, SarayUsers?.length - page * rowsPerPage - 1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (GetAllUsers?.loading || !AllUsers) {
    return <Loader />;
  } else if (!GetAllUsers.loading) {
    return (
      <React.Fragment>
        {/* <Title>Recent Orders</Title> */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 250 }}>Email</TableCell>
                <TableCell style={{ minWidth: 120 }}>Password</TableCell>
                <TableCell>Role</TableCell>
                <TableCell style={{ minWidth: 120 }}>UserName</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell style={{ paddingLeft: "3em" }}>Status</TableCell>
                <TableCell style={{ paddingLeft: "1em" }}>
                  Verification
                </TableCell>
                <TableCell style={{ paddingLeft: "2em" }}>Jobs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? SarayUsers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : SarayUsers
              ).map((row) => {
                let {
                  email,
                  uid,
                  password,
                  userName,
                  role,
                  blocked,
                  Jobs,
                  verified,
                } = row[1];
                if (role !== "Admin") {
                  let isJob = Jobs ? Object.keys(Jobs) : [];

                  return (
                    <TableRow key={uid}>
                      <TableCell style={{ minWidth: 250 }}>{email}</TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {password}
                      </TableCell>
                      <TableCell>{role}</TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {userName}
                      </TableCell>
                      <TableCell>{blocked.toString()}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => handleBlock(uid, blocked)}
                        >
                          {blocked ? (
                            "Unblock"
                          ) : (
                            <span
                              style={{
                                marginLeft: "1em",
                                marginRight: "1em",
                              }}
                            >
                              block
                            </span>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => handleVerified(uid, verified)}
                        >
                          {verified.toString()}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpen(isJob)}>Show</Button>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={(classes.modal, classes.root)}
                          open={open}
                          onClose={handleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <div>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                  <Grid container justify="center" spacing={3}>
                                    {filteredJobs ? (
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
                                            xs={12}
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
                                      <div>No jobs</div>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          </Fade>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  colSpan={3}
                  count={SarayUsers?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}

// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   root: {
//     flexGrow: 1,
//   },

//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// export default function AdminTable() {
//   const classes = useStyles();
//   const state = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { AllUsers, user, GetAllUsers, AllJobs } = state;

//   const [SarayUsers] = AllUsers ? AllUsers : [];
//   const handleBlock = (uid, blocked) => {
//     dispatch(BlockUser(uid, blocked));
//   };
//   const handleVerified = (uid, verified) => {
//     dispatch(verifiedUser(uid, verified));
//   };
//   // console.log("all", AllJobs);
//   const [SaariJobs] = AllJobs;
//   // console.log("saari", SaariJobs);
//   const Joby = SaariJobs ? Object.entries(SaariJobs) : [];
//   const [open, setOpen] = useState(false);
//   const [filteredJobs, setFjobs] = useState([]);

//   const handleOpen = (jobs) => {
//     setOpen(true);
//     let Fjobs = [];
//     Joby.filter((val, ind) => {
//       if (jobs.includes(val[0])) {
//         return Fjobs.push(val[1]);
//       }
//     });
//     setFjobs(Fjobs);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   if (GetAllUsers?.loading || !AllUsers) {
//     return <Loader />;
//   } else if (!GetAllUsers.loading) {
//     return (
//       <React.Fragment>
//         {/* <Title>Recent Orders</Title> */}
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Email</TableCell>
//               <TableCell>Password</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>UserName</TableCell>
//               <TableCell>Blocked</TableCell>
//               <TableCell style={{ paddingLeft: "3em" }}>Status</TableCell>
//               <TableCell style={{ paddingLeft: "1em" }}>Verification</TableCell>
//               <TableCell style={{ paddingLeft: "2em" }}>Jobs</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {SarayUsers.map((row) => {

//               let {
//                 email,
//                 uid,
//                 password,
//                 userName,
//                 role,
//                 blocked,
//                 Jobs,
//                 verified,
//               } = row[1];
//               if (role !== "Admin") {

//                 let isJob = Jobs ? Object.keys(Jobs) : [];

//                 return (
//                   <TableRow key={uid}>
//                     <TableCell>{email}</TableCell>
//                     <TableCell>{password}</TableCell>
//                     <TableCell>{role}</TableCell>
//                     <TableCell>{userName}</TableCell>
//                     <TableCell>{blocked.toString()}</TableCell>
//                     <TableCell>
//                       <Button
//                         color="secondary"
//                         onClick={() => handleBlock(uid, blocked)}
//                       >
//                         {blocked ? (
//                           "Unblock"
//                         ) : (
//                           <span
//                             style={{
//                               marginLeft: "1em",
//                               marginRight: "1em",
//                             }}
//                           >
//                             block
//                           </span>
//                         )}
//                       </Button>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         color="secondary"
//                         onClick={() => handleVerified(uid, verified)}
//                       >
//                         {verified.toString()}
//                       </Button>
//                     </TableCell>
//                     <TableCell>
//                       <Button onClick={() => handleOpen(isJob)}>Show</Button>
//                       <Modal
//                         aria-labelledby="transition-modal-title"
//                         aria-describedby="transition-modal-description"
//                         className={(classes.modal, classes.root)}
//                         open={open}
//                         onClose={handleClose}
//                         closeAfterTransition
//                         BackdropComponent={Backdrop}
//                         BackdropProps={{
//                           timeout: 500,
//                         }}
//                       >
//                         <Fade in={open}>
//                           <div>
//                             <Grid container spacing={3}>
//                               <Grid item xs={12} sm={12} md={12} lg={12}>
//                                 <Grid container justify="center" spacing={3}>
//                                   {filteredJobs ? (
//                                     filteredJobs.map((val, ind) => {
//                                       let {
//                                         title,
//                                         experience,
//                                         description,
//                                         userName,
//                                         uid,
//                                       } = val;

//                                       return (
//                                         <Grid
//                                           item
//                                           xs={12}
//                                           sm={6}
//                                           md={4}
//                                           lg={3}
//                                           alignContent="center"
//                                           alignItems="center"
//                                           justify="center"
//                                         >
//                                           <JobCard
//                                             key={uid}
//                                             title={title}
//                                             experience={experience}
//                                             description={description}
//                                             userName={userName}
//                                           />
//                                         </Grid>
//                                       );
//                                     })
//                                   ) : (
//                                     <div>No jobs</div>
//                                   )}
//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                           </div>
//                         </Fade>
//                       </Modal>
//                     </TableCell>
//                   </TableRow>
//                 );
//               }
//             })}
//           </TableBody>
//         </Table>
//       </React.Fragment>
//     );
//   }
// }
