import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockUser,
  getAllJobs,
  getAllUsers,
  verifiedUser,
} from "../../redux/actions";
import Loader from "../loader";
import { Button, Grid, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Modal } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import JobCard from "../ShowJobs/JobCard";

function preventDefault(event) {
  event.preventDefault();
}

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

export default function AdminTable() {
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { AllUsers, user, GetAllUsers, AllJobs } = state;

  const [SarayUsers] = AllUsers ? AllUsers : [];
  const handleBlock = (uid, blocked) => {
    dispatch(BlockUser(uid, blocked));
  };
  const handleVerified = (uid, verified) => {
    dispatch(verifiedUser(uid, verified));
  };

  const [SaariJobs] = AllJobs;
  const Joby = SaariJobs ? Object.entries(SaariJobs) : [];
  console.log("joby", Joby);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (GetAllUsers?.loading || !AllUsers) {
    console.log("main chal ra hun");
    return <Loader />;
  } else if (!GetAllUsers.loading) {
    return (
      <React.Fragment>
        {/* <Title>Recent Orders</Title> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell style={{ paddingLeft: "3em" }}>Status</TableCell>
              <TableCell style={{ paddingLeft: "1em" }}>Verification</TableCell>
              <TableCell style={{ paddingLeft: "2em" }}>Jobs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SarayUsers.map((row) => {
              //   console.log(row);
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
                // console.log(email, uid, password, blocked, Jobs);
                let isJob = Jobs ? Object.keys(Jobs) : [];
                let filteredJobs = [];
                Joby.filter((val, ind) => {
                  console.log(val, isJob);
                  return isJob[ind] === val[0]
                    ? filteredJobs.push(val[1])
                    : null;
                });
                console.log("filteredJobs", filteredJobs);

                return (
                  <TableRow key={uid}>
                    <TableCell>{email}</TableCell>
                    <TableCell>{password}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{userName}</TableCell>
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
                      <Button onClick={handleOpen}>Show</Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={(classes.modal, classes.root)}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        // BackdropComponent={Backdrop}
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

                                      console.log("value", val);
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
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
