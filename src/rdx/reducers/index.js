import { combineReducers } from "redux";
import dialectReducer from "./dialectReducer";

const rootReducer = combineReducers({
  dialectReducer: dialectReducer,
});

export default rootReducer;
