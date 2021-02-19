import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
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
  STUDENTJOB_REQUEST,
  STUDENTJOB_SUCCESS,
  STUDENTJOB_FAILURE,
  DELETESTUDENTJOB_REQUEST,
  DELETESTUDENTJOB_SUCCESS,
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
  STUDENT_REQUEST,
  STUDENT_SUCCESS,
  STUDENT_FAILURE,
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
} from "../constants";

const initState = {
  login: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  logout: {
    loading: false,
    error: false,
    success: false,
  },
  signup: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  verify: {
    verifying: false,
    error: false,
  },
  forgot: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  getData: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  AddJob: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  studentJob: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  deleteStudentJob: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  deleteCompanyJob: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  GetAllUsers: {
    loading: true,
    error: false,
    success: false,
    errorMsg: "",
  },
  BlockUser: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  GetAllJobs: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  MyJobs: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  verifyUser: {
    loading: false,
    error: false,
    success: false,
    errorMsg: "",
  },
  Companies: {
    loading: true,
    error: false,
    success: false,
    errorMsg: "",
  },
  Students: {
    loading: true,
    error: false,
    success: false,
    errorMsg: "",
  },
  AllUsers: [],
  user: {},
  role: "",
  userName: "",
  Jobs: [],
  AllJobs: [],
  AllCompany:[],
  AllStudent: [],
  drawer: false,
};
export default function Auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          error: false,
          success: true,
        },
        user: action?.payload?.user,
        role: action?.payload?.role,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        login: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logout: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: {
          success: false,
        },
        logout: {
          loading: false,
          error: false,
        },
        signup: {
          success: false,
        },
        user: {},
        role: "",
        userName: "",
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logout: {
          loading: false,
          error: true,
          success: false,
        },
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        verify: {
          verifying: true,
          error: false,
        },
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        verify: {
          verifying: false,
          error: false,
        },
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loading: false,
          error: false,
          success: true,
        },
        user: action?.payload?.user,
        role: action?.payload?.role,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case FORGOT_REQUEST:
      return {
        ...state,
        forgot: {
          loading: true,
          error: false,
          success: false,
        },
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        forgot: {
          loading: false,
          error: false,
          success: true,
        },
      };
    case FORGOT_FAILURE:
      return {
        ...state,
        forgot: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    case GETDATA_REQUEST:
      return {
        ...state,
        getData: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    case GETDATA_SUCCESS:
      return {
        ...state,
        getData: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        role: action?.payload?.role,
        userName: action?.payload?.userName,
      };
    case GETDATA_FAILURE:
      return {
        ...state,
        getData: {
          loading: false,
          error: false,
          success: true,
          errorMsg: action?.payload?.error,
        },
      };
    case ADDJOB_REQUEST:
      return {
        ...state,
        addJob: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    case ADDJOB_SUCCESS: {
      return {
        ...state,
        addJob: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        Jobs: [...state?.Jobs, action?.payload?.job],
      };
    }
    case ADDJOB_FAILURE: {
      return {
        ...state,
        addJob: {
          loading: false,
          error: true,
          success: false,
          errorMsg: action?.payload?.error,
        },
      };
    }
    case MYJOB_REQUEST: {
      return {
        ...state,
        MyJobs: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case MYJOB_SUCCESS: {
      return {
        ...state,
        MyJobs: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
        Jobs: action?.payload?.job,
      };
    }
    case MYJOB_FAILURE: {
      return {
        ...state,
        MyJobs: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case STUDENTJOB_REQUEST: {
      return {
        ...state,
        studentJob: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case STUDENTJOB_SUCCESS: {
      return {
        ...state,
        studentJob: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
      };
    }
    case STUDENTJOB_FAILURE: {
      return {
        ...state,
        studentJob: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case DELETESTUDENTJOB_REQUEST: {
      return {
        ...state,
        deleteStudentJob: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case DELETESTUDENTJOB_SUCCESS: {
      return {
        ...state,
        deleteStudentJob: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
      };
    }
    case DELETESTUDENTJOB_FAILURE: {
      return {
        ...state,
        deleteStudentJob: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case DELETECOMPANYJOB_REQUEST: {
      return {
        ...state,
        deleteCompanyJob: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case DELETECOMPANYJOB_SUCCESS: {
      return {
        ...state,
        deleteCompanyJob: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
      };
    }
    case DELETECOMPANYJOB_FAILURE: {
      return {
        ...state,
        deleteCompanyJob: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case GETALLUSERS_REQUEST: {
      return {
        ...state,
        GetAllUsers: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case GETALLUSERS_SUCCESS: {
      return {
        ...state,
        GetAllUsers: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        AllUsers: action?.payload?.data,
      };
    }
    case GETALLUSERS_FAILURE: {
      return {
        ...state,
        GetAllUsers: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case BLOCKUSER_REQUEST: {
      return {
        ...state,
        BlockUser: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case BLOCKUSER_SUCCESS: {
      return {
        ...state,
        BlockUser: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
      };
    }
    case BLOCKUSER_FAILURE: {
      return {
        ...state,
        BlockUser: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case ALLJOBS_REQUEST: {
      return {
        ...state,
        GetAllJobs: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case ALLJOBS_SUCCESS: {
      return {
        ...state,
        GetAllJobs: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        AllJobs: action?.payload?.data,
      };
    }
    case ALLJOBS_FAILURE: {
      return {
        ...state,
        GetAllJobs: {
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        },
      };
    }
    case VERIFYUSER_REQUEST: {
      return {
        ...state,
        verifyUser: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case VERIFYUSER_SUCCESS: {
      return {
        ...state,
        verifyUser: {
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
      };
    }
    case VERIFYUSER_FAILURE: {
      return {
        ...state,
        verifyUser: {
          loading: false,
          error: false,
          success: false,
          errorMsg: "",
        },
      };
    }
    case DRAWER_SUCCESS: {
      return {
        ...state,
        drawer: action?.payload?.bool,
      };
    }
    case STUDENT_REQUEST:{
      return {
        ...state,
        Student: {
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        }
      }
    }
    case STUDENT_SUCCESS:{
      return {
        ...state,
        Student:{
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        AllStudent: [action?.payload?.data]
      }
    }
    case STUDENT_FAILURE:{
      return {
        ...state,
        Student:{
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        }
      }
    }
    case COMPANY_REQUEST:{
      return{
        ...state,
        Company:{
          loading: true,
          error: false,
          success: false,
          errorMsg: "",
        }
      }
    }
    case COMPANY_SUCCESS:{
      return{
        ...state,
        Company:{
          loading: false,
          error: false,
          success: true,
          errorMsg: "",
        },
        AllCompany: [action?.payload?.data]
      }
    }
    case COMPANY_FAILURE:{
      return{
        ...state,
        Company:{
          loading: false,
          error: true,
          success: false,
          errorMsg: "",
        }
      }
    }
    default:
      return state;
  }
}
