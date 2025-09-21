// 组合子模块 导出 store 实例

import billReducer from "./modules/billStore";
import { configureStore } from "@reduxjs/toolkit";

// 根 store
const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export default store;
