import { configureStore } from "@reduxjs/toolkit";
// 导入子模块 reducer
import counterReducer from "./modules/counterStore";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
// 导出根 store
export default store;
