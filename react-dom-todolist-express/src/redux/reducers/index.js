import { combineReducers } from "redux";
import tokenReducer from "./token_reducer";
import userReducer from "./user_reducer";

/**
 * 汇总所有的reducer变为一个总的reducer
 * 使用combineReducers API合并Reducer，key为自定义，value为reducer
 */
const allReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
});

export default allReducer;
