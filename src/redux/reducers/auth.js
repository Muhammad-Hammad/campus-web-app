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
  user: {},
  role: "",
  userName: "",
  Jobs: [],
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
        Jobs: [...state?.Jobs, action?.payload?.jobs],
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
    default:
      return state;
  }
}
