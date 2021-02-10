import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useSelector, useDispatch } from "react-redux";
import { receiveMyJobs, studentJob } from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Firebase from "firebase";

function ShowJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { nayajob } = Jobs;
  // console.log("naya", nayajob);
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
          // console.log("data key", newData);
        });
    }
  }, [user]);
  console.log("jobkey", jobKey);
  let Job_Val = Object.values(Jobs);
  let Job_Key = Object.keys(Jobs);
  const handleApply = (key) => {
    // console.log("job ayi hai", key);
    dispatch(studentJob(user.uid, key));
  };
  // console.log(Object.entries(Jobs));
  let _Jobs = Object.entries(Jobs);
  // console.log(Job_Key);
  // console.log(_Jobs);
  return (
    <div>
      {/* {console.log("hello")} */}
      <Grid container spacing={3}>
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
