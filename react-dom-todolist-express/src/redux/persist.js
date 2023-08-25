import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用本地存储

// 导入你的 reducer
import rootReducer from './reducers';

// 配置 Redux 持久化
const persistConfig = {
  key: 'root',
  storage,
};

// 创建持久化的根 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 Redux 存储
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };