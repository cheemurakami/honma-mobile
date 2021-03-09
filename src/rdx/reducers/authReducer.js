import * as c from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  auth_token: "",
  success: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case c.SIGNIN: {
      console.log("RESP", action.resp);
      return {
        ...state,
        auth_token: action.resp.auth_token,
        email: action.resp.email,
        success: action.resp.success,
      };
    }
    default:
      return state;
  }
};