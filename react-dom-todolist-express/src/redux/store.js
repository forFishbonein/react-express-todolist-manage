/*
 * @FilePath: store.js
 * @Author: Aron
 * @Date: 2023-06-28 14:43:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 17:16:30
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion:
 */
/*
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import { legacy_createStore, applyMiddleware } from "redux";
//引入为Count组件服务的reducer
// import userReducer from "./user_reducer";
//用于支持异步 action
//引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
//引入redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";
// 合并后的reducer
import allReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 使用本地存储
// 配置 Redux 持久化
const persistConfig = {
  key: "root",
  storage,
};
// 创建持久化的根 reducer
const persistedReducer = persistReducer(persistConfig, allReducer);
// 创建 Redux 存储
const store = legacy_createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };
