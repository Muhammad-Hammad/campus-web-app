import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCompanyJob,
  detectRole,
  getCompanyJobs,
  getStudentJobs,
  receiveMyJobs,
  studentJob,
} from "../../redux/actions";
import { Grid, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Firebase from "firebase";
import Loader from "../loader";
import { Redirect } from "react-router";

function ShowJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { user, Jobs, role, userName, loading, MyJobs, drawer } = state;
  let [jobKey, setKey] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: drawer ? "250px" : "82px",
      transition: "0.3s ease",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    h2: {
      margin: "0.2em 0 0.2em 0",
      color: "black",

      fontWeight: "normal",
      fontFamily: "Helvetica",
      textTransform: "uppercase",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    if (role === "Company") {
      dispatch(getCompanyJobs(user.uid));
      Firebase.database()
        .ref(`Users/${user.uid}/Jobs`)
        .on(`value`, (snapshot) => {
          const data = snapshot.val();
          const newData = data ? Object.keys(data) : [];
          setKey(newData);
        });
    } else if (role === "Student") {
      dispatch(getStudentJobs());
      Firebase.database()
        .ref(`Users/${user.uid}/Jobs`)
        .on(`value`, (snapshot) => {
          const data = snapshot.val();
          const newData = data ? Object.keys(data) : [];
          setKey(newData);
        });
    }
  }, [user]);
  const handleApply = (key) => {
    dispatch(studentJob(user.uid, key));
  };
  const handleDelete = (key) => {
    dispatch(deleteCompanyJob(user.uid, key));
  };
  let _Jobs = Jobs ? Object.entries(Jobs) : [];
  if (role == "Admin"){
   return <Redirect to="/dashboard" />
  }
  if (!role || MyJobs.loading) {
    return <Loader size={150} />;
  } else if (role === "Student") {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="h2" className={classes.h2}>
                All Jobs
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container justify="center" spacing={3}>
              {jobKey.length !== _Jobs.length ? (
                _Jobs.map((val, ind) => {
                  let { title, experience, description, userName } = val[1];
                  let key = val[0];
                  let flag = jobKey.includes(key);
                 
                  if (!flag) {
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
                          key={key}
                          title={title}
                          experience={experience}
                          description={description}
                          handleApply={() => handleApply(key)}
                          userName={userName}
                        />
                      </Grid>
                    );
                  }
                })
              ) : (
                <div>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Typography variant="h4" className={classes.h2}>
                          You Dont have any Jobs
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else if (role === "Company") {
    
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="h2" className={classes.h2}>
                All Jobs
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {
              (jobKey.length !== 0 || _Jobs.length !== 0) ? (
                _Jobs.map((val, ind) => {
                  let { title, experience, description } = val[1];
                  let key = val[0];
                  let flag = jobKey.includes(key);
               
                  if (flag) {
                    return (
                      <Grid
                        item
                        xs={3}
                        alignContent="center"
                        alignItems="center"
                        justify="center"
                      >
                        <JobCard
                          key={key}
                          title={title}
                          experience={experience}
                          description={description}
                          handleApply={() => handleApply(key)}
                          handleDelete={() => handleDelete(key)}
                        />
                      </Grid>
                    );
                  }
                })
              ) : (
                <div>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Typography variant="h4" className={classes.h2}>
                          You Dont have any Jobs
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ShowJobs;
// Firebase.database()
// .ref(`Users/${user.uid}/Jobs`)
// .on(`value`, (snapshot) => {
//   let data2 = [];
//   snapshot.forEach((childSnapshot) => {
//     const data = childSnapshot.val();
//     data2.push(data);
//     // const newarr = Object.entries(data);
//   });
//   const intersection = data1.filter(element => data2.includes(element));
//   dispatch(receiveMyJobs(intersection));
// });
