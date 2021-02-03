import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

function ShowJobs() {
  const state = useSelector((state) => state.auth);
  const { Jobs } = state;
  console.log(Jobs);
  // console.log("JOBSSS", Jobs);
  return (
    <div>
      {console.log("hello")}
      {Jobs.map((val, ind) => {
        let { title, job, description } = val;
        return (
          <JobCard
            title={title}
            job={job}
            key={ind}
            description={description}
          />
        );
      })}
    </div>
  );
}

export default ShowJobs;
