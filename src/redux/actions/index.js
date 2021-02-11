import Firebase from "firebase";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  GETDATA_REQUEST,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  ADDJOB_REQUEST,
  ADDJOB_SUCCESS,
  ADDJOB_FAILURE,
  MYJOB_SUCCESS,
  STUDENTJOB_FAILURE,
  STUDENTJOB_SUCCESS,
  STUDENTJOB_REQUEST,
} from "../constants";
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user },
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: { error },
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: { error },
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};
const requestSignup = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};
const receiveSignup = (user, role) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: { user, role },
  };
};
const signupError = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: { error },
  };
};
const requestForgot = () => {
  return {
    type: FORGOT_REQUEST,
  };
};
const receiveForgot = () => {
  return {
    type: FORGOT_SUCCESS,
  };
};
const forgotError = (error) => {
  return {
    type: FORGOT_FAILURE,
    payload: { error },
  };
};
const requestgetData = () => {
  return {
    type: GETDATA_REQUEST,
  };
};
const receivegetData = (role, userName) => {
  return {
    type: GETDATA_SUCCESS,
    payload: { role, userName },
  };
};
const getDataError = () => {
  return {
    type: GETDATA_FAILURE,
  };
};
const requestAddJob = () => {
  return {
    type: ADDJOB_REQUEST,
  };
};
const receiveAddJob = (job) => {
  return {
    type: ADDJOB_SUCCESS,
    payload: { job },
  };
};
const AddJobError = () => {
  return {
    type: ADDJOB_FAILURE,
  };
};
export const receiveMyJobs = (job) => {
  return {
    type: MYJOB_SUCCESS,
    payload: { job },
  };
};
export const requestStudentJob = () => {
  return {
    type: STUDENTJOB_REQUEST,
  };
};
export const receiveStudentJob = () => {
  return {
    type: STUDENTJOB_SUCCESS,
  };
};
export const studentJobError = () => {
  return {
    type: STUDENTJOB_FAILURE,
  };
};

const err = "user doesn't exist on this role!";
export const loginUser = (email, password, role) => (dispatch) => {
  dispatch(requestLogin());
  Firebase.database()
    .ref(`/Users/`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      const newArray = Object.entries(data);
      if (!newArray.length) {
        return dispatch(loginError(err));
      }
      const filtered = newArray.filter((val) => email === val[1]?.email);
      if (!filtered.length) {
        return dispatch(loginError(err));
      }
      const newEmail = filtered[0][1]?.email;
      const newRole = filtered[0][1]?.role;

      if (newEmail === email && newRole === role) {
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            dispatch(receiveLogin(user));
          })
          .catch((error) => {
            dispatch(loginError(error.message));
          });
      } else {
        dispatch(loginError(err));
      }
    })
    .catch((error) => {
      dispatch(loginError(err));
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  Firebase.auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      dispatch(logoutError());
    });
};

export const signupUser = (userName, email, password, role) => (dispatch) => {
  dispatch(requestSignup());
  Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      let UID = Firebase.auth().currentUser?.uid;
      console.log(UID);
      Firebase.database().ref(`/Users/${UID}`).set({
        uid: UID,
        userName: userName,
        email: email,
        password: password,
        role: role,
      });
      dispatch(receiveSignup(user, role));
    })

    .catch((error) => {
      dispatch(signupError(error.message));
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  Firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};

export const sendResetEmail = (email) => (dispatch) => {
  dispatch(requestForgot());
  Firebase.auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch(receiveForgot());
    })
    .catch((error) => {
      dispatch(forgotError(error.message));
    });
};

export const detectRole = (UID) => (dispatch) => {
  dispatch(requestgetData());
  // const UID = Firebase.auth().currentUser?.uid
  Firebase.database()
    .ref(`/Users/${UID}`)
    .get()
    .then((snapshot) => {
      const data = snapshot.val();
      const userName = data?.userName;
      const role = data?.role;
      dispatch(receivegetData(role, userName));
    })
    .catch((error) => {
      dispatch(getDataError(error));
    });
};
export const addJob = (title, experience, description, uid, userName) => (
  dispatch
) => {
  dispatch(requestAddJob());
  const newData = {
    title,
    experience,
    description,
  };
  const newData_ = {
    title,
    experience,
    description,
    userName,
  };

  const newJob = Firebase.database().ref(`/Users/${uid}`).child("Jobs").push()
    .key;
  let updates = {};
  updates[`/Jobs/${newJob}`] = newData;
  let updates1 = {};
  updates1[`/Jobs/${newJob}`] = newData_;
  Firebase.database()
    .ref()
    .update(updates1)
    .then(() => {
      Firebase.database()
        .ref(`/Users/${uid}`)
        .update(updates)
        .then(() => {
          dispatch(receiveAddJob(newData));
        })
        .catch((error) => {
          dispatch(AddJobError());
        });
    })
    .catch((error) => {
      dispatch(AddJobError());
    });
};
export const studentJob = (uid, key) => (dispatch) => {
  dispatch(requestStudentJob());
  let updates = {};
  updates[`/Jobs/${key}`] = key;
  Firebase.database()
    .ref(`/Users/${uid}`)
    .update(updates)
    .then(() => {
      dispatch(receiveAddJob());
      console.log("success");
    })
    .catch((err) => {
      dispatch(studentJobError());
    });
};
// export const studentJob = (
//   uid,
//   { description, experience, title, userName }
// ) => (dispatch) => {
//   dispatch(requestStudentJob());
//   const newData = {
//     title,
//     experience,
//     description,
//     userName,
//   };
//   let updates = {};
//   updates[`/Jobs/`] = newData;
//   Firebase.database()
//     .ref(`/Users/${uid}`)
//     .update(updates)
//     .then(() => {
//       dispatch(receiveStudentJob(newData));
//     })
//     .catch((error) => {
//       dispatch(studentJobError());
//     });
// };
