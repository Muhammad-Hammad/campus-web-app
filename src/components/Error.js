import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../redux/actions";

function Error() {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(logoutUser());
  };
  // console.log(history);
  return (
    <div>
      <h1>ERROR 404 not FOUND</h1>
      <button onClick={() => history.goBack()}>go to home page</button>
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
}

export default Error;
