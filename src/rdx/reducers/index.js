import { combineReducers } from "redux";
import dialectReducer from "./dialectReducer";
import grammarsReducer from "./grammarsReducer";

const rootReducer = combineReducers({
  dialectReducer: dialectReducer,
  grammarsReducer: grammarsReducer,
});

export default rootReducer;
