import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { receiveMyJobs, studentJob } from "../../redux/actions";
import { Grid, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Firebase from "firebase";
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
  h2: {
    margin: "0.2em 0 0.2em 0",
    color: "black",

    fontWeight: "normal",
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    // textShadow: "0 2px white, 0 3px #777",
  },
}));
function ShowJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, Jobs, role } = state;
  let [jobKey, setKey] = useState([]);
  useEffect(() => {
    if (role === "Company") {
      Firebase.database()
        .ref(`Users/${user.uid}/Jobs`)
        .on(`value`, (snapshot) => {
          const data = snapshot.val();
          dispatch(receiveMyJobs(data));
        });
    } else if (role === "Student") {
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
        });
    }
  }, [user]);
  const handleApply = (key) => {
    dispatch(studentJob(user.uid, key));
  };
  let _Jobs = Object.entries(Jobs);
  return (
    <div>
      {/* {console.log("hello")} */}
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
            {console.log("_Jobs.length", _Jobs.length)}
            {console.log("JobKey", jobKey.length)}
            {jobKey.length !== _Jobs.length ? (
              _Jobs.map((val, ind) => {
                let { title, experience, description } = val[1];
                let key = val[0];
                let flag = jobKey.includes(key);
                console.log("flag", flag);
                if (!flag) {
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
