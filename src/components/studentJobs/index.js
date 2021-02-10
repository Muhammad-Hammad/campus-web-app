import { useEffect, useState } from "react";
import JobCard from "../ShowJobs/JobCard";
import { useSelector, useDispatch } from "react-redux";
import { receiveMyJobs, studentJob } from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Firebase from "firebase";

function StudentJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user, Jobs, role } = state;
  let [jobKey, setKey] = useState([]);

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
  let Job_Val = Object.values(Jobs);
  let Job_Key = Object.keys(Jobs);
  const handleApply = (key) => {
    dispatch(studentJob(user.uid, key));
  };
  let _Jobs = Object.entries(Jobs);
  return (
    <div>
      {/* {console.log("hello")} */}
      <Grid container spacing={3}>
        {console.log("_Jobs.length", _Jobs.length)}
        {console.log("JobKey", jobKey.length)}
        {jobKey.length > 0 ? (
          _Jobs.map((val, ind) => {
            let { title, experience, description } = val[1];
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
    </div>
  );
}

export default StudentJobs;
