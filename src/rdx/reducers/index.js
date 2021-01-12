import { combineReducers } from "redux";
import completedGrammarsReducer from "./completedGrammarsReducer";
import dialectReducer from "./dialectReducer";

const rootReducer = combineReducers({
  dialectReducer: dialectReducer,
  completedGrammarsReducer: completedGrammarsReducer,
});

export default rootReducer;
