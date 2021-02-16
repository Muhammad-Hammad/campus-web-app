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
  DELETESTUDENTJOB_SUCCESS,
  DELETESTUDENTJOB_REQUEST,
  DELETESTUDENTJOB_FAILURE,
  DELETECOMPANYJOB_REQUEST,
  DELETECOMPANYJOB_SUCCESS,
  DELETECOMPANYJOB_FAILURE,
  GETALLUSERS_REQUEST,
  GETALLUSERS_SUCCESS,
  GETALLUSERS_FAILURE,
  BLOCKUSER_REQUEST,
  BLOCKUSER_SUCCESS,
  BLOCKUSER_FAILURE,
  ALLJOBS_REQUEST,
  ALLJOBS_SUCCESS,
  ALLJOBS_FAILURE,
  MYJOB_REQUEST,
  MYJOB_FAILURE,
  VERIFYUSER_REQUEST,
  VERIFYUSER_SUCCESS,
  VERIFYUSER_FAILURE,
  DRAWER_SUCCESS,
} from "../constants";
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user, role) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, role },
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
const requestMyJobs = () => {
  return {
    type: MYJOB_REQUEST,
  };
};
export const receiveMyJobs = (job) => {
  return {
    type: MYJOB_SUCCESS,
    payload: { job },
  };
};
const myJobsError = () => {
  return {
    type: MYJOB_FAILURE,
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
const requestDeleteStudentJob = () => {
  return {
    type: DELETESTUDENTJOB_REQUEST,
  };
};
const receiveDeleteStudentJob = () => {
  return {
    type: DELETESTUDENTJOB_SUCCESS,
  };
};
const deleteStudentJobError = () => {
  return {
    type: DELETESTUDENTJOB_FAILURE,
  };
};
const requestDeleteCompanyJob = () => {
  return {
    type: DELETECOMPANYJOB_REQUEST,
  };
};
const receiveDeleteCompanyJob = () => {
  return {
    type: DELETECOMPANYJOB_SUCCESS,
  };
};
const deleteCompanyJobError = () => {
  return {
    type: DELETECOMPANYJOB_FAILURE,
  };
};
const requestAllUsers = () => {
  return {
    type: GETALLUSERS_REQUEST,
  };
};
const receiveAllUsers = (data) => {
  return {
    type: GETALLUSERS_SUCCESS,
    payload: { data },
  };
};
const allUsersError = () => {
  return {
    type: GETALLUSERS_FAILURE,
  };
};
const requestBlockUser = () => {
  return {
    type: BLOCKUSER_REQUEST,
  };
};
const receiveBlockUser = () => {
  return {
    type: BLOCKUSER_SUCCESS,
  };
};
const blockUserError = () => {
  return {
    type: BLOCKUSER_FAILURE,
  };
};
const requestAllJobs = () => {
  return {
    type: ALLJOBS_REQUEST,
  };
};
const receiveAllJobs = (data) => {
  return {
    type: ALLJOBS_SUCCESS,
    payload: { data },
  };
};
const allJobsError = () => {
  return {
    type: ALLJOBS_FAILURE,
  };
};
const requestVerifiedUser = () => {
  return {
    type: VERIFYUSER_REQUEST,
  };
};
const receiveVerifiedUser = () => {
  return {
    type: VERIFYUSER_SUCCESS,
  };
};
const verifiedUserError = () => {
  return {
    type: VERIFYUSER_FAILURE,
  };
};
const drawerBool = (bool) => {
  return {
    type: DRAWER_SUCCESS,
    payload: { bool },
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
      const isBlocked = filtered[0][1]?.blocked;
      const isVerified = filtered[0][1]?.verified;
      if (isBlocked) {
        return dispatch(loginError("You have been blocked by The Admin"));
      }
      if (!isVerified) {
        return dispatch(loginError("You are not verified by the Admin"));
      }

      if (newEmail === email && newRole === role) {
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            dispatch(receiveLogin(user, role));
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
      Firebase.database().ref(`/Users/${UID}`).set({
        uid: UID,
        userName: userName,
        email: email,
        password: password,
        role: role,
        blocked: false,
        verified: false,
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
      dispatch(requestLogin());
      Firebase.database()
        .ref(`Users/${user.uid}`)
        .on(`value`, (snapshot) => {
          const data = snapshot.val();
          const { role, blocked, verified } = data;
          if (blocked || !verified) {
            Firebase.auth()
              .signOut()
              .then(() => {
                dispatch(receiveLogout());
              });
          } else {
            
            dispatch(receiveLogin(user, role));
          }
        });
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
    uid,
  };
  const newData_ = {
    title,
    experience,
    description,
    userName,
    uid,
  };

  const newJob = Firebase.database().ref(`/Users/${uid}`).child("Jobs").push()
    .key;
  let updates = {};
  updates[`/Jobs/${newJob}`] = newJob;
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
  let updates1 = {};
  updates1[`/AppliedPeople/${uid}`] = uid;
  updates[`/Jobs/${key}`] = key;
  Firebase.database()
    .ref(`/Users/${uid}`)
    .update(updates)
    .then(() => {
      Firebase.database().ref(`/Jobs/${key}`).update(updates1);
      dispatch(receiveAddJob());
      
    })
    .catch((err) => {
      dispatch(studentJobError());
    });
};
export const deleteStudentJob = (uid, key) => (dispatch) => {
  dispatch(requestDeleteStudentJob());
  let updates = {};
  let updates1 = {};

  updates1[`/AppliedPeople/${uid}`] = null;
  updates[`/Jobs/${key}`] = null;
  Firebase.database()
    .ref(`/Users/${uid}`)
    .update(updates)
    .then(() => {
      Firebase.database().ref(`/Jobs/${key}`).update(updates1);
      dispatch(receiveDeleteStudentJob());
    })
    .catch((err) => {
      dispatch(deleteStudentJobError());
    });
};
export const deleteCompanyJob = (uid, key) => (dispatch) => {
  dispatch(requestDeleteCompanyJob());
  let updates = {};
  let updates1 = {};
  updates1[`${key}`] = null;
  updates[`/Jobs/${key}`] = null;
  Firebase.database()
    .ref(`/Users/${uid}`)
    .update(updates)
    .then(() => {
      Firebase.database().ref(`/Jobs/`).update(updates1);
      dispatch(receiveDeleteCompanyJob());
    })
    .catch((err) => {
      dispatch(deleteCompanyJobError());
    });
};
export const getAllUsers = () => (dispatch) => {
  dispatch(requestAllUsers());
  Firebase.database()
    .ref("Users")
    .on(
      `value`,
      (snapshot) => {
        const data = snapshot.val();
      
        const newdata = Object.entries(data);
        dispatch(receiveAllUsers(newdata));
      },
      () => {
        dispatch(allUsersError());
      }
    );
};
export const BlockUser = (uid, blocked) => (dispatch) => {
  dispatch(requestBlockUser());
  let updates = {};
  updates[`/blocked`] = !blocked;
  Firebase.database()
    .ref(`Users/${uid}`)
    .update(updates)
    .then(() => {
      dispatch(receiveBlockUser());
    })
    .catch(() => {
      dispatch(blockUserError());
    });
};
export const getAllJobs = () => (dispatch) => {
  dispatch(requestAllJobs());
  Firebase.database()
    .ref(`Jobs/`)
    .on(
      `value`,
      (snapshot) => {
        const data = snapshot.val();
        dispatch(receiveAllJobs(data));
      },
      () => {
        dispatch(allJobsError());
      }
    );
};

export const getCompanyJobs = (uid) => (dispatch) => {
  dispatch(requestMyJobs());
  Firebase.database()
    .ref(`Jobs/`)
    .orderByChild("uid")
    .equalTo(uid)
    .on(
      `value`,
      (snapshot) => {
        const data = snapshot.val();
        dispatch(receiveMyJobs(data));
      },
      () => {
        dispatch(myJobsError());
      }
    );
};
export const getStudentJobs = () => (dispatch) => {
  dispatch(requestMyJobs());
  Firebase.database()
    .ref(`Jobs/`)
    .on(
      `value`,
      (snapshot) => {
        const data = snapshot.val();
        dispatch(receiveMyJobs(data));
      },
      () => {
        dispatch(myJobsError());
      }
    );
};
export const verifiedUser = (uid, verified) => (dispatch) => {
  dispatch(requestVerifiedUser());
  let updates = {};
  updates[`/verified`] = !verified;
  Firebase.database()
    .ref(`Users/${uid}`)
    .update(updates)
    .then(() => {
      dispatch(receiveVerifiedUser());
    })
    .catch(() => {
      dispatch(verifiedUserError());
    });
};
export const openingDrawer = (bool) => (dispatch) => {
  dispatch(drawerBool(bool));
};
