import { combineReducers } from "redux";
import dialectReducer from "./dialectReducer";
import grammarsReducer from "./grammarsReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  dialectReducer: dialectReducer,
  grammarsReducer: grammarsReducer,
  authReducer: authReducer,
});

export default rootReducer;
