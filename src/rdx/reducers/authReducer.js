import * as c from "../actions/types";

const INITIAL_STATE = {
  email: "",
  auth_token: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case c.SIGNIN: {
      return {
        ...state,
        auth_token: action.resp.auth_token,
        email: action.resp.email,
      };
    }
    case c.SIGNUP: {
      return {
        ...state,
        auth_token: action.resp.authentication_token,
        email: action.resp.email,
      };
    }
    case c.SIGNOUT: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
