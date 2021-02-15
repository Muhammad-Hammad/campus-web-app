import { useEffect, useState } from "react";
import JobCard from "../ShowJobs/JobCard";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStudentJob,
  receiveMyJobs,
  studentJob,
} from "../../redux/actions";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Firebase from "firebase";

function StudentJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user, Jobs, role, drawer } = state;
  let [jobKey, setKey] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: drawer ? "250px" : "82px",
      transition: "0.3s ease",
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
    Firebase.database()
      .ref(`Jobs/`)
      .on(`value`, (snapshot) => {
        const data = snapshot.val();

        dispatch(receiveMyJobs(data));
      });
    Firebase.database()
      .ref(`Users/${user.uid}/Jobs`)
      .on(`value`, (snapshot) => {
        const data = snapshot.val();
        const newData = data ? Object.keys(data) : [];
        setKey(newData);
        // console.log("data key", newData);
      });
  }, [user]);
  console.log("jobkey", jobKey);
  console.log(user.uid);
  const handleApply = (key) => {
    dispatch(studentJob(user.uid, key));
  };
  const handleDelete = (key) => {
    dispatch(deleteStudentJob(user.uid, key));
  };
  let _Jobs = Jobs ? Object.entries(Jobs) : [];
  return (
    <div className={classes.root}>
      {/* {console.log("hello")} */}
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Typography variant="h2" className={classes.h2}>
              Applied Jobs
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {console.log("_Jobs.length", _Jobs.length)}
            {console.log("JobKey", jobKey.length)}
            {jobKey.length > 0 ? (
              _Jobs.map((val, ind) => {
                let { title, experience, description, userName } = val[1];

                let key = val[0];
                let flag = jobKey.includes(key);
                console.log("flag", flag);
                if (flag) {
                  return (
                    <Grid item xs={3}>
                      <JobCard
                        key={key}
                        title={title}
                        experience={experience}
                        description={description}
                        handleApply={() => handleApply(key)}
                        handleDelete={() => handleDelete(key)}
                        userName={userName}
                      />
                    </Grid>
                  );
                }
              })
            ) : (
              <div>
                <h1>You don't have any Job</h1>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentJobs;
