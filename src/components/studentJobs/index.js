import { useEffect } from "react";
import JobCard from "../ShowJobs/JobCard";
import { useSelector, useDispatch } from "react-redux";
import { receiveMyJobs } from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Firebase from "firebase";

function StudentJobs() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user, Jobs, role } = state;

  useEffect(() => {
    if (role === "Student") {
      Firebase.database()
        .ref(`Users/${user.uid}/Jobs`)
        .on(`value`, (snapshot) => {
          let data1 = [];
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            data1.push(data);
            // const newarr = Object.entries(data);
          });
          dispatch(receiveMyJobs(data1));
        });
    }
  });

  return (
    <div>
      {console.log("hello")}
      <Grid container spacing={3}>
        {Jobs.map((val, ind) => {
          // let { props } = val;
          let { title, experience, description } = val;
          // console.log("props", description, title, job);
          return (
            <Grid item xs={3}>
              <JobCard
                key={ind}
                title={title}
                experience={experience}
                description={description}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default StudentJobs;
